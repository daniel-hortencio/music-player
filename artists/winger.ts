import { Categories, SongType } from "../app/types";

const author = "Winger";

const playlist: Omit<SongType, "author">[] = [
  {
    id: "I84yUDdP7OI",
    title: "Loosen Up",
    categories: [Categories.Rock],
  },
  {
    id: "-Pb-ZcDdnkg",
    title: "Time to Surrender",
    categories: [Categories.Rock],
  },
  {
    id: "xLrxaY8gBYM",
    title: "Rainbow in the Rose",
    categories: [Categories.Rock],
  },
  {
    id: "Y3xfwvVTWRg",
    title: "Blind Revolution Mad",
    categories: [Categories.Rock, Categories.Heavy_Metal],
  },
];

export const winger: SongType[] = playlist.map((p) => ({ ...p, author }));
