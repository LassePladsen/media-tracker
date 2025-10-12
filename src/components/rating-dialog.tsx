import { useEffect, useState } from "react";

import { updateEntry } from "@/lib/media-entry";
import { MediaEntry } from "../types/media";
import RatingStarRow from "./rating-star-row";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

export interface RatingDialogProps {
  openState: boolean;
  setOpenState: (open: boolean) => void;
  onSave: (entryData: Omit<MediaEntry, "id">) => void;
  entry: MediaEntry;
}

export function RatingDialog({
  openState,
  setOpenState,
  onSave,
  entry,
}: RatingDialogProps) {
  const [selectedRating, setSelectedRating] = useState<
    MediaEntry["rating"] | undefined
  >(undefined);

  const rating = entry.rating;
  const isEditMode = !!rating;

  // Reset form when dialog opens/closes or old rating changes
  useEffect(() => {
    if (!openState || !rating) return;
    setSelectedRating(rating);
  }, [openState, rating]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) return;
    onSave({ ...entry, rating: selectedRating });
    setOpenState(false);
  };

  return (
    <Dialog open={openState} onOpenChange={setOpenState}>
      <DialogContent className="sm:max-w-[320px]">
        <DialogHeader>
          <DialogTitle>
            {(isEditMode ? "Edit rating for " : "Rate ") + entry.title}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="pb-4 flex flex-col gap-5">
          <RatingStarRow
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
              onClick={() => setOpenState(false)}
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
