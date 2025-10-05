"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, PropsWithChildren } from "react";
import { IoHomeOutline } from "react-icons/io5";

import { dummyData } from "@/data/dummyData";
import { Button } from "./ui/button";
import { ButtonGroup } from "./ui/button-group";
import { MediaIcon } from "./ui/media-icon";

const HEADER_ICON_SIZE = "w-4 h-4";

function HeaderButton({
  href,
  children,
}: PropsWithChildren<{
  href: ComponentProps<typeof Link>["href"];
}>) {
  const isActive = usePathname() === href;
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
    <ButtonGroup className="sticky top-3 flex-wrap">
      <HeaderButton href="/">
        <IoHomeOutline className={HEADER_ICON_SIZE} />
      </HeaderButton>
      <ButtonGroup>
        {Object.entries(lists).map(([slug, list], index) => (
          <HeaderButton href={slug} key={index}>
            <MediaIcon type={list.type} className={HEADER_ICON_SIZE} />
            {list.label}
          </HeaderButton>
        ))}
      </ButtonGroup>
    </ButtonGroup>
  );
}
