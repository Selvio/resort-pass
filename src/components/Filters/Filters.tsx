"use client";

import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useSearch } from "@/contexts/SearchContext";
import { amenityIcons } from "@/lib/amenityIcons";
import { cn, getHotelClassLabel } from "@/lib/utils";

import FilterSection from "./FilterSection";

interface FiltersProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Amenity {
  id: string;
  label: string;
  iconKey: string;
}

const amenities: Amenity[] = [
  { id: "all-inclusive", label: "All-Inclusive", iconKey: "food" },
  { id: "beach-access", label: "Beach Access", iconKey: "beach" },
  { id: "gym", label: "Gym", iconKey: "fitness-center" },
  { id: "spa", label: "Spa", iconKey: "spa" },
  { id: "rooftop-pool", label: "Rooftop Pool", iconKey: "rooftop-pool" },
  { id: "hot-tub", label: "Hot Tub", iconKey: "hottub" },
  { id: "lazy-river", label: "Lazy River", iconKey: "lazyriver" },
];

const vibes: string[] = ["Family-Friendly", "Serene", "Luxe", "Trendy"];

const Filters = ({ open, onOpenChange }: FiltersProps) => {
  const {
    state,
    appliedFilters,
    setOnlyAvailable,
    setSelectedHotelClass,
    toggleAmenity,
    toggleVibe,
    setTopRated,
    clearAllFilters,
    removeFilter,
  } = useSearch();

  const handleShowResults = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-full bottom-0 translate-y-0 translate-x-0 rounded-b-none left-0 right-0 top-2 p-0 grid grid-rows-[auto_1fr]"
        showCloseButton={false}
      >
        <div className="px-5 py-4 border-b border-gray-light h-fit">
          <div className="grid grid-cols-3 items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="h-6 w-6"
            >
              <X className="size-5" />
            </Button>
            <DialogTitle className="text-lg font-normal text-center">
              Filters
            </DialogTitle>
            {appliedFilters.length > 0 ? (
              <Button
                variant="ghost"
                onClick={clearAllFilters}
                className="text-brand hover:text-brand/80 text-base p-0 w-fit ml-auto"
              >
                Clear all
              </Button>
            ) : (
              <div className="w-12" />
            )}
          </div>
        </div>
        <DialogDescription className="sr-only">
          Filter hotels by availability, class, vibes, guest rating, and
          amenities
        </DialogDescription>

        <div className="grid grid-rows-[1fr_auto] min-h-0">
          <div className="flex flex-col gap-6 p-6 overflow-y-auto min-h-0">
            {appliedFilters.length > 0 && (
              <div className="space-y-2">
                <div className="text-sm font-medium">Applied Filters</div>
                <div className="flex flex-wrap gap-2">
                  {appliedFilters.map((filter) => (
                    <Badge
                      key={filter}
                      variant="default"
                      className="rounded-full px-3 py-1 flex items-center gap-1.5"
                    >
                      {filter}
                      <button
                        onClick={() => removeFilter(filter)}
                        className="hover:opacity-70"
                      >
                        <X className="size-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <FilterSection title="Availability">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="available"
                  className="text-sm cursor-pointer flex-1"
                >
                  Only show hotels with availability
                </label>
                <Checkbox
                  id="available"
                  checked={state.onlyAvailable}
                  onCheckedChange={(checked) => {
                    setOnlyAvailable(checked === true);
                  }}
                />
              </div>
            </FilterSection>

            <Separator />

            <FilterSection title="Hotel Class">
              <div className="flex flex-wrap gap-2">
                {["any", "5-star", "4-star+"].map((option) => {
                  const label = getHotelClassLabel(option);
                  const isSelected = state.selectedHotelClass === option;
                  return (
                    <Button
                      key={option}
                      variant={isSelected ? "default" : "outline"}
                      size="sm"
                      rounded="full"
                      onClick={() => setSelectedHotelClass(option)}
                      className={cn({
                        "bg-black text-white border-black hover:bg-black/90 px-4 py-1.5":
                          isSelected,
                        "bg-white text-black border-gray-light hover:bg-gray-light px-4 py-1.5":
                          !isSelected,
                      })}
                    >
                      {label}
                    </Button>
                  );
                })}
              </div>
            </FilterSection>

            <Separator />

            <FilterSection title="Amenities">
              <div className="space-y-3">
                {amenities.map((amenity) => {
                  const icon = amenityIcons[amenity.iconKey];
                  const isSelected = state.selectedAmenities.includes(
                    amenity.id
                  );
                  return (
                    <div
                      key={amenity.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        {icon && <div className="text-secondary">{icon}</div>}
                        <label
                          htmlFor={amenity.id}
                          className="text-sm cursor-pointer flex-1"
                        >
                          {amenity.label}
                        </label>
                      </div>
                      <Checkbox
                        id={amenity.id}
                        checked={isSelected}
                        onCheckedChange={() => toggleAmenity(amenity.id)}
                      />
                    </div>
                  );
                })}
              </div>
            </FilterSection>

            <Separator />

            <FilterSection title="Vibes">
              <div className="space-y-3">
                {vibes.map((vibe) => {
                  const isSelected = state.selectedVibes.includes(vibe);
                  return (
                    <div
                      key={vibe}
                      className="flex items-center justify-between"
                    >
                      <label
                        htmlFor={`vibe-${vibe}`}
                        className="text-sm cursor-pointer flex-1"
                      >
                        {vibe}
                      </label>
                      <Checkbox
                        id={`vibe-${vibe}`}
                        checked={isSelected}
                        onCheckedChange={() => toggleVibe(vibe)}
                      />
                    </div>
                  );
                })}
              </div>
            </FilterSection>

            <Separator />

            <FilterSection title="Guest Rating">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="top-rated"
                  className="text-sm cursor-pointer flex-1"
                >
                  Top Rated
                </label>
                <Checkbox
                  id="top-rated"
                  checked={state.topRated}
                  onCheckedChange={(checked) => setTopRated(!!checked)}
                />
              </div>
            </FilterSection>
          </div>

          <div className="px-6 py-4 border-t border-gray-light">
            <Button
              className="w-full bg-brand text-white hover:bg-brand/90 rounded-lg h-11"
              onClick={handleShowResults}
            >
              Show results
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Filters;
