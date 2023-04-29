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

import { Button } from '../Button';
import { useNavigate } from 'react-router-dom';

interface IProps {
    anuncios: Array<IAnunciosData>;
}

function EditGrid({ anuncios }: IProps) {
    const navigate = useNavigate();

    return (
        <>
            <Container>
                <GridArea>
                    {anuncios &&
                        anuncios.map((anuncio: IAnunciosData, i: number) => {
                            return (
                                <Card key={i}>
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
                                    <Button
                                        buttonType="secondary"
                                        buttonSize="small"
                                        caption="Editar"
                                        onClick={() =>
                                            navigate(
                                                `/editanuncio/${anuncio.cod_anuncio}`
                                            )
                                        }
                                    />
                                    <Button
                                        buttonType="danger"
                                        buttonSize="small"
                                        caption="Apagar"
                                    />
                                </Card>
                            );
                        })}
                </GridArea>
            </Container>
        </>
    );
}

export { EditGrid };
