import { useState } from "react";
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

  const handleClick = (value: number): void => {
    setRating(value);
    if (onChange) {
      onChange(value);
    }
  };

  const handleMouseEnter = (value: number): void => {
    setHover(value);
  };

  const handleMouseLeave = (): void => {
    setHover(0);
  };

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

  /* Number above selected or hovered star, with timeout to fix hover-stutter with mouse */
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
    <div>
      <div className={"flex gap-1 " + className}>
        {[...Array(10)].map((_, i) => {
          const starFill = getStarFill(i);

          return (
            <div className="flex flex-col">
              {/* Show current rating above the selected OR hovered star */}
              <RatingNumber
                className="h-6 font-bold transition-all"
                number={i}
              />

              <div key={i} className="relative">
                {/* Left half */}
                <div
                  className="absolute top-0 left-0 w-1/2 h-full cursor-pointer z-10"
                  onMouseEnter={() => handleMouseEnter(i + 0.5)}
                  onMouseLeave={handleMouseLeave}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClick(i + 0.5);
                  }}
                />

                {/* Right half */}
                <div
                  className="absolute top-0 right-0 w-1/2 h-full cursor-pointer z-10"
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
    </div>
  );
}
