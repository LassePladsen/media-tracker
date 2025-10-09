import { MouseEvent, useCallback, memo, useState, ComponentProps } from "react";
import { BookmarkCheck, Star, Play, Repeat } from "lucide-react";

import { watchStatusColors, watchStatuses } from "@/data/media";
import { WatchStatus } from "@/types/media";
import { MediaEntry } from "../types/media";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { updateEntry } from "@/lib/media-entry";
import { RatingDialog } from "./rating-dialog";

export default function Entrycard({
  entry,
  onClick,
  smallMode = false,
}: {
  entry: MediaEntry;
  onClick?: () => void;
  smallMode: boolean;
}) {
  const [showRatingDialog, setShowRatingDialog] = useState(false); // TODO: the dialog pls

  const handleSaveRating = useCallback(
    (entryData: Omit<MediaEntry, "id">) => updateEntry(entry.id, entryData),
    [entry],
  );

  const changeEntryStatus = useCallback(
    (
      toStatus: WatchStatus,
      event: MouseEvent<SVGSVGElement, globalThis.MouseEvent>,
    ) => {
      if (event) event.stopPropagation();
      if (entry.status === toStatus) return;
      updateEntry(entry.id, { ...entry, status: toStatus });
      // If changed to completed, ask user for rating
      if (!showRatingDialog) setShowRatingDialog(true);
    },
    [entry, showRatingDialog],
  );

  const RatingStar = memo(function ({ className }: { className?: string }) {
    return (
      <div
        onClick={(e) => {
          e.stopPropagation();
          setShowRatingDialog(true);
        }}
        className={
          "flex items-center gap-1 text-amber-400 hover:scale-125 hover:cursor-pointer " +
          className
        }
      >
        <Star className="w-4 h-4 fill-current" />
        <span className="text-sm">{entry.rating}</span>
      </div>
    );
  });

  /** Icon button to quick-switch to a new status, different icons for each one. E.g for 'watching' it would be a checkmark icon which sets to 'completed' */
  // TODO: this component and the func changeEntryStatus might be very inefficient rendering. Test if problem and move out of component. or did the memo work
  const StatusActionIcon = memo(({ status }: { status: WatchStatus }) => {
    const iconClasses =
      "w-5 h-5 text-muted-foreground hover:scale-125 hover:cursor-pointer";
    switch (status) {
      case "plan-to-watch":
        return (
          <Play
            className={iconClasses + " hover:text-primary"}
            onClick={(e) => changeEntryStatus("watching", e)}
          />
        );
      case "watching":
        return (
          <BookmarkCheck
            className={iconClasses + " hover:text-green-300"}
            onClick={(e) => changeEntryStatus("completed", e)}
          />
        );
      case "completed":
        return (
          <Repeat
            className={iconClasses + " hover:text-blue-300"}
            onClick={(e) => changeEntryStatus("watching", e)}
          />
        );
    }
  });

  return (
    <>
      <Card
        className={
          "hover:shadow-lg transition-all hover:border-primary cursor-pointer " +
          (smallMode ? "p-2 scale-98 hover:scale-100" : "p-3 hover:scale-105")
        }
        onClick={onClick}
      >
        <div className="space-y-3">
          <div
            className={
              "flex flex-row justify-between gap-2 " +
              (smallMode ? "items-center" : "items-start")
            }
          >
            <h3 className="flex-1">{entry.title}</h3>
            <div className="flex flex-row gap-3">
              {entry.rating && smallMode && <RatingStar />}
              <StatusActionIcon status={entry.status} />
            </div>
          </div>

          {!smallMode && (
            <div className="flex flex-row justify-between gap-2">
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="outline"
                  className={watchStatusColors[entry.status as WatchStatus]}
                >
                  {watchStatuses[entry.status as WatchStatus]}
                </Badge>
                <Badge variant="secondary">{entry.genre}</Badge>
                <Badge variant="secondary">{entry.year}</Badge>
              </div>
              {entry.rating && <RatingStar />}
            </div>
          )}
        </div>
      </Card>

      <RatingDialog
        open={showRatingDialog}
        onOpenChange={setShowRatingDialog}
        onSave={handleSaveRating}
        entry={entry}
      />
    </>
  );
}
