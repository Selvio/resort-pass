import type { SearchState } from "@/contexts/SearchContext";
import { TOP_RATED_MIN_RATING } from "@/lib/constants";
import {
  filterHotelsByPool,
  filterHotelsBySpa,
  filterHotelsByDayRoom,
  filterByLocation,
  filterByTab,
  filterByAvailability,
  filterByHotelClass,
  filterByAmenities,
  filterByVibes,
  filterByTopRated,
  applyFilters,
} from "@/lib/filters";
import { searchLocations } from "@/lib/locations";
import type { Hotel } from "@/types";

import { createMockHotel } from "./test-helpers";

describe("filterHotelsByPool", () => {
  it("should filter hotels with pool-related products", () => {
    const hotels: Hotel[] = [
      createMockHotel({
        id: 1,
        products: [
          {
            id: 1,
            name: "Day Pass",
            quantity: 1,
            showCurrency: true,
            price: 100,
            availability: "available",
            productTypeSortOrder: 1,
            isStrikethroughPricing: false,
            discountPercentage: 0,
            maxPrice: 100,
            productTypeName: "Day Pass",
            productTypeId: 1,
          },
        ],
      }),
      createMockHotel({
        id: 2,
        products: [
          {
            id: 2,
            name: "Cabana",
            quantity: 1,
            showCurrency: true,
            price: 200,
            availability: "available",
            productTypeSortOrder: 1,
            isStrikethroughPricing: false,
            discountPercentage: 0,
            maxPrice: 200,
            productTypeName: "Cabana",
            productTypeId: 2,
          },
        ],
      }),
      createMockHotel({
        id: 3,
        products: [
          {
            id: 3,
            name: "Spa Pass",
            quantity: 1,
            showCurrency: true,
            price: 150,
            availability: "available",
            productTypeSortOrder: 1,
            isStrikethroughPricing: false,
            discountPercentage: 0,
            maxPrice: 150,
            productTypeName: "Spa Pass",
            productTypeId: 3,
          },
        ],
      }),
      createMockHotel({
        id: 4,
        products: [],
      }),
    ];

    const result = filterHotelsByPool(hotels);
    expect(result).toHaveLength(2);
    expect(result.map((h) => h.id)).toEqual([1, 2]);
  });

  it("should return empty array when no hotels have pool products", () => {
    const hotels: Hotel[] = [
      createMockHotel({
        id: 1,
        products: [
          {
            id: 1,
            name: "Spa Pass",
            quantity: 1,
            showCurrency: true,
            price: 100,
            availability: "available",
            productTypeSortOrder: 1,
            isStrikethroughPricing: false,
            discountPercentage: 0,
            maxPrice: 100,
            productTypeName: "Spa Pass",
            productTypeId: 1,
          },
        ],
      }),
    ];

    const result = filterHotelsByPool(hotels);
    expect(result).toHaveLength(0);
  });

  it("should handle hotels with undefined products", () => {
    const hotels: Hotel[] = [
      createMockHotel({
        id: 1,
        products: undefined as unknown as Hotel["products"],
      }),
    ];

    const result = filterHotelsByPool(hotels);
    expect(result).toHaveLength(0);
  });
});

