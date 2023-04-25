import React from 'react'
import {UF} from '../../../../functions/constantes'
import Estado from './Estado'

function Estados(){

    return (
        <div className='alou'>
        {UF.map(item =>(
            <Estado sigla={item.sigla} nome={item.nome} key={item.sigla}/>    
        ))}
        </div>
    )
}

export default Estados