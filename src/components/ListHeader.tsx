"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, PropsWithChildren } from "react";
import { IoHomeOutline } from "react-icons/io5";

import { Button } from "./ui/button";
import { ButtonGroup } from "./ui/button-group";
import IconAnime from "./ui/icon-anime";
import IconMovie from "./ui/icon-movie";
import IconTv from "./ui/icon-tv";
import { dummyData } from "@/data/dummyData";

const HEADER_ICON_SIZE = "w-4 h-4";

function HeaderButton({
  href,
  onClick,
  children,
}: PropsWithChildren<{
  href: ComponentProps<typeof Link>["href"];
  onClick?: ComponentProps<typeof Button>["onClick"];
}>) {
  const isActive = usePathname() === href;
  return (
    <Link href={href}>
      <div className="flex flex-col gap-2">
        <Button onClick={onClick} variant={isActive ? "default" : "ghost"}>
          {children}
        </Button>
      </div>
    </Link>
  );
}

export default function ListHeader() {
  const data = dummyData;
  return (
    <ButtonGroup className="sticky top-0 flex-wrap">
      <HeaderButton href="/">
        <IoHomeOutline className={HEADER_ICON_SIZE} />
      </HeaderButton>
      <HeaderButton href="/movies">
        <IconMovie className={HEADER_ICON_SIZE} />
        {data.movies.label}
      </HeaderButton>

      <ButtonGroup>
        <HeaderButton href="/tv-shows">
          <IconTv className={HEADER_ICON_SIZE} />
          {data.tv.label}
        </HeaderButton>
        <HeaderButton href="/anime">
          <IconAnime className={HEADER_ICON_SIZE} />
          {data.anime.label}
        </HeaderButton>
      </ButtonGroup>
    </ButtonGroup>
  );
}