describe("filterHotelsBySpa", () => {
  it("should filter hotels with spa-related products", () => {
    const hotels: Hotel[] = [
      createMockHotel({
        id: 1,
        products: [
          {
            id: 1,
            name: "Spa Pass",
            quantity: 1,
            showCurrency: true,
            price: 100,
            availability: "available",
            productTypeSortOrder: 1,
            isStrikethroughPricing: false,
            discountPercentage: 0,
            maxPrice: 100,
            productTypeName: "Spa Pass",
            productTypeId: 1,
          },
        ],
      }),
      createMockHotel({
        id: 2,
        products: [
          {
            id: 2,
            name: "Massage",
            quantity: 1,
            showCurrency: true,
            price: 150,
            availability: "available",
            productTypeSortOrder: 1,
            isStrikethroughPricing: false,
            discountPercentage: 0,
            maxPrice: 150,
            productTypeName: "Massage",
            productTypeId: 2,
          },
        ],
      }),
      createMockHotel({
        id: 3,
        products: [
          {
            id: 3,
            name: "Day Pass",
            quantity: 1,
            showCurrency: true,
            price: 100,
            availability: "available",
            productTypeSortOrder: 1,
            isStrikethroughPricing: false,
            discountPercentage: 0,
            maxPrice: 100,
            productTypeName: "Day Pass",
            productTypeId: 3,
          },
        ],
      }),
    ];

    const result = filterHotelsBySpa(hotels);
    expect(result).toHaveLength(2);
    expect(result.map((h) => h.id)).toEqual([1, 2]);
  });

  it("should return empty array when no hotels have spa products", () => {
    const hotels: Hotel[] = [
      createMockHotel({
        id: 1,
        products: [
          {
            id: 1,
            name: "Day Pass",
            quantity: 1,
            showCurrency: true,
            price: 100,
            availability: "available",
            productTypeSortOrder: 1,
            isStrikethroughPricing: false,
            discountPercentage: 0,
            maxPrice: 100,
            productTypeName: "Day Pass",
            productTypeId: 1,
          },
        ],
      }),
    ];

    const result = filterHotelsBySpa(hotels);
    expect(result).toHaveLength(0);
  });
});

describe("filterHotelsByDayRoom", () => {
  it("should filter hotels with Day Room products", () => {
    const hotels: Hotel[] = [
      createMockHotel({
        id: 1,
        products: [
          {
            id: 1,
            name: "Day Room",
            quantity: 1,
            showCurrency: true,
            price: 200,
            availability: "available",
            productTypeSortOrder: 1,
            isStrikethroughPricing: false,
            discountPercentage: 0,
            maxPrice: 200,
            productTypeName: "Day Room",
            productTypeId: 1,
          },
        ],
      }),
      createMockHotel({
        id: 2,
        products: [
          {
            id: 2,
            name: "Day Pass",
            quantity: 1,
            showCurrency: true,
            price: 100,
            availability: "available",
            productTypeSortOrder: 1,
            isStrikethroughPricing: false,
            discountPercentage: 0,
            maxPrice: 100,
            productTypeName: "Day Pass",
            productTypeId: 2,
          },
        ],
      }),
    ];

    const result = filterHotelsByDayRoom(hotels);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
  });

  it("should return empty array when no hotels have Day Room products", () => {
    const hotels: Hotel[] = [
      createMockHotel({
        id: 1,
        products: [
          {
            id: 1,
            name: "Day Pass",
            quantity: 1,
            showCurrency: true,
            price: 100,
            availability: "available",
            productTypeSortOrder: 1,
            isStrikethroughPricing: false,
            discountPercentage: 0,
            maxPrice: 100,
            productTypeName: "Day Pass",
            productTypeId: 1,
          },
        ],
      }),
    ];

    const result = filterHotelsByDayRoom(hotels);
    expect(result).toHaveLength(0);
  });
});

