import { Categories, SongType } from "../app/types";

const author = "Van Halen";

const playlist: Omit<SongType, "author">[] = [
  {
    id: "YRFKU6QvBJY",
    title: "Panama",
    categories: [Categories.Rock, Categories.Heavy_Metal],
  },
  {
    id: "bX9RMdcFQAw",
    title: "Jump",
    categories: [Categories.Rock],
  },
  {
    id: "TpLzW7fm1c0",
    title: "Hot for Teacher",
    categories: [Categories.Rock, Categories.Heavy_Metal],
  },
  {
    id: "cLdqOQTTTRY",
    title: "Dreams",
    categories: [Categories.Rock],
  },
  {
    id: "OIzEvGJaxaM",
    title: "When It's Love",
    categories: [Categories.Rock],
  },
  {
    id: "t7CMKuQCVus",
    title: "Right Now",
    categories: [Categories.Rock],
  },
  {
    id: "NSjnWI8HdhM",
    title: "Summer Nights",
    categories: [Categories.Rock],
  },
  {
    id: "5baoW4lshUQ",
    title: "Cabo Wabo",
    categories: [Categories.Rock],
  },
];

export const van_halen: SongType[] = playlist.map((p) => ({ ...p, author }));
