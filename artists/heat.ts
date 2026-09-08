import { Categories, SongType } from "../app/types";

const author = "Heat";

const playlist: Omit<SongType, "author">[] = [
  {
    id: "lfzKcTi5EHQ",
    title: "Running to You",
    categories: [Categories.Rock],
  },
  {
    id: "P0jBn8vZ-e4",
    title: "Bad Time For Love",
    categories: [Categories.Rock],
  },
  {
    id: "e4bj3LM3G5A",
    title: "Back To The Rhythm",
    categories: [Categories.Rock],
  },
  {
    id: "djYEHbPiUqs",
    title: "Not for Sale",
    categories: [Categories.Rock],
  },
  {
    id: "_f6D5qP9WAc",
    title: "A Shot At Redemption",
    categories: [Categories.Rock],
  },
  {
    id: "kFaPjl9jYNw",
    title: "One By One",
    categories: [Categories.Rock],
  },
  {
    id: "q3JJRmwjY2Q",
    title: "Breaking the Silence",
    categories: [Categories.Rock],
  },
  {
    id: "QHcUOunvyzo",
    title: "Downtown",
    categories: [Categories.Rock],
  },
  {
    id: "fvJGf9oCX50",
    title: "Late Night Lady",
    categories: [Categories.Rock],
  },
  {
    id: "K1UavkiSLHg",
    title: "Keep on Dreaming",
    categories: [Categories.Rock],
  },
  {
    id: "qymxVTsuPug",
    title: "Straight for Your Heart",
    categories: [Categories.Rock],
  },
  {
    id: "v7yKJQWfNc8",
    title: "Straight Up",
    categories: [Categories.Rock],
  },
  {
    id: "YY4RwUZmPmo",
    title: "Feel the Heat",
    categories: [Categories.Rock],
  },
  {
    id: "5QVLMk9KGrA",
    title: "You're Lying",
    categories: [Categories.Rock],
  },
];

export const heat: SongType[] = playlist.map((p) => ({ ...p, author }));
