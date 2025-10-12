import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";

type StarFill = "empty" | "half" | "full";

export interface RatingStarRowProps {
  initialRating?: number;
  onChange?: (rating: number) => void;
  className?: string;
}

/** 
Row of ten rating star buttons where you can click each half for a half rating 
This is all by Claude so don't judge me, my attempt didn't even work
*/
export default function RatingStarRow({
  initialRating = 0,
  onChange,
  className,
}: RatingStarRowProps) {
  const [rating, setRating] = useState<number>(initialRating);
  const [hover, setHover] = useState<number>(0);
  const hoverTimeoutRef = useRef<number | null>(null);

  const handleClick = (value: number): void => {
    setRating(value);
    if (onChange) {
      onChange(value);
    }
  };

  const handleMouseEnter = (value: number): void => {
    // entering a new hover target: clear any pending timeout first
    if (hoverTimeoutRef.current) {
      window.clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setHover(value);
  };

  const handleMouseLeave = (): void => {
    // delay clearing hover slightly to make moving between halves/stars less jittery
    if (hoverTimeoutRef.current) {
      window.clearTimeout(hoverTimeoutRef.current);
    }
    // small timeout (120ms) gives user time to cross into adjacent interactive area
    hoverTimeoutRef.current = window.setTimeout(() => {
      setHover(0);
      hoverTimeoutRef.current = null;
    }, 120);
  };

  // cleanup on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        window.clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }
    };
  }, []);

  const getStarFill = (starIndex: number): StarFill => {
    const currentRating = hover || rating;
    const starValue = starIndex + 1;

    if (currentRating >= starValue) {
      return "full";
    } else if (currentRating >= starValue - 0.5) {
      return "half";
    }
    return "empty";
  };

  /* Number above selected or hovered star */
  function RatingNumber({
    className,
    number,
  }: {
    className?: string;
    number: number;
  }) {
    const ratingNumber = hover || rating;
    const showRatingNumber =
      !!ratingNumber &&
      (ratingNumber === number + 1 || ratingNumber === number + 0.5);
    return (
      <div className={className}>
        {showRatingNumber && ratingNumber.toFixed(1)}
      </div>
    );
  }

  return (
    <div className={"flex gap-1 justify-center " + className}>
      {[...Array(10)].map((_, i) => {
        const starFill = getStarFill(i);

        return (
          <div key={i} className="flex flex-col">
            {/* Show current rating above the selected OR hovered star */}
            <RatingNumber className="h-6 font-bold w-1" number={i} />

            <div className="relative">
              {/* Left half */}
              <div
                className="absolute top-0 left-0 w-1/2 pl-1 h-full cursor-pointer z-10"
                onMouseEnter={() => handleMouseEnter(i + 0.5)}
                onMouseLeave={handleMouseLeave}
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick(i + 0.5);
                }}
              />

              {/* Right half */}
              <div
                className="absolute top-0 right-0 w-1/2 h-full cursor-pointer z-10 pr-1"
                onMouseEnter={() => handleMouseEnter(i + 1)}
                onMouseLeave={handleMouseLeave}
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick(i + 1);
                }}
              />

              {/* Star rendering with hover effect */}
              <div
                className={`relative transition-transform duration-200 ${
                  hover > i && hover <= i + 1 ? "scale-110" : "scale-100"
                }`}
              >
                {/* Outline on hover */}
                {hover > i && hover <= i + 1 && (
                  <Star className="absolute top-0 left-0 text-amber-400" />
                )}

                {/* Empty star background */}
                <Star className="text-slate-300" />

                {/* Filled portion */}
                {starFill !== "empty" && (
                  <div
                    className="absolute top-0 left-0 overflow-hidden"
                    style={{ width: starFill === "half" ? "50%" : "100%" }}
                  >
                    <Star className="text-amber-400" fill="currentColor" />
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
