import { Categories, SongType } from "../app/types";

const author = "Whitesnake";

const playlist: Omit<SongType, "author">[] = [
  {
    id: "62IlD5_pNw8",
    title: "Sweet Lady Luck",
    categories: [Categories.Rock],
  },
  {
    id: "9fnoUjJpGEM",
    title: "Judgment Day",
    categories: [Categories.Rock],
  },
  {
    id: "29FdgKft8kg",
    title: "Slow Poke Music",
    categories: [Categories.Rock],
  },
  {
    id: "Q-rV0jlNLTk",
    title: "Fool for Your Loving",
    categories: [Categories.Rock],
  },
  {
    id: "cbJZ8XqyLDA",
    title: "Sailing Ships",
    categories: [Categories.Rock],
  },
];

export const whitesnake: SongType[] = playlist.map((p) => ({ ...p, author }));
