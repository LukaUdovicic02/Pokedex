import { State } from "./state.js";

export async function commandMap(state:State) 
{
   for(const location of state.locations.results)
   {
      console.log(location.name)
   }  

   if(state.nextLocationURL)
   {
      state.locations = await state.pokeapi.fetchLocations(state.nextLocationURL)
      state.nextLocationURL = state.locations.next  
      state.prevLocationURL = state.locations.previous
   }
  
}

