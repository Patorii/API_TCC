import React from 'react';
import { Container, PageArea } from './styles';
import { Outlet } from 'react-router-dom';
import { Header } from '../header';

export function Layout() {
    return (
        <Container>
            <Header />
            <PageArea>
                <Outlet />
            </PageArea>
        </Container>
    );
}
