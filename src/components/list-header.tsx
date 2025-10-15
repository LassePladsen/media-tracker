"use client";

import { Home } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ComponentProps, PropsWithChildren, useContext } from "react";

import { ListsContext } from "@/contexts/list";
import { Button } from "./ui/button";
import { ButtonGroup, ButtonGroupSeparator } from "./ui/button-group";
import { MediaIcon } from "./ui/media-icon";

export const HEADER_ICON_SIZE = "w-4 h-4";

function HeaderButton({
  href,
  children,
}: PropsWithChildren<{
  href: ComponentProps<typeof Link>["href"];
}>) {
  const isActive = useParams<{ slug: string }>()["slug"] === String(href);
  return (
    <Link href={href} className="h-full">
      <div className="flex flex-col gap-2">
        <Button
          variant={isActive ? "default" : "ghost"}
          className="flex flex-col header-md:flex-row h-full"
        >
          {children}
        </Button>
      </div>
    </Link>
  );
}

export default function ListHeader() {
  const lists = useContext(ListsContext);
  return (
    <ButtonGroup className="items-center w-full">
      <HeaderButton href="/">
        <Home className={HEADER_ICON_SIZE} />
      </HeaderButton>
      <ButtonGroupSeparator />
      <ButtonGroup className="flex gap-3 pb-2 -mb-2 w-full">
        {lists.map((list, index) => (
          <HeaderButton href={list.slug} key={index}>
            <MediaIcon type={list.type} className={HEADER_ICON_SIZE} />
            <span className="hidden header-sm:block">{list.title}</span>
          </HeaderButton>
        ))}
      </ButtonGroup>
    </ButtonGroup>
  );
}
