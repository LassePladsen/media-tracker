import { MediaType } from "@/types/media";
import { IconBaseProps } from "react-icons";
import { PiTelevisionSimpleBold } from "react-icons/pi";
import { SiMyanimelist } from "react-icons/si";
import { TbMovie } from "react-icons/tb";

export function IconAnime(props: IconBaseProps) {
  return <SiMyanimelist {...props} />;
}

export function IconMovie(props: IconBaseProps) {
  return <TbMovie {...props} />;
}

export function IconTv(props: IconBaseProps) {
  return <PiTelevisionSimpleBold {...props} />;
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
