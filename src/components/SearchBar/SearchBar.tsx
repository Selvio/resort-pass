import { MapPin, Calendar, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface SearchBarProps {
  location?: string;
  date?: string;
  onLocationClick?: () => void;
  onDateClick?: () => void;
  onFiltersClick?: () => void;
}

const SearchBar = ({
  location = "Miami, FL",
  date = "Feb 26",
  onLocationClick,
  onDateClick,
  onFiltersClick,
}: SearchBarProps) => {
  return (
    <div className="flex items-center rounded-lg overflow-hidden border border-gray-light">
      <div className="flex items-center w-full justify-between">
        <div className="flex justify-start flex-1">
          <Button onClick={onLocationClick} variant="ghost">
            <MapPin className="size-5 text-primary" />
            {location}
          </Button>
        </div>

        <div className="flex items-center justify-start flex-1">
          <Separator orientation="vertical" className="h-6! bg-gray-light" />
          <Button onClick={onDateClick} variant="ghost">
            <Calendar className="size-5 text-primary" />
            {date}
          </Button>
        </div>
      </div>

      <Separator orientation="vertical" className="h-6! bg-gray-light" />

      <Button onClick={onFiltersClick} variant="ghost">
        <SlidersHorizontal className="size-5 text-primary" />
      </Button>
    </div>
  );
};

export default SearchBar;
