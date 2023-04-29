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
import apiPets, { IAnunciosData } from '../../services/apiPets';

import { Button } from '../Button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMain } from '../../context/main';

interface IProps {
    anuncios: Array<IAnunciosData>;
}

function EditGrid({ anuncios }: IProps) {
    const { setRefresh } = useMain();
    const navigate = useNavigate();

    async function deleteAnnouncement(cod: number) {
        try {
            await apiPets.delete(`/animal/${cod}`);
            toast.success('Anuncio apagado com sucesso!');
            setRefresh();
        } catch (err) {
            console.log(err);
        }
    }

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
                                        title={`animal${anuncio.cod_anuncio}`}
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
                                                `/editanuncio/${anuncio.cod_animal}`
                                            )
                                        }
                                    />
                                    <Button
                                        buttonType="danger"
                                        buttonSize="small"
                                        caption="Apagar"
                                        onClick={() =>
                                            deleteAnnouncement(
                                                anuncio.cod_usuario
                                            )
                                        }
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
