import React from "react"
import {Anuncios} from './Anuncios'
import {Conteudo} from './styles'

function Main (props){
    return (
        <Conteudo asideAparecendo={props.aparecerAside}>
            <Anuncios />
        </Conteudo>
    )
}

export {Main}