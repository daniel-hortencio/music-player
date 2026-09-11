"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  FunnelIcon,
  PauseIcon,
  PlayIcon,
  SkipBackIcon,
  SkipForwardIcon,
  SpeakerHighIcon,
  SpeakerXIcon,
  XIcon,
} from "@phosphor-icons/react";
import { Audio } from "react-loader-spinner";
import { playlist } from "./playlist";
import { Categories } from "./types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const ALL_VALUE = "all";

const COOKIE_KEY = "lastSongId";
const CATEGORY_COOKIE_KEY = "selectedCategory";
const ARTIST_COOKIE_KEY = "selectedArtist";

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${60 * 60 * 24 * 365}`;
}

function deleteCookie(name: string) {
  document.cookie = `${name}=; path=/; max-age=0`;
}

function getInitialIndex(): number {
  const savedId = getCookie(COOKIE_KEY);
  if (!savedId) return 0;
  const index = playlist.findIndex((s) => s.id === savedId);
  if (index === -1) {
    deleteCookie(COOKIE_KEY);
    return 0;
  }
  return index;
}

function getInitialCategory(): string {
  const saved = getCookie(CATEGORY_COOKIE_KEY);
  if (!saved) return ALL_VALUE;
  if (
    saved !== ALL_VALUE &&
    !Object.values(Categories).includes(saved as Categories)
  ) {
    deleteCookie(CATEGORY_COOKIE_KEY);
    return ALL_VALUE;
  }
  return saved;
}

function getInitialArtist(): string {
  const saved = getCookie(ARTIST_COOKIE_KEY);
  if (!saved) return ALL_VALUE;
  if (saved !== ALL_VALUE && !playlist.some((song) => song.author === saved)) {
    deleteCookie(ARTIST_COOKIE_KEY);
    return ALL_VALUE;
  }
  return saved;
}

function getFilteredEntries(category: string, artist: string) {
  return playlist
    .map((song, index) => ({ song, index }))
    .filter(
      ({ song }) =>
        (category === ALL_VALUE ||
          song.categories?.includes(category as Categories)) &&
        (artist === ALL_VALUE || song.author === artist),
    );
}

export default function App() {
  const playerRef = useRef<YT.Player | null>(null);
  const [currentIndex, setCurrentIndex] = useState(getInitialIndex);
  const [playerReady, setPlayerReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(100);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedCategory, setSelectedCategory] =
    useState<string>(getInitialCategory);
  const [selectedArtist, setSelectedArtist] =
    useState<string>(getInitialArtist);

  const categoryCounts = useMemo(() => {
    const counts = new Map<Categories, number>();
    for (const category of Object.values(Categories)) {
      counts.set(category, 0);
    }
    for (const song of playlist) {
      for (const category of song.categories ?? []) {
        counts.set(category, (counts.get(category) ?? 0) + 1);
      }
    }
    return counts;
  }, []);

  const artistCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const song of playlist) {
      counts.set(song.author, (counts.get(song.author) ?? 0) + 1);
    }
    return counts;
  }, []);

  const artists = useMemo(
    () => Array.from(artistCounts.keys()).sort(),
    [artistCounts],
  );

  const [filteredPlaylist, setFilteredPlaylist] = useState(() =>
    getFilteredEntries(selectedCategory, selectedArtist),
  );
  const filteredPlaylistRef = useRef(filteredPlaylist);

  useEffect(() => {
    setFilteredPlaylist(getFilteredEntries(selectedCategory, selectedArtist));
  }, [selectedCategory, selectedArtist]);

  useEffect(() => {
    filteredPlaylistRef.current = filteredPlaylist;
  }, [filteredPlaylist]);

  const goToRelativeSong = (direction: 1 | -1) => {
    setCurrentIndex((current) => {
      const entries = filteredPlaylistRef.current;
      if (entries.length === 0) return current;

      const position = entries.findIndex((entry) => entry.index === current);
      if (position === -1) return entries[0].index;

      const nextPosition =
        (position + direction + entries.length) % entries.length;
      return entries[nextPosition].index;
    });
  };

  const next = () => goToRelativeSong(1);
  const previous = () => goToRelativeSong(-1);

  const togglePlay = () => {
    const player = playerRef.current;
    if (!player) return;

    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    playerRef.current?.setVolume(value[0]);
  };

  const handleSpeedChange = (value: number[]) => {
    const rate = Math.round(value[0] * 100) / 100;
    setPlaybackRate(rate);
    playerRef.current?.setPlaybackRate(rate);
  };

  const handleSeekChange = (value: number[]) => {
    setCurrentTime(value[0]);
  };

  const handleSeekCommit = (value: number[]) => {
    playerRef.current?.seekTo(value[0], true);
  };

  const formatTime = (seconds: number) => {
    const total = Math.floor(seconds);
    const minutes = Math.floor(total / 60);
    const secs = total % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const createPlayer = () => {
      playerRef.current = new window.YT.Player("youtube-player", {
        videoId: playlist[currentIndex].id,
        playerVars: {
          controls: 0,
          modestbranding: 1,
          rel: 0,
          iv_load_policy: 3,
          disablekb: 1,
        },
        events: {
          onReady: (event) => {
            event.target.setVolume(volume);
            event.target.setPlaybackRate(playbackRate);
            setPlayerReady(true);
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              next();
            }
            setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
            setDuration(event.target.getDuration());
            setCurrentTime(event.target.getCurrentTime());
          },
        },
      });
    };

    if (window.YT?.Player) {
      createPlayer();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(script);

    window.onYouTubeIframeAPIReady = createPlayer;

    return () => {
      window.onYouTubeIframeAPIReady = null;
    };
  }, []);

  useEffect(() => {
    const player = playerRef.current;
    if (!playerReady || !player) return;

    player.loadVideoById(playlist[currentIndex].id);
    setCurrentTime(0);
    setDuration(0);
  }, [currentIndex, playerReady]);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      const player = playerRef.current;
      if (!player) return;
      setCurrentTime(player.getCurrentTime());
    }, 500);

    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    setCookie(COOKIE_KEY, playlist[currentIndex].id);
  }, [currentIndex]);

  useEffect(() => {
    setCookie(CATEGORY_COOKIE_KEY, selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    setCookie(ARTIST_COOKIE_KEY, selectedArtist);
  }, [selectedArtist]);

  return (
    <>
      <img
        key={playlist[currentIndex].id}
        src={`https://img.youtube.com/vi/${playlist[currentIndex].id}/maxresdefault.jpg`}
        alt=""
        className="fixed inset-0 -z-10 w-full h-full object-cover blur-3xl opacity-30 pointer-events-none animate-[thumbnail-fade-in_0.7s_ease-in-out]"
      />
      <div className="h-screen w-screen lg:grid grid-cols-[1fr_24rem] overflow-x-hidden relative">
        <div className="flex flex-col justify-start ">
          <div className="relative w-full aspect-video z-10">
            <div
              id="youtube-player"
              className="absolute inset-0 [&_iframe]:w-full [&_iframe]:h-full w-full h-full z-10"
            />
          </div>

          <div className="p-2 space-y-4">
            <div className="flex gap-2 items-center px-1">
              <span className="text-white/80 text-xs tabular-nums w-9">
                {formatTime(currentTime)}
              </span>
              <Slider
                value={[currentTime]}
                max={duration || 1}
                step={1}
                onValueChange={handleSeekChange}
                onValueCommit={handleSeekCommit}
              />
              <span className="text-white/80 text-xs tabular-nums w-min">
                {formatTime(duration)}
              </span>
            </div>
            <div className="flex gap-2">
              <Button onClick={previous} size="icon">
                <SkipBackIcon size={20} />
              </Button>
              <Button onClick={togglePlay} size="icon">
                {isPlaying ? <PauseIcon size={20} /> : <PlayIcon size={20} />}
              </Button>
              <Button onClick={next} size="icon">
                <SkipForwardIcon size={20} />
              </Button>
              <div className="flex gap-4 flex-auto justify-end">
                <div className="flex gap-2 items-center">
                  <Slider
                    className="w-24"
                    value={[volume]}
                    max={100}
                    step={1}
                    onValueChange={handleVolumeChange}
                  />
                  {volume === 0 ? (
                    <SpeakerXIcon size={20} className="text-white/80" />
                  ) : (
                    <SpeakerHighIcon size={20} className="text-white/80" />
                  )}
                </div>
                <div className="flex gap-2 items-center">
                  <Slider
                    className="w-24"
                    value={[playbackRate]}
                    min={0.2}
                    max={2}
                    step={0.05}
                    onValueChange={handleSpeedChange}
                  />
                  <span className="text-white/80 text-sm tabular-nums w-9">
                    {playbackRate.toFixed(2)}x
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:max-h-screen lg:overflow-y-hidden flex flex-col border-t border-white/10">
          <div className="flex flex-wrap items-center justify-between gap-2 px-2 pt-2">
            <div className="space-x-2">
              {selectedCategory !== ALL_VALUE && (
                <Badge variant="secondary" className="gap-1 pr-1">
                  {selectedCategory}
                  <button
                    type="button"
                    onClick={() => setSelectedCategory(ALL_VALUE)}
                    className="rounded-full p-0.5 hover:bg-black/10"
                  >
                    <XIcon size={10} />
                  </button>
                </Badge>
              )}

              {selectedArtist !== ALL_VALUE && (
                <Badge variant="secondary" className="gap-1 pr-1">
                  {selectedArtist}
                  <button
                    type="button"
                    onClick={() => setSelectedArtist(ALL_VALUE)}
                    className="rounded-full p-0.5 hover:bg-black/10"
                  >
                    <XIcon size={10} />
                  </button>
                </Badge>
              )}
            </div>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button size="icon">
                  <FunnelIcon size={20} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="flex w-auto gap-2 p-3"
              >
                <div className="flex flex-col gap-1">
                  <DropdownMenuLabel className="p-0 text-white">
                    Categories
                  </DropdownMenuLabel>
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger className="text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={ALL_VALUE}>
                        All ({playlist.length})
                      </SelectItem>
                      {Object.values(Categories).map((category) => {
                        const count = categoryCounts.get(category) ?? 0;
                        return (
                          <SelectItem
                            key={category}
                            value={category}
                            disabled={count === 0}
                          >
                            {category} ({count})
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-1">
                  <DropdownMenuLabel className="p-0 text-white">
                    Artists
                  </DropdownMenuLabel>
                  <Select
                    value={selectedArtist}
                    onValueChange={setSelectedArtist}
                  >
                    <SelectTrigger className="text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={ALL_VALUE}>
                        All ({playlist.length})
                      </SelectItem>
                      {artists.map((artist) => (
                        <SelectItem key={artist} value={artist}>
                          {artist} ({artistCounts.get(artist)})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <ul className="list-none p-2 space-y-0.5 overflow-y-auto">
            {filteredPlaylist.map(({ song, index }) => (
              <Button
                key={song.id}
                onClick={() => setCurrentIndex(index)}
                disabled={index === currentIndex}
                variant="ghost"
                className="flex w-full justify-start h-min p-0 text-white hover:text-white hover:bg-white/10"
              >
                <div className="relative min-w-20 w-20 aspect-video rounded-md overflow-hidden">
                  <img
                    src={`https://img.youtube.com/vi/${song.id}/mqdefault.jpg`}
                  />
                </div>
                <div className="flex flex-col items-start flex-1">
                  <strong>{song.title}</strong>
                  <small>{song.author}</small>
                </div>
                <div className="w-9 flex items-center justify-center shrink-0">
                  {index === currentIndex &&
                    (isPlaying ? (
                      <Audio height={36} width={36} color="rgba(255,255,255)" />
                    ) : (
                      <PauseIcon size={24} color="rgba(255,255,255,0.60)" />
                    ))}
                </div>
              </Button>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
