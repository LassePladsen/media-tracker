"use server";

import Entrycard from "@/components/entry-card";
import getEntries from "@/db/entry";

export default async function TestPage() {
  const entries = await getEntries();
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
      <div className="mt-5">
        {Object.values(entries).map((entry, index) => (
          <Entrycard key={index} entry={entry} />
        ))}
      </div>
    </div>
  );
}
