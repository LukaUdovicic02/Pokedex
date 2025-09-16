import { State } from "./state.js"

export async function commandHelp(state: State) {
   console.log()
   console.log("Welcome to the Pokedex!")
   console.log("Usage:")
   console.log()
   for(const cmd in state.commands)
   {
      console.log(`${state.commands[cmd].name}: ${state.commands[cmd].description}`)
   }
   console.log()
}