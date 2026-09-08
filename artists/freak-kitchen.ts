import { Categories, SongType } from "../app/types";

const author = "Freak Kitchen";

const playlist: Omit<SongType, "author">[] = [
  {
    id: "o6sxibxgldY",
    title: "My New Haircut",
    categories: [Categories.Rock],
  },
  {
    id: "wCBgjQYgJ4g",
    title: "Razor Flowers",
    categories: [Categories.Rock, Categories.Heavy_Metal],
  },
];

export const freak_kitchen: SongType[] = playlist.map((p) => ({
  ...p,
  author,
}));
