import { Categories, SongType } from "../app/types";

const author = "Ritchie Kotzen";

const playlist: Omit<SongType, "author">[] = [
  {
    id: "Dh2eRcZFbl8",
    title: "Stick the Knife",
    categories: [Categories.Rock],
  },
  {
    id: "VnrFLyEqgfg",
    title: "The Damned",
    categories: [Categories.Rock],
  },
  {
    id: "nLm_wdXA3os",
    title: "Riot",
    categories: [Categories.Rock],
  },
  {
    id: "GaOy9jxmcy4",
    title: "She",
    categories: [Categories.Rock],
  },
  {
    id: "nQ3aTFYQJ0k",
    title: "Fall of a Leader",
    categories: [Categories.Rock],
  },
];

export const ritchie_kotzen: SongType[] = playlist.map((p) => ({
  ...p,
  author,
}));
