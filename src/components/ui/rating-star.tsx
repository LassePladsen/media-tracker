import { Star } from "lucide-react";

export interface RatingStarProps {
  className?: string;
  onClick?: () => void;
  rating: number;
}

export default function RatingStar({
  className,
  onClick,
  rating,
}: RatingStarProps) {
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
