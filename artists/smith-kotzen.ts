import { Categories, SongType } from "../app/types";

const author = "Smith/Kotzen";

const playlist: Omit<SongType, "author">[] = [
  {
    id: "Jl80JhZhTNA",
    title: "Got A Hold On Me",
    categories: [Categories.Rock],
  },
  {
    id: "OOyeowWVwN8",
    title: "Taking My Chances",
    categories: [Categories.Rock],
  },
  {
    id: "wIshEEF_qNM",
    title: "Running",
    categories: [Categories.Rock],
  },
  {
    id: "qW47tTuGNwY",
    title: "Some People",
    categories: [Categories.Rock],
  },
  {
    id: "EW0pQeSdNgc",
    title: "You Don't Know Me",
    categories: [Categories.Rock],
  },
];

export const smith_kotzen: SongType[] = playlist.map((p) => ({ ...p, author }));
