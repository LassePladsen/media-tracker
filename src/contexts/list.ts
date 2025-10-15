"use client";

import { createContext } from "react";

import type { MediaList } from "@/types/media";

export const ListsContext = createContext<MediaList[]>([]);
