import ListHeader from "@/components/list-header";
import ScrollToTop from "@/components/scroll-to-top";

export default function ListLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col mx-5 md:mx-25 my-8">
      <ListHeader />
      {children}
      <ScrollToTop />
    </div>
  );
}
