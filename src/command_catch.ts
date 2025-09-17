import { State } from "./state.js";

export async function commandCatch(state: State, ...args: string[]) {
    if (args.length === 0) {
        console.log("Usage: catch <pokemon_name>")
        return
    }

    const pokemonName = args.join(" ")
    console.log(`Throwing a Pokeball at ${pokemonName}...`)
    const pokemon = await state.pokeapi.fetchPokemon(pokemonName)
    const isCatched = calculateChange(pokemon.base_experience)
    if (isCatched) {
        state.pokedex[pokemon.name] = pokemon

        console.log(`${pokemon.name} was caught!`)
        console.log("You may now inspect it with the inspect command.")
    }
    else console.log(`${pokemon.name} escaped`)
}

function calculateChange(exp: number) {
    const maxExp = 1000
    const minChance = 20
    const maxChance = 70

    const chance = Math.floor(maxChance - (exp / maxExp) * (maxChance - minChance))
    const roll = Math.random() * 100

    return chance > roll
}