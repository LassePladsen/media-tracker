"use client";

import { createContext, PropsWithChildren } from "react";

import { type MediaList } from "@/types/media";

export const ListsContext = createContext<MediaList[]>([]);

export function ListsProvider({
  children,
  lists,
}: PropsWithChildren<{
  lists: MediaList[];
}>) {
  return <ListsContext value={lists}>{children}</ListsContext>;
}
