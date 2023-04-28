import React, { useEffect, useState } from 'react';
import { Container } from '../styles';
import apiPets, { IAnunciosData } from '../../../services/apiPets';
import { Image, LeftSide, PetName } from './styles';

interface IProps {
    codAnuncio: number;
}

function Anuncio({ codAnuncio }: IProps) {
    const [anuncio, setAnuncio] = useState<IAnunciosData>({} as IAnunciosData);

    async function getAnuncio(codAnuncio: number) {
        const resp = await apiPets
            .get(`/aanouncement/${codAnuncio}`)
            .then((resp) => resp.data);
        setAnuncio(resp);
    }

    useEffect(() => {
        getAnuncio(codAnuncio);
    }, []);
    return (
        <Container>
            <LeftSide>
                <Image
                    src={`data:image/jpeg;base64,${anuncio.foto_principal.foto}`}
                />
                <PetName>{anuncio.nome_animal}</PetName>
            </LeftSide>
        </Container>
    );
}

export { Anuncio };
