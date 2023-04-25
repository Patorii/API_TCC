import styled from 'styled-components'

export const DivAnuncios = styled.div`
    display: grid;
    grid-template-rows: 300px 300px;
    grid-template-columns: repeat(5, 300px);
    grid-gap: 40px 20px;
    width: 100%;
    max-height: 640px;
    overflow: hidden;
    user-select: none;
`

export const Img = styled.img`
    display: block;
    width: 100%;
    height: 75%;
    border-radius:20px;
    &:hover{
        transform: scale(1.1);
    }
    transition: 0.4s;
`

export const InfosAnuncio = styled.div`
    width:100%;
    height: 100%;
    background-color: var(--azul-escuro);
    padding: 20px;
    border-radius: 20px;
    text-align:center;
    cursor: pointer;
`

export const NomePet = styled.span`
    display: block;
    margin-top: 20px;
    font-size: var(--fs-nome-pet);
    color: #FFFFFF;
    font-weight: var(--weight-nome-pet)
`
