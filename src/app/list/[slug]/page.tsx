"use client";
import { Plus } from "lucide-react";
import { use, useMemo, useState } from "react";
import { notFound } from "next/navigation";

import { dummyData } from "@/data/dummyData";
import { MediaEntry, MediaList, WatchStatus } from "@/types/media";
import { Button } from "@/components/ui/button";

export default function ListPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const list: MediaList | undefined = dummyData[slug];
  if (!list) notFound();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<WatchStatus | "all">(
    "all",
  );
  const [selectedGenre, setSelectedGenre] = useState<string>("all"); // TODO:
  const [selectedYear, setSelectedYear] = useState<string>("all"); // TODO:
  const [dialogOpen, setDialogOpen] = useState(false); // TODO:
  const [editingEntry, setEditingEntry] = useState<MediaEntry | null>(null); // TODO:

  // TODO: handlers. these are from ai example as of now. LP 2025-10-05
  // const onUpdateEntry()
  // const onAddEntry()

  const handleOpenAddDialog = () => {
    //   setEditingEntry(null);
    //   setDialogOpen(true);
  };

  // const handleOpenEditDialog = (entry: MediaEntry) => {
  //   setEditingEntry(entry);
  //   setDialogOpen(true);
  // };

  // const handleSaveEntry = (entryData: Omit<MediaEntry, "id">) => {
  //   if (editingEntry) {
  //     // onUpdateEntry(editingEntry.id, entryData);
  //   } else {
  //     // onAddEntry(entryData);
  //   }
  // };

  // // Get unique genres and years for filters
  // const genres = useMemo(() => {
  //   const uniqueGenres = Array.from(
  //     new Set(list.entries.map((e) => e.genre)),
  //   ).sort();
  //   return uniqueGenres;
  // }, [list.entries]);

  // const years = useMemo(() => {
  //   const uniqueYears = Array.from(new Set(entries.map((e) => e.year))).sort(
  //     (a, b) => b - a,
  //   );
  //   return uniqueYears;
  // }, [list.entries]);

  // Filter entries
  const filteredEntries = useMemo(() => {
    return list.entries.filter((entry) => {
      const matchesSearch = entry.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesStatus =
        selectedStatus === "all" || entry.status === selectedStatus;
      const matchesGenre =
        selectedGenre === "all" || entry.genre === selectedGenre;
      const matchesYear =
        selectedYear === "all" || entry.year.toString() === selectedYear;

      return matchesSearch && matchesStatus && matchesGenre && matchesYear;
    });
  }, [list.entries, searchQuery, selectedStatus, selectedGenre, selectedYear]);

  return (
    <div className="mt-5">
      {/* Title, count, and add button */}
      <div className="flex items-center justify-between">
        <div>
          <h1>{list.title}</h1>
          <p className="text-muted-foreground text-sm">
            {filteredEntries.length + " "}
            {filteredEntries.length === 1 ? "entry" : "entries"}
          </p>
        </div>
        <Button onClick={handleOpenAddDialog} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Entry
        </Button>
      </div>
    </div>
  );
}
