"use client";
import { ArrowDown10, Funnel, Minimize2, Plus, Search } from "lucide-react";
import { notFound } from "next/navigation";
import { use, useMemo, useState } from "react";

import EntryCard from "@/components/entry-card";
import { EntryDialog } from "@/components/entry-dialog";
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
import { mediaTypeLabels, watchStatuses } from "@/data/media";
import { MediaEntry, MediaList, WatchStatus } from "@/types/media";
import { updateEntry, addEntry } from "@/lib/media-entry";

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
    "plan-to-watch",
  );
  const [selectedGenre, setSelectedGenre] = useState<string>("all"); // TODO:
  const [selectedYear, setSelectedYear] = useState<string>("all"); // TODO:
  const [isSmallCards, setIsSmallCards] = useState(false);
  const [showEntryDialog, setShowEntryDialog] = useState(false); // TODO:
  const [editingEntry, setEditingEntry] = useState<MediaEntry | null>(null); // TODO:

  const handleOpenAddDialog = () => {
    setEditingEntry(null);
    setShowEntryDialog(true);
  };

  const openEntryEdit = (entry: MediaEntry) => {
    setEditingEntry(entry);
    setShowEntryDialog(true);
  };

  const handleSaveEntry = (entryData: Omit<MediaEntry, "id">) => {
    if (editingEntry) {
      updateEntry(editingEntry.id, entryData);
    } else {
      addEntry(entryData);
    }
  };

  // Get unique genres and years for filters
  const genres = useMemo(() => {
    const uniqueGenres = Array.from(
      new Set(list.entries.map((e) => e.genre)),
    ).sort();
    return uniqueGenres;
  }, [list.entries]);

  const years = useMemo(() => {
    const uniqueYears = Array.from(
      new Set(list.entries.map((e) => e.year)),
    ).sort((a, b) => b - a);
    return uniqueYears;
  }, [list.entries]);

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

  const filterIconClasses = "w-4 h-4 text-muted-foreground";

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
          Add {mediaTypeLabels[list.type].singular.toLowerCase()}
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

      {/* Watch status filters scrollbar - always visible */}
      <ScrollArea type="auto" className="pb-4 -mb-2 whitespace-nowrap">
        <div className="flex gap-1">
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
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {/* TODO: Row for filter, sort, etc. */}
      <div className="flex gap-2 items-center flex-wrap">
        {/* TODO: Sort options. Either popup or toggle between sorts which changes the icon depending. */}
        <ArrowDown10 className={filterIconClasses} />

        {/* Filters */}
        <Funnel className={filterIconClasses} />
        <Select value={selectedGenre} onValueChange={setSelectedGenre}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Genre" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Genres</SelectItem>
            {genres.map((genre) => (
              <SelectItem key={genre} value={genre}>
                {genre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Years</SelectItem>
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* TODO: also show this is general filter from popup is on */}
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

        {/* Toggle small / minimal mode for entry cards */}
        <Minimize2
          className={filterIconClasses + " cursor-pointer"}
          onClick={() => setIsSmallCards(!isSmallCards)}
        />
      </div>

      {/* Entries grid */}
      <div className="flex-1 container self-center">
        {filteredEntries.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>No entries found</p>
          </div>
        ) : (
          <div
            className={
              "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 " +
              (isSmallCards ? "gap-2" : "gap-4")
            }
          >
            {filteredEntries.map((entry) => (
              <EntryCard
                showStatus={selectedStatus === "all"}
                smallMode={isSmallCards}
                key={entry.id}
                entry={entry}
                onClick={() => openEntryEdit(entry)}
              />
            ))}
          </div>
        )}
      </div>

      <EntryDialog
        openState={showEntryDialog}
        setOpenState={setShowEntryDialog}
        onSave={handleSaveEntry}
        entry={editingEntry}
        mediaType={list.type}
      />
    </div>
  );
}
