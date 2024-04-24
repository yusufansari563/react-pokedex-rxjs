import React, { useEffect } from "react";
import { PokemonProvider, usePokemon } from "./store";
import Pokemon from "./Pokemon";
import data from "./pokemon.json";
import Search from "./Search";
import Like from "./Like";

const App = () => {
  const { rawPokemon$ } = usePokemon();

  useEffect(() => {
    rawPokemon$.next(data);
  }, []);

  return (
    <PokemonProvider>
      <div className="font-mono p-3">
        <div className="mt-4 text-center">
          <Search />
        </div>
        <Pokemon />
        <Like />
      </div>
    </PokemonProvider>
  );
};

export default App;
