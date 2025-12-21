import type { Hotel } from "@/types";

/**
 * Helper function to create a mock hotel for testing
 * @param overrides - Partial hotel object to override default values
 * @returns A complete Hotel object with default values
 */
export function createMockHotel(overrides: Partial<Hotel> = {}): Hotel {
  return {
    id: 1,
    active: true,
    name: "Test Hotel",
    shortDesc: "Test description",
    url: "https://test.com",
    desktopImg: "https://test.com/desktop.jpg",
    cityName: "Miami",
    cityId: 1,
    state: "FL",
    code: "TEST",
    avgRating: 4.5,
    reviews: 100,
    reopenDate: null,
    hotelStar: 4,
    discounted: false,
    closedForSeason: null,
    createdAt: "2024-01-01",
    region: ["Florida"],
    favoritesCount: 10,
    hotelsCount: 1,
    availability: true,
    citySortOrder: 1,
    sortOrder: 1,
    rating: 4.5,
    productTypeId: 1,
    latitude: 25.7617,
    longitude: -80.1918,
    distanceText: "0.5 miles",
    objectId: "test-1",
    image: [],
    amenities: [],
    vibes: {
      primary: "Luxe",
      secondary: "Trendy",
    },
    products: [],
    ...overrides,
  };
}
