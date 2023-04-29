import React, { useState } from 'react';
import { Container, ErrorText, Form, InputArea, LoginBtnArea } from './styles';
import { Text } from '../../Text';
import { TextInputGroup } from '../../Form/TextInputGroup';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '../../Button';
import { useAuth } from '../../../context/auth';
import apiPets, { IUser } from '../../../services/apiPets';
import { toast } from 'react-toastify';

interface IProps {
    closeFunction: () => void;
}
function EditSenha({ closeFunction }: IProps) {
    const { user } = useAuth();

    const [loading, setLoading] = useState(false);
    const [retorno, setRetorno] = useState('');

    type EditPasswordFormFields = {
        senha_atual: string;
        nova_senha: string;
        confnova_senha: string;
    };
    const schema = yup.object().shape({
        senha_atual: yup.string().required('A senha atual deve ser preenchida'),
        nova_senha: yup
            .string()
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                'A senha deve ter no mínimo 6 caracteres, contendo pelo menos: 1 letramaiúscula, 1 letra minúscula, 1 número e 1 símbolo.'
            )
            .required('A senha deve ser informada'),
        confnova_senha: yup
            .string()
            .required('A confirmação da senha deve ser informada')
            .oneOf(
                [yup.ref('nova_senha')],
                'A senha digitada precisa ser igual a senha digitada no campo senha'
            ),
    });

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<EditPasswordFormFields>({
        resolver: yupResolver(schema),
    });
    const onSubmit: SubmitHandler<EditPasswordFormFields> = async (data) => {
        try {
            await apiPets.patch(`/users/${user.cod_usuario}/password`, {
                senha_atual: data.senha_atual,
                nova_senha: data.nova_senha,
            });
            setLoading(false);
            closeFunction();
            toast.success('Senha alterada com sucesso!');
        } catch (err: any) {
            setLoading(false);
            setRetorno(err.response.data);
        }
    };

    return (
        <Container onSubmit={handleSubmit(onSubmit)}>
            <Text size="large">Alterar a sua senha</Text>
            <Form>
                <InputArea>
                    <TextInputGroup
                        name="senha_atual"
                        label="Senha atual"
                        register={register}
                        errors={errors.senha_atual}
                        type="password"
                    />
                </InputArea>
                <InputArea>
                    <TextInputGroup
                        name="nova_senha"
                        label="Nova senha"
                        register={register}
                        errors={errors.nova_senha}
                        type="password"
                    />
                </InputArea>
                <InputArea>
                    <TextInputGroup
                        name="confnova_senha"
                        label="Confirmar senha"
                        register={register}
                        errors={errors.confnova_senha}
                        type="password"
                    />
                </InputArea>
                <ErrorText>{retorno}</ErrorText>
                <LoginBtnArea>
                    <Button
                        caption="Salvar"
                        buttonType="primary"
                        buttonKind="submit"
                        loading={loading}
                    />
                </LoginBtnArea>
            </Form>
        </Container>
    );
}

export { EditSenha };
