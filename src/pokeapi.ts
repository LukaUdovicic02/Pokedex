import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private cache: Cache

  constructor(intervalMs: number) {
    this.cache = new Cache(intervalMs)
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {

    const fullUrl = `${pageURL ? pageURL : `${PokeAPI.baseURL}/location-area`}`

    const cached = this.cache.get<ShallowLocations>(fullUrl);
    if (cached) return cached;

    const response = await fetch(fullUrl)

    const locations = await response.json() as ShallowLocations
    this.cache.add(fullUrl, locations)
    return locations
  }

  stop() {
    this.cache.stopReapLoop()
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const fullUrl = `${PokeAPI.baseURL}/${locationName}`

    const cached = this.cache.get<Location>(fullUrl);
    if (cached) return cached;

    const response = await fetch(fullUrl)
    const locations = await response.json() as Location
    this.cache.add(fullUrl, locations)
    return locations
  }
}

export type ShallowLocations = {
  id: number,
  next: string
  previous: string
  results:
  {
    name: string,
    url: string
  }[]

};

export type Location = {
  encounter_method_rates: {
    encounter_method: {
      name: string;
      url: string;
    };
    version_details: {
      rate: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
  game_index: number;
  id: number;
  location: {
    name: string;
    url: string;
  };
  name: string;
  names: {
    language: {
      name: string;
      url: string;
    };
    name: string;
  }[];
  pokemon_encounters: {
    pokemon: {
      name: string;
      url: string;
    };
    version_details: {
      encounter_details: {
        chance: number;
        condition_values: any[];
        max_level: number;
        method: {
          name: string;
          url: string;
        };
        min_level: number;
      }[];
      max_chance: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
};