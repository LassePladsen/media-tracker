"use client";

import { ArrowDown10, Funnel, Minimize2, Plus, Search } from "lucide-react";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import { use, useContext, useEffect, useMemo, useState } from "react";

import EntriesSpinner from "@/components/entries-spinner";
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
import { ListsContext } from "@/contexts/lists";
import { mediaTypeLabels, watchStatuses } from "@/data/media";
import getEntries from "@/db/entry";
import { addEntry, updateEntry } from "@/lib/media-entry";
import { Entry, WatchStatus } from "@/types/schema";

type EntryWithoutIds = Omit<Entry, "id" | "list_id">;

const defaultStatus: WatchStatus | "all" = "plan-to-watch";
const defaultGenre: string = "all";
const defaultYear: string = "all";
const defaultSmallMode: boolean = false;

const getSafeSearchParam = (
  param: string,
  defaultValue: string = "",
  verifyArray?: Array<string>,
): string => {
  const searchParams = useSearchParams();
  const value = searchParams.get(param) ?? defaultValue;

  if (verifyArray) return verifyArray.includes(value) ? value : defaultValue;
  return value;
};

export default function ListPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const lists = useContext(ListsContext);
  const list = lists.find((list) => list.slug === slug);
  if (!list) notFound();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEntries = async () => {
      setIsLoading(true);
      const data = await getEntries({ listId: list.id });
      setEntries(data);
      setIsLoading(false);
    };

    fetchEntries();
  }, [list]);

  // Get unique genres and years for filters
  const genres = useMemo(() => {
    const uniqueGenres = Array.from(
      new Set(entries.map((e) => e.genre)),
    ).sort();
    return uniqueGenres;
  }, [entries]);

  const years = useMemo(() => {
    const uniqueYears = Array.from(new Set(entries.map((e) => e.year)))
      .sort((a, b) => b - a)
      .map((year) => year.toString());
    return uniqueYears;
  }, [entries]);

  // Filtering states from url params
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") ?? "");
  const [selectedStatus, setSelectedStatus] = useState<WatchStatus | "all">(
    getSafeSearchParam("status", defaultStatus, Object.keys(watchStatuses)) as
      | WatchStatus
      | "all",
  );
  const [selectedGenre, setSelectedGenre] = useState<string>(
    getSafeSearchParam("genre", defaultGenre, genres),
  );
  const [selectedYear, setSelectedYear] = useState<string>(
    getSafeSearchParam("year", defaultYear, years),
  );
  const [isSmallCards, setIsSmallCards] = useState(
    !!Number(getSafeSearchParam("small", Number(defaultSmallMode).toString())),
  );

  // Create entries from current filter
  const filteredEntries = useMemo(() => {
    return entries.filter((entry) => {
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
  }, [entries, searchQuery, selectedStatus, selectedGenre, selectedYear]);

  const router = useRouter();

  // Sync local state to URL. Use router.replace so we don't push history on every change.
  useEffect(() => {
    const next = new URLSearchParams(searchParams?.toString() ?? "");

    if (searchQuery) next.set("q", searchQuery);
    else next.delete("q");

    if (selectedStatus && selectedStatus !== defaultStatus)
      next.set("status", selectedStatus);
    else next.delete("status");

    if (selectedGenre && selectedGenre !== defaultGenre)
      next.set("genre", selectedGenre);
    else next.delete("genre");

    if (selectedYear && selectedYear !== defaultYear)
      next.set("year", selectedYear);
    else next.delete("year");

    if (isSmallCards) next.set("small", "1");
    else next.delete("small");

    const current = searchParams?.toString() ?? "";
    const nextStr = next.toString();

    if (current !== nextStr) {
      router.replace(`?${nextStr}`);
    }
  }, [searchQuery, selectedStatus, selectedGenre, selectedYear, isSmallCards]);

  // States and functions for entry edit/add
  const [showEntryDialog, setShowEntryDialog] = useState(false); // TODO:
  const [editingEntry, setEditingEntry] = useState<Entry | null>(null); // TODO:
  const handleOpenAddDialog = () => {
    setEditingEntry(null);
    setShowEntryDialog(true);
  };
  const openEntryEdit = (entry: Entry) => {
    setEditingEntry(entry);
    setShowEntryDialog(true);
  };
  const handleSaveEntry = (entryData: EntryWithoutIds) => {
    if (editingEntry) {
      updateEntry(editingEntry.id, entryData);
    } else {
      addEntry(entryData);
    }
  };

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
              <SelectItem key={year} value={year}>
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
      {isLoading ? (
        <EntriesSpinner />
      ) : (
        <div className="flex-1 container">
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
      )}

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
