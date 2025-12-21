import Home from "@/components/Home";
import { SearchProvider } from "@/contexts/SearchContext";

export default function App() {
  return (
    <SearchProvider>
      <Home />
    </SearchProvider>
  );
}
