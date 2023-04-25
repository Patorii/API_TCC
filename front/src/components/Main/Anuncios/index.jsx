import React from "react"
import {Anuncio} from "./anuncio"
import {DivAnuncios} from './styles'
import {arrayAnuncios} from '../../../functions/constantes'

function Anuncios(){

    

    return(
        <>
            <DivAnuncios id='imagens'>
                {arrayAnuncios.map((obj)=>
                    <Anuncio key={obj.cod_anuncio} nomePet={obj.nome_pet} uf={obj.uf} endereco={obj.endereco} numero={obj.numero} complemento={obj.complemento}/>
                )}
            </DivAnuncios>
        </>
    )
}

export {Anuncios}