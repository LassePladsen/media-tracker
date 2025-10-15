export type MediaType = "movie" | "tv" | "anime";

// The state of not started or added as entry would just be undefined / null. LP 2025-10-05
export type WatchStatus =
  | "plan-to-watch"
  | "watching"
  | "completed"
  | "on-hold"
  | "dropped"
  | "rewatching";

export interface MediaEntry {
  id: number;
  list_id: number;
  title: string;
  status: WatchStatus;
  genre: string;
  year: number;
  rating?: number;
  episodesWatched?: number;
  dateStarted?: Date;
  dateEnded?: Date;
}

export interface MediaList {
  id: number;
  slug: string;
  type: MediaType;
  title: string;
}

export type MediaData = Record<string, MediaList>;
