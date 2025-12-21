"use client";

import { SlidersHorizontal } from "lucide-react";

import DatePicker from "@/components/DatePicker";
import LocationSearch from "@/components/LocationSearch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface SearchBarProps {
  location: string;
  date?: Date;
  handleLocationChange: (location: string) => void;
  handleDateChange?: (date: Date | undefined) => void;
  onFiltersClick?: () => void;
}

const SearchBar = ({
  location,
  date,
  handleLocationChange,
  handleDateChange,
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
          <DatePicker date={date} onDateChange={handleDateChange} />
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
