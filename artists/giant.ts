import { Categories, SongType } from "../app/types";

const author = "Giant";

const playlist: Omit<SongType, "author">[] = [
  {
    id: "kHSYIOwLAiw",
    title: "Chained",
    categories: [Categories.Rock],
  },
  {
    id: "CG7oyEXWVhI",
    title: "Stay",
    categories: [Categories.Rock],
  },
  {
    id: "tTbU7lkwsmM",
    title: "Save Me Tonight",
    categories: [Categories.Rock],
  },
  {
    id: "4OBLWc7iB-w",
    title: "I'll Be There (When It's Over)",
    categories: [Categories.Rock],
  },
  {
    id: "uBYchf0ofqM",
    title: "Complicated Man",
    categories: [Categories.Rock],
  },
];

export const giant: SongType[] = playlist.map((p) => ({ ...p, author }));
