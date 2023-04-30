import React, { useState, useEffect } from 'react';
import {
    Container,
    Form,
    InputArea,
    InputColumn,
    InputLine,
    RadioTitle,
    RadiosArea,
    RadiosDiv,
    SubmitBtnArea,
    TexAreaDiv,
} from './styles';
import { TextInputGroup } from '../Form/TextInputGroup';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Radio } from '../Radio/Index';
import { SelectGroup } from '../Form/SelectInputGroup';
import { UF } from '../../constants/estados';
import { TextAreaGroup } from '../Form/TextAreaGroup';
import { Button } from '../Button';
import apiPets, { IAnimal, IAnunciosData } from '../../services/apiPets';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface IProps {
    codAnuncio: number;
}
function EditAnnouncement({ codAnuncio }: IProps) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [anuncioData, setAnuncioData] = useState<IAnunciosData>(
        {} as IAnunciosData
    );

    async function getAnuncio(codAnuncio: number) {
        setLoading(true);
        const resp = await apiPets
            .get(`/announcements/${codAnuncio}`)
            .then((resp) => resp.data);
        setAnuncioData(resp);
        setLoading(false);
    }

    useEffect(() => {
        getAnuncio(codAnuncio);
    }, []);
    useEffect(() => {
        reset({
            ...anuncioData,
            animal: anuncioData.nome_animal,
        });
    }, [anuncioData]);

    type AnnouncementFormFields = {
        animal: string;
        especie: string;
        sexo: string;
        idade: string;
        raca: string;
        cor: string;
        tipo: string;
        descricao: string;
        cep: string;
        uf: string;
        cidade: string;
        bairro: string;
        endereco: string;
        numero: number;
        complemento: string;
        tel: string;
        tel2: string;
    };

    const schema = yup.object().shape({
        animal: yup
            .string()
            .max(30, 'Deve conter no maxímo 30 caracteres')
            .required('O nome do animal deve ser informado'),
        especie: yup.string().required('A espécie deve ser informado'),
        sexo: yup.string(),
        idade: yup
            .string()
            .max(10, 'Deve conter no maxímo 10 caracteres')
            .required('A idade deve ser informada'),
        raca: yup.string().required('A raça deve ser informada'),
        cor: yup.string().required('A cor do animal deve ser informada'),
        tipo: yup.string(),
        descricao: yup
            .string()
            .max(500, 'Deve conter no maxímo 500 caracteres')
            .required('A descrição do anúncio deve ser informada'),
        cep: yup
            .string()
            .max(8, 'Deve conter no maxímo 8 digitos')
            .required('O CEP deve ser informado'),
        uf: yup.string(),
        cidade: yup.string().required('A cidade deve ser informada'),
        bairro: yup.string().required('O bairro deve ser informado'),
        endereco: yup.string().required('O endereço deve ser informado'),
        numero: yup
            .number()
            .typeError('Apenas números')
            .required('O número deve ser informado'),
        complemento: yup.string().nullable(),
        tel: yup
            .string()
            .max(11, 'Deve conter no maxímo 11 digitos')
            .required('Ao menos um telefone deve ser informado'),
        tel2: yup
            .string()
            .max(11, 'Deve conter no maxímo 11 digitos')
            .nullable(),
    });

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm<AnnouncementFormFields>({
        resolver: yupResolver(schema),
        defaultValues: {
            sexo: 'F',
            especie: 'C',
            tipo: 'A',
        },
    });

    const onSubmit: SubmitHandler<AnnouncementFormFields> = async (data) => {
        try {
            setLoading(true);
            const animal: IAnimal = await apiPets
                .patch(`/animal/${anuncioData.cod_animal}`, {
                    especie: data.especie,
                    nome: data.animal,
                    idade: data.idade,
                    raca: data.raca,
                    cor: data.cor,
                    sexo: data.sexo,
                })
                .then((resp) => resp.data);

            await apiPets
                .patch(`/announcements/${codAnuncio}`, {
                    cod_animal: animal.cod_animal,
                    tipo: data.tipo,
                    descricao: data.descricao,
                    cep: data.cep,
                    uf: data.uf,
                    cidade: data.cidade,
                    bairro: data.bairro,
                    endereco: data.endereco,
                    numero: data.numero,
                    complemento: data.complemento,
                    tel: data.tel,
                    tel2: data.tel2,
                })
                .then((resp) => resp.data);
            navigate('/meusanuncios');
            toast.success('Anuncio alterado com sucesso!');
            setLoading(false);
        } catch (err) {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <InputLine>
                    <InputArea>
                        <TextInputGroup
                            label="Nome do animal"
                            name="animal"
                            register={register}
                            errors={errors.animal}
                            placeholder="Nome do animal"
                        />
                    </InputArea>
                    <InputArea>
                        <TextInputGroup
                            label="Idade"
                            name="idade"
                            register={register}
                            errors={errors.idade}
                            placeholder="Ex: 2 anos"
                        />
                    </InputArea>
                </InputLine>
                <InputLine>
                    <RadiosArea>
                        <RadioTitle>Espécie</RadioTitle>
                        <RadiosDiv>
                            <Radio
                                name="especie"
                                register={register}
                                value="C"
                                label="Cachorro"
                            />
                            <Radio
                                name="especie"
                                register={register}
                                value="G"
                                label="Gato"
                            />
                        </RadiosDiv>
                    </RadiosArea>
                    <RadiosArea>
                        <RadioTitle>Sexo</RadioTitle>
                        <RadiosDiv>
                            <Radio
                                name="sexo"
                                register={register}
                                value="F"
                                label="Fêmea"
                            />
                            <Radio
                                name="sexo"
                                register={register}
                                value="M"
                                label="Macho"
                            />
                        </RadiosDiv>
                    </RadiosArea>
                </InputLine>
                <InputLine>
                    <InputArea>
                        <TextInputGroup
                            label="Raça"
                            name="raca"
                            register={register}
                            errors={errors.raca}
                            placeholder="Ex: Golden Retriever"
                        />
                    </InputArea>
                    <InputArea>
                        <TextInputGroup
                            label="Cor"
                            name="cor"
                            register={register}
                            errors={errors.cor}
                            placeholder="Cor predominante"
                        />
                    </InputArea>
                </InputLine>
                <InputLine>
                    <InputColumn>
                        <RadiosArea>
                            <RadioTitle>Tipo de anúncio</RadioTitle>
                            <RadiosDiv>
                                <Radio
                                    name="tipo"
                                    register={register}
                                    value="A"
                                    label="Animal para adoção"
                                />
                                <Radio
                                    name="tipo"
                                    register={register}
                                    value="P"
                                    label="Animal perdido"
                                />
                            </RadiosDiv>
                        </RadiosArea>
                        <TexAreaDiv>
                            <TextAreaGroup
                                label="Descrição do anúncio"
                                name="descricao"
                                errors={errors.descricao}
                                register={register}
                            />
                        </TexAreaDiv>
                    </InputColumn>
                </InputLine>
                <InputLine>
                    <InputArea>
                        <SelectGroup
                            label="Estado"
                            name="uf"
                            register={register}
                            selectItems={UF}
                        />
                    </InputArea>
                    <InputArea>
                        <TextInputGroup
                            label="CEP"
                            name="cep"
                            register={register}
                            errors={errors.cep}
                            placeholder="Digite o CEP"
                            maxLength={8}
                        />
                    </InputArea>
                </InputLine>
                <InputLine>
                    <InputArea>
                        <TextInputGroup
                            label="Cidade"
                            name="cidade"
                            register={register}
                            errors={errors.cidade}
                            placeholder="Digite a cidade"
                        />
                    </InputArea>
                    <InputArea>
                        <TextInputGroup
                            label="Bairro"
                            name="bairro"
                            register={register}
                            errors={errors.bairro}
                            placeholder="Digite o bairro"
                        />
                    </InputArea>
                </InputLine>
                <InputLine>
                    <InputArea>
                        <TextInputGroup
                            label="Endereço"
                            name="endereco"
                            register={register}
                            errors={errors.endereco}
                            placeholder="Digite a cidade"
                        />
                        <InputArea width="90px" minWidth="90px">
                            <TextInputGroup
                                label="Número"
                                name="numero"
                                register={register}
                                errors={errors.numero}
                                placeholder="Ex:123"
                            />
                        </InputArea>
                    </InputArea>
                    <InputArea>
                        <TextInputGroup
                            label="Complemento"
                            name="complemento"
                            register={register}
                            errors={errors.complemento}
                            placeholder="Digite o complemento"
                        />
                    </InputArea>
                </InputLine>
                <InputLine>
                    <InputArea>
                        <TextInputGroup
                            label="Telefone"
                            name="tel"
                            register={register}
                            errors={errors.tel}
                            placeholder="1134567891"
                            maxLength={11}
                        />
                    </InputArea>
                    <InputArea>
                        <TextInputGroup
                            label="Telefone Adicional"
                            name="tel2"
                            register={register}
                            errors={errors.tel2}
                            placeholder="11987564321"
                            maxLength={11}
                        />
                    </InputArea>
                </InputLine>
                <InputLine>
                    <InputColumn>
                        <SubmitBtnArea>
                            <Button
                                buttonKind="submit"
                                caption="Salvar alterações"
                                buttonType="tertiary"
                                loading={loading}
                            />
                            <Button
                                caption="Cancelar"
                                buttonType="tertiary"
                                onClick={() => navigate('/meusanuncios')}
                            />
                        </SubmitBtnArea>
                    </InputColumn>
                </InputLine>
            </Form>
        </Container>
    );
}

export { EditAnnouncement };
