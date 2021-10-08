import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { media } from "../../styles/media";
import { loadPokemons } from "../../util/pokemonAPI";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../assets/logo.png";

const Header = () => {
  const [searchText, setSearchText] = useState("");

  const onInputChange = (event) => {
    setSearchText(event.target.value);
  };
  const router = useRouter();
  async function handleOnSubmitSearch(e) {
    e.preventDefault();

    const results = await loadPokemons();
    const exists = await results.find(
      ({ name }) => name === searchText.toLowerCase()
    );
    if (exists) {
      router.push("/" + searchText.toLowerCase());
    } else {
      alert("Sorry That Pokemon Does Not Exist");
    }
  }

  return (
    <Wrapper>
      <ImageWrapper>
        <Link href="/">
          <a>
            <Image src={logo} alt="logo" objectFit="contain" />
          </a>
        </Link>
      </ImageWrapper>
      <form className="formContainer" onSubmit={handleOnSubmitSearch}>
        <input
          type="search"
          placeholder="Name of Pokemon"
          value={searchText}
          onChange={onInputChange}
        />
        <FontAwesomeIcon
          icon={faSearch}
          className="icon"
          onClick={handleOnSubmitSearch}
        />
      </form>
      <ImageWrapper right>
        <Link href="/">
          <a>
            <Image src={logo} alt="logo" objectFit="contain" />
          </a>
        </Link>
      </ImageWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  min-height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  position: sticky;
  top: 0;
  z-index: 999;

  ${media.mobile} {
    justify-content: space-between;
  }

  .formContainer {
    width: 40%;
    height: 3.5rem;
    border-radius: 20px;
    display: flex;
    padding: 0 1rem;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    border: solid 1px ${(props) => props.theme.interactive};

    ${media.mobile} {
      width: 50%;
      margin-right: 2rem;
    }

    input {
      margin-left: 2px;
      height: 25px;
      border: none;
      background-color: none;
      outline: none;
      padding: 0;
      font-weight: 300;
      width: 100%;
    }
    .icon {
      color: ${(props) => props.theme.interactive};
      font-size: 2rem;
      cursor: pointer;
    }
  }
`;

const ImageWrapper = styled.div`
  width: 10rem;
  margin: 2rem;
  ${media.mobile} {
    display: ${(props) => (props.right ? "none" : "inherit")};
  }
`;

export default Header;
