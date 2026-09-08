import { Categories, SongType } from "../app/types";

const author = "Crazy Lixx";

const playlist: Omit<SongType, "author">[] = [
  {
    id: "hZBIEN7BQLo",
    title: "Eagle",
    categories: [Categories.Rock],
  },
  {
    id: "Y68LY8G-IkU",
    title: "The Power",
    categories: [Categories.Rock],
  },
  {
    id: "ptK1E4hTJas",
    title: "Hunter of the Heart",
    categories: [Categories.Rock, Categories.Heavy_Metal],
  },
];

export const crazy_lixx: SongType[] = playlist.map((p) => ({ ...p, author }));
