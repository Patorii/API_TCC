import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`


body{
    height: 100vh;
    width: 100vw;
    max-width: 100vw;
}

:root{
    --fs-nome-pet: 2rem;
    --weight-nome-pet: 800;
    --width-img-anuncio: 150px;
    --height-img-anuncio: 100px;

    /* cores */
    --white: #ffffff;
    --black: #060606;
    --dark-blue: #122e5d;
    --cyan-100: #3ECFF0;
}

*{
    font-family: 'Roboto', Arial, Helvetica, sans-serif;
    box-sizing: border-box;
    margin: 0px;
    padding: 0px;
    font-size: 16px;
}
`;
