import { useEffect, useState } from "react";

import { mediaTypeLabels } from "@/data/media";
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

const statusOptions: { value: Exclude<WatchStatus, "all">; label: string }[] = [
  { value: "plan-to-watch", label: "Plan to Watch" },
  { value: "completed", label: "Completed" },
  { value: "on-hold", label: "On Hold" },
  { value: "dropped", label: "Dropped" },
];

export interface EntryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (entryData: Omit<MediaEntry, "id">) => void;
  entry?: MediaEntry | null;
  mediaType: MediaType;
}

export function EntryDialog({
  open,
  onOpenChange,
  onSave,
  entry,
  mediaType,
}: EntryDialogProps) {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [episodesWatched, setEpisodesWatched] = useState("");
  const [status, setStatus] =
    useState<Exclude<WatchStatus, "all">>("plan-to-watch");
  const [rating, setRating] = useState("");

  const isEditMode = !!entry;

  // Reset form when dialog opens/closes or entry changes
  useEffect(() => {
    if (open) {
      if (entry) {
        setTitle(entry.title);
        setGenre(entry.genre);
        setYear(entry.year.toString());
        setEpisodesWatched(entry.episodesWatched?.toString() || "");
        setStatus(entry.status);
        setRating(entry.rating?.toString() || "");
      } else {
        setTitle("");
        setGenre("");
        setYear(new Date().getFullYear().toString());
        setEpisodesWatched("");
        setStatus("plan-to-watch");
        setRating("");
      }
    }
  }, [open, entry]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !genre.trim() || !year.trim()) {
      return;
    }

    const entry: Omit<MediaEntry, "id"> = {
      title: title.trim(),
      genre: genre.trim(),
      year: parseInt(year),
      status,
      rating: rating ? parseFloat(rating) : undefined,
    };

    onSave(entry);
    onOpenChange(false);
  };

  const mediaTypeLabel = mediaTypeLabels[mediaType];
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
                  placeholder="e.g., Action"
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
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="2024"
                  required
                />
              </div>
            </div>

            {/* ROW: watch status and episode count */}
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
                    {statusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Episode count */}
              <div className="space-y-2">
                <Label htmlFor="episodes-watched">
                  Episode count (optional)
                </Label>
                <Input
                  id="episodes-watched"
                  type="number"
                  min="0"
                  step="1"
                  value={episodesWatched}
                  onChange={(e) => setEpisodesWatched(e.target.value)}
                  placeholder="e.g., 5"
                />
              </div>
            </div>

            {/* Rating */}
            <div className="space-y-2">
              <Label htmlFor="rating">Rating (Optional)</Label>
              <Input
                id="rating"
                type="number"
                min="0"
                max="10"
                step="0.1"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                placeholder="e.g., 8.5"
              />
              <p className="text-xs text-muted-foreground">
                Enter a rating between 0 and 10
              </p>
            </div>
          </div>

          {/* Buttons */}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
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
