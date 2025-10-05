import { MediaType } from "@/types/media";
import { Clapperboard, Tv } from "lucide-react";
import { IconBaseProps } from "react-icons";
import { SiMyanimelist } from "react-icons/si";

export function IconAnime(props: IconBaseProps) {
  return <SiMyanimelist {...props} />;
}

export function IconMovie(props: IconBaseProps) {
  return <Clapperboard {...props} />;
}

export function IconTv(props: IconBaseProps) {
  return <Tv {...props} />;
}
export function MediaIcon({
  type,
  ...rest
}: IconBaseProps & {
  type: MediaType;
}) {
  switch (type) {
    case "movies":
      return <IconMovie {...rest} />;

    case "tv":
      return <IconTv {...rest} />;

    case "anime":
      return <IconAnime {...rest} />;
  }
}
