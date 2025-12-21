import {
  cn,
  formatPrice,
  getHotelImages,
  getHotelClassLabel,
} from "@/lib/utils";
import type { Hotel } from "@/types";

import { createMockHotel } from "./test-helpers";

describe("cn", () => {
  it("should merge class names correctly", () => {
    const result = cn("foo", "bar");
    expect(result).toBe("foo bar");
  });

  it("should handle conditional classes", () => {
    const result = cn("foo", false && "bar", "baz");
    expect(result).toBe("foo baz");
  });

  it("should handle arrays of classes", () => {
    const result = cn(["foo", "bar"], "baz");
    expect(result).toBe("foo bar baz");
  });

  it("should handle objects with boolean values", () => {
    const result = cn({ foo: true, bar: false, baz: true });
    expect(result).toBe("foo baz");
  });

  it("should merge Tailwind classes correctly", () => {
    const result = cn("px-2 py-1", "px-4");
    expect(result).toBe("py-1 px-4");
  });

  it("should handle empty inputs", () => {
    const result = cn();
    expect(result).toBe("");
  });

  it("should handle null and undefined values", () => {
    const result = cn("foo", null, undefined, "bar");
    expect(result).toBe("foo bar");
  });

  it("should handle mixed input types", () => {
    const result = cn(
      "foo",
      ["bar", "baz"],
      { qux: true, quux: false },
      null,
      undefined
    );
    expect(result).toBe("foo bar baz qux");
  });
});

describe("formatPrice", () => {
  it("should format price with default dollar symbol", () => {
    const result = formatPrice(40);
    expect(result).toBe("$40");
  });

  it("should format price with custom currency symbol", () => {
    const result = formatPrice(40, "€");
    expect(result).toBe("€40");
  });

  it("should round decimal prices to nearest integer", () => {
    const result1 = formatPrice(40.4);
    const result2 = formatPrice(40.5);
    const result3 = formatPrice(40.7);
    expect(result1).toBe("$40");
    expect(result2).toBe("$41");
    expect(result3).toBe("$41");
  });

  it("should round up decimal prices", () => {
    const result = formatPrice(40.9);
    expect(result).toBe("$41");
  });

  it("should handle zero price", () => {
    const result = formatPrice(0);
    expect(result).toBe("$0");
  });

  it("should handle large prices", () => {
    const result = formatPrice(1000);
    expect(result).toBe("$1000");
  });

  it("should handle negative prices", () => {
    const result = formatPrice(-50);
    expect(result).toBe("$-50");
  });

  it("should handle prices with many decimal places", () => {
    const result = formatPrice(40.999999);
    expect(result).toBe("$41");
  });

  it("should handle empty string currency symbol", () => {
    const result = formatPrice(40, "");
    expect(result).toBe("40");
  });

  it("should handle multi-character currency symbols", () => {
    const result = formatPrice(40, "USD");
    expect(result).toBe("USD40");
  });
});

