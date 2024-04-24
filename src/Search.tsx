import { usePokemon } from "./store";

const Search = () => {
  const { search$ } = usePokemon();
  return (
    <>
      <input
        onChange={(e) => {
          search$.next(e.target.value);
        }}
        className="input search-bar placeholder:px-3 rounded-md w-full py-2 px-4"
        name="text"
        placeholder="eg. Bulbasaur"
        type="search"
      />
    </>
  );
};

export default Search;
