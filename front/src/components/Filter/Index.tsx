import React, { useEffect, useState } from 'react';
import { Container } from './styles';
import apiPets, { IAnunciosData } from '../../services/apiPets';
import { FilterSeparator } from './FilterSeparator/Index';
import { Radio } from '../Radio/Index';

interface IUfs {
    uf: string;
}

function Filter() {
    const [ufs, setUfs] = useState<IUfs[]>([{} as IUfs]);
    const tiposAnuncio = [
        {
            text: 'Todos',
            value: '',
        },
        { text: 'Adoção', value: 'A' },
        {
            text: 'Perdidos',
            value: 'P',
        },
    ];
    const especieAnimal = [
        {
            text: 'Todos',
            value: '',
        },
        { text: 'Cachorro', value: 'C' },
        {
            text: 'Gato',
            value: 'G',
        },
    ];
    async function getUfs() {
        const aux = [{} as IUfs];
        aux.shift();
        const resp = await apiPets
            .patch('/announcements')
            .then((resp) => resp.data.data);

        resp.forEach((anuncio: IAnunciosData) => {
            const gotUf = aux.find((uf) => uf.uf === anuncio.uf);
            if (!gotUf) {
                aux.push({ uf: anuncio.uf });
            }
        });
        setUfs(aux);
        console.log(aux);
    }
    useEffect(() => {
        getUfs();
    }, []);

    return (
        <Container>
            <FilterSeparator title="Tipo de anúncio">
                {tiposAnuncio.map((tipo, i: number) => (
                    <Radio
                        key={tipo.text + i}
                        name="ufs"
                        label={tipo.text}
                        value={tipo.value}
                    />
                ))}
            </FilterSeparator>
            <FilterSeparator title="Espécie do animal">
                {especieAnimal.map((especie, i: number) => (
                    <Radio
                        key={especie.text + i}
                        name="ufs"
                        label={especie.text}
                        value={especie.value}
                    />
                ))}
            </FilterSeparator>
            <FilterSeparator title="Estados">
                {ufs.map((uf: IUfs, i: number) => (
                    <Radio
                        key={uf.uf + i}
                        name="ufs"
                        label={uf.uf}
                        value={uf.uf}
                    />
                ))}
            </FilterSeparator>
        </Container>
    );
}

export { Filter };
