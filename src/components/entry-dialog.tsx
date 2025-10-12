import { useEffect, useState } from "react";

import { mediaTypeLabels, watchStatuses } from "@/data/media";
import { MediaEntry, MediaType, WatchStatus } from "../types/media";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import RatingStarRow from "./rating-star-row";

export interface EntryDialogProps {
  openState: boolean;
  setOpenState: (open: boolean) => void;
  onSave: (entryData: Omit<MediaEntry, "id">) => void;
  entry?: MediaEntry | null;
  mediaType: MediaType;
}

export function EntryDialog({
  openState,
  setOpenState,
  onSave,
  entry,
  mediaType,
}: EntryDialogProps) {
  const [title, setTitle] = useState<MediaEntry["title"] | undefined>(
    undefined,
  );
  const [genre, setGenre] = useState<MediaEntry["genre"] | undefined>(
    undefined,
  );
  const [year, setYear] = useState<MediaEntry["year"] | undefined>(undefined);
  const [episodesWatched, setEpisodesWatched] = useState<
    MediaEntry["episodesWatched"] | undefined
  >(undefined);
  const [status, setStatus] =
    useState<Exclude<WatchStatus, "all">>("plan-to-watch");
  const [rating, setRating] = useState<MediaEntry["rating"] | undefined>(
    undefined,
  );

  const isEditMode = !!entry;

  // Reset form when dialog opens/closes or entry changes
  useEffect(() => {
    if (openState) {
      if (entry) {
        setTitle(entry.title);
        setGenre(entry.genre);
        setYear(entry.year);
        setEpisodesWatched(entry.episodesWatched);
        setStatus(entry.status);
        setRating(entry.rating);
      } else {
        setTitle("");
        setGenre("");
        setYear(new Date().getFullYear());
        setEpisodesWatched(undefined);
        setStatus("plan-to-watch");
        setRating(undefined);
      }
    }
  }, [openState, entry]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !genre || !year) {
      return;
    }

    const entry: Omit<MediaEntry, "id"> = {
      title: title.trim(),
      genre: genre.trim(),
      year: year,
      status,
      rating: rating,
      episodesWatched: episodesWatched,
    };

    onSave(entry);
    setOpenState(false);
  };

  const mediaTypeLabel = mediaTypeLabels[mediaType];
  return (
    <Dialog open={openState} onOpenChange={setOpenState}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {(isEditMode ? "Edit " : "Add ") +
              mediaTypeLabel.singular.toLowerCase()}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Update the details for this entry."
              : "Fill in the details for the new entry."}
          </DialogDescription>
        </DialogHeader>

        {/* Title */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={`Enter ${mediaTypeLabel.singular.toLowerCase()} title`}
                required
              />
            </div>

            {/* ROW: genre and year */}
            {/* Genre */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="genre">Genre</Label>
                <Input
                  id="genre"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  placeholder="e.g. Action"
                  required
                />
              </div>

              {/* Year */}
              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  type="number"
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  placeholder="2024"
                  required
                />
              </div>
            </div>

            {/* ROW: watch status and episodes watched */}
            <div className="grid grid-cols-2 gap-4">
              {/* Watch status */}
              <div className="space-y-2">
                <Label htmlFor="status">Watch Status</Label>
                <Select
                  value={status}
                  onValueChange={(value) =>
                    setStatus(value as Exclude<WatchStatus, "all">)
                  }
                >
                  <SelectTrigger className="w-full" id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(watchStatuses)
                      .filter(([status]) => status !== "all")
                      .map(([status, label]) => (
                        <SelectItem key={status} value={status}>
                          {label}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Episodes watched */}
              <div className="space-y-2">
                <Label htmlFor="episodes-watched">Watched Episodes</Label>
                <Input
                  id="episodes-watched"
                  type="number"
                  min="0"
                  step="1"
                  value={episodesWatched}
                  onChange={(e) => setEpisodesWatched(Number(e.target.value))}
                  placeholder="e.g. 5"
                />
              </div>
            </div>

            <RatingStarRow
              rating={Number(rating)}
              setRating={(rating) => setRating(rating)}
            />
          </div>

          {/* Buttons */}
          <DialogFooter>
            {/* Rating stars */}
            <Button
              type="button"
              variant="ghost"
              onClick={() => setRating(undefined)}
            >
              Reset rating
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpenState(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              {isEditMode
                ? "Save Changes"
                : `Add ${mediaTypeLabel.singular.toLowerCase()}`}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
