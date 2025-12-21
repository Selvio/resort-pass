import type { SearchState } from "@/contexts/SearchContext";
import {
  DEFAULT_LOCATION_RADIUS_MILES,
  EARTH_RADIUS_MILES,
  TOP_RATED_MIN_RATING,
} from "@/lib/constants";
import { searchLocations } from "@/lib/locations";
import type { Hotel } from "@/types";

/**
 * Calculate distance between two coordinates using Haversine formula
 * @param lat1 - Latitude of first point
 * @param lon1 - Longitude of first point
 * @param lat2 - Latitude of second point
 * @param lon2 - Longitude of second point
 * @returns Distance in miles
 */
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = EARTH_RADIUS_MILES;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Mapping from filter amenity IDs to hotel amenity names
 */
const AMENITY_MAPPING: Record<string, string[]> = {
  "all-inclusive": ["food", "drink"],
  "beach-access": ["beach"],
  gym: ["fitness-center"],
  spa: ["spa"],
  "rooftop-pool": ["rooftop-pool"],
  "hot-tub": ["hottub"],
  "lazy-river": ["lazyriver"],
};

/**
 * Filters hotels that have pool-related products
 * @param hotels - Array of hotels to filter
 * @returns Array of hotels with pool-related products
 */
export function filterHotelsByPool(hotels: Hotel[]): Hotel[] {
  const poolProductTypes = ["Day Pass", "Cabana", "Daybed", "Beach Pass"];

  return hotels.filter((hotel) =>
    hotel.products?.some((product) =>
      poolProductTypes.includes(product.productTypeName)
    )
  );
}

/**
 * Filters hotels that have spa-related products
 * @param hotels - Array of hotels to filter
 * @returns Array of hotels with spa-related products
 */
export function filterHotelsBySpa(hotels: Hotel[]): Hotel[] {
  const spaProductTypes = [
    "Spa Pass",
    "Massage",
    "Facial",
    "Spa Treatment",
    "Couples Spa",
  ];

  return hotels.filter((hotel) =>
    hotel.products?.some((product) =>
      spaProductTypes.includes(product.productTypeName)
    )
  );
}

/**
 * Filters hotels that have Day Room products
 * @param hotels - Array of hotels to filter
 * @returns Array of hotels with Day Room products
 */
export function filterHotelsByDayRoom(hotels: Hotel[]): Hotel[] {
  return hotels.filter((hotel) =>
    hotel.products?.some((product) => product.productTypeName === "Day Room")
  );
}

/**
 * Filters hotels by location (within specified radius)
 * @param hotels - Array of hotels to filter
 * @param locationId - ID of the selected location
 * @param radiusMiles - Radius in miles (default: 50)
 * @returns Filtered array of hotels
 */
export function filterByLocation(
  hotels: Hotel[],
  locationId: string,
  radiusMiles: number = DEFAULT_LOCATION_RADIUS_MILES
): Hotel[] {
  const location = searchLocations.find((loc) => loc.id === locationId);

  if (
    !location ||
    location.latitude === undefined ||
    location.longitude === undefined
  ) {
    return hotels;
  }

  const locationLat = location.latitude;
  const locationLon = location.longitude;

  return hotels.filter((hotel) => {
    const distance = calculateDistance(
      locationLat,
      locationLon,
      hotel.latitude,
      hotel.longitude
    );
    return distance <= radiusMiles;
  });
}

/**
 * Filters hotels by tab type (pool, spa, day-room, or all)
 * @param hotels - Array of hotels to filter
 * @param tab - Active tab value
 * @returns Filtered array of hotels
 */
export function filterByTab(hotels: Hotel[], tab: string): Hotel[] {
  switch (tab) {
    case "pool":
      return filterHotelsByPool(hotels);
    case "spa":
      return filterHotelsBySpa(hotels);
    case "day-room":
      return filterHotelsByDayRoom(hotels);
    case "all":
    default:
      return hotels;
  }
}

/**
 * Filters hotels by availability
 * @param hotels - Array of hotels to filter
 * @param onlyAvailable - Whether to show only available hotels
 * @returns Filtered array of hotels
 */
export function filterByAvailability(
  hotels: Hotel[],
  onlyAvailable: boolean
): Hotel[] {
  if (!onlyAvailable) {
    return hotels;
  }
  return hotels.filter((hotel) => hotel.availability === true);
}

