"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ComponentProps, PropsWithChildren } from "react";

import { dummyData } from "@/data/dummy-data";
import { Home } from "lucide-react";
import { Button } from "./ui/button";
import { ButtonGroup, ButtonGroupSeparator } from "./ui/button-group";
import { MediaIcon } from "./ui/media-icon";

const HEADER_ICON_SIZE = "w-4 h-4";

function HeaderButton({
  href,
  children,
}: PropsWithChildren<{
  href: ComponentProps<typeof Link>["href"];
}>) {
  const isActive = useParams<{ slug: string }>()["slug"] === String(href);
  return (
    <Link href={href}>
      <div className="flex flex-col gap-2">
        <Button variant={isActive ? "default" : "ghost"}>{children}</Button>
      </div>
    </Link>
  );
}

export default function ListHeader() {
  const lists = dummyData;
  return (
    <ButtonGroup className="items-center">
      <HeaderButton href="/">
        <Home className={HEADER_ICON_SIZE} />
      </HeaderButton>
      <ButtonGroupSeparator />
      <ButtonGroup className="flex-wrap">
        {Object.entries(lists).map(([slug, list], index) => (
          <HeaderButton href={slug} key={index}>
            <MediaIcon type={list.type} className={HEADER_ICON_SIZE} />
            {list.title}
          </HeaderButton>
        ))}
      </ButtonGroup>
    </ButtonGroup>
  );
}
