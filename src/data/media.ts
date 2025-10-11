import { WatchStatus, MediaType } from "@/types/media";

/** Record mapping watch status slugs to corresponding labels. LP 2025-05-10 */
export const watchStatuses: Record<WatchStatus | "all", string> = {
  all: "All",
  "plan-to-watch": "Plan to Watch",
  watching: "Watching",
  completed: "Completed",
  rewatching: "Rewatching",
  "on-hold": "On Hold",
  dropped: "Dropped",
} as const;

export const watchStatusColors: Record<
  "bg" | "fg",
  Record<keyof typeof watchStatuses, string>
> = {
  bg: {
    all: "",
    "plan-to-watch": "bg-blue-950 text-blue-400 border-blue-800", // TODO:
    watching: "", // TODO:
    completed: "bg-emerald-950 text-emerald-400 border-emerald-800",
    "on-hold": "bg-amber-950 text-amber-400 border-amber-800",
    dropped: "bg-rose-950 text-rose-400 border-rose-800",
    rewatching: "", // TODO:
  },
  fg: {
    // Comment styles are so tailwind loads them in when using dynamic classnames...
    all: "",
    "plan-to-watch": "text-blue-400", // hover:text-blue-400
    watching: "", // TODO:
    completed: "text-emerald-400", // hover:text-emerald-400
    "on-hold": "text-amber-400", // hover:text-amber-400
    dropped: "text-rose-400", // hover:text-rose-400
    rewatching: "", // TODO:
  },
};

export const mediaTypeLabels: Record<
  MediaType,
  Record<"singular" | "plural", string>
> = {
  movies: { singular: "Movie", plural: "Movies" },
  tv: { singular: "TV Show", plural: "TV Shows" },
  anime: { singular: "Anime", plural: "Anime" },
};
