export type MediaType = "movies" | "tv-shows" | "anime";

export type WatchStatus =
  | "all"
  | "plan-to-watch"
  | "watching"
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

export interface MediaData {
  type: MediaType;
  label: string;
  data: MediaEntry[];
}

export interface MediaList {
  movies: MediaData;
  tv: MediaData;
  anime: MediaData;
}
