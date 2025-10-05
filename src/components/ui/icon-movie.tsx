import { ComponentProps } from "react";
import { TbMovie } from "react-icons/tb";

export default function IconMovie(props: ComponentProps<typeof TbMovie>) {
  return <TbMovie {...props} />;
}
