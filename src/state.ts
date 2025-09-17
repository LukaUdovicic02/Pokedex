import { stdin, stdout } from "process";
import { createInterface, type Interface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { Location, PokeAPI, Pokemon, ShallowLocations } from "./pokeapi.js";
import { commandMapB } from "./command_mapb.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";
import { commandPokedex } from "./command_pokedex.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args:string[]) => Promise<void>;
};

export type State = {
  readline: Interface
  commands: Record<string, CLICommand>
  locations: ShallowLocations
  nextLocationURL: string | null
  prevLocationURL: string | null
  pokeapi: PokeAPI
  pokedex: Record<string, Pokemon>
}

export async function initState(intervalMs: number): Promise<State> {

  const pokeapi = new PokeAPI(intervalMs)
  const locations = await pokeapi.fetchLocations()
  const nextLocationURL = locations.next
  const prevLocationURL = locations.previous
  let pokedex = {}

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
    },
    explore: {
      name: "explore",
      description: "Exploring the pokemons in location area",
      callback: commandExplore
    },
    catch: {
      name:"catch",
      description: "catching a pokemon",
      callback: commandCatch
    },
    inspect: {
      name:"inspect",
      description: "Inspecting caught pokemon",
      callback: commandInspect
    },
    pokedex: {
      name:"pokedex",
      description:"Your caught pokemons",
      callback: commandPokedex
    }
  }

  return {
    readline,
    commands,
    locations,
    nextLocationURL,
    prevLocationURL,
    pokeapi,
    pokedex
  }
}