import React, { useState } from 'react';

import {
    Card,
    CardAddressArea,
    CardCity,
    CardImage,
    CardState,
    CardTitle,
    Container,
    GridArea,
} from './styles';
import { IAnunciosData } from '../../services/apiPets';
import { ModalPopUp } from '../Modal';
import { Anuncio } from '../Modal/Anuncio';

interface IProps {
    anuncios: Array<IAnunciosData>;
}

function Grid({ anuncios }: IProps) {
    const [toggle, setToggle] = useState(false);
    const [codAnuncio, setCodAnuncio] = useState<number>(0);

    function openModal() {
        setToggle(true);
    }
    function closeModal() {
        setToggle(false);
    }
    function onCardClick(cod: number) {
        setCodAnuncio(cod);
        openModal();
    }
    return (
        <>
            <Container>
                <GridArea>
                    {anuncios &&
                        anuncios.map((anuncio: IAnunciosData, i: number) => {
                            return (
                                <Card
                                    key={i}
                                    onClick={() =>
                                        onCardClick(anuncio.cod_anuncio)
                                    }
                                >
                                    <CardImage
                                        src={`data:image/jpeg;base64,${anuncio.foto_principal.foto}`}
                                        title={`animal${anuncio.cod_anuncio}`}
                                    />
                                    <CardTitle>{anuncio.nome_animal}</CardTitle>
                                    <CardAddressArea>
                                        <CardState>{anuncio.uf} -</CardState>
                                        <CardCity>
                                            {anuncio.cidade.toLocaleLowerCase()}
                                        </CardCity>
                                    </CardAddressArea>
                                </Card>
                            );
                        })}
                </GridArea>
            </Container>
            <ModalPopUp isOpen={toggle} closeFunction={closeModal}>
                <Anuncio codAnuncio={codAnuncio} />
            </ModalPopUp>
        </>
    );
}

export { Grid };
