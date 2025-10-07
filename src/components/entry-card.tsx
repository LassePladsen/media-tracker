import { watchStatusColors, watchStatuses } from "@/data/media";
import { WatchStatus } from "@/types/media";
import { Star } from "lucide-react";
import { MediaEntry } from "../types/media";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";

export default function Entrycard({
  entry,
  onClick,
  smallMode = false,
}: {
  entry: MediaEntry;
  onClick?: () => void;
  smallMode: boolean;
}) {
  return (
    <Card
      className={
        "hover:shadow-lg transition-all hover:border-primary cursor-pointer " +
        (smallMode ? "px-2 py-1" : "p-3")
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
          {entry.rating && (
            <div className="flex items-center gap-1 text-amber-400">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm">{entry.rating}</span>
            </div>
          )}
        </div>

        {!smallMode && (
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
        )}
      </div>
    </Card>
  );
}
