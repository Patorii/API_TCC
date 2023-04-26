import React, { ReactNode } from 'react';
import { Container } from './styles';

interface IProps {
    children: ReactNode;
}

function Main({ children }: IProps) {
    return <Container>{children}</Container>;
}

export { Main };
