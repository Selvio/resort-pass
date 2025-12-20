import Header from "@/components/Header";
import { HotelCard } from "@/components/HotelCard";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getAllHotels,
  filterHotelsByPool,
  filterHotelsBySpa,
  filterHotelsByDayRoom,
} from "@/lib/hotels";
import { SearchResponse } from "@/types";

import mockData from "../../mock.json";

const hotels = getAllHotels(mockData as unknown as SearchResponse);

const poolHotels = filterHotelsByPool(hotels);
const spaHotels = filterHotelsBySpa(hotels);
const dayRoomHotels = filterHotelsByDayRoom(hotels);

export default function Home() {
  return (
    <div className="text-sm">
      <div className="text-center p-3 bg-brand-shade text-white font-bold">
        Get the ResortPass App{" "}
        <Button variant="link" className="p-0 h-fit">
          Download
        </Button>
      </div>
      <Header />
      <div className="flex flex-col gap-1 pt-4">
        <div className="px-4">
          <SearchBar />
        </div>
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pool">Pool</TabsTrigger>
            <TabsTrigger value="spa">Spa</TabsTrigger>
            <TabsTrigger value="day-room">Day Room</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="px-4 py-6">
            <div className="px-4 py-6 text-base">
              Hotel day passes in and near Hawaii
            </div>
            <div className="grid grid-cols-1 gap-4">
              {hotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="pool" className="px-4 py-6">
            <div className="px-4 py-6 text-base">
              Pool day passes in and near Hawaii
            </div>
            <div className="grid grid-cols-1 gap-4">
              {poolHotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="spa" className="px-4 py-6">
            <div className="px-4 py-6 text-base">
              Spa day passes in and near Hawaii
            </div>
            <div className="grid grid-cols-1 gap-4">
              {spaHotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="day-room" className="px-4 py-6">
            <div className="px-4 py-6 text-base">
              Day room passes in and near Hawaii
            </div>
            <div className="grid grid-cols-1 gap-4">
              {dayRoomHotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
