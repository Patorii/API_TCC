import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`


body{
    height: 100vh;
    width: 100%;

    background-color: var(--grey-blue);

}

:root{
    --fs-nome-pet: 2rem;
    --weight-nome-pet: 800;
    --width-img-anuncio: 150px;
    --height-img-anuncio: 100px;

    /* cores */
    --grey-blue: #F2F7FF;
    --grey-100: #EDEDED;
    --grey-300: #CFCFCF;
    --white: #ffffff;
    --black: #060606;
    --dark-blue: #122e5d;
    --blue-bootstrap: #0d6efd;
    --cyan-100: #3ECFF0;
    --red: #E70000;
}

*{
    font-family: 'Roboto', Arial, Helvetica, sans-serif;
    box-sizing: border-box;
    font-weight:400;
    margin: 0px;
    padding: 0px;
    font-size: 16px;
}
p{
    margin: 0px;
    padding: 0px;
}
`;
