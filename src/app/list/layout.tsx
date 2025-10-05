import ListHeader from "@/components/ListHeader";

export default function ListLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col font-sans">
      <ListHeader />
      {children}
    </div>
  );
}
