import React, { useState } from 'react';
import { ButtonsArea, Container, IconArea } from './styles';
import { GiDogHouse } from 'react-icons/gi';
import { Button } from '../Button';
import { ModalPopUp } from '../Modal';
import { Login } from '../Modal/Login';

export function Header() {
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
                <IconArea>
                    <GiDogHouse size={48} color="var(--white)" />
                </IconArea>
                <ButtonsArea>
                    <Button
                        caption="Entrar"
                        buttonType="secondary"
                        onClick={() => openModal()}
                    />
                </ButtonsArea>
            </Container>
            <ModalPopUp isOpen={toggle} closeFunction={closeModal}>
                <Login closeFunction={closeModal} />
            </ModalPopUp>
        </>
    );
}