describe("filterByLocation", () => {
  it("should filter hotels within the specified radius", () => {
    const miamiLocation = searchLocations.find((loc) => loc.id === "miami-fl");
    expect(miamiLocation).toBeDefined();

    const hotels: Hotel[] = [
      // Hotel very close to Miami (should be included)
      createMockHotel({
        id: 1,
        latitude: 25.7617,
        longitude: -80.1918,
      }),
      // Hotel far from Miami (should be excluded)
      createMockHotel({
        id: 2,
        latitude: 40.7128,
        longitude: -74.006,
      }),
    ];

    const result = filterByLocation(hotels, "miami-fl", 50);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
  });

  it("should return all hotels when location is not found", () => {
    const hotels: Hotel[] = [
      createMockHotel({ id: 1 }),
      createMockHotel({ id: 2 }),
    ];

    const result = filterByLocation(hotels, "non-existent-location");
    expect(result).toHaveLength(2);
  });

  it("should return all hotels when location has no coordinates", () => {
    const hotels: Hotel[] = [
      createMockHotel({ id: 1 }),
      createMockHotel({ id: 2 }),
    ];

    // Create a mock location without coordinates
    jest.spyOn(searchLocations, "find").mockReturnValueOnce({
      id: "test",
      type: "location",
      name: "Test",
      icon: {} as unknown as typeof import("lucide-react").MapPin,
    } as unknown as (typeof searchLocations)[0]);

    const result = filterByLocation(hotels, "test");
    expect(result).toHaveLength(2);

    jest.restoreAllMocks();
  });

  it("should respect custom radius", () => {
    const miamiLocation = searchLocations.find((loc) => loc.id === "miami-fl");
    expect(miamiLocation).toBeDefined();

    const hotels: Hotel[] = [
      // Hotel 30 miles from Miami
      createMockHotel({
        id: 1,
        latitude: 25.7617 + 0.43, // Approximately 30 miles north
        longitude: -80.1918,
      }),
    ];

    // Should be included with 50 mile radius
    const result50 = filterByLocation(hotels, "miami-fl", 50);
    expect(result50).toHaveLength(1);

    // Should be excluded with 20 mile radius
    const result20 = filterByLocation(hotels, "miami-fl", 20);
    expect(result20).toHaveLength(0);
  });
});

describe("filterByTab", () => {
  it("should filter by pool tab", () => {
    const hotels: Hotel[] = [
      createMockHotel({
        id: 1,
        products: [
          {
            id: 1,
            name: "Day Pass",
            quantity: 1,
            showCurrency: true,
            price: 100,
            availability: "available",
            productTypeSortOrder: 1,
            isStrikethroughPricing: false,
            discountPercentage: 0,
            maxPrice: 100,
            productTypeName: "Day Pass",
            productTypeId: 1,
          },
        ],
      }),
      createMockHotel({
        id: 2,
        products: [
          {
            id: 2,
            name: "Spa Pass",
            quantity: 1,
            showCurrency: true,
            price: 150,
            availability: "available",
            productTypeSortOrder: 1,
            isStrikethroughPricing: false,
            discountPercentage: 0,
            maxPrice: 150,
            productTypeName: "Spa Pass",
            productTypeId: 2,
          },
        ],
      }),
    ];

    const result = filterByTab(hotels, "pool");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
  });

  it("should filter by spa tab", () => {
    const hotels: Hotel[] = [
      createMockHotel({
        id: 1,
        products: [
          {
            id: 1,
            name: "Spa Pass",
            quantity: 1,
            showCurrency: true,
            price: 150,
            availability: "available",
            productTypeSortOrder: 1,
            isStrikethroughPricing: false,
            discountPercentage: 0,
            maxPrice: 150,
            productTypeName: "Spa Pass",
            productTypeId: 1,
          },
        ],
      }),
      createMockHotel({
        id: 2,
        products: [
          {
            id: 2,
            name: "Day Pass",
            quantity: 1,
            showCurrency: true,
            price: 100,
            availability: "available",
            productTypeSortOrder: 1,
            isStrikethroughPricing: false,
            discountPercentage: 0,
            maxPrice: 100,
            productTypeName: "Day Pass",
            productTypeId: 2,
          },
        ],
      }),
    ];

    const result = filterByTab(hotels, "spa");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
  });

  it("should filter by day-room tab", () => {
    const hotels: Hotel[] = [
      createMockHotel({
        id: 1,
        products: [
          {
            id: 1,
            name: "Day Room",
            quantity: 1,
            showCurrency: true,
            price: 200,
            availability: "available",
            productTypeSortOrder: 1,
            isStrikethroughPricing: false,
            discountPercentage: 0,
            maxPrice: 200,
            productTypeName: "Day Room",
            productTypeId: 1,
          },
        ],
      }),
      createMockHotel({
        id: 2,
        products: [
          {
            id: 2,
            name: "Day Pass",
            quantity: 1,
            showCurrency: true,
            price: 100,
            availability: "available",
            productTypeSortOrder: 1,
            isStrikethroughPricing: false,
            discountPercentage: 0,
            maxPrice: 100,
            productTypeName: "Day Pass",
            productTypeId: 2,
          },
        ],
      }),
    ];

    const result = filterByTab(hotels, "day-room");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
  });

  it("should return all hotels for 'all' tab", () => {
    const hotels: Hotel[] = [
      createMockHotel({ id: 1 }),
      createMockHotel({ id: 2 }),
    ];

    const result = filterByTab(hotels, "all");
    expect(result).toHaveLength(2);
  });

  it("should return all hotels for default/unknown tab", () => {
    const hotels: Hotel[] = [
      createMockHotel({ id: 1 }),
      createMockHotel({ id: 2 }),
    ];

    const result = filterByTab(hotels, "unknown");
    expect(result).toHaveLength(2);
  });
});

