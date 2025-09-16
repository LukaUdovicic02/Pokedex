import { PokeAPI } from "./pokeapi.js";
import { startREPL } from "./repl.js"
import { initState } from "./state.js";

async function main() {
  startREPL(await initState());
}

main()