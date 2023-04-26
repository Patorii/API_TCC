import React from 'react';
import { ButtonsArea, Container, IconArea } from './styles';
import { GiDogHouse } from 'react-icons/gi';
import { Button } from '../Button';

export function Header() {
    return (
        <Container>
            <IconArea>
                <GiDogHouse size={48} color="var(--white)" />
            </IconArea>
            <ButtonsArea>
                <Button caption="Entrar" buttonType="secondary" />
            </ButtonsArea>
        </Container>
    );
}
