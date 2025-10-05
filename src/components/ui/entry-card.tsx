import { ComponentProps } from "react";

import { Card } from "./card";

// TODO:
export default function EntryCard(props: ComponentProps<typeof Card>) {

  return <Card {...props}/>

}
