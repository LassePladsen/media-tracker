"use client";

import { Home } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ComponentProps, PropsWithChildren } from "react";

import { dummyData } from "@/data/dummy-data";
import { Button } from "./ui/button";
import { ButtonGroup, ButtonGroupSeparator } from "./ui/button-group";
import { MediaIcon } from "./ui/media-icon";

const HEADER_ICON_SIZE = "w-4 h-4";

function HeaderButton({
  href,
  className,
  children,
}: PropsWithChildren<{
  href: ComponentProps<typeof Link>["href"];
  className?: string;
}>) {
  const isActive = useParams<{ slug: string }>()["slug"] === String(href);
  return (
    <Link href={href} className={className}>
      <div className="flex flex-col gap-2">
        <Button variant={isActive ? "default" : "ghost"}>{children}</Button>
      </div>
    </Link>
  );
}

export default function ListHeader() {
  const lists = dummyData;
  return (
    <ButtonGroup className="items-center w-full">
      <HeaderButton href="/">
        <Home className={HEADER_ICON_SIZE} />
      </HeaderButton>
      <ButtonGroupSeparator />
      <ButtonGroup className="flex gap-5 pb-2 -mb-2 w-full">
        {Object.entries(lists).map(([slug, list], index) => (
          <HeaderButton href={slug} key={index}>
            <MediaIcon type={list.type} className={HEADER_ICON_SIZE} />
            <span className="hidden header-sm:block overflow-hidden">
              {list.title}
            </span>
          </HeaderButton>
        ))}
      </ButtonGroup>
    </ButtonGroup>
  );
}
