"use client";

import ListHeader from "@/components/list-header";
import ScrollToTop from "@/components/scroll-to-top";
import { ListsContext } from "@/contexts/list";
import getLists from "@/db/list";

export default async function ListLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lists = await getLists();
  return (
    <ListsContext value={lists}>
      <ListHeader />
      {children}
      <ScrollToTop />
    </ListsContext>
  );
}
