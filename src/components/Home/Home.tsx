"use client";

import { SearchX } from "lucide-react";
import { useState, useMemo } from "react";

import Filters from "@/components/Filters";
import Header from "@/components/Header";
import HotelCard from "@/components/HotelCard";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearch } from "@/contexts/SearchContext";
import { applyFilters } from "@/lib/filters";
import { searchLocations } from "@/lib/locations";
import { Currency, Hotel } from "@/types";

const TABS_CONFIG = [
  { value: "all", label: "All", titlePrefix: "Hotel" },
  { value: "pool", label: "Pool", titlePrefix: "Pool" },
  { value: "spa", label: "Spa", titlePrefix: "Spa" },
  { value: "day-room", label: "Day Room", titlePrefix: "Day room" },
];

interface HomeProps {
  hotels: Hotel[];
  currency?: Currency;
}

const Home = ({ hotels, currency }: HomeProps) => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const { state: searchState, clearAllFilters } = useSearch();

  const handleFiltersClick = () => {
    setFiltersOpen(true);
  };

  const handleClearFilters = () => {
    clearAllFilters();
  };

  // Apply all filters based on search state and active tab
  const filteredHotels = useMemo(
    () => applyFilters(hotels, searchState, activeTab),
    [hotels, searchState, activeTab]
  );

  // Get the selected location name
  const selectedLocationName = useMemo(() => {
    const location = searchLocations.find(
      (loc) => loc.id === searchState.location
    );
    return location?.name ?? "";
  }, [searchState.location]);

  return (
    <div className="text-sm h-screen flex flex-col overflow-hidden">
      <div className="shrink-0">
        <div className="text-center p-3 bg-brand-shade text-white font-bold">
          Get the ResortPass App{" "}
          <Button variant="link" className="p-0 h-fit">
            Download
          </Button>
        </div>
        <Header />
        <div className="px-4 pt-4">
          <SearchBar onFiltersClick={handleFiltersClick} />
        </div>
        <Filters open={filtersOpen} onOpenChange={setFiltersOpen} />
      </div>
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex flex-col flex-1 min-h-0"
      >
        <div className="shrink-0">
          <TabsList>
            {TABS_CONFIG.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        {TABS_CONFIG.map((tab) => (
          <TabsContent
            key={tab.value}
            value={tab.value}
            className="px-4 py-6 overflow-y-auto flex-1 min-h-0"
          >
            <div className="px-4 py-6 text-base">
              {tab.titlePrefix} day passes in and near {selectedLocationName}
            </div>
            {filteredHotels.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 px-4">
                <SearchX className="size-12 text-secondary mb-4" />
                <h3 className="text-lg font-medium mb-2">No hotels found</h3>
                <p className="text-sm text-secondary text-center mb-6 max-w-sm">
                  We couldn&apos;t find any hotels matching your filters. Try
                  adjusting your search criteria or clearing some filters.
                </p>
                <Button onClick={handleClearFilters} variant="outline">
                  Clear all filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filteredHotels.map((hotel) => (
                  <HotelCard key={hotel.id} hotel={hotel} currency={currency} />
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Home;
