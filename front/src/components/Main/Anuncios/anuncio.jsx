import React from "react"
import {Img, InfosAnuncio, NomePet} from './styles'
import linkImg from '../../../assets/imgs/patrick BE trofeu.webp'

function Anuncio({nomePet, uf, endereco, numero, complemento}){
    return(
        <InfosAnuncio data-uf={uf} data-endereco={endereco} data-numero={numero} data-complemento={complemento}><Img src={linkImg}></Img>
            <NomePet>{nomePet}</NomePet>
        </InfosAnuncio>
    )
}
export {Anuncio}