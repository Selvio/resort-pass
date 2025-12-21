"use client";

import { Calendar, SlidersHorizontal } from "lucide-react";

import LocationSearch from "@/components/LocationSearch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface SearchBarProps {
  location: string;
  date?: string;
  handleLocationChange: (location: string) => void;
  onDateClick?: () => void;
  onFiltersClick?: () => void;
}

const SearchBar = ({
  location,
  date = "Feb 26",
  handleLocationChange,
  onDateClick,
  onFiltersClick,
}: SearchBarProps) => {
  return (
    <div className="flex items-center rounded-lg overflow-hidden border border-gray-light">
      <div className="grid grid-cols-2 w-full">
        <div className="flex justify-start flex-1">
          <LocationSearch
            value={location}
            onValueChange={handleLocationChange}
          />
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
