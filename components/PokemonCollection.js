import PokemonCard from "./PokemonCard";
import styled from "styled-components";
import { media } from "../styles/media";

const PokemonCollection = ({ pokemons }) => {
  return (
    <Container>
      {pokemons.map((pokemon, index) => (
        <PokemonCard key={index} pokemon={pokemon} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-auto-rows: auto;
  grid-gap: 5px;
  ${media.tablet} {
    grid-template-columns: repeat(2, auto);
    ${media.mobile} {
      grid-template-columns: repeat(1, auto);
    }
  }
`;

export default PokemonCollection;
