import camelcaseKeys from "camelcase-keys";

import type { Hotel, SearchResponse } from "@/types";

const RESORTPASS_API_URL =
  "https://resortpass-takehome.s3.us-west-2.amazonaws.com/miami_srp_3_15.json";

/**
 * Fetches and normalizes hotels data from the external API
 */
export async function fetchHotels(): Promise<SearchResponse> {
  try {
    const response = await fetch(RESORTPASS_API_URL, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch hotels data: ${response.status} ${response.statusText}`
      );
    }

    const rawData = await response.json();

    // Normalize all keys to camelCase recursively
    const normalizedData = camelcaseKeys(rawData, {
      deep: true,
    });

    return normalizedData;
  } catch (error) {
    // Re-throw with more context if it's not already an Error
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(
      "Failed to fetch hotels data: Network error or invalid response"
    );
  }
}

/**
 * Extracts all hotels from a SearchResponse array
 * @param data - SearchResponse array
 * @returns Array of Hotel objects
 */
export function getAllHotels(data: SearchResponse): Hotel[] {
  return data.flatMap((stage) => stage.hotels);
}
