import React from "react"
import {Logo} from "./logo"
import {Botoes} from './botoes'
import { Cabecalho } from "./styles"

function Header (){
    return (
    <Cabecalho>
            <Logo />
            <Botoes />
    </Cabecalho>
    )
}

export {Header} 