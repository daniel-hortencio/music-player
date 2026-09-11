import { Categories, SongType } from "../app/types";

const author = "Toto";

const playlist: Omit<SongType, "author">[] = [
  {
    id: "JQvXYWKWRVk",
    title: "King Of The World",
    categories: [Categories.Rock],
  },
  {
    id: "93woSEzFirg",
    title: "Can't Stand It Any Longer",
    categories: [Categories.Rock],
  },
  {
    id: "wvujXqPnNUk",
    title: "Taint Your World",
    categories: [Categories.Rock],
  },
  {
    id: "uMA9qjq2ZWA",
    title: "Going Home",
    categories: [Categories.Rock],
  },
  {
    id: "YXbMjlabWk0",
    title: "No End In Sight",
    categories: [Categories.Rock],
  },
  {
    id: "9TV_hBpNS7E",
    title: "Manuela Run",
    categories: [Categories.Rock],
  },
  {
    id: "cAzBCmvNy4M",
    title: "Endless",
    categories: [Categories.Rock],
  },
  {
    id: "AOS-IdhQ918",
    title: "I'll Supply The Love",
    categories: [Categories.Rock],
  },
  {
    id: "sPecS5Y8PfY",
    title: "Hydra",
    categories: [Categories.Rock],
  },
  {
    id: "_LjOQw_LTeo",
    title: "Turn Back",
    categories: [Categories.Rock],
  },
  {
    id: "o36U2oQsLu4",
    title: "Carmen",
    categories: [Categories.Rock],
  },
  {
    id: "pDf8jLez-nQ",
    title: "Lion",
    categories: [Categories.Rock],
  },
  {
    id: "MMfn8GMeFTc",
    title: "Till The End",
    categories: [Categories.Rock],
  },
  {
    id: "YVvjKUMNacQ",
    title: "Caught In The Balance",
    categories: [Categories.Rock],
  },
  {
    id: "XSdErSWzl4A",
    title: "Kingdom Of Desire",
    categories: [Categories.Rock],
  },
];

export const toto: SongType[] = playlist.map((p) => ({ ...p, author }));
