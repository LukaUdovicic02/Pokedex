import { State } from "./state.js";

export async function commandPokedex(state: State) {

    if(Object.keys(state.pokedex).length === 0)
    {
        console.log("You have to catch pokemon in order to see it in pokedex , try command catch <pokemon_name>")
    }

    else console.log("Your Pokedex:")
    for (const pokemon of Object.values(state.pokedex)) {
        console.log("   -", pokemon.name)
    }
    

}

