import { ComponentProps } from "react";
import { TbMovie } from "react-icons/tb";

export default function MovieIcon(props: ComponentProps<typeof TbMovie>) {
  return <TbMovie {...props} />;
}
