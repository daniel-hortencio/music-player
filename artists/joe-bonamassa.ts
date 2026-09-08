import { Categories, SongType } from "../app/types";

const author = "Joe Bonamassa";

const playlist: Omit<SongType, "author">[] = [
  {
    id: "3qJ8bT3W1D0",
    title: "Mountain Climbing",
    categories: [Categories.Rock],
  },
  {
    id: "wDe-dI3c5d0",
    title: "Redemption",
    categories: [Categories.Rock, Categories.Blues],
  },
];

export const joe_bonamassa: SongType[] = playlist.map((p) => ({
  ...p,
  author,
}));
