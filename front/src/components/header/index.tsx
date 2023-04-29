import React, { useState } from 'react';
import { ButtonsArea, ButtonsAreaSigned, Container, IconArea } from './styles';
import { GiDogHouse } from 'react-icons/gi';
import { Button } from '../Button';
import { ModalPopUp } from '../Modal';
import { Login } from '../Modal/Login';
import { useAuth } from '../../context/auth';
import { useNavigate } from 'react-router-dom';

export function Header() {
    const navigate = useNavigate();
    const { signed, SignOut } = useAuth();
    const [toggle, setToggle] = useState(false);

    function openModal() {
        setToggle(true);
    }
    function closeModal() {
        setToggle(false);
    }
    return (
        <>
            <Container>
                <IconArea
                    onClick={() =>
                        signed ? navigate('/homel') : navigate('/')
                    }
                >
                    <GiDogHouse size={48} color="var(--white)" />
                </IconArea>
                {signed ? (
                    <ButtonsAreaSigned>
                        <ButtonsArea width="155px">
                            <Button
                                caption="Criar anúncio"
                                buttonType="secondary"
                                onClick={() => navigate('/anuncio')}
                            />
                        </ButtonsArea>
                        <ButtonsArea width="170px">
                            <Button
                                caption="Meus anúncios"
                                buttonType="secondary"
                            />
                        </ButtonsArea>
                        <ButtonsArea width="159px">
                            <Button
                                caption="Editar usuário"
                                buttonType="secondary"
                            />
                        </ButtonsArea>
                        <ButtonsArea width="60px">
                            <Button
                                caption="Sair"
                                buttonType="secondary"
                                onClick={() => {
                                    SignOut();
                                    navigate('/');
                                }}
                            />
                        </ButtonsArea>
                    </ButtonsAreaSigned>
                ) : (
                    <ButtonsArea>
                        <Button
                            caption="Entrar"
                            buttonType="secondary"
                            onClick={() => openModal()}
                        />
                    </ButtonsArea>
                )}
            </Container>
            <ModalPopUp isOpen={toggle} closeFunction={closeModal}>
                <Login closeFunction={closeModal} />
            </ModalPopUp>
        </>
    );
}
