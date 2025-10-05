export type MediaType = "movies" | "tv-shows" | "anime";

export type WatchStatus = // The state of not started or added as entry would just be undefined / null. LP 2025-10-05

    | "plan-to-watch"
    | "watching"
    | "completed"
    | "on-hold"
    | "dropped"
    | "rewatching";

export interface MediaEntry {
  id: string;
  title: string;
  status?: WatchStatus;
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
