import { giant } from "./authors/giant";
import { heat } from "./authors/heat";
import { winger } from "./authors/winger";
import { VideoType } from "./types";

export const playlist: VideoType[] = [...giant, ...heat, ...winger];
