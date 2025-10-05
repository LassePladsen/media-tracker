"use client";
import { MediaType } from "@/types/media";
import { HEADER_ICON_SIZE } from "./list-header";
import IconAnime from "./ui/icon-anime";
import IconMovie from "./ui/icon-movie";
import IconTv from "./ui/icon-tv";

export function TypeIcon({ type }: { type: MediaType }) {
  switch (type) {
    case "movies":
      return <IconMovie className={HEADER_ICON_SIZE} />;

    case "tv":
      return <IconTv className={HEADER_ICON_SIZE} />;

    case "anime":
      return <IconAnime className={HEADER_ICON_SIZE} />;
  }
}
