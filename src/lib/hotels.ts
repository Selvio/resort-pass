import camelcaseKeys from "camelcase-keys";

import type { SearchResponse } from "@/types";

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
