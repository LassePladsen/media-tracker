"use client";

import { useContext } from "react";

import { ListsContext } from "@/contexts/lists";
import { List } from "@/types/schema";

export function useListFromSlug(slug: List["slug"]) {
  const lists = useLists();
  return lists.find((list) => list.slug === slug);
}

export default function useLists() {
  return useContext(ListsContext);
}
