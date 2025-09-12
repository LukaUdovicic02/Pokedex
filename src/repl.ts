import { stdin, stdout } from "process";
import { createInterface } from "readline";
import { getCommands } from "./commands/command.js";

export function cleanInput(input:string): string[] {   
    return input
    .toLowerCase()
    .trim()
    .split(" ")
    .filter((word) => word !== "");
}

const rl = createInterface({
  input: stdin,
  output: stdout,
  prompt: "Pokedex > ",
});

export function startREPL() {
    rl.prompt()  
    rl.on("line", (line) => {
        let input = cleanInput(line);
        const commands = getCommands()
        const cmd = input[0]
        const found = commands[cmd]
        if(!found) {
            console.log(`Unknown command: "${cmd}". Type "help" for a list of commands.`,);
            return rl.prompt()
        }
        found.callback(commands)
    })
    
}





