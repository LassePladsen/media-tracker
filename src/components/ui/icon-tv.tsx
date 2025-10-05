import { ComponentProps } from "react";
import { PiTelevisionSimpleBold } from "react-icons/pi";

export default function TvIcon(
  props: ComponentProps<typeof PiTelevisionSimpleBold>,
) {
  return <PiTelevisionSimpleBold {...props} />;
}
