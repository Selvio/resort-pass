export interface Currency {
  isoCode: string;
  name: string;
  symbol: string;
}

export interface ImagePicture {
  url: string;
  results: {
    url: string;
  };
  details: {
    url: string;
  };
}

export interface HotelImage {
  picture: ImagePicture;
}

export interface Amenity {
  description: string;
  iconText: string;
  name: string;
}

export interface Vibe {
  primary: string;
  secondary: string;
}

export interface Product {
  id: number;
  name: string;
  quantity: number;
  showCurrency: boolean;
  price: number;
  availability: string;
  productTypeSortOrder: number;
  isStrikethroughPricing: boolean;
  discountPercentage: number;
  maxPrice: number;
  productTypeName: string;
  productTypeId: number;
}

export interface Hotel {
  id: number;
  active: boolean;
  name: string;
  shortDesc: string;
  url: string;
  desktopImg: string;
  cityName: string;
  cityId: number;
  state: string;
  code: string;
  avgRating: number;
  reviews: number;
  reopenDate: string | null;
  hotelStar: number;
  discounted: boolean;
  closedForSeason: string | null;
  createdAt: string;
  region: string[];
  favoritesCount: number;
  hotelsCount: number;
  availability: boolean;
  citySortOrder: number;
  sortOrder: number;
  rating: number;
  productTypeId: number;
  latitude: number;
  longitude: number;
  distanceText: string;
  objectId: string;
  image: HotelImage[];
  amenities: Amenity[];
  vibes: Vibe;
  products: Product[];
}

export interface SearchStage {
  stage: number;
  total: number;
  pages: number;
  page: number;
  hitsPerPage: number;
  userFromUsa: boolean;
  queryId: string;
  indexName: string;
  hotSpotHotels: string[];
  hotels: Hotel[];
  currency: Currency;
}

export type SearchResponse = SearchStage[];
