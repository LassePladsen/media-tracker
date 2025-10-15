"use server";

import ListHeader from "@/components/list-header";
import ScrollToTop from "@/components/scroll-to-top";

export default async function ListLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ListHeader />
      {children}
      <ScrollToTop />
    </>
  );
}
