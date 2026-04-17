import { AuthorEnum, CategoryEnum } from "../enums";
import { VideoType } from "../types";

const list: Omit<VideoType, "author" | "categories">[] = [
  {
    title: "Thunder and Lightning",
    v: "4kktbPniiS0",
  },
  {
    title: "Chained",
    v: "h9ZlqfK5ZDw",
  },
  {
    title: "Lay It On The Line",
    v: "dYphH8PWw-A",
  },
  {
    title: "Stay",
    v: "Vr7MZDSHA-U",
  },
  {
    title: "Time To Burn",
    v: "cJqsKql89no",
  },
  {
    title: "I'll Be There (When It's Over)",
    v: "3lR-TRpGdjE",
  },
  {
    title: "Save Me Tonight",
    v: "JnFoqlfPrwk",
  },
  {
    title: "Get Used To It",
    v: "-W-pmfajPw8",
  },
];

export const giant: VideoType[] = list.map((i) => ({
  ...i,
  author: AuthorEnum.Giant,
  categories: [CategoryEnum.Rock],
}));
