import { AuthorEnum, CategoryEnum } from "../enums";
import { VideoType } from "../types";

const list: Omit<VideoType, "author" | "categories">[] = [
  {
    title: "No Man's Land",
    v: "5x_HrXN9as8",
  },
  {
    title: "Blind Revolution Mad",
    v: "Y3xfwvVTWRg",
  },
  {
    title: "Junkyard Dog (Tears on Stone)",
    v: "qBdlSs_79Tw",
  },
  {
    title: "Loosen Up",
    v: "I84yUDdP7OI",
  },
  {
    title: "Rainbow in the Rose",
    v: "xLrxaY8gBYM",
  },
  {
    title: "In the Day We'll Never See",
    v: "EyIhUmN5iS4",
  },

  {
    title: "Hangin On",
    v: "RBsVQft7lSs",
  },
  {
    title: "Madalaine",
    v: "146d4rkkVhs",
  },
  {
    title: "Time to Surrender",
    v: "-Pb-ZcDdnkg",
  },
  {
    title: "Seventeen",
    v: "zk2RLGfNVMc",
  },
  {
    title: "Easy Com Easy Go",
    v: "muYXSFc7wxQ",
  },
];

export const winger: VideoType[] = list.map((i) => ({
  ...i,
  author: AuthorEnum.Winger,
  categories: [CategoryEnum.Rock],
}));
