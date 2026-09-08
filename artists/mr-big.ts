import { Categories, SongType } from "../app/types";

const author = "Mr Big";

const playlist: Omit<SongType, "author">[] = [
  {
    id: "TRWJqhTiTlA",
    title: "Electrified",
    categories: [Categories.Rock],
  },
  {
    id: "nyZwryT1ooQ",
    title: "How Can You Do What You Do",
    categories: [Categories.Rock],
  },
  {
    id: "f3TeUXgH30M",
    title: "Take A Walk",
    categories: [Categories.Rock],
  },
  {
    id: "woJvlus14BY",
    title: "Daddy, Brother, Lover, Little Boy",
    categories: [Categories.Rock],
  },
  {
    id: "mNPtMYNBAbM",
    title: "Road To Ruin",
    categories: [Categories.Rock],
  },
  {
    id: "a62ePhsTwSk",
    title: "The Whole World's Gonna Know",
    categories: [Categories.Rock],
  },
  {
    id: "kwz7lfp36Mg",
    title: "Had Enough",
    categories: [Categories.Rock],
  },
  {
    id: "LEOv2-cEaRc",
    title: "Rock & Roll Over",
    categories: [Categories.Rock],
  },
  {
    id: "NuaWcxRWpL4",
    title: "Big Love",
    categories: [Categories.Rock],
  },
  {
    id: "efDP_yF4-7U",
    title: "Static",
    categories: [Categories.Rock],
  },
  {
    id: "M8Av_0ZuZh4",
    title: "Open Your Eyes",
    categories: [Categories.Rock],
  },
  {
    id: "jWJ2z5qED6U",
    title: "Mean to Me",
    categories: [Categories.Rock],
  },
];

export const mr_big: SongType[] = playlist.map((p) => ({ ...p, author }));
