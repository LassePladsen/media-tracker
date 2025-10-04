import ListHeader from "@/components/ListHeader";

export default function ListLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <ListHeader />
      {children}
    </div>
  );
}
