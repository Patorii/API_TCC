import React, { useState } from 'react';
import {
    Container,
    ErrorText,
    Form,
    InputArea,
    LoginBtnArea,
    RadiosArea,
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
import apiPets from '../../../services/apiPets';
import { toast } from 'react-toastify';

interface IProps {
    closeFunction: () => void;
}
function Cadastro({ closeFunction }: IProps) {
    const { Signin } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [retorno, setRetorno] = useState('');
    const [pessoa, setPessoa] = useState('pf');

    type RegisterFormFields = {
        nome: string;
        doc: string;
        email: string;
        password: string;
        confirmPassword: string;
        pessoa: string;
    };
    const schema = yup.object().shape({
        nome: yup.string().required('O nome precisa ser preenchido'),
        pessoa: yup.string().required('Deve ser selecionado'),
        email: yup.string().required('O e-mail deve ser informado'),
        doc: yup.string().required('O campo precisa ser preenchido'),
        password: yup
            .string()
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                'A senha deve ter no mínimo 6 caracteres, contendo pelo menos: 1 letramaiúscula, 1 letra minúscula, 1 número e 1 símbolo.'
            )
            .required('A senha deve ser informada'),
        confirmPassword: yup
            .string()
            .required('A confirmação da senha deve ser informada')
            .oneOf(
                [yup.ref('password')],
                'A senha digitada precisa ser igual a senha digitada no campo senha'
            ),
    });

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<RegisterFormFields>({
        resolver: yupResolver(schema),
        defaultValues: {
            pessoa: 'pf',
        },
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
            const user = await apiPets
                .post('/users', {
                    nome: data.nome,
                    email: data.email,
                    cpf: cpf,
                    cnpj: cnpj,
                    senha: data.password,
                })
                .then((resp) => resp);

            if (user.data) {
                const signed = await Signin({
                    email: data.email,
                    password: data.password,
                });

                if (signed) {
                    navigate('/');
                }
                setLoading(false);
                closeFunction();
                toast.success('Usuário cadastrado com sucesso!');
            }
        } catch (err: any) {
            setLoading(false);
            setRetorno(err.response.data);
        }
    };

    function radioChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPessoa(e.target.value);
    }
    return (
        <Container onSubmit={handleSubmit(onSubmit)}>
            <Text size="large">Cadastre a sua conta</Text>
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
                <InputArea>
                    <TextInputGroup
                        name="password"
                        label="Senha"
                        register={register}
                        errors={errors.password}
                        type="password"
                    />
                </InputArea>
                <InputArea>
                    <TextInputGroup
                        name="confirmPassword"
                        label="Confirme sua senha"
                        register={register}
                        errors={errors.confirmPassword}
                        type="password"
                    />
                </InputArea>
                <ErrorText>{retorno}</ErrorText>
                <LoginBtnArea>
                    <Button
                        caption="Cadastrar"
                        buttonType="primary"
                        buttonKind="submit"
                        loading={loading}
                    />
                </LoginBtnArea>
            </Form>
        </Container>
    );
}

export { Cadastro };
