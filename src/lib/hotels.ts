import camelcaseKeys from "camelcase-keys";

import type { Hotel, SearchResponse } from "@/types";

const RESORTPASS_API_URL =
  "https://resortpass-takehome.s3.us-west-2.amazonaws.com/miami_srp_3_15.json";

/**
 * Fetches and normalizes hotels data from the external API
 */
export async function fetchHotels(): Promise<SearchResponse> {
  const response = await fetch(RESORTPASS_API_URL, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch hotels data");
  }

  const rawData = await response.json();

  // Normalize all keys to camelCase recursively
  const normalizedData = camelcaseKeys(rawData, {
    deep: true,
  }) as SearchResponse;

  return normalizedData;
}

/**
 * Extracts and normalizes all hotels from a SearchResponse array
 * @param rawData - Raw data array (can be in snake_case or camelCase)
 * @returns Array of normalized Hotel objects
 */
export function getAllHotels(rawData: SearchResponse): Hotel[] {
  // Transform all keys to camelCase recursively
  const normalizedData = camelcaseKeys(rawData, {
    deep: true,
  });

  // Flatten all hotels from all stages into a single array
  const allHotels = normalizedData.flatMap((stage) => stage.hotels);

  return allHotels;
}

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
