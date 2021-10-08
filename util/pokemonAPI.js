import axios from "axios";

export const getPokemons = async (url) => {
  try {
    const res = await axios.get(url);
    const data = res.data;

    const pokemonList = await Promise.all(
      data.results.map((pokemon) => getOnePokemon(pokemon.url))
    );

    const dataAndPokemon = { data, pokemonList };
    return dataAndPokemon;
  } catch (err) {
    console.log(`Something went wrong... ${err}`);
  }
};
const getOnePokemon = async (url) => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    console.log(`Something went wrong... ${err}`);
  }
};

export const loadPokemons = async () => {
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1050`);
    const { results } = res.data;

    return results;
  } catch (err) {
    console.log(`Something went wrong... ${err}`);
  }
};

export const getPokemonDetails = async (url) => {
  try {
    const res = await axios.get(url);
    const data = res.data;
    return data;
  } catch (err) {
    console.log(`Something went wrong... ${err}`);
  }
};
