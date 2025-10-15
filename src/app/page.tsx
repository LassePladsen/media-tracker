// import { useState } from "react";
import Link from "next/link";
import { ComponentProps, PropsWithChildren, use } from "react";
import { FaSearch } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MediaIcon } from "@/components/ui/media-icon";
import getLists from "@/db/list";

function ListButton({
  href,
  onClick,
  children,
}: PropsWithChildren<{
  href: ComponentProps<typeof Link>["href"];
  onClick?: ComponentProps<typeof Button>["onClick"];
}>) {
  return (
    <Link href={href} className="flex flex-col gap-2">
      <Button onClick={onClick} variant="outline" className="h-20">
        {children}
      </Button>
    </Link>
  );
}

export default function Home() {
  const lists = use(getLists());
  // const [searchQuery, setSearchQuery] = useState("");

  // const handleSearch = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // if (searchQuery.trim()) {
  //   // TODO:
  //   // }
  // };
  return (
    <>
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl">Media Tracker</h1>
            <p className="text-muted-foreground">
              Keep track of all your favorite movies, TV shows, and anime in one
              place
            </p>
          </div>

          <form
            // onSubmit={handleSearch}
            className="w-full"
          >
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search across all your lists..."
                // value={searchQuery}
                // onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(lists).map(([slug, list], index) => (
              <ListButton href={"/list/" + slug} key={index}>
                <MediaIcon type={list.type} />
                <span>{list.title}</span>
              </ListButton>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
