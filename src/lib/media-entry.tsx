import { MediaEntry } from "@/types/media";

type MediaEntryWithoutIds = Omit<MediaEntry, "id" | "list_id">;

// TODO:
/* eslint-disable */
export function updateEntry(
  id: MediaEntry["id"],
  entryData: MediaEntryWithoutIds,
) {}

export function addEntry(entry: MediaEntryWithoutIds) {}
