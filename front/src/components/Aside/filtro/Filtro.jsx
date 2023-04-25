import React from 'react'
import { FiltroEstado, Span } from './styles'
import Estados from './estados/Estados'

function Filtro(){
    return (
        <>
        <Span>Estados</Span>
        <FiltroEstado>
            <Estados /> 
        </FiltroEstado>
        </>
    )
}

export default Filtro