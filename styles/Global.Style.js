import { createGlobalStyle } from "styled-components";
import { media } from "./media";

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,600;1,400&display=swap');
    
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-family: 'Rubik', sans-serif;
        letter-spacing: 0.07rem;
    }
    body, html{
        background-color: #F2F4F4;
        color: #21232B;
        font-size: 62.5%;;
        cursor: default;
        ${media.mobile} {
            font-size: 50%}
        
    }
    
`;
export default GlobalStyle;
