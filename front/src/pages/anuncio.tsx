import React from 'react';
import { AnuncioInfo } from '../components/AnuncioInfo';
import { useParams } from 'react-router-dom';

function PageAnuncio() {
    const { id } = useParams();
    const codAnuncio = Number(id);
    return <AnuncioInfo codAnuncio={codAnuncio} />;
}

export { PageAnuncio };
