export enum Categories {
  Rock = "Rock",
  Heavy_Metal = "Heavy Metal",
  Blues = "Blues",
}

export type SongType = {
  id: string;
  title: string;
  author: string;
  categories?: Categories[];
};
