export type MediaType = "movie" | "tv" | "anime";

export type WatchStatus =
  | "plan-to-watch"
  | "watching"
  | "completed"
  | "on-hold"
  | "dropped"
  | "rewatching";

/**
 * @table entry
 */
export interface Entry {
  id: number;
  listId?: number;
  title: string;
  status: WatchStatus;
  genre: string;
  year: number;
  rating?: number;
  episodesWatched?: number;
  dateStarted?: string;
  dateEnded?: string;
}

/**
 * @insertFor Entry
 * @table entry
 */
export interface EntryInsert {
  id: number;
  listId?: number;
  title: string;
  status: WatchStatus;
  genre: string;
  year: number;
  rating?: number;
  episodesWatched?: number;
  dateStarted?: string;
  dateEnded?: string;
}

/**
 * @table list
 */
export interface List {
  id: number;
  slug: string;
  type: MediaType;
  title: string;
}

/**
 * @insertFor List
 * @table list
 */
export interface ListInsert {
  id: number;
  slug: string;
  type: MediaType;
  title: string;
}
