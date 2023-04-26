import React, { useState, useEffect } from 'react';
import apiPets, { IAnuncios } from '../services/apiPets';
import { Grid } from '../components/Grid';
import { Main } from '../components/Main';

function Home() {
    const [anuncios, setAnuncios] = useState<IAnuncios>({} as IAnuncios);

    useEffect(() => {
        async function getAnuncios() {
            await apiPets
                .patch('/announcements')
                .then((resp) => setAnuncios(resp.data));
        }

        getAnuncios();
    }, []);

    return <Main>{anuncios ? <Grid anuncios={anuncios.data} /> : <></>}</Main>;
}

export { Home };
