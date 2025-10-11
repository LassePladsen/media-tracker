import { MouseEvent, useCallback, memo, useState, ComponentProps } from "react";
import { BookmarkCheck, Star, Play, Repeat } from "lucide-react";

import { watchStatusColors, watchStatuses } from "@/data/media";
import { WatchStatus } from "@/types/media";
import { MediaEntry } from "../types/media";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { updateEntry } from "@/lib/media-entry";
import { RatingDialog } from "./rating-dialog";

/** Icon button to quick-switch to a new status, different icons for each one. E.g for 'watching' it would be a checkmark icon which sets to 'completed' */
function StatusActionIcon({
  status,
  onClick,
}: {
  status: WatchStatus;
  onClick: (
    status: WatchStatus,
    event: MouseEvent<SVGSVGElement, globalThis.MouseEvent>,
  ) => void;
}) {
  const iconClasses =
    "w-5 h-5 text-muted-foreground hover:scale-125 hover:cursor-pointer";
  switch (status) {
    case "plan-to-watch": // Click to start watching
      return (
        <Play
          className={iconClasses + " hover:text-primary"}
          onClick={(e) => onClick("watching", e)}
        />
      );
    case "watching": // click to complete
      return (
        <BookmarkCheck
          className={iconClasses + " hover:text-green-300"}
          onClick={(e) => onClick("completed", e)}
        />
      );
    case "completed": // click to rewatch
      return (
        <Repeat
          className={iconClasses + " hover:text-blue-300"}
          onClick={(e) => onClick("watching", e)}
        />
      );
  }
}

function RatingStar({
  className,
  onClick,
  rating,
}: {
  className?: string;
  onClick?: () => void;
  rating: number;
}) {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        if (onClick) onClick();
      }}
      className={
        "flex items-center gap-1 text-amber-400 hover:scale-125 hover:cursor-pointer " +
        className
      }
    >
      <Star className="w-4 h-4 fill-current" />
      <span className="text-sm">{rating}</span>
    </div>
  );
}

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

  return (
    <>
      <Card
        className={
          "hover:shadow-lg transition-all hover:border-primary cursor-pointer " +
          // (smallMode ? "px-4 py-2 scale-98 hover:scale-100" : "py-3 px-4 scale-98 hover:scale-103") // Increase size on hover
          (smallMode ? "px-4 py-2" : "py-3 px-4")
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
              {entry.rating && smallMode && (
                <RatingStar
                  rating={entry.rating}
                  onClick={() => setShowRatingDialog(true)}
                />
              )}
              <StatusActionIcon
                status={entry.status}
                onClick={changeEntryStatus}
              />
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
              {entry.rating && (
                <RatingStar
                  rating={entry.rating}
                  onClick={() => setShowRatingDialog(true)}
                />
              )}
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
