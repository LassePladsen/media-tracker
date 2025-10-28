import { Entry } from "@/types/schema";

type EntryWithoutIds = Omit<Entry, "id" | "list_id">;

// TODO:
/* eslint-disable */
export function updateEntry(id: Entry["id"], entryData: EntryWithoutIds) {}

export function addEntry(entry: EntryWithoutIds) {}
