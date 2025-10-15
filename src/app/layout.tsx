import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import Footer from "@/components/footer";
import { ListsContext } from "@/contexts/list";
import getLists from "@/db/list";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Media tracker",
  description:
    "Keep track of all your favorite movies, shows, and anime in one place",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lists = await getLists();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
      >
        <div className="min-h-screen flex flex-col font-sans">
          <ListsContext.Provider value={lists}>
            {children}
            <Footer />
          </ListsContext.Provider>
        </div>
      </body>
    </html>
  );
}
