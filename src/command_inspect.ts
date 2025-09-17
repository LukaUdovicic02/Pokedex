
import { State } from "./state.js";

export async function commandInspect(state: State, ...args: string[]) {
    if (args.length === 0) {
        console.log("Usage: inspect <pokemon_name>")
        return
    }

    const pokemonName = args.join(" ")
    if(state.pokedex[pokemonName])
    {
        const pokemon = state.pokedex[pokemonName]
        console.log(`Name: ${pokemonName}`)
        console.log(`Height: ${pokemon.height}`)
        console.log(`Weight: ${pokemon.weight}`)
        console.log(`Stats:`)
        for(const stat of pokemon.stats)
        {
            console.log(`   -${stat.stat.name}: ${stat.base_stat}`)
        }
        console.log(`Types:`)
        for(const type of pokemon.types)
        {
            console.log(`   - ${type.type.name}`)
        }

    }
    else console.log("you have not caught that pokemon")


}

