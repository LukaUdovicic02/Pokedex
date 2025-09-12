import { CLICommand } from "./command.js";

export function commandHelp(commands: Record<string, CLICommand>) {
   console.log()
   console.log("Welcome to the Pokedex!")
   console.log("Usage:")
   console.log()
   for(const cmd in commands)
   {
      console.log(`${commands[cmd].name}: ${commands[cmd].description}`)
   }
   console.log()
}