import { useState } from "react";
import { getPokemonDetails } from "../../util/pokemonAPI";
import styled from "styled-components";
import Stats from "../../components/Stats";

const defaultEndpoint = `https://pokeapi.co/api/v2/pokemon/`;

const PokemonDetail = ({ pokemon }) => {
  const [sprite, setSprite] = useState(0);

  const handleSlide = (e) => {
    if (e.target.id === "next") {
      setSprite((pre) => {
        if (pre === 3) {
          return 0;
        } else {
          return pre + 1;
        }
      });
    } else if (e.target.id === "previous") {
      setSprite((pre) => {
        if (pre === 0) {
          return 3;
        } else {
          return pre - 1;
        }
      });
    }
  };

  const getSlideName = (sprite) => {
    switch (sprite) {
      case 0:
        return "front_default";
      case 1:
        return "back_default";
      case 2:
        return "front_shiny";
      case 3:
        return "back_shiny";
      default:
        return "front_default";
    }
  };

  return (
    <Wrapper
      type={pokemon.types[0].type.name}
      typeDim={`${pokemon.types[0].type.name}Dim`}
    >
      <ContentWrap>
        <ImgWrap>
          <img
            src={pokemon.sprites[getSlideName(sprite)]}
            alt={pokemon.name}
          ></img>
          <button
            id="previous"
            className="slideBtn previous"
            onClick={handleSlide}
          >
            &#8592;
          </button>
          <button id="next" className="slideBtn next" onClick={handleSlide}>
            &#8594;
          </button>
        </ImgWrap>
        <h1>{pokemon.name}</h1>
        {pokemon.types.map((type, index) => {
          return (
            <Type key={index} type={type.type.name}>
              <h3>{type.type.name}</h3>
            </Type>
          );
        })}
        <Stats pokemon={pokemon} />
      </ContentWrap>
    </Wrapper>
  );
};

export async function getServerSideProps({ query }) {
  const { pokemonId } = query;
  const pokemon = await getPokemonDetails(`${defaultEndpoint}/${pokemonId}`);
  return {
    props: {
      pokemon,
    },
  };
}

const Wrapper = styled.div`
  width: 100%;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 6px 1rem;
  border-radius: 20px;

  background-image: linear-gradient(
    to left bottom,
    ${(props) => props.theme[props.type]},
    ${(props) => props.theme[props.typeDim]}
  );
`;

const ContentWrap = styled.div`
  height: 60%;
  width: 100%;
  text-align: center;
  background-color: white;
  border-radius: 20px;

  h1 {
    font-size: 2.5rem;
  }
`;
const ImgWrap = styled.div`
  height: 210px;
  width: 20rem;
  position: relative;
  display: inline-block;

  img {
    height: 16rem;
    transition: 1s ease-in-out;
  }
  .slideBtn {
    all: unset;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    padding: 5px;
    color: ${(props) => props.theme.interactive};
    border-radius: 100%;
    background-color: white;
    cursor: pointer;
    transition: 0.2s ease-in-out;
    :hover {
      color: white;
      background-color: ${(props) => props.theme.interactive};
    }
  }
  .previous {
    left: 0px;
  }
  .next {
    right: 0px;
  }
`;
const Type = styled.div`
  display: inline-block;
  margin: 15px 10px 30px 10px;

  .icon {
    width: 3.3rem;
    height: 3.3rem;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme[props.type]};
    img {
      width: 60%;
    }
  }
  h3 {
    margin-top: 5px;
    font-size: 1.5rem;
    font-weight: 300;
  }
`;

const Loading = styled.h1`
  color: ${(props) => props.theme.gray};
  font-size: 2rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default PokemonDetail;