describe("filterByAvailability", () => {
  it("should return all hotels when onlyAvailable is false", () => {
    const hotels: Hotel[] = [
      createMockHotel({ id: 1, availability: true }),
      createMockHotel({ id: 2, availability: false }),
    ];

    const result = filterByAvailability(hotels, false);
    expect(result).toHaveLength(2);
  });

  it("should filter to only available hotels when onlyAvailable is true", () => {
    const hotels: Hotel[] = [
      createMockHotel({ id: 1, availability: true }),
      createMockHotel({ id: 2, availability: false }),
      createMockHotel({ id: 3, availability: true }),
    ];

    const result = filterByAvailability(hotels, true);
    expect(result).toHaveLength(2);
    expect(result.map((h) => h.id)).toEqual([1, 3]);
  });
});

describe("filterByHotelClass", () => {
  it("should return all hotels when hotelClass is 'any'", () => {
    const hotels: Hotel[] = [
      createMockHotel({ id: 1, hotelStar: 3 }),
      createMockHotel({ id: 2, hotelStar: 4 }),
      createMockHotel({ id: 3, hotelStar: 5 }),
    ];

    const result = filterByHotelClass(hotels, "any");
    expect(result).toHaveLength(3);
  });

  it("should filter to only 5-star hotels", () => {
    const hotels: Hotel[] = [
      createMockHotel({ id: 1, hotelStar: 4 }),
      createMockHotel({ id: 2, hotelStar: 5 }),
      createMockHotel({ id: 3, hotelStar: 5 }),
    ];

    const result = filterByHotelClass(hotels, "5-star");
    expect(result).toHaveLength(2);
    expect(result.map((h) => h.id)).toEqual([2, 3]);
  });

  it("should filter to 4-star and above hotels", () => {
    const hotels: Hotel[] = [
      createMockHotel({ id: 1, hotelStar: 3 }),
      createMockHotel({ id: 2, hotelStar: 4 }),
      createMockHotel({ id: 3, hotelStar: 5 }),
    ];

    const result = filterByHotelClass(hotels, "4-star+");
    expect(result).toHaveLength(2);
    expect(result.map((h) => h.id)).toEqual([2, 3]);
  });

  it("should return all hotels for unknown hotelClass", () => {
    const hotels: Hotel[] = [
      createMockHotel({ id: 1, hotelStar: 3 }),
      createMockHotel({ id: 2, hotelStar: 4 }),
    ];

    const result = filterByHotelClass(hotels, "unknown");
    expect(result).toHaveLength(2);
  });
});

