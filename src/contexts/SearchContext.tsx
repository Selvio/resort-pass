"use client";

import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  ReactNode,
} from "react";

import { searchLocations } from "@/lib/locations";

const amenities = [
  { id: "all-inclusive", label: "All-Inclusive" },
  { id: "beach-access", label: "Beach Access" },
  { id: "gym", label: "Gym" },
  { id: "spa", label: "Spa" },
  { id: "rooftop-pool", label: "Rooftop Pool" },
  { id: "hot-tub", label: "Hot Tub" },
  { id: "lazy-river", label: "Lazy River" },
];

const vibes = ["Family-Friendly", "Serene", "Luxe", "Trendy"];

export interface SearchState {
  location: string;
  date: Date | undefined;
  onlyAvailable: boolean;
  selectedHotelClass: string;
  selectedAmenities: string[];
  selectedVibes: string[];
  topRated: boolean;
}

// Action types
export type SearchAction =
  | { type: "SET_LOCATION"; payload: string }
  | { type: "SET_DATE"; payload: Date | undefined }
  | { type: "SET_ONLY_AVAILABLE"; payload: boolean }
  | { type: "SET_HOTEL_CLASS"; payload: string }
  | { type: "TOGGLE_AMENITY"; payload: { id: string } }
  | { type: "TOGGLE_VIBE"; payload: string }
  | { type: "SET_TOP_RATED"; payload: boolean }
  | { type: "CLEAR_ALL_FILTERS" }
  | { type: "REMOVE_FILTER"; payload: string };

// Initial state
const initialState: SearchState = {
  location: searchLocations[0].id,
  date: new Date(),
  onlyAvailable: true,
  selectedHotelClass: "any",
  selectedAmenities: [],
  selectedVibes: [],
  topRated: false,
};

// Reducer function
function searchReducer(state: SearchState, action: SearchAction): SearchState {
  switch (action.type) {
    case "SET_LOCATION":
      return { ...state, location: action.payload };

    case "SET_DATE":
      return { ...state, date: action.payload };

    case "SET_ONLY_AVAILABLE":
      return { ...state, onlyAvailable: action.payload };

    case "SET_HOTEL_CLASS":
      return { ...state, selectedHotelClass: action.payload };

    case "TOGGLE_AMENITY": {
      const { id } = action.payload;
      const isSelected = state.selectedAmenities.includes(id);
      return {
        ...state,
        selectedAmenities: isSelected
          ? state.selectedAmenities.filter((amenityId) => amenityId !== id)
          : [...state.selectedAmenities, id],
      };
    }

    case "TOGGLE_VIBE": {
      const isSelected = state.selectedVibes.includes(action.payload);
      return {
        ...state,
        selectedVibes: isSelected
          ? state.selectedVibes.filter((vibe) => vibe !== action.payload)
          : [...state.selectedVibes, action.payload],
      };
    }

    case "SET_TOP_RATED":
      return { ...state, topRated: action.payload };

    case "CLEAR_ALL_FILTERS":
      return {
        ...state,
        onlyAvailable: false,
        selectedHotelClass: "any",
        selectedAmenities: [],
        selectedVibes: [],
        topRated: false,
      };

    case "REMOVE_FILTER": {
      const filter = action.payload;
      if (filter === "Available") {
        return { ...state, onlyAvailable: false };
      }
      if (filter === "Top Rated") {
        return { ...state, topRated: false };
      }
      if (vibes.includes(filter)) {
        return {
          ...state,
          selectedVibes: state.selectedVibes.filter((v) => v !== filter),
        };
      }

      const amenity = amenities.find((am) => am.label === filter);
      if (amenity) {
        return {
          ...state,
          selectedAmenities: state.selectedAmenities.filter(
            (a) => a !== amenity.id
          ),
        };
      }
      return state;
    }

    default:
      return state;
  }
}

// Context interface
interface SearchContextType {
  state: SearchState;
  appliedFilters: string[];
  dispatch: React.Dispatch<SearchAction>;
  setLocation: (location: string) => void;
  setDate: (date: Date | undefined) => void;
  setOnlyAvailable: (value: boolean) => void;
  setSelectedHotelClass: (value: string) => void;
  toggleAmenity: (amenityId: string) => void;
  toggleVibe: (vibe: string) => void;
  setTopRated: (value: boolean) => void;
  clearAllFilters: () => void;
  removeFilter: (filter: string) => void;
}

// Create context
const SearchContext = createContext<SearchContextType | undefined>(undefined);

// Provider component
export function SearchProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(searchReducer, initialState);

  const appliedFilters = useMemo(() => {
    const filters: string[] = [];

    if (state.onlyAvailable) {
      filters.push("Available");
    }

    if (state.topRated) {
      filters.push("Top Rated");
    }

    state.selectedVibes.forEach((vibe) => {
      filters.push(vibe);
    });

    state.selectedAmenities.forEach((amenityId) => {
      const amenity = amenities.find((am) => am.id === amenityId);
      if (amenity) {
        filters.push(amenity.label);
      }
    });

    return filters;
  }, [
    state.onlyAvailable,
    state.topRated,
    state.selectedVibes,
    state.selectedAmenities,
  ]);

  // Actions to update the state
  const setLocation = (location: string) => {
    dispatch({ type: "SET_LOCATION", payload: location });
  };

  const setDate = (date: Date | undefined) => {
    dispatch({ type: "SET_DATE", payload: date });
  };

  const setOnlyAvailable = (value: boolean) => {
    dispatch({ type: "SET_ONLY_AVAILABLE", payload: value });
  };

  const setSelectedHotelClass = (value: string) => {
    dispatch({ type: "SET_HOTEL_CLASS", payload: value });
  };

  const toggleAmenity = (amenityId: string) => {
    dispatch({ type: "TOGGLE_AMENITY", payload: { id: amenityId } });
  };

  const toggleVibe = (vibe: string) => {
    dispatch({ type: "TOGGLE_VIBE", payload: vibe });
  };

  const setTopRated = (value: boolean) => {
    dispatch({ type: "SET_TOP_RATED", payload: value });
  };

  const clearAllFilters = () => {
    dispatch({ type: "CLEAR_ALL_FILTERS" });
  };

  const removeFilter = (filter: string) => {
    dispatch({ type: "REMOVE_FILTER", payload: filter });
  };

  const value: SearchContextType = {
    state,
    appliedFilters,
    dispatch,
    setLocation,
    setDate,
    setOnlyAvailable,
    setSelectedHotelClass,
    toggleAmenity,
    toggleVibe,
    setTopRated,
    clearAllFilters,
    removeFilter,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}

// Custom hook to use the context
export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}
