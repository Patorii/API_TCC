import React, { useEffect, useState } from "react"
import { DivFiltro } from "./styles"
import {IoCaretDown} from "react-icons/io5"
import {IoCaretUp} from "react-icons/io5"
import { IconContext } from "react-icons";

function BtnFiltro({clicou}){
    const [aparecer, setAparecer] = useState(false)
    
    function toggleFiltro(){
        setAparecer(!aparecer)
    }

    useEffect(()=>{
        clicou(aparecer)
    }, [aparecer, clicou])

    return(
        <DivFiltro onClick={toggleFiltro}>
            Filtros
            <IconContext.Provider value={{ color: "#122e5d", size:"25px", style: { verticalAlign: 'middle' }}}>
                {aparecer? <IoCaretUp />:<IoCaretDown />}
            </IconContext.Provider>
        </DivFiltro>
    )
}

export {BtnFiltro}