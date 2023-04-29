import React, { useState, useEffect } from 'react';
import apiPets, { IAnuncios } from '../services/apiPets';
import { Grid } from '../components/Grid';
import { Main } from '../components/Main';
import { useMain } from '../context/main';
import { CenterLoader } from './styles';
import { Loader } from '../components/Loading';

interface IFilterOptions {
    tipo: string;
    especie: string;
    raca: string;
    sexo: string;
    uf: string | number;
}

function HomeLogado() {
    const [anuncios, setAnuncios] = useState<IAnuncios>({} as IAnuncios);
    const [loading, setLoading] = useState<boolean>(false);

    const { filterOptions, refreshMainGet } = useMain();

    async function getAnuncios(data: IFilterOptions) {
        setLoading(true);
        await apiPets
            .patch('/announcements', data)
            .then((resp) => setAnuncios(resp.data));
        setLoading(false);
    }

    useEffect(() => {
        getAnuncios(filterOptions);
    }, [filterOptions, refreshMainGet]);

    return (
        <Main>
            {loading ? (
                <CenterLoader>
                    <Loader width="128px" height="128px" />
                </CenterLoader>
            ) : (
                <Grid anuncios={anuncios.data} />
            )}
        </Main>
    );
}

export { HomeLogado };
