import { useEffect, useState } from "react";

import { updateEntry } from "@/lib/media-entry";
import { MediaEntry } from "../types/media";
import RatingStars from "./rating-star";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

export function RatingDialog({
  open,
  onOpenChange,
  onSave,
  entry,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (entryData: Omit<MediaEntry, "id">) => void;
  entry: MediaEntry;
}) {
  const [selectedRating, setSelectedRating] = useState<
    MediaEntry["rating"] | undefined
  >(undefined);

  const rating = entry.rating;
  const isEditMode = !!rating;

  // Reset form when dialog opens/closes or old rating changes
  useEffect(() => {
    if (!open || !rating) return;
    setSelectedRating(rating);
  }, [open, rating]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) return;
    onSave({ ...entry, rating: selectedRating });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[320px]">
        <DialogHeader>
          <DialogTitle>
            {(isEditMode ? "Edit rating for " : "Rate ") + entry.title}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="pb-4 flex flex-col gap-5">
          <RatingStars
            className="-mt-3"
            initialRating={entry.rating}
            onChange={(rating) =>
              updateEntry(entry.id, { ...entry, rating: rating })
            }
          />
          {/*<DialogFooter className="flex-col-reverse sm:flex-col-reverse justify-center sm:justify-center">*/}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
