"use client";

import { useEffect, useRef, useState } from "react";
import { Pause } from "@phosphor-icons/react";
import { Audio } from "react-loader-spinner";
import { playlist } from "./playlist";
import { Button } from "@/components/ui/button";

const COOKIE_KEY = "lastSongId";

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

export default function App() {
  const playerRef = useRef<YT.Player | null>(null);
  const [currentIndex, setCurrentIndex] = useState(getInitialIndex);
  const [playerReady, setPlayerReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const next = () => {
    setCurrentIndex((current) => (current + 1) % playlist.length);
  };

  const previous = () => {
    setCurrentIndex(
      (current) => (current - 1 + playlist.length) % playlist.length,
    );
  };

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

  return (
    <div className="bg-slate-950 h-screen w-screen lg:grid grid-cols-[1fr_24rem] overflow-x-hidden">
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
      <ul className="list-none p-4 space-y-0.5 overflow-y-auto">
        {playlist.map((song, index) => (
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
                  <Audio
                    height={36}
                    width={36}
                    color="rgba(255,255,255,0.60)"
                  />
                ) : (
                  <Pause size={24} color="rgba(255,255,255,0.60)" />
                ))}
            </div>
          </Button>
        ))}
      </ul>
    </div>
  );
}
