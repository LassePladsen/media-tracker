"use server";
import { notFound } from "next/navigation";

import { dummyData } from "@/data/dummyData";
import { MediaList } from "@/types/media";

export default async function List(params: Promise<{ slug: string }>) {
  const { slug } = await params;
  const list: MediaList | undefined = dummyData[slug];
  console.log("LP", slug, list);
  if (!list) notFound();
  return (
    <div className="my-4">
      <p>LP {list.label}</p>
    </div>
  );
}
