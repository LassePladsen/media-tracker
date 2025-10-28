"use client";

import { createContext, PropsWithChildren } from "react";

import { type List } from "@/types/schema";

export const ListsContext = createContext<List[]>([]);

export function ListsProvider({
  children,
  lists,
}: PropsWithChildren<{
  lists: List[];
}>) {
  return <ListsContext value={lists}>{children}</ListsContext>;
}
