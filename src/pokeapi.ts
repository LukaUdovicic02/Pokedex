export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    
    const fullUrl = `${pageURL ? pageURL : `${PokeAPI.baseURL}/location-area`}`

    const response = await fetch(fullUrl, {
        method: "GET",
        mode:"cors",
        headers:{
            "Content-Type":"application/json"
        }
    })

    const locations = await response.json()
    
    return locations
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const fullUrl = `${PokeAPI.baseURL}/${locationName}`

    const response = await fetch(fullUrl, {
        method: "GET",
        mode:"cors",
        headers:{
            "Content-Type":"application/json"
        }
    })

    const locations = await response.json()
    return locations
  }
}

export type ShallowLocations = {
   id:number,
   next: string
   previous: string
   results: 
   [{
      name:string,
      url:string
    }]

};

export type Location = {
  name: string
};