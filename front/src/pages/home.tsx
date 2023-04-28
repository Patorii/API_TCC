import React, { useState, useEffect } from 'react';
import apiPets, { IAnuncios } from '../services/apiPets';
import { Grid } from '../components/Grid';
import { Main } from '../components/Main';
import { useMain } from '../context/main';

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

    useEffect(() => {
        async function getAnuncios(data: IFilterOptions) {
            await apiPets
                .patch('/announcements', data)
                .then((resp) => setAnuncios(resp.data));
        }

        getAnuncios(filterOptions);
    }, [filterOptions, refreshMainGet]);

    return <Main>{anuncios ? <Grid anuncios={anuncios.data} /> : <></>}</Main>;
}

export { Home };