describe("filterByAmenities", () => {
  it("should return all hotels when no amenities are selected", () => {
    const hotels: Hotel[] = [
      createMockHotel({ id: 1 }),
      createMockHotel({ id: 2 }),
    ];

    const result = filterByAmenities(hotels, []);
    expect(result).toHaveLength(2);
  });

  it("should filter hotels with spa amenity", () => {
    const hotels: Hotel[] = [
      createMockHotel({
        id: 1,
        amenities: [
          {
            description: "Spa",
            iconText: "spa",
            name: "spa",
          },
        ],
      }),
      createMockHotel({
        id: 2,
        amenities: [
          {
            description: "Gym",
            iconText: "gym",
            name: "fitness-center",
          },
        ],
      }),
    ];

    const result = filterByAmenities(hotels, ["spa"]);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
  });

  it("should filter hotels with beach-access amenity", () => {
    const hotels: Hotel[] = [
      createMockHotel({
        id: 1,
        amenities: [
          {
            description: "Beach",
            iconText: "beach",
            name: "beach",
          },
        ],
      }),
      createMockHotel({
        id: 2,
        amenities: [],
      }),
    ];

    const result = filterByAmenities(hotels, ["beach-access"]);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
  });

  it("should filter hotels with all-inclusive amenity (requires both food and drink)", () => {
    const hotels: Hotel[] = [
      createMockHotel({
        id: 1,
        amenities: [
          {
            description: "Food",
            iconText: "food",
            name: "food",
          },
          {
            description: "Drink",
            iconText: "drink",
            name: "drink",
          },
        ],
      }),
      createMockHotel({
        id: 2,
        amenities: [
          {
            description: "Food",
            iconText: "food",
            name: "food",
          },
        ],
      }),
    ];

    const result = filterByAmenities(hotels, ["all-inclusive"]);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
  });

  it("should filter hotels with multiple amenities (all must match)", () => {
    const hotels: Hotel[] = [
      createMockHotel({
        id: 1,
        amenities: [
          {
            description: "Spa",
            iconText: "spa",
            name: "spa",
          },
          {
            description: "Gym",
            iconText: "gym",
            name: "fitness-center",
          },
        ],
      }),
      createMockHotel({
        id: 2,
        amenities: [
          {
            description: "Spa",
            iconText: "spa",
            name: "spa",
          },
        ],
      }),
    ];

    const result = filterByAmenities(hotels, ["spa", "gym"]);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
  });

  it("should handle hotels with undefined amenities", () => {
    const hotels: Hotel[] = [
      createMockHotel({
        id: 1,
        amenities: undefined as unknown as Hotel["amenities"],
      }),
    ];

    const result = filterByAmenities(hotels, ["spa"]);
    expect(result).toHaveLength(0);
  });
});

describe("filterByVibes", () => {
  it("should return all hotels when no vibes are selected", () => {
    const hotels: Hotel[] = [
      createMockHotel({ id: 1 }),
      createMockHotel({ id: 2 }),
    ];

    const result = filterByVibes(hotels, []);
    expect(result).toHaveLength(2);
  });

  it("should filter hotels with matching primary vibe", () => {
    const hotels: Hotel[] = [
      createMockHotel({
        id: 1,
        vibes: {
          primary: "Luxe",
          secondary: "Trendy",
        },
      }),
      createMockHotel({
        id: 2,
        vibes: {
          primary: "Family-Friendly",
          secondary: "Serene",
        },
      }),
    ];

    const result = filterByVibes(hotels, ["Luxe"]);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
  });

  it("should filter hotels with matching secondary vibe", () => {
    const hotels: Hotel[] = [
      createMockHotel({
        id: 1,
        vibes: {
          primary: "Luxe",
          secondary: "Trendy",
        },
      }),
      createMockHotel({
        id: 2,
        vibes: {
          primary: "Family-Friendly",
          secondary: "Serene",
        },
      }),
    ];

    const result = filterByVibes(hotels, ["Trendy"]);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
  });

  it("should filter hotels with any of the selected vibes", () => {
    const hotels: Hotel[] = [
      createMockHotel({
        id: 1,
        vibes: {
          primary: "Luxe",
          secondary: "Trendy",
        },
      }),
      createMockHotel({
        id: 2,
        vibes: {
          primary: "Family-Friendly",
          secondary: "Serene",
        },
      }),
      createMockHotel({
        id: 3,
        vibes: {
          primary: "Trendy",
          secondary: "Luxe",
        },
      }),
    ];

    const result = filterByVibes(hotels, ["Luxe", "Serene"]);
    expect(result).toHaveLength(3);
  });

  it("should handle hotels with undefined vibes", () => {
    const hotels: Hotel[] = [
      createMockHotel({
        id: 1,
        vibes: undefined as unknown as Hotel["vibes"],
      }),
    ];

    const result = filterByVibes(hotels, ["Luxe"]);
    expect(result).toHaveLength(0);
  });

  it("should handle hotels with null primary or secondary vibes", () => {
    const hotels: Hotel[] = [
      createMockHotel({
        id: 1,
        vibes: {
          primary: "Luxe",
          secondary: null as unknown as string,
        },
      }),
      createMockHotel({
        id: 2,
        vibes: {
          primary: null as unknown as string,
          secondary: "Trendy",
        },
      }),
    ];

    const result = filterByVibes(hotels, ["Luxe", "Trendy"]);
    expect(result).toHaveLength(2);
  });
});

