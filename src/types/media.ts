export type MediaType = "movies" | "shows" | "anime";

export type WatchStatus =
  | "all"
  | "plan-to-watch"
  | "completed"
  | "on-hold"
  | "dropped";

export interface MediaEntry {
  id: string;
  title: string;
  status: Exclude<WatchStatus, "all">;
  genre: string;
  year: number;
  rating?: number;
  imageUrl?: string;
}

export interface MediaList {
  movies: MediaEntry[];
  shows: MediaEntry[];
  anime: MediaEntry[];
}
