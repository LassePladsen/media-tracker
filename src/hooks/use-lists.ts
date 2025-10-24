"use client";

import { useContext } from "react";

import { ListsContext } from "@/contexts/lists";

export default function useLists() {
  return useContext(ListsContext);
}