describe("filterByTopRated", () => {
  it("should return all hotels when topRated is false", () => {
    const hotels: Hotel[] = [
      createMockHotel({ id: 1, rating: 4.0 }),
      createMockHotel({ id: 2, rating: 4.5 }),
      createMockHotel({ id: 3, rating: 3.5 }),
    ];

    const result = filterByTopRated(hotels, false);
    expect(result).toHaveLength(3);
  });

  it("should filter to only top-rated hotels (rating >= 4.5)", () => {
    const hotels: Hotel[] = [
      createMockHotel({ id: 1, rating: 4.0 }),
      createMockHotel({ id: 2, rating: 4.5 }),
      createMockHotel({ id: 3, rating: 4.8 }),
      createMockHotel({ id: 4, rating: 3.5 }),
    ];

    const result = filterByTopRated(hotels, true);
    expect(result).toHaveLength(2);
    expect(result.map((h) => h.id)).toEqual([2, 3]);
  });

  it("should include hotels with exactly 4.5 rating", () => {
    const hotels: Hotel[] = [
      createMockHotel({ id: 1, rating: TOP_RATED_MIN_RATING }),
    ];

    const result = filterByTopRated(hotels, true);
    expect(result).toHaveLength(1);
  });

  it("should exclude hotels with rating below 4.5", () => {
    const hotels: Hotel[] = [createMockHotel({ id: 1, rating: 4.4 })];

    const result = filterByTopRated(hotels, true);
    expect(result).toHaveLength(0);
  });
});

