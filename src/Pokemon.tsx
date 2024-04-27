import { useObservableState } from "observable-hooks";
import { useMemo } from "react";
import { usePokemon } from "./store";

const Pokemon = () => {
  const { search$, pokemon$, selected$ } = usePokemon();
  const pokemon = useObservableState(pokemon$, []);
  const search = useObservableState(search$, "");

  const filteredPokemon = useMemo(() => {
    return pokemon.filter((p: any) => {
      return p.name.english.toLowerCase().includes(search.toLowerCase());
    });
  }, [pokemon, search]);

  return (
    <div className="flex flex-wrap justify-center">
      {filteredPokemon.map((p) => {
        return (
          <div
            className={`card m-4 mx-2 ${
              selected$.value.includes(p.id) && "bg-blue-600"
            }`}
            onClick={(e) => {
              if (selected$.value.includes(p.id)) {
                selected$.next(
                  selected$.value.filter((id: any) => id !== p.id)
                );
              } else {
                selected$.next([...selected$.value, p.id]);
              }
            }}
          >
            <img
              className=" bg-white border-solid rounded-3xl mx-auto mt-3 w-10/12"
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`}
              alt=""
            />
            <div
              className="m-auto text-center font-bold  flex flex-col mt-3"
              key={p.id}
            >
              <span>{p.name.english}</span>
              <span>Power - {p.power}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Pokemon;
