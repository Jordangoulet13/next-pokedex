import { useState, useEffect, useRef } from "react";
import { getPokemons } from "../util/pokemonAPI";
import PokemonCollection from "../components/PokemonCollection";
import styled from "styled-components";

const defaultEndpoint = `https://pokeapi.co/api/v2/pokemon/`;

export async function getServerSideProps() {
  const { data, pokemonList } = await getPokemons(defaultEndpoint);

  return {
    props: {
      data,
      pokemonList,
    },
  };
}

const HomePage = ({ data, pokemonList }) => {
  const { next, previous } = data;
  const [results, updateResults] = useState(pokemonList);

  const [page, updatePage] = useState({
    next,
    previous,
    current: defaultEndpoint,
  });
  const { current } = page;

  useEffect(() => {
    if (current === defaultEndpoint) return;

    async function request() {
      const nextData = await getPokemons(current);
      const { data, pokemonList } = nextData;
      const { next, previous } = data;

      updatePage((prev) => {
        return {
          ...prev,
          next,
          previous,
        };
      });

      if (!previous) {
        updateResults(pokemonList);
        return;
      }

      updateResults(pokemonList);
    }

    request();
  }, [current]);

  const handleNext = () => {
    updatePage((prev) => {
      return {
        ...prev,
        current: page?.next,
      };
    });
  };

  const handlePrevious = () => {
    updatePage((prev) => {
      return {
        ...prev,
        current: page?.previous,
      };
    });
  };

  return (
    <>
      <PokemonCollection pokemons={results} />
      <PaginationWrap>
        {page?.previous && <button onClick={handlePrevious}>Previous</button>}
        {page?.next && <button onClick={handleNext}>Next</button>}
      </PaginationWrap>
    </>
  );
};

export default HomePage;

const PaginationWrap = styled.section`
  display: flex;
  justify-content: space-around;
  margin: 2rem;

  button {
    min-width: 30vw;
    padding: 1rem 2rem;
    border-radius: 5px;
    font-size: 3rem;
    color: ${(props) => props.theme.interactive};
    border: solid 2px ${(props) => props.theme.interactive};
    box-shadow: 0px 3px 8px -3px ${(props) => props.theme.interactive};
    cursor: pointer;
    transition: 0.2s ease-in-out;
    :hover {
      color: white;
      background-color: ${(props) => props.theme.interactive};
    }
  }
`;
