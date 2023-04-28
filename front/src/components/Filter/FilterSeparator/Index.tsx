import React, { ReactNode } from 'react';
import { Container, Title } from './styles';

interface IProps {
    title: string;
    children: ReactNode;
}

function FilterSeparator({ title, children }: IProps) {
    return (
        <Container>
            <Title>{title}</Title>
            {children}
        </Container>
    );
}

export { FilterSeparator };
