import { Entry } from "@/types/schema";

type MediaEntryWithoutIds = Omit<Entry, "id" | "list_id">;

// TODO:
/* eslint-disable */
export function updateEntry(id: Entry["id"], entryData: MediaEntryWithoutIds) {}

export function addEntry(entry: MediaEntryWithoutIds) {}
