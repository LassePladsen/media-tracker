import { WatchStatus, MediaType } from "@/types/media";

/** Record mapping watch status slugs to corresponding labels. LP 2025-05-10 */
export const watchStatuses: Record<WatchStatus | "all", string> = {
  all: "All",
  "plan-to-watch": "Plan to Watch",
  watching: "Watching",
  completed: "Completed",
  "on-hold": "On Hold",
  dropped: "Dropped",
  rewatching: "Rewatching",
} as const;

export const watchStatusColors: Record<keyof typeof watchStatuses, string> = {
  all: "",
  "plan-to-watch": "", // TODO:
  watching: "", // TODO:
  completed: "bg-emerald-950 text-emerald-400 border-emerald-800",
  "on-hold": "bg-amber-950 text-amber-400 border-amber-800",
  dropped: "bg-rose-950 text-rose-400 border-rose-800",
  rewatching: "", // TODO:
};

export const mediaTypeLabels: Record<
  MediaType,
  Record<"singular" | "plural", string>
> = {
  movies: { singular: "Movie", plural: "Movies" },
  tv: { singular: "TV Show", plural: "TV Shows" },
  anime: { singular: "Anime", plural: "Anime" },
};