/**
 * Filters hotels by hotel class (star rating)
 * @param hotels - Array of hotels to filter
 * @param hotelClass - Hotel class filter ("any", "5-star", "4-star+")
 * @returns Filtered array of hotels
 */
export function filterByHotelClass(
  hotels: Hotel[],
  hotelClass: string
): Hotel[] {
  if (hotelClass === "any") {
    return hotels;
  }

  if (hotelClass === "5-star") {
    return hotels.filter((hotel) => hotel.hotelStar === 5);
  }

  if (hotelClass === "4-star+") {
    return hotels.filter((hotel) => hotel.hotelStar >= 4);
  }

  return hotels;
}

/**
 * Filters hotels by selected amenities
 * @param hotels - Array of hotels to filter
 * @param amenityIds - Array of selected amenity IDs
 * @returns Filtered array of hotels
 */
export function filterByAmenities(
  hotels: Hotel[],
  amenityIds: string[]
): Hotel[] {
  if (amenityIds.length === 0) {
    return hotels;
  }

  return hotels.filter((hotel) => {
    const hotelAmenityNames = hotel.amenities?.map((a) => a.name) || [];

    // Check if hotel has all selected amenities
    return amenityIds.every((amenityId) => {
      const mappedAmenities = AMENITY_MAPPING[amenityId] || [];
      // For all-inclusive, need both food and drink
      if (amenityId === "all-inclusive") {
        return mappedAmenities.every((name) =>
          hotelAmenityNames.includes(name)
        );
      }
      // For other amenities, check if any mapped amenity exists
      return mappedAmenities.some((name) => hotelAmenityNames.includes(name));
    });
  });
}

/**
 * Filters hotels by selected vibes
 * @param hotels - Array of hotels to filter
 * @param vibes - Array of selected vibe strings
 * @returns Filtered array of hotels
 */
export function filterByVibes(hotels: Hotel[], vibes: string[]): Hotel[] {
  if (vibes.length === 0) {
    return hotels;
  }

  return hotels.filter((hotel) => {
    const hotelVibes = [hotel.vibes?.primary, hotel.vibes?.secondary].filter(
      Boolean
    );

    // Check if hotel has any of the selected vibes
    return vibes.some((vibe) => hotelVibes.includes(vibe));
  });
}

/**
 * Filters hotels by top rated (rating >= 4.5)
 * @param hotels - Array of hotels to filter
 * @param topRated - Whether to show only top-rated hotels
 * @returns Filtered array of hotels
 */
export function filterByTopRated(hotels: Hotel[], topRated: boolean): Hotel[] {
  if (!topRated) {
    return hotels;
  }
  return hotels.filter((hotel) => hotel.rating >= TOP_RATED_MIN_RATING);
}

/**
 * Applies all filters to hotels based on search state and active tab
 * Filters are applied in order for optimal performance:
 * 1. Tab filter (most restrictive)
 * 2. Location filter
 * 3. Availability filter
 * 4. Hotel class filter
 * 5. Amenities filter
 * 6. Vibes filter
 * 7. Top rated filter
 *
 * @param hotels - Array of all hotels
 * @param searchState - Current search/filter state from context
 * @param activeTab - Active tab value ("all", "pool", "spa", "day-room")
 * @returns Filtered array of hotels
 */
export function applyFilters(
  hotels: Hotel[],
  searchState: SearchState,
  activeTab: string
): Hotel[] {
  let filtered = hotels;

  // 1. Tab filter (most restrictive - reduces dataset significantly)
  filtered = filterByTab(filtered, activeTab);

  // 2. Location filter (geographic constraint)
  filtered = filterByLocation(
    filtered,
    searchState.location,
    DEFAULT_LOCATION_RADIUS_MILES
  );

  // 3. Availability filter
  filtered = filterByAvailability(filtered, searchState.onlyAvailable);

  // 4. Hotel class filter
  filtered = filterByHotelClass(filtered, searchState.selectedHotelClass);

  // 5. Amenities filter
  filtered = filterByAmenities(filtered, searchState.selectedAmenities);

  // 6. Vibes filter
  filtered = filterByVibes(filtered, searchState.selectedVibes);

  // 7. Top rated filter
  filtered = filterByTopRated(filtered, searchState.topRated);

  return filtered;
}
