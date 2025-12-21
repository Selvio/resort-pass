"use client";

import { SlidersHorizontal } from "lucide-react";

import DatePicker from "@/components/DatePicker";
import LocationSearch from "@/components/LocationSearch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSearch } from "@/contexts/SearchContext";

interface SearchBarProps {
  onFiltersClick?: () => void;
}

const SearchBar = ({ onFiltersClick }: SearchBarProps) => {
  const { state, setLocation, setDate, appliedFilters } = useSearch();

  return (
    <div className="flex items-center rounded-lg overflow-hidden border border-gray-light">
      <div className="grid grid-cols-2 w-full">
        <div className="flex justify-start flex-1">
          <LocationSearch value={state.location} onValueChange={setLocation} />
        </div>

        <div className="flex items-center justify-start flex-1">
          <Separator orientation="vertical" className="h-6! bg-gray-light" />
          <DatePicker date={state.date} onDateChange={setDate} />
        </div>
      </div>

      <Separator orientation="vertical" className="h-6! bg-gray-light" />

      <Button onClick={onFiltersClick} variant="ghost" className="relative">
        <SlidersHorizontal className="size-5 text-primary" />
        {appliedFilters.length > 0 && (
          <span className="absolute top-1 right-1 flex size-4 items-center justify-center rounded-full bg-primary text-xs font-medium text-inverted-primary">
            {appliedFilters.length}
          </span>
        )}
      </Button>
    </div>
  );
};

export default SearchBar;
