import styled from "styled-components";

import { useRouter } from "next/router";

const PokemonCard = ({ pokemon }) => {
  const { id, name, sprites, types, height, weight } = pokemon;

  const router = useRouter();

  const showDetailsHandler = () => {
    router.push("/" + name);
  };

  return (
    <Wrapper onClick={showDetailsHandler}>
      <ImgWrap type={types[0].type.name} typeDim={`${types[0].type.name}Dim`}>
        <img src={sprites.front_default} alt={name} />
      </ImgWrap>
      <ContentWrap>
        <h1>{name.toUpperCase()}</h1>
        {types.map((type, index) => (
          <Type key={index} type={type.type.name}>
            {type.type.name}
          </Type>
        ))}
        <StatsWrap>
          <div className="box">
            <h3>{id}</h3>
            <h4 style={{ marginLeft: "6px" }}>No.</h4>
          </div>
          <div className="box">
            <h3>
              {weight / 10}
              <span>kg</span>
            </h3>
            <h4>Weight</h4>
          </div>
          <div className="box">
            <h3>
              {height / 10}
              <span>m</span>
            </h3>
            <h4>Height</h4>
          </div>
        </StatsWrap>
      </ContentWrap>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  text-decoration: none;
  color: inherit;
  top: 0px;
  position: relative;
  height: 340px;
  flex-basis: 285px;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  overflow: hidden;
  margin: 0px 10px 2rem 10px;
  transition: 0.2s ease-in-out;
  :hover {
    cursor: pointer;
    top: -5px;
    transition: 0.2s ease-in-out;
    box-shadow: 0px 5px 26px -10px rgba(0, 0, 0, 0.3);
  }
`;
const ImgWrap = styled.div`
  height: 40%;
  width: 100%;
  display: flex;
  justify-content: center;

  background-image: linear-gradient(
    to left bottom,
    ${(props) => props.theme[props.type]},
    ${(props) => props.theme[props.typeDim]}
  );
  img {
    height: 115%;
    margin-top: 20px;
    z-index: 100;
  }
`;
const ContentWrap = styled.div`
  height: 60%;
  width: 100%;
  text-align: center;
  background-color: white;
  h1 {
    margin-top: 25px;
    font-size: 2rem;
  }
`;
const Type = styled.div`
  color: white;
  display: inline-block;
  margin: 15px 5px 30px 5px;
  padding: 3px 10px;
  background-color: ${(props) => props.theme[props.type]};
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 300;
`;
const StatsWrap = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  .box {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    h3 {
      font-weight: 400;
      font-size: 1.2rem;
      margin-bottom: 8px;
      span {
        margin-left: 2px;
      }
    }
    h4,
    span {
      font-weight: 400;
      font-size: 0.8rem;
      color: ${(props) => props.theme.gray};
    }
    :nth-child(2) {
      border-left: solid 1px ${(props) => props.theme.border};
      border-right: solid 1px ${(props) => props.theme.border};
    }
  }
`;

export default PokemonCard;
