import React, { useEffect, useState } from 'react';
import {
    Container,
    ErrorText,
    Form,
    InputArea,
    LoginBtnArea,
    RadiosArea,
    RegisterBtnArea,
} from './styles';
import { Text } from '../../Text';
import { TextInputGroup } from '../../Form/TextInputGroup';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '../../Button';

import { useNavigate } from 'react-router-dom';
import { Radio } from '../../Radio/Index';
import { RadioTitle, RadiosDiv } from '../../CreateAnnouncement/styles';
import { useAuth } from '../../../context/auth';
import apiPets, { IUser } from '../../../services/apiPets';
import { toast } from 'react-toastify';

interface IProps {
    closeFunction: () => void;
    openEditSenha: () => void;
}
function EditCadastro({ closeFunction, openEditSenha }: IProps) {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [retorno, setRetorno] = useState('');
    const [pessoa, setPessoa] = useState('pf');

    const [userData, setUserData] = useState<IUser>({} as IUser);

    async function getUser() {
        await apiPets
            .get(`/users/${user.cod_usuario}`)
            .then((resp) => setUserData(resp.data));
    }

    type RegisterFormFields = {
        nome: string;
        doc: string;
        email: string;
        pessoa: string;
    };
    const schema = yup.object().shape({
        nome: yup.string().required('O nome precisa ser preenchido'),
        pessoa: yup.string().required('Deve ser selecionado'),
        email: yup.string().required('O e-mail deve ser informado'),
        doc: yup.string().required('O campo precisa ser preenchido'),
    });

    const {
        register,
        formState: { errors },
        reset,
        setValue,
        handleSubmit,
    } = useForm<RegisterFormFields>({
        resolver: yupResolver(schema),
    });
    const onSubmit: SubmitHandler<RegisterFormFields> = async (data) => {
        try {
            let cpf = null;
            let cnpj = null;
            if (data.pessoa === 'pf') {
                cpf = data.doc;
            } else {
                cnpj = data.doc;
            }
            await apiPets
                .post(`/users/${user.cod_usuario}`, {
                    nome: data.nome,
                    email: data.email,
                    cpf: cpf,
                    cnpj: cnpj,
                })
                .then((resp) => resp);

            setLoading(false);
            closeFunction();
            toast.success('Usuário alterado com sucesso!');
        } catch (err: any) {
            setLoading(false);
            setRetorno(err.response.data);
            toast.error(err.response.data);
        }
    };

    useEffect(() => {
        getUser();
    }, []);
    useEffect(() => {
        reset({
            ...userData,
            pessoa: userData.cpf ? 'pf' : 'pj',
            doc: userData.cpf ? userData.cpf : userData.cnpj,
        });
    }, [userData]);

    function radioChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPessoa(e.target.value);
        setValue('doc', '');
    }
    return (
        <Container onSubmit={handleSubmit(onSubmit)}>
            <Text size="large">Alterar a sua conta</Text>
            <Form>
                <InputArea>
                    <TextInputGroup
                        name="nome"
                        label="Nome completo"
                        register={register}
                        errors={errors.nome}
                    />
                </InputArea>
                <InputArea>
                    <TextInputGroup
                        name="email"
                        label="E-mail"
                        register={register}
                        errors={errors.email}
                        type="email"
                    />
                </InputArea>
                <InputArea>
                    <RadiosArea>
                        <RadioTitle>Tipo de pessoa</RadioTitle>
                        <RadiosDiv>
                            <Radio
                                name="pessoa"
                                register={register}
                                value="pf"
                                label="Pessoa Física"
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => radioChange(e)}
                            />
                            <Radio
                                name="pessoa"
                                register={register}
                                value="pj"
                                label="Pessoa Jurídica"
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => radioChange(e)}
                            />
                        </RadiosDiv>
                    </RadiosArea>
                </InputArea>
                {pessoa === 'pf' ? (
                    <InputArea>
                        <TextInputGroup
                            name="doc"
                            label="CPF"
                            register={register}
                            errors={errors.doc}
                            placeholder="12345678910"
                        />
                    </InputArea>
                ) : (
                    <InputArea>
                        <TextInputGroup
                            name="doc"
                            label="CNPJ"
                            register={register}
                            errors={errors.doc}
                            placeholder="12345678912345"
                        />
                    </InputArea>
                )}
                <ErrorText>{retorno}</ErrorText>
                <LoginBtnArea>
                    <Button
                        caption="Salvar"
                        buttonType="primary"
                        buttonKind="submit"
                        loading={loading}
                    />
                </LoginBtnArea>

                <RegisterBtnArea>
                    <Button
                        caption="Alterar senha"
                        buttonType="secondary"
                        onClick={() => openEditSenha()}
                    />
                </RegisterBtnArea>
            </Form>
        </Container>
    );
}

export { EditCadastro };
