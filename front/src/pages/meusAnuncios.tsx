import React, { useState, useEffect } from 'react';
import apiPets, { IAnuncios } from '../services/apiPets';
import { Main } from '../components/Main';
import { useMain } from '../context/main';
import { Loader } from '../components/Loading';
import { CenterLoader } from './styles';
import { useAuth } from '../context/auth';
import { EditGrid } from '../components/EditGrid';

interface IFilterOptions {
    tipo: string;
    especie: string;
    raca: string;
    sexo: string;
    uf: string | number;
}

function MeusAnuncios() {
    const { user } = useAuth();
    const [anuncios, setAnuncios] = useState<IAnuncios>({} as IAnuncios);
    const { filterOptions, refreshMainGet } = useMain();
    const [loading, setLoading] = useState<boolean>(false);

    async function getAnuncios(data: IFilterOptions) {
        setLoading(true);

        await apiPets
            .patch(`/announcements/ofuser/${user.cod_usuario}`, data)
            .then((resp) => setAnuncios(resp.data));
        setLoading(false);
    }

    useEffect(() => {
        getAnuncios(filterOptions);
    }, [filterOptions, refreshMainGet]);
    useEffect(() => {
        console.log(anuncios.data);
    }, [anuncios]);

    return (
        <Main>
            {loading ? (
                <CenterLoader>
                    <Loader width="128px" height="128px" />
                </CenterLoader>
            ) : (
                <EditGrid anuncios={anuncios.data} />
            )}
        </Main>
    );
}

export { MeusAnuncios };
