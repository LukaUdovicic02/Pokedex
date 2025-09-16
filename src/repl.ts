import { State } from "./state.js";

export function cleanInput(input: string): string[] {
    return input
        .toLowerCase()
        .trim()
        .split(" ")
        .filter((word) => word !== "");
}

export async function startREPL(state: State) {
    state.readline.prompt()
    state.readline.on("line", async (line) => {
        let input = cleanInput(line);
        if (input.length === 0) {
            return state.readline.prompt();
        }
        const commands = state.commands;
        const cmd = input[0];
        const found = commands[cmd];
        if (!found) {
            console.log(`Unknown command: "${cmd}". Type "help" for a list of commands.`);
            return state.readline.prompt();
        }
        
        await found.callback(state);
        state.readline.prompt();
    })

}





