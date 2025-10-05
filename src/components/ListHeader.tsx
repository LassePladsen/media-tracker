"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoHomeOutline } from "react-icons/io5";
import { ComponentProps, PropsWithChildren } from "react";

import { ButtonGroup } from "./ui/button-group";
import { Button } from "./ui/button";
import IconMovie from "./ui/icon-movie";
import IconAnime from "./ui/icon-anime";
import IconTv from "./ui/icon-tv";

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
  const iconSize = "w-4 h-4";
  return (
    <ButtonGroup>
      <HeaderButton href="/">
        <IoHomeOutline className={iconSize} />
      </HeaderButton>
      <HeaderButton href="/movies">
        <IconMovie className={iconSize} />
        Movies
      </HeaderButton>
      <HeaderButton href="/tv-shows">
        <IconTv className={iconSize} />
        TV shows
      </HeaderButton>
      <HeaderButton href="/anime">
        <IconAnime className={iconSize} />
        Anime
      </HeaderButton>
    </ButtonGroup>
  );
}
