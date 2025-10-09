import { useEffect, useState } from "react";

import { MediaEntry, WatchStatus } from "../types/media";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Star } from "lucide-react";

// const starNumbers = [
//   // 0.5 to 10.0 with 0.5 as step.
//   0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9,
//   9.5, 10,
// ];

const starNumbers = [
  // 0 to 10 with 0.5 as step.
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
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

  function RatingStars() {
    return (
      <div className={`grid grid-cols-${starNumbers.length} gap-2 pb-4`}>
        {starNumbers.map((num) => (
          <Star
            fill={selectedRating && selectedRating >= num ? "yellow" : ""}
            className="hover:scale-125 hover:text-blue-300 "
          />
        ))}
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[320px]">
        <DialogHeader>
          <DialogTitle>
            {(isEditMode ? "Edit rating for " : "Rate ") + entry.title}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <RatingStars />
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
