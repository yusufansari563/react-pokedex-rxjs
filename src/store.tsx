import React, { ReactNode, createContext, useContext } from "react";
import { BehaviorSubject, combineLatestWith, map } from "rxjs";

export interface pokemon {
  id: number;
  name: Name;
  type: string[];
  base: Base;
  power?: number;
  selected?: boolean;
}

export interface Base {
  HP: number;
  Attack: number;
  Defense: number;
  SpAttack: number;
  SpDefense: number;
  Speed: number;
}

export interface Name {
  english: string;
  japanese: string;
  chinese: string;
  french: string;
}

export const rawPokemon$: BehaviorSubject<pokemon[]> = new BehaviorSubject<
  pokemon[]
>([]);

const pokemonWithPower$ = rawPokemon$.pipe(
  map((pokemon) =>
    pokemon.map((p) => ({
      ...p,
      power:
        p.base.Attack +
        p.base.Defense +
        p.base.SpAttack +
        p.base.SpDefense +
        p.base.Speed +
        p.base.HP,
    }))
  )
);

export const search$ = new BehaviorSubject<string>("");

export const selected$ = new BehaviorSubject<number[]>([]);

export const pokemon$ = pokemonWithPower$.pipe(
  combineLatestWith(selected$),
  map(([pokemon, selected]) =>
    pokemon.map((p) => ({
      ...p,
      selected: selected.includes(p.id),
    }))
  )
);

const PokemonContext = createContext({
  rawPokemon$,
  pokemon$,
  selected$,
  search$,
});

export const PokemonProvider = ({ children }: { children: ReactNode }) => (
  <PokemonContext.Provider
    value={{
      rawPokemon$,
      pokemon$,
      selected$,
      search$,
    }}
  >
    {children}
  </PokemonContext.Provider>
);

export const usePokemon = () => useContext(PokemonContext);
