import React, { useEffect, useState } from 'react';
import { ButtonArea, Container } from './styles';
import apiPets, { IAnunciosData } from '../../services/apiPets';
import { FilterSeparator } from './FilterSeparator/Index';
import { Radio } from '../Radio/Index';
import { ISelectItems, SelectInput } from '../Select';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '../Button';
import { useMain } from '../../context/main';

function Filter() {
    const [ufs, setUfs] = useState<ISelectItems[]>([{} as ISelectItems]);
    const [racas, setRacas] = useState<ISelectItems[]>([{} as ISelectItems]);
    const { setFilter } = useMain();
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
    async function getFilterOptions() {
        const auxUfs = [{} as ISelectItems];
        const auxRacas = [{} as ISelectItems];
        auxUfs.shift();
        auxRacas.shift();
        const resp = await apiPets
            .patch('/announcements')
            .then((resp) => resp.data.data);

        resp.forEach((anuncio: IAnunciosData) => {
            const gotUf = auxUfs.find((uf) => uf.value === anuncio.uf);
            if (!gotUf) {
                auxUfs.push({ description: anuncio.uf, value: anuncio.uf });
            }
            const gotRaca = auxRacas.find(
                (raca) => raca.value === anuncio.raca
            );
            if (!gotRaca) {
                auxRacas.push({
                    description: anuncio.raca,
                    value: anuncio.raca,
                });
            }
        });
        setUfs(auxUfs);
        setRacas(auxRacas);
    }

    useEffect(() => {
        getFilterOptions();
    }, []);

    type FilterFormFields = {
        tipo: string;
        especie: string;
        sexo: string;
        raca: string | number;
        uf: string | number;
    };

    const schema = yup.object().shape({
        tipo: yup.string(),
        especie: yup.string(),
        raca: yup.string(),
        sexo: yup.string(),
        uf: yup.mixed(),
    });

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<FilterFormFields>({
        resolver: yupResolver(schema),
        defaultValues: {
            tipo: '',
            especie: '',
            raca: -1,
            sexo: '',
            uf: -1,
        },
    });

    const onSubmit: SubmitHandler<FilterFormFields> = async (data) => {
        if (data.raca === '-1') {
            data.raca = '';
        }
        if (data.uf === '-1' || data.uf === -1) {
            data.uf = '';
        }

        setFilter({
            ...data,
            raca: `${data.raca}`,
            uf: `${data.uf}`,
        });
    };
    return (
        <Container onSubmit={handleSubmit(onSubmit)}>
            <FilterSeparator title="Tipo de anúncio">
                {tiposAnuncio.map((tipo, i: number) => (
                    <Radio
                        key={tipo.text + i}
                        name="tipo"
                        label={tipo.text}
                        value={tipo.value}
                        register={register}
                    />
                ))}
            </FilterSeparator>
            <FilterSeparator title="Espécie do animal">
                {especieAnimal.map((especie, i: number) => (
                    <Radio
                        key={especie.text + i}
                        name="especie"
                        label={especie.text}
                        value={especie.value}
                        register={register}
                    />
                ))}
            </FilterSeparator>
            <FilterSeparator title="Estados">
                <SelectInput
                    name="uf"
                    placeholder="Selecione um estado"
                    register={register}
                    selectItems={ufs}
                />
            </FilterSeparator>
            <FilterSeparator title="Raça">
                <SelectInput
                    name="raca"
                    placeholder="Selecione uma raça"
                    register={register}
                    selectItems={racas}
                />
            </FilterSeparator>
            <ButtonArea>
                <Button
                    buttonKind="submit"
                    buttonType="primary"
                    caption="Filtrar"
                />
            </ButtonArea>
        </Container>
    );
}

export { Filter };