describe("getHotelImages", () => {
  it("should extract image URLs from hotel.image array", () => {
    const hotel = createMockHotel({
      image: [
        {
          picture: {
            url: "https://test.com/image1.jpg",
            results: { url: "https://test.com/image1-results.jpg" },
            details: { url: "https://test.com/image1-details.jpg" },
          },
        },
        {
          picture: {
            url: "https://test.com/image2.jpg",
            results: { url: "https://test.com/image2-results.jpg" },
            details: { url: "https://test.com/image2-details.jpg" },
          },
        },
      ],
    });

    const result = getHotelImages(hotel);
    expect(result).toEqual([
      "https://test.com/image1.jpg",
      "https://test.com/image2.jpg",
    ]);
  });

  it("should use desktopImg as fallback when image array is empty", () => {
    const hotel = createMockHotel({
      image: [],
      desktopImg: "https://test.com/fallback.jpg",
    });

    const result = getHotelImages(hotel);
    expect(result).toEqual(["https://test.com/fallback.jpg"]);
  });

  it("should use desktopImg as fallback when image array is undefined", () => {
    const hotel = createMockHotel({
      image: undefined as unknown as Hotel["image"],
      desktopImg: "https://test.com/fallback.jpg",
    });

    const result = getHotelImages(hotel);
    expect(result).toEqual(["https://test.com/fallback.jpg"]);
  });

  it("should return empty array when no images are available", () => {
    const hotel = createMockHotel({
      image: [],
      desktopImg: "",
    });

    const result = getHotelImages(hotel);
    expect(result).toEqual([]);
  });

  it("should return empty array when image array and desktopImg are both missing", () => {
    const hotel = createMockHotel({
      image: [],
      desktopImg: undefined as unknown as string,
    });

    const result = getHotelImages(hotel);
    expect(result).toEqual([]);
  });

  it("should filter out images with missing picture.url", () => {
    const hotel = createMockHotel({
      image: [
        {
          picture: {
            url: "https://test.com/image1.jpg",
            results: { url: "https://test.com/image1-results.jpg" },
            details: { url: "https://test.com/image1-details.jpg" },
          },
        },
        {
          picture: {
            url: "",
            results: { url: "https://test.com/image2-results.jpg" },
            details: { url: "https://test.com/image2-details.jpg" },
          },
        },
        {
          picture: {
            url: "https://test.com/image3.jpg",
            results: { url: "https://test.com/image3-results.jpg" },
            details: { url: "https://test.com/image3-details.jpg" },
          },
        },
      ],
    });

    const result = getHotelImages(hotel);
    expect(result).toEqual([
      "https://test.com/image1.jpg",
      "https://test.com/image3.jpg",
    ]);
  });

  it("should filter out images with undefined picture.url", () => {
    const hotel = createMockHotel({
      image: [
        {
          picture: {
            url: "https://test.com/image1.jpg",
            results: { url: "https://test.com/image1-results.jpg" },
            details: { url: "https://test.com/image1-details.jpg" },
          },
        },
        {
          picture: {
            url: undefined as unknown as string,
            results: { url: "https://test.com/image2-results.jpg" },
            details: { url: "https://test.com/image2-details.jpg" },
          },
        },
      ],
    });

    const result = getHotelImages(hotel);
    expect(result).toEqual(["https://test.com/image1.jpg"]);
  });

  it("should filter out images with null picture.url", () => {
    const hotel = createMockHotel({
      image: [
        {
          picture: {
            url: "https://test.com/image1.jpg",
            results: { url: "https://test.com/image1-results.jpg" },
            details: { url: "https://test.com/image1-details.jpg" },
          },
        },
        {
          picture: {
            url: null as unknown as string,
            results: { url: "https://test.com/image2-results.jpg" },
            details: { url: "https://test.com/image2-details.jpg" },
          },
        },
      ],
    });

    const result = getHotelImages(hotel);
    expect(result).toEqual(["https://test.com/image1.jpg"]);
  });

  it("should handle images with missing picture property", () => {
    const hotel = createMockHotel({
      image: [
        {
          picture: {
            url: "https://test.com/image1.jpg",
            results: { url: "https://test.com/image1-results.jpg" },
            details: { url: "https://test.com/image1-details.jpg" },
          },
        },
        {
          picture: undefined as unknown as Hotel["image"][0]["picture"],
        },
      ],
    });

    const result = getHotelImages(hotel);
    expect(result).toEqual(["https://test.com/image1.jpg"]);
  });

  it("should prioritize image array over desktopImg", () => {
    const hotel = createMockHotel({
      image: [
        {
          picture: {
            url: "https://test.com/image1.jpg",
            results: { url: "https://test.com/image1-results.jpg" },
            details: { url: "https://test.com/image1-details.jpg" },
          },
        },
      ],
      desktopImg: "https://test.com/fallback.jpg",
    });

    const result = getHotelImages(hotel);
    expect(result).toEqual(["https://test.com/image1.jpg"]);
    expect(result).not.toContain("https://test.com/fallback.jpg");
  });
});

describe("getHotelClassLabel", () => {
  it("should return 'Any' for 'any' option", () => {
    const result = getHotelClassLabel("any");
    expect(result).toBe("Any");
  });

  it("should return '5 Star hotels' for '5-star' option", () => {
    const result = getHotelClassLabel("5-star");
    expect(result).toBe("5 Star hotels");
  });

  it("should return '4 Star+ Hotels' for '4-star+' option", () => {
    const result = getHotelClassLabel("4-star+");
    expect(result).toBe("4 Star+ Hotels");
  });

  it("should return '4 Star+ Hotels' for unknown option", () => {
    const result = getHotelClassLabel("unknown");
    expect(result).toBe("4 Star+ Hotels");
  });

  it("should return '4 Star+ Hotels' for empty string", () => {
    const result = getHotelClassLabel("");
    expect(result).toBe("4 Star+ Hotels");
  });

  it("should handle case sensitivity correctly", () => {
    const result1 = getHotelClassLabel("ANY");
    const result2 = getHotelClassLabel("5-STAR");
    expect(result1).toBe("4 Star+ Hotels");
    expect(result2).toBe("4 Star+ Hotels");
  });
});
