import React from 'react';
import { EditAnnouncement } from '../components/EditAnnouncement';
import { useParams } from 'react-router-dom';

function AlterarAnuncio() {
    const { id } = useParams();
    const codAnuncio = Number(id);
    return <EditAnnouncement codAnuncio={codAnuncio} />;
}

export { AlterarAnuncio };
