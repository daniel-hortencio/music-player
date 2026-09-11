"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Funnel, Pause, X } from "@phosphor-icons/react";
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

  useEffect(() => {
    const createPlayer = () => {
      playerRef.current = new window.YT.Player("youtube-player", {
        videoId: playlist[currentIndex].id,
        events: {
          onReady: () => setPlayerReady(true),
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              next();
            }
            setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
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
  }, [currentIndex, playerReady]);

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
    <div className="bg-black h-screen w-screen lg:grid grid-cols-[1fr_24rem] overflow-x-hidden">
      <div className="flex flex-col justify-start ">
        <div className="relative w-full aspect-video">
          <div
            id="youtube-player"
            className="absolute inset-0 [&_iframe]:w-full [&_iframe]:h-full w-full h-full"
          />
        </div>

        <h2 className="text-white">{playlist[currentIndex].title}</h2>

        <div>
          <Button onClick={previous}>Previous</Button>
          <Button onClick={next}>Next</Button>
        </div>

        <p className="text-white">
          Música {currentIndex + 1} de {playlist.length}
        </p>
      </div>
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 px-4 pt-4">
          <div className="space-x-2">
            {selectedCategory !== ALL_VALUE && (
              <Badge variant="secondary" className="gap-1 pr-1">
                {selectedCategory}
                <button
                  type="button"
                  onClick={() => setSelectedCategory(ALL_VALUE)}
                  className="rounded-full p-0.5 hover:bg-black/10"
                >
                  <X size={10} />
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
                  <X size={10} />
                </button>
              </Badge>
            )}
          </div>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-white hover:bg-white/10"
              >
                <Funnel size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="flex w-auto gap-2 p-3"
            >
              <div className="flex flex-col gap-1">
                <DropdownMenuLabel className="p-0">Categoria</DropdownMenuLabel>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ALL_VALUE}>
                      Todas ({playlist.length})
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
                <DropdownMenuLabel className="p-0">Artista</DropdownMenuLabel>
                <Select
                  value={selectedArtist}
                  onValueChange={setSelectedArtist}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ALL_VALUE}>
                      Todos ({playlist.length})
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
        <ul className="list-none p-4 space-y-0.5 overflow-y-auto">
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
                    <Pause size={24} color="rgba(255,255,255,0.60)" />
                  ))}
              </div>
            </Button>
          ))}
        </ul>
      </div>
    </div>
  );
}
