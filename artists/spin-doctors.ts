import { Categories, SongType } from "../app/types";

const author = "Spin Doctors";

const playlist: Omit<SongType, "author">[] = [
  {
    id: "wsdy_rct6uo",
    title: "Two Princes",
    categories: [Categories.Rock],
  },
];

export const spin_doctors: SongType[] = playlist.map((p) => ({ ...p, author }));
