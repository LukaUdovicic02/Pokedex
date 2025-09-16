import { stdin, stdout } from "process";
import { createInterface, type Interface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { Location, PokeAPI, ShallowLocations } from "./pokeapi.js";
import { commandMapB } from "./command_mapb.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => Promise<void>;
};

export type State = {
  readline: Interface
  commands: Record<string, CLICommand>
  locations: ShallowLocations
  nextLocationURL: string | null
  prevLocationURL: string | null
  pokeapi: PokeAPI
}

export async function initState(): Promise<State> {
  const pokeapi = new PokeAPI(500)
  const locations = await pokeapi.fetchLocations()
  const nextLocationURL = locations.next
  const prevLocationURL = locations.previous

  const readline = createInterface({
    input: stdin,
    output: stdout,
    prompt: "Pokedex > ",
  });

  const commands: Record<string, CLICommand> = {
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: commandExit,
    },
    map: {
      name: "map",
      description: "Displays 20 location areas",
      callback: commandMap
    },
    mapb: {
      name: "mapb",
      description: "Displays next 20 location areas",
      callback: commandMapB
    }
  }

  return {
    readline,
    commands,
    locations,
    nextLocationURL,
    prevLocationURL,
    pokeapi
  }
}