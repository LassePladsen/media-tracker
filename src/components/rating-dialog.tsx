import { useEffect, useState } from "react";

import { MediaEntry, WatchStatus } from "../types/media";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "./ui/dialog";

const possibleRatings = [
  // 0 to 10 with 0.5 as step.
  0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9,
  9.5, 10,
];
const statusOptions: { value: Exclude<WatchStatus, "all">; label: string }[] = [
  { value: "plan-to-watch", label: "Plan to Watch" },
  { value: "completed", label: "Completed" },
  { value: "on-hold", label: "On Hold" },
  { value: "dropped", label: "Dropped" },
];

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
  const [newRating, setNewRating] = useState<MediaEntry["rating"] | undefined>(
    undefined,
  );

  const rating = entry.rating;
  const isEditMode = !!rating;

  // Reset form when dialog opens/closes or old rating changes
  useEffect(() => {
    if (!open || !rating) return;
    setNewRating(rating);
  }, [open, rating]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) return;
    onSave({ ...entry, rating: newRating });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {(isEditMode ? "Edit rating for " : "Rate ") + entry.title}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          form is todo...
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
