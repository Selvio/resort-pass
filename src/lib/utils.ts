import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { type Hotel } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a price value with currency symbol
 * @param price - The price value to format
 * @param currencySymbol - The currency symbol to use (default: "$")
 * @returns Formatted price string (e.g., "$40")
 */
export function formatPrice(price: number, currencySymbol: string = "$") {
  return `${currencySymbol}${price.toFixed(0)}`;
}

/**
 * Extracts all image URLs from a hotel object
 * @param hotel - The hotel object to extract images from
 * @returns Array of image URL strings, or empty array if no images available
 */
export function getHotelImages(hotel: Hotel): string[] {
  const images = hotel.image || [];
  const fallbackImage = hotel.desktopImg;
  const allImages =
    images.length > 0
      ? images.map((img) => img.picture?.url).filter(Boolean)
      : fallbackImage
        ? [fallbackImage]
        : [];
  return allImages;
}

/**
 * Gets the label for a hotel class option
 * @param option - The hotel class option to get the label for
 * @returns The label for the hotel class option
 */
export function getHotelClassLabel(option: string): string {
  if (option === "any") {
    return "Any";
  }
  if (option === "5-star") {
    return "5 Star hotels";
  }
  return "4 Star+ Hotels";
}
