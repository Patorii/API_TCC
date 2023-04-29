import React, { useState } from 'react';
import { ButtonsArea, ButtonsAreaSigned, Container, IconArea } from './styles';
import { GiDogHouse } from 'react-icons/gi';
import { Button } from '../Button';
import { ModalPopUp } from '../Modal';
import { Login } from '../Modal/Login';
import { useAuth } from '../../context/auth';
import { useNavigate } from 'react-router-dom';
import { Cadastro } from '../Modal/Cadastro';
import { EditCadastro } from '../Modal/EditCadastro';
import { EditSenha } from '../Modal/EditSenha';

export function Header() {
    const navigate = useNavigate();
    const { signed, SignOut } = useAuth();
    const [toggle, setToggle] = useState(false);
    const [toggleRegister, setToggleRegister] = useState(false);
    const [toggleEditUser, setToggleUser] = useState(false);
    const [toggleEditSenha, setToggleSenha] = useState(false);

    function openModal() {
        setToggle(true);
    }
    function closeModal() {
        setToggle(false);
    }
    function openRegisterModal() {
        closeModal();
        setToggleRegister(true);
    }
    function closeRegisterModal() {
        setToggleRegister(false);
    }
    function openEditUser() {
        setToggleUser(true);
    }
    function closeEditUser() {
        setToggleUser(false);
    }
    function openEditSenha() {
        setToggleSenha(true);
    }
    function closeEditSenha() {
        setToggleSenha(false);
    }
    return (
        <>
            <Container>
                <IconArea onClick={() => navigate('/')}>
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
                                onClick={() => navigate('meusanuncios')}
                            />
                        </ButtonsArea>
                        <ButtonsArea width="159px">
                            <Button
                                caption="Editar usuário"
                                buttonType="secondary"
                                onClick={() => openEditUser()}
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
                <Login
                    closeFunction={closeModal}
                    openRegisterModal={openRegisterModal}
                />
            </ModalPopUp>
            <ModalPopUp
                isOpen={toggleRegister}
                closeFunction={closeRegisterModal}
            >
                <Cadastro closeFunction={closeRegisterModal} />
            </ModalPopUp>
            <ModalPopUp isOpen={toggleEditUser} closeFunction={closeEditUser}>
                <EditCadastro
                    closeFunction={closeEditUser}
                    openEditSenha={openEditSenha}
                />
            </ModalPopUp>
            <ModalPopUp isOpen={toggleEditSenha} closeFunction={closeEditSenha}>
                <EditSenha closeFunction={closeEditSenha} />
            </ModalPopUp>
        </>
    );
}