describe("applyFilters", () => {
  const createSearchState = (
    overrides: Partial<SearchState> = {}
  ): SearchState => {
    return {
      location: "miami-fl",
      date: new Date(),
      onlyAvailable: false,
      selectedHotelClass: "any",
      selectedAmenities: [],
      selectedVibes: [],
      topRated: false,
      ...overrides,
    };
  };

  it("should apply all filters correctly", () => {
    const hotels: Hotel[] = [
      createMockHotel({
        id: 1,
        latitude: 25.7617,
        longitude: -80.1918,
        availability: true,
        hotelStar: 5,
        rating: 4.8,
        products: [
          {
            id: 1,
            name: "Day Pass",
            quantity: 1,
            showCurrency: true,
            price: 100,
            availability: "available",
            productTypeSortOrder: 1,
            isStrikethroughPricing: false,
            discountPercentage: 0,
            maxPrice: 100,
            productTypeName: "Day Pass",
            productTypeId: 1,
          },
        ],
        amenities: [
          {
            description: "Spa",
            iconText: "spa",
            name: "spa",
          },
        ],
        vibes: {
          primary: "Luxe",
          secondary: "Trendy",
        },
      }),
      createMockHotel({
        id: 2,
        latitude: 40.7128,
        longitude: -74.006,
        availability: false,
        hotelStar: 3,
        rating: 3.5,
        products: [],
        amenities: [],
        vibes: {
          primary: "Family-Friendly",
          secondary: "Serene",
        },
      }),
    ];

    const searchState = createSearchState({
      location: "miami-fl",
      onlyAvailable: true,
      selectedHotelClass: "5-star",
      selectedAmenities: ["spa"],
      selectedVibes: ["Luxe"],
      topRated: true,
    });

    const result = applyFilters(hotels, searchState, "pool");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
  });

  it("should apply tab filter first", () => {
    const hotels: Hotel[] = [
      createMockHotel({
        id: 1,
        products: [
          {
            id: 1,
            name: "Day Pass",
            quantity: 1,
            showCurrency: true,
            price: 100,
            availability: "available",
            productTypeSortOrder: 1,
            isStrikethroughPricing: false,
            discountPercentage: 0,
            maxPrice: 100,
            productTypeName: "Day Pass",
            productTypeId: 1,
          },
        ],
      }),
      createMockHotel({
        id: 2,
        products: [
          {
            id: 2,
            name: "Spa Pass",
            quantity: 1,
            showCurrency: true,
            price: 150,
            availability: "available",
            productTypeSortOrder: 1,
            isStrikethroughPricing: false,
            discountPercentage: 0,
            maxPrice: 150,
            productTypeName: "Spa Pass",
            productTypeId: 2,
          },
        ],
      }),
    ];

    const searchState = createSearchState();
    const result = applyFilters(hotels, searchState, "pool");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
  });

  it("should apply location filter", () => {
    const hotels: Hotel[] = [
      createMockHotel({
        id: 1,
        latitude: 25.7617,
        longitude: -80.1918,
      }),
      createMockHotel({
        id: 2,
        latitude: 40.7128,
        longitude: -74.006,
      }),
    ];

    const searchState = createSearchState({
      location: "miami-fl",
    });
    const result = applyFilters(hotels, searchState, "all");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
  });

  it("should apply availability filter", () => {
    const hotels: Hotel[] = [
      createMockHotel({ id: 1, availability: true }),
      createMockHotel({ id: 2, availability: false }),
    ];

    const searchState = createSearchState({
      onlyAvailable: true,
    });
    const result = applyFilters(hotels, searchState, "all");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
  });

  it("should apply hotel class filter", () => {
    const hotels: Hotel[] = [
      createMockHotel({ id: 1, hotelStar: 5 }),
      createMockHotel({ id: 2, hotelStar: 3 }),
    ];

    const searchState = createSearchState({
      selectedHotelClass: "5-star",
    });
    const result = applyFilters(hotels, searchState, "all");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
  });

  it("should apply amenities filter", () => {
    const hotels: Hotel[] = [
      createMockHotel({
        id: 1,
        amenities: [
          {
            description: "Spa",
            iconText: "spa",
            name: "spa",
          },
        ],
      }),
      createMockHotel({
        id: 2,
        amenities: [],
      }),
    ];

    const searchState = createSearchState({
      selectedAmenities: ["spa"],
    });
    const result = applyFilters(hotels, searchState, "all");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
  });

  it("should apply vibes filter", () => {
    const hotels: Hotel[] = [
      createMockHotel({
        id: 1,
        vibes: {
          primary: "Luxe",
          secondary: "Trendy",
        },
      }),
      createMockHotel({
        id: 2,
        vibes: {
          primary: "Family-Friendly",
          secondary: "Serene",
        },
      }),
    ];

    const searchState = createSearchState({
      selectedVibes: ["Luxe"],
    });
    const result = applyFilters(hotels, searchState, "all");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
  });

  it("should apply top rated filter", () => {
    const hotels: Hotel[] = [
      createMockHotel({ id: 1, rating: 4.8 }),
      createMockHotel({ id: 2, rating: 3.5 }),
    ];

    const searchState = createSearchState({
      topRated: true,
    });
    const result = applyFilters(hotels, searchState, "all");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
  });

  it("should return empty array when no hotels match all filters", () => {
    const hotels: Hotel[] = [
      createMockHotel({
        id: 1,
        latitude: 40.7128,
        longitude: -74.006,
        availability: false,
        hotelStar: 3,
        rating: 3.5,
      }),
    ];

    const searchState = createSearchState({
      location: "miami-fl",
      onlyAvailable: true,
      selectedHotelClass: "5-star",
      topRated: true,
    });
    const result = applyFilters(hotels, searchState, "all");
    expect(result).toHaveLength(0);
  });

  it("should handle empty hotels array", () => {
    const hotels: Hotel[] = [];
    const searchState = createSearchState();
    const result = applyFilters(hotels, searchState, "all");
    expect(result).toHaveLength(0);
  });
});
