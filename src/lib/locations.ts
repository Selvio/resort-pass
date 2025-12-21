import Fuse from "fuse.js";
import { MapPin, Building } from "lucide-react";

export type LocationType = "location" | "hotel";

export interface SearchLocation {
  id: string;
  type: LocationType;
  name: string;
  state?: string;
  icon: typeof MapPin | typeof Building;
  latitude?: number;
  longitude?: number;
}

export const searchLocations: SearchLocation[] = [
  {
    id: "miami-fl",
    type: "location",
    name: "Miami, Florida",
    state: "FL",
    icon: MapPin,
    latitude: 25.7617,
    longitude: -80.1918,
  },
  {
    id: "miami-beach-fl",
    type: "location",
    name: "Miami Beach, Florida",
    state: "FL",
    icon: MapPin,
    latitude: 25.7907,
    longitude: -80.13,
  },
  {
    id: "miami-airport-marriott",
    type: "hotel",
    name: "Miami Airport Marriott",
    state: "FL",
    icon: Building,
    latitude: 25.7953,
    longitude: -80.29,
  },
  {
    id: "miami-marriott-biscayne",
    type: "hotel",
    name: "Miami Marriott Biscayne Bay",
    state: "FL",
    icon: Building,
    latitude: 25.7886,
    longitude: -80.1881,
  },
  {
    id: "miami-nm",
    type: "location",
    name: "Miami, New Mexico",
    state: "NM",
    icon: MapPin,
    latitude: 33.3956,
    longitude: -108.8706,
  },
  {
    id: "miami-az",
    type: "location",
    name: "Miami, Arizona",
    state: "AZ",
    icon: MapPin,
    latitude: 33.3992,
    longitude: -110.8706,
  },
  {
    id: "miami-in",
    type: "location",
    name: "Miami, Indiana",
    state: "IN",
    icon: MapPin,
    latitude: 40.6153,
    longitude: -86.1061,
  },
  {
    id: "miami-mo",
    type: "location",
    name: "Miami, Missouri",
    state: "MO",
    icon: MapPin,
    latitude: 39.3206,
    longitude: -93.2283,
  },
  {
    id: "miamiville-oh",
    type: "location",
    name: "Miamiville, Ohio",
    state: "OH",
    icon: MapPin,
    latitude: 39.1981,
    longitude: -84.303,
  },
  {
    id: "miamitown-oh",
    type: "location",
    name: "Miamitown, Ohio",
    state: "OH",
    icon: MapPin,
    latitude: 39.2156,
    longitude: -84.7047,
  },
  {
    id: "miamitown-ok",
    type: "location",
    name: "Miamitown, Oklahoma",
    state: "OK",
    icon: MapPin,
    latitude: 35.9006,
    longitude: -94.8761,
  },
  {
    id: "fontainebleau-miami-beach",
    type: "hotel",
    name: "Fontainebleau Miami Beach",
    state: "FL",
    icon: Building,
    latitude: 25.7877,
    longitude: -80.1301,
  },
  {
    id: "eden-roc-miami-beach",
    type: "hotel",
    name: "Eden Roc Miami Beach",
    state: "FL",
    icon: Building,
    latitude: 25.7904,
    longitude: -80.1281,
  },
  {
    id: "ritz-carlton-south-beach",
    type: "hotel",
    name: "The Ritz-Carlton South Beach",
    state: "FL",
    icon: Building,
    latitude: 25.7753,
    longitude: -80.1316,
  },
  {
    id: "w-south-beach",
    type: "hotel",
    name: "W South Beach",
    state: "FL",
    icon: Building,
    latitude: 25.7891,
    longitude: -80.1294,
  },
  {
    id: "four-seasons-miami",
    type: "hotel",
    name: "Four Seasons Hotel Miami",
    state: "FL",
    icon: Building,
    latitude: 25.7673,
    longitude: -80.1911,
  },
  {
    id: "coral-gables-fl",
    type: "location",
    name: "Coral Gables, Florida",
    state: "FL",
    icon: MapPin,
    latitude: 25.7214,
    longitude: -80.2684,
  },
  {
    id: "key-biscayne-fl",
    type: "location",
    name: "Key Biscayne, Florida",
    state: "FL",
    icon: MapPin,
    latitude: 25.6931,
    longitude: -80.1628,
  },
  {
    id: "brickell-fl",
    type: "location",
    name: "Brickell, Florida",
    state: "FL",
    icon: MapPin,
    latitude: 25.7663,
    longitude: -80.1918,
  },
  {
    id: "south-beach-fl",
    type: "location",
    name: "South Beach, Florida",
    state: "FL",
    icon: MapPin,
    latitude: 25.7907,
    longitude: -80.13,
  },
  {
    id: "fort-lauderdale-fl",
    type: "location",
    name: "Fort Lauderdale, Florida",
    state: "FL",
    icon: MapPin,
    latitude: 26.1224,
    longitude: -80.1373,
  },
  {
    id: "west-palm-beach-fl",
    type: "location",
    name: "West Palm Beach, Florida",
    state: "FL",
    icon: MapPin,
    latitude: 26.7153,
    longitude: -80.0534,
  },
  {
    id: "key-largo-fl",
    type: "location",
    name: "Key Largo, Florida",
    state: "FL",
    icon: MapPin,
    latitude: 25.0865,
    longitude: -80.4473,
  },
  {
    id: "naples-fl",
    type: "location",
    name: "Naples, Florida",
    state: "FL",
    icon: MapPin,
    latitude: 26.142,
    longitude: -81.7948,
  },
  {
    id: "sarasota-fl",
    type: "location",
    name: "Sarasota, Florida",
    state: "FL",
    icon: MapPin,
    latitude: 27.3364,
    longitude: -82.5307,
  },
  {
    id: "orlando-fl",
    type: "location",
    name: "Orlando, Florida",
    state: "FL",
    icon: MapPin,
    latitude: 28.5383,
    longitude: -81.3792,
  },
  {
    id: "tampa-fl",
    type: "location",
    name: "Tampa, Florida",
    state: "FL",
    icon: MapPin,
    latitude: 27.9506,
    longitude: -82.4572,
  },
  {
    id: "key-west-fl",
    type: "location",
    name: "Key West, Florida",
    state: "FL",
    icon: MapPin,
    latitude: 24.5551,
    longitude: -81.7826,
  },
];

/**
 * Filters locations based on search query using fuzzy search
 */
export function filterLocations(query: string): SearchLocation[] {
  if (!query.trim()) {
    return searchLocations;
  }

  const fuse = new Fuse(searchLocations, {
    keys: [
      { name: "name", weight: 0.7 },
      { name: "state", weight: 0.3 },
    ],
    threshold: 0.4,
    includeScore: true,
    minMatchCharLength: 1,
    ignoreLocation: true,
    findAllMatches: true,
  });

  const results = fuse.search(query);
  return results.map((result) => result.item);
}
