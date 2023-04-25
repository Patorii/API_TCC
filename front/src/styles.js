import styled from "styled-components";

const comAside = "'cabecalho cabecalho' 'toggleFiltro toggleFiltro' 'menu conteudo''rodape rodape';" 
const semAside = "'cabecalho cabecalho' 'toggleFiltro toggleFiltro ' 'nada conteudo' 'rodape rodape';" 
export const Site = styled.div`
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-areas: ${props => props.aparecerAside? comAside : semAside};
    grid-template-rows: 70px 20px 1fr 50px;
    grid-template-columns:  ${props => props.aparecerAside? '250px 1fr': '135px 1fr'};
    gap: 20px 20px;
`

