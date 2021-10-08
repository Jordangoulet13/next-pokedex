import Header from "./Header";
import styled from "styled-components";

const Layout = (props) => {
  return (
    <div>
      <Header />
      <Main>{props.children}</Main>
    </div>
  );
};

export default Layout;

const Main = styled.main`
  margin: 3rem auto;
  width: 90%;
  font-size: 1.8rem;
`;
