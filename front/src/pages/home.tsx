import React, { useState, useEffect } from 'react';
import apiPets, { IAnuncios } from '../services/apiPets';
import { Grid } from '../components/Grid';
import { Main } from '../components/Main';
import { useMain } from '../context/main';
import { Loader } from '../components/Loading';
import { CenterLoader } from './styles';

interface IFilterOptions {
    tipo: string;
    especie: string;
    raca: string;
    sexo: string;
    uf: string | number;
}

function Home() {
    const [anuncios, setAnuncios] = useState<IAnuncios>({} as IAnuncios);
    const { filterOptions, refreshMainGet } = useMain();
    const [loading, setLoading] = useState<boolean>(false);

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

export { Home };
