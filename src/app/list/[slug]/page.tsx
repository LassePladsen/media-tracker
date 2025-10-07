"use client";
import { Plus, Search, SlidersHorizontal } from "lucide-react";
import { notFound } from "next/navigation";
import { use, useMemo, useState } from "react";

import EntryCard from "@/components/entry-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { dummyData } from "@/data/dummy-data";
import { watchStatuses } from "@/data/watch-status";
import { MediaEntry, MediaList, WatchStatus } from "@/types/media";

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

  const handleOpenEditDialog = (entry: MediaEntry) => {
    // setEditingEntry(entry);
    // setDialogOpen(true);
  };

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
    <div className="mt-5 flex flex-col gap-4">
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

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder={`Search ${list.title.toLowerCase()}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Status filters - always visible */}
      <ScrollArea type="auto" className="pb-4 -mb-2 whitespace-nowrap">
        {Object.entries(watchStatuses).map(([status, label]) => (
          <Button
            key={status}
            variant={selectedStatus === status ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedStatus(status as WatchStatus | "all")}
            className="whitespace-nowrap"
          >
            {label}
          </Button>
        ))}
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {/* Additional filters */}
      <div className="flex gap-2 items-center flex-wrap">
        <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
        <Select value={selectedGenre} onValueChange={setSelectedGenre}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Genre" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Genres</SelectItem>
            {/* TODO: */}
            {/*genres.map(genre => (
                  <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                ))*/}
          </SelectContent>
        </Select>

        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Years</SelectItem>
            {/* TODO: */}
            {/*years.map(year => (
                  <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                ))*/}
          </SelectContent>
        </Select>

        {(selectedGenre !== "all" || selectedYear !== "all") && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSelectedGenre("all");
              setSelectedYear("all");
            }}
          >
            Clear Filters
          </Button>
        )}
      </div>

      {/* Entries grid */}
      <div className="flex-1 container mx-auto px-4">
        {filteredEntries.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>No entries found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredEntries.map((entry) => (
              <EntryCard
                key={entry.id}
                entry={entry}
                onClick={() => handleOpenEditDialog(entry)}
              />
            ))}
          </div>
        )}
      </div>

      {/* TODO: <MediaEntryDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleSaveEntry}
        entry={editingEntry}
        mediaType={type}
      />
      */}
    </div>
  );
}
