import { AuthorEnum, CategoryEnum } from "../enums";
import { VideoType } from "../types";

const list: Omit<VideoType, "author" | "categories">[] = [
  {
    title: "Late Night Lady",
    v: "fvJGf9oCX50",
  },
  {
    title: "Breaking the Silence",
    v: "q3JJRmwjY2Q",
  },
  {
    title: "Back To The Rhythm",
    v: "eRcMNfcp39c",
  },
  {
    title: "Running to You",
    v: "e6LWnmrDTSY",
  },
  {
    title: "Bad Time For Love",
    v: "6Jvs-DcRiVo",
  },
  {
    title: "Feel the Heat",
    v: "YY4RwUZmPmo",
  },
  {
    title: "A Shot At Redemption",
    v: "vuvAnOcoy4g",
  },
  {
    title: "Straight Up",
    v: "v7yKJQWfNc8",
  },
  {
    title: "Keep on Dreaming",
    v: "K1UavkiSLHg",
  },
  {
    title: "Straight for Your Heart",
    v: "qymxVTsuPug",
  },
  {
    title: "Hold Your Fire",
    v: "XrveXAG5ehY",
  },
  {
    title: "One By One",
    v: "g9lgxPqatD0",
  },
  {
    title: "Not for Sale",
    v: "djYEHbPiUqs",
  },
  {
    title: "Harder to Breathe",
    v: "HB3E3lOK4FM",
  },
  {
    title: "Tainted Blood",
    v: "rszVhk_0JKo",
  },
];

export const heat: VideoType[] = list.map((i) => ({
  ...i,
  author: AuthorEnum.HEAT,
  categories: [CategoryEnum.Rock],
}));
