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
  name: string
};