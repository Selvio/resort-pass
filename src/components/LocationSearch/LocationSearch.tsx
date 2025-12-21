"use client";

import { Command as CommandPrimitive } from "cmdk";
import { MapPin, X } from "lucide-react";
import { useState, useMemo } from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  filterLocations,
  searchLocations,
  type SearchLocation,
} from "@/lib/locations";
import { cn } from "@/lib/utils";

interface LocationSearchProps {
  value: string;
  onValueChange: (value: string) => void;
}

const LocationSearch = ({ value, onValueChange }: LocationSearchProps) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const filteredLocations = useMemo(
    () => filterLocations(searchValue),
    [searchValue]
  );

  const selectedLocation = useMemo(() => {
    return searchLocations.find((loc) => loc.id === value);
  }, [value]);

  const displayValue = selectedLocation
    ? selectedLocation.state
      ? `${selectedLocation.name.split(",")[0]}, ${selectedLocation.state}`
      : selectedLocation.name
    : value;

  const handleSelect = (location: SearchLocation) => {
    onValueChange(location.id);
    setSearchValue("");
    setOpen(false);
  };

  const handleClear = () => {
    setSearchValue("");
  };

  return (
    <>
      <Button
        variant="ghost"
        className="w-full justify-start rounded-none"
        onClick={() => setOpen(true)}
      >
        <MapPin className="size-5 text-primary shrink-0" />
        <span className="truncate">{displayValue}</span>
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Search Location"
        description="Search for a location or hotel"
        className="max-w-lg md:top-1/2 md:-translate-y-1/2 md:bottom-auto md:max-h-[50vh] md:flex md:flex-col"
      >
        <Command
          shouldFilter={false}
          value={value}
          className="flex flex-col h-full min-h-0 md:h-[50vh] md:max-h-[50vh]"
        >
          <div className="flex items-center p-4 relative shrink-0">
            <div className="flex-1 flex items-center">
              <CommandPrimitive.Input
                placeholder="Search location..."
                value={searchValue}
                onValueChange={setSearchValue}
                className={cn(
                  "flex h-10 md:h-12 w-full rounded-md bg-transparent py-3 text-sm md:text-base outline-none disabled:cursor-not-allowed disabled:opacity-50 flex-1 border border-gray-light",
                  "placeholder:text-muted-foreground py-3 px-8"
                )}
              />
            </div>
            {searchValue && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 absolute right-4 translate-y-1/2 bottom-1/2"
                onClick={handleClear}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {filteredLocations.map((location) => {
                const Icon = location.icon;
                return (
                  <CommandItem
                    key={location.id}
                    value={location.id}
                    onSelect={() => handleSelect(location)}
                    className="cursor-pointer"
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {location.name}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
};

export default LocationSearch;
