import { useState } from "react";
import { Star } from "lucide-react";

type StarFill = "empty" | "half" | "full";

interface StarRatingProps {
  initialRating?: number;
  onRatingChange?: (rating: number) => void;
}

/** 
10 rating star buttons where you can click each half for a half rating 
This is all by Claude so don't judge me, my attempt didn't even work
*/
export default function StarRating({
  initialRating = 0,
  onRatingChange,
}: StarRatingProps) {
  const [rating, setRating] = useState<number>(initialRating);
  const [hover, setHover] = useState<number>(0);

  const handleClick = (value: number): void => {
    setRating(value);
    if (onRatingChange) {
      onRatingChange(value);
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

  return (
    <div>
      <div className="flex gap-1">
        {[...Array(10)].map((_, i) => {
          const starFill = getStarFill(i);

          return (
            <div key={i} className="relative">
              {/* Left half */}
              <div
                className="absolute top-0 left-0 w-1/2 h-full cursor-pointer z-10"
                onMouseEnter={() => handleMouseEnter(i + 0.5)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleClick(i + 0.5)}
              />

              {/* Right half */}
              <div
                className="absolute top-0 right-0 w-1/2 h-full cursor-pointer z-10"
                onMouseEnter={() => handleMouseEnter(i + 1)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleClick(i + 1)}
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
          );
        })}
      </div>
    </div>
  );
}
