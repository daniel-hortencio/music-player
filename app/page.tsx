"use client";

import Image from "next/image";
import { playlist } from "./playlist";
import { useState } from "react";
import ReactPlayer from "react-player";
import { VideoType } from "./playlist/types";
import { Audio as AudioSpinner } from "react-loader-spinner";
import { ShuffleIcon } from "@phosphor-icons/react";
import { Button } from "@/ui/button";

function getRandomPlaylist(list: VideoType[]): VideoType[] {
  const array = [...list];

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

const randomPlaylist = getRandomPlaylist(playlist);

export default function Home() {
  const [randomMode, setRandomMode] = useState(true);
  const list = randomMode ? randomPlaylist : playlist;

  const [current, setCurrent] = useState(list[0].v);

  function onEnded() {
    const current_index = playlist.findIndex(({ v }) => v === current);

    const next =
      current_index === playlist.length - 1
        ? playlist[0]
        : playlist[current_index + 1];

    setCurrent(next.v);
  }

  function selectVideo(v: VideoType["v"]) {
    setCurrent(v);
  }

  return (
    <main className="py-6 pl-6 grid grid-cols-[1fr_28rem] gap-6 items-start h-dvh">
      <div className="w-full aspect-video ">
        <ReactPlayer
          src={`https://www.youtube.com/watch?v=${current}`}
          style={{
            width: "100%",
            height: "100%",
            aspectRatio: 1.5,
          }}
          controls
          autoPlay
          {...{ onEnded }}
        />
      </div>
      <aside className="space-y-2 h-[calc(100dvh-3rem)] overflow-x-hidden pr-6">
        <div>
          <Button
            variant={randomMode ? "contained" : "outline"}
            onClick={() => setRandomMode((r) => !r)}
          >
            <ShuffleIcon size={24} />
          </Button>
        </div>
        {list.map(({ title, author, v }) => (
          <button
            key={v}
            className={`flex gap-5 items-center cursor-pointer hover:bg-white/10 w-full pr-5 rounded-md transition-all ${
              current === v ? "bg-white/10" : ""
            }`}
            onClick={() => selectVideo(v)}
          >
            <div className="min-w-28 w-28 aspect-video relative rounded-md overflow-hidden">
              <Image
                src={`https://i.ytimg.com/vi/${v}/hqdefault.jpg`}
                fill
                alt={`Thumbnail ${title}`}
                objectFit="cover"
              />
            </div>
            <div className="text-left space-y-0.5 flex-auto">
              <p className="font-semibold truncate w-56 ">
                {title} {title}
              </p>
              <p className="text-sm font-semibold opacity-60 truncate">
                {author}
              </p>
            </div>
            <div className="w-6">
              {current === v && <AudioSpinner color="white" height={24} />}
            </div>
          </button>
        ))}
      </aside>
    </main>
  );
}
