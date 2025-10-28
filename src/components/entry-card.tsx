"use client";

import { useCallback, useState } from "react";

import { watchStatusColors, watchStatuses } from "@/data/media";
import { updateEntry } from "@/lib/media-entry";
import { WatchStatus, Entry } from "@/types/schema";
import { RatingDialog } from "./rating-dialog";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import EntryStatusIcon from "./ui/entry-status-icon";
import RatingStar from "./ui/rating-star";

export interface EntryCardProps {
  entry: Entry;
  onClick?: () => void;
  smallMode?: boolean;
  showStatus?: boolean;
}

export default function Entrycard({
  entry,
  onClick,
  smallMode = false,
  showStatus = true,
}: EntryCardProps) {
  const [showRatingDialog, setShowRatingDialog] = useState(false);

  const handleSaveRating = useCallback(
    (entryData: Omit<Entry, "id">) => updateEntry(entry.id, entryData),
    [entry],
  );

  const changeEntryStatus = useCallback(
    (toStatus: WatchStatus) => {
      if (entry.status === toStatus) return;
      updateEntry(entry.id, { ...entry, status: toStatus });
      // If changed to completed, ask user for rating
      if (toStatus === "completed" && !showRatingDialog)
        setShowRatingDialog(true);
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
            <div className="flex flex-row gap-3 justify-start">
              <h3 className="flex-1">{entry.title}</h3>
              {/*entry.episodesWatched && (
                <div className="flex flex-row items-center text-muted-foreground">
                  <Bookmark size={17} />
                  {entry.episodesWatched}
                </div>
              )*/}
              <EntryStatusIcon
                status={entry.status}
                handleChangeStatus={changeEntryStatus}
              />
            </div>
            <div className="flex flex-row gap-3">
              {entry.rating && (
                <RatingStar
                  rating={entry.rating}
                  onClick={() => setShowRatingDialog(true)}
                />
              )}
            </div>
          </div>

          {!smallMode && (
            <div className="flex flex-row justify-between gap-2">
              <div className="flex flex-wrap gap-2">
                {showStatus && (
                  <Badge
                    variant="outline"
                    className={watchStatusColors.bg[entry.status]}
                  >
                    {watchStatuses[entry.status]}
                  </Badge>
                )}
                <Badge variant="secondary">{entry.genre}</Badge>
                <Badge variant="secondary">{entry.year}</Badge>
              </div>
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
