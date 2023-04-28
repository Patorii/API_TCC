import React, { useState } from 'react';
import {
    Container,
    ErrorText,
    Form,
    InputArea,
    LoginBtnArea,
    RegisterBtnArea,
} from './styles';
import { Text } from '../../Text';
import { TextInputGroup } from '../../Form/TextInputGroup';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '../../Button';
import { useAuth } from '../../../context/auth';
import { useNavigate } from 'react-router-dom';

interface IProps {
    closeFunction: () => void;
}
function Login({ closeFunction }: IProps) {
    const navigate = useNavigate();
    const { Signin } = useAuth();
    const [loading, setLoading] = useState(false);
    const [retorno, setRetorno] = useState('');
    type LoginFormFields = {
        email: string;
        password: string;
    };
    const schema = yup.object().shape({
        email: yup.string().required('O e-mail deve ser informado'),
        password: yup.string().required('A senha deve ser informada'),
    });

    const {
        register,
        setValue,
        formState: { errors },
        handleSubmit,
    } = useForm<LoginFormFields>({
        resolver: yupResolver(schema),
    });
    const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {
        try {
            setRetorno('');
            setLoading(true);

            const signed = await Signin({ ...data });

            if (signed) {
                navigate('homel');
            }
            setLoading(false);
            closeFunction();
        } catch (err: any) {
            setValue('password', '');
            setRetorno(err);
            setLoading(false);
        }
    };
    return (
        <Container onSubmit={handleSubmit(onSubmit)}>
            <Text size="large">Entre com sua conta</Text>
            <Form>
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
                    <TextInputGroup
                        name="password"
                        label="Senhas"
                        register={register}
                        errors={errors.password}
                        type="password"
                    />
                </InputArea>
                <ErrorText>{retorno}</ErrorText>
                <LoginBtnArea>
                    <Button
                        caption="Entrar"
                        buttonType="primary"
                        buttonKind="submit"
                        loading={loading}
                    />
                </LoginBtnArea>
                <Text size="medium">Não possui conta?</Text>
                <RegisterBtnArea>
                    <Button caption="Cadastrar-se" buttonType="secondary" />
                </RegisterBtnArea>
            </Form>
        </Container>
    );
}

export { Login };
