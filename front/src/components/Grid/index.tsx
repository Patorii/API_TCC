import React from 'react';

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

interface IProps {
    anuncios: Array<IAnunciosData>;
}

function Grid({ anuncios }: IProps) {
    function onCardClick(cod: number) {
        console.log(cod);
    }
    return (
        <Container>
            <GridArea>
                {anuncios &&
                    anuncios.map((anuncio: IAnunciosData, i: number) => {
                        return (
                            <Card
                                key={i}
                                onClick={() => onCardClick(anuncio.cod_anuncio)}
                            >
                                <CardImage
                                    src={`data:image/jpeg;base64,${anuncio.foto_principal.foto}`}
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
    );
}

export { Grid };
