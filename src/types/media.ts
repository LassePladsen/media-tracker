export type MediaType = "movies" | "tv" | "anime";

// The state of not started or added as entry would just be undefined / null. LP 2025-10-05
export type WatchStatus =
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

export interface MediaList {
  id: number;
  slug: string;
  type: MediaType;
  label: string;
  entries: MediaEntry[];
}

export type MediaData = Record<string, MediaList>;
