import { CategoryEnum } from "./enums";

export type VideoType = {
  title: string;
  author: string;
  v: string;
  categories?: CategoryEnum[];
};
