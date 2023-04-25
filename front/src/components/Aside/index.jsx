import React from "react";
import Filtro  from "./filtro/Filtro";
import {Menu} from './styles'

function Aside (){
    return (
        <Menu>
            <Filtro />          
        </Menu>
    )
}

export {Aside}