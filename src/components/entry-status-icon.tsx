import { Play, BookmarkCheck, Repeat } from "lucide-react";

import { WatchStatus } from "@/types/media";

export interface EntryStatusIconProps {
    status: WatchStatus;
    handleChangeStatus: (status: WatchStatus) => void;
}

/** Icon button to quick-switch to a new status, different icons for each one. E.g for 'watching' it would be a checkmark icon which sets to 'completed' */
export default function EntryStatusIcon({
  status,
  handleChangeStatus,
}: EntryStatusIconProps) {
  const iconClasses =
    "w-5 h-5 text-muted-foreground hover:scale-125 hover:cursor-pointer";
  switch (status) {
    case "plan-to-watch": // Click to start watching
      return (
        <Play
          className={iconClasses + " hover:text-primary"}
          onClick={(e) => {
            e.stopPropagation();
            handleChangeStatus("watching");
          }}
        />
      );
    case "watching": // click to complete
      return (
        <BookmarkCheck
          className={iconClasses + " hover:text-green-300"}
          onClick={(e) => {
            e.stopPropagation();
            handleChangeStatus("completed");
          }}
        />
      );
    case "completed": // click to rewatch
      return (
        <Repeat
          className={iconClasses + " hover:text-blue-300"}
          onClick={(e) => {
            e.stopPropagation();
            handleChangeStatus("watching");
          }}
        />
      );
  }
}
