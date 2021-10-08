import Layout from "../components/layout/Layout";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "../styles/Global.Style";
import { theme } from "../styles/theme";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
