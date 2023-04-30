import React from 'react';

import { useParams } from 'react-router-dom';
import { FotosAnuncio } from '../components/FotosAnuncio';

function AlterarFotosAnuncio() {
    const { id } = useParams();
    const codAnuncio = Number(id);
    return <FotosAnuncio codAnuncio={codAnuncio} />;
}

export { AlterarFotosAnuncio };
