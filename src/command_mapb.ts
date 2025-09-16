import { State } from "./state.js";

export async function commandMapB(state: State) {

  if (state.prevLocationURL) {
    state.locations = await state.pokeapi.fetchLocations(state.prevLocationURL)
    state.prevLocationURL = state.locations.previous
    state.nextLocationURL = state.locations.next

    for (const location of state.locations.results) {
      console.log(location.name)
    }
  }
  else return console.log("you are on the first page")

  
}