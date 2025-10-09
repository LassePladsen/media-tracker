import { ComponentProps, memo, useEffect, useState } from "react";
import { Star, StarHalf } from "lucide-react";

import { MediaEntry, WatchStatus } from "../types/media";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import RatingStars from "./rating-star";

type StarPropsWithoutOnClick = Omit<ComponentProps<typeof StarHalf>, "onClick">;

// const starNumbers = [
//   0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5,
//   10,
// ];

// /** StarHalf if half true, else Star */
// function MaybeHalfStar({
//   number,
//   half,
//   ...props
// }: ComponentProps<typeof Star> & { number: number; half: boolean }) {
//   if (half) return <StarHalf {...props} />;
//   return <Star {...props} />;
// }
//
/** StarHalf's merged together so each half is clickable */

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

  // const SplitStar = memo(function ({
  //   number,
  //   ...props
  // }: StarPropsWithoutOnClick & { number: number }) {
  //   return (
  //     <div className="flex flex-row -space-x-6">
  //       <StarHalf {...props} onClick={() => setSelectedRating(number)} />
  //       <StarHalf
  //         {...props}
  //         className={props.className + " -scale-x-100"}
  //         onClick={() => setSelectedRating(number + 0.5)}
  //       />
  //     </div>
  //   );
  // });

  // const RatingStars2 = memo(function () {
  //   return (
  //     <div className="flex flex-row gap-1 pb-4">
  //       {Array.from(Array(10).keys()).map(
  //         (
  //           num, // 10 stars
  //         ) => {
  //           const starNum = num + 1;
  //           return (
  //             // <MaybeHalfStar
  //             <SplitStar
  //               number={starNum}
  //               // half={
  //               //   // A half star if the currently selected rating is a half rating (e.g 5.5 instead of 5.0)
  //               //   !!selectedRating &&
  //               //   starNum < selectedRating &&
  //               //   Math.abs(starNum - selectedRating) === 0.5
  //               // }
  //               fill={
  //                 selectedRating && selectedRating >= starNum ? "yellow" : ""
  //               }
  //               strokeWidth="0.8"
  //               className="hover:text-blue-300"
  //             />
  //           );
  //         },
  //       )}
  //     </div>
  //   );
  // });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[320px]">
        <DialogHeader>
          <DialogTitle>
            {(isEditMode ? "Edit rating for " : "Rate ") + entry.title}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="py-4 flex flex-col gap-5">
          <RatingStars />
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
