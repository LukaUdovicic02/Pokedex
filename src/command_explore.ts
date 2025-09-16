import { State } from "./state.js";

export async function commandExplore(state: State, ...args: string[]) {
    if (args.length === 0) {
        console.log("Usage: explore <area_name>")
        return
    }
    const area = args.join("-")
    console.log(`Exploring ${area}...`)
    const namedLocations = await state.pokeapi.fetchLocation(area)
    console.log("Found Pokemon:")
    for (const location of namedLocations.pokemon_encounters) {
        console.log(` - ${location.pokemon.name}`)
    }

}

