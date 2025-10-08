import { MediaEntry } from "@/types/media";

type MediaEntryWithoutId = Omit<MediaEntry, "id">;

// TODO:
export function updateEntry(
  id: MediaEntry["id"],
  entryData: MediaEntryWithoutId,
) {}

export function addEntry(entry: MediaEntryWithoutId) {}
