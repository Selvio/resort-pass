import Home from "@/components/Home";
import { SearchProvider } from "@/contexts/SearchContext";
import { fetchHotels, getAllHotels } from "@/lib/hotels";

export default async function App() {
  const searchResponse = await fetchHotels();
  const hotels = getAllHotels(searchResponse);
  const currency = searchResponse[0]?.currency;

  return (
    <SearchProvider>
      <Home hotels={hotels} currency={currency} />
    </SearchProvider>
  );
}
