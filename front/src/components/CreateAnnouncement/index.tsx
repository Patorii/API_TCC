import React from 'react';
import {
    Container,
    Form,
    InputArea,
    InputLine,
    RadioTitle,
    RadiosArea,
    RadiosDiv,
} from './styles';
import { TextInputGroup } from '../Form/TextInputGroup';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Radio } from '../Radio/Index';
import { SelectGroup } from '../Form/SelectInputGroup';
import { UF } from '../../constants/estados';

function CreateAnnouncement() {
    type AnnouncementFormFields = {
        especie: string;
        nomeAnimal: string;
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
        nomeAnimal: yup
            .string()
            .required('O nome do animal deve ser informado'),
        especie: yup.string().required('A especi deve ser informado'),
        sexo: yup.string(),
        idade: yup.string().required('A idade deve ser informado'),
        raca: yup.string().required('A raça deve ser informada'),
        cor: yup.string().required('A cor do animal deve ser informado'),
        tipo: yup.string(),
        descricao: yup
            .string()
            .required('A descrição do anúncio deve ser informado'),
        cep: yup.string().required('O CEPdeve ser informado'),
        uf: yup.string(),
        cidade: yup.string().required('A cidade deve ser informado'),
        bairro: yup.string().required('O bairro deve ser informado'),
        endereco: yup.string().required('O endereço deve ser informado'),
        numero: yup.number().required('O número deve ser informado'),
        complemento: yup.string(),
        tel: yup.string(),
        tel2: yup.string(),
    });

    const {
        register,
        setValue,
        formState: { errors },
        handleSubmit,
    } = useForm<AnnouncementFormFields>({
        resolver: yupResolver(schema),
    });
    return (
        <Container>
            <Form>
                <InputLine>
                    <InputArea>
                        <TextInputGroup
                            label="Nome do animal"
                            name="nomeAnimal"
                            register={register}
                            errors={errors.nomeAnimal}
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
                                label="Femea"
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
                            name="raca"
                            register={register}
                            errors={errors.cep}
                            placeholder="Digite o CEP"
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
                            name="cidade"
                            register={register}
                            errors={errors.cidade}
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
                            placeholder="(11)3456-7891"
                        />
                    </InputArea>
                    <InputArea>
                        <TextInputGroup
                            label="Telefone Adicional"
                            name="tel2"
                            register={register}
                            errors={errors.tel2}
                            placeholder="(11)98765-4321"
                        />
                    </InputArea>
                </InputLine>
            </Form>
        </Container>
    );
}

export { CreateAnnouncement };
