import { useCallback, useState } from "react";

import { watchStatusColors, watchStatuses } from "@/data/media";
import { updateEntry } from "@/lib/media-entry";
import { WatchStatus } from "@/types/media";
import { MediaEntry } from "../types/media";
import EntryStatusIcon from "./entry-status-icon";
import { RatingDialog } from "./rating-dialog";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import RatingStar from "./ui/rating-star";


export default function Entrycard({
  entry,
  onClick,
  smallMode = false,
}: {
  entry: MediaEntry;
  onClick?: () => void;
  smallMode: boolean;
}) {
  const [showRatingDialog, setShowRatingDialog] = useState(false);

  const handleSaveRating = useCallback(
    (entryData: Omit<MediaEntry, "id">) => updateEntry(entry.id, entryData),
    [entry],
  );

  const changeEntryStatus = useCallback(
    (toStatus: WatchStatus) => {
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
              <EntryStatusIcon
                status={entry.status}
                handleChangeStatus={changeEntryStatus}
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
        openState={showRatingDialog}
        setOpenState={setShowRatingDialog}
        onSave={handleSaveRating}
        entry={entry}
      />
    </>
  );
}
