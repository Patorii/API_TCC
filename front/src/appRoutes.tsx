import React, { ReactElement } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/home';
import { Layout } from './components/Layout';
import { useAuth } from './context/auth';

import { PageAnuncio } from './pages/anuncio';
import { CriarAnuncio } from './pages/criarAnuncio';
import { MeusAnuncios } from './pages/meusAnuncios';
import { AlterarAnuncio } from './pages/alterAnuncio';
import { FotosAnuncio } from './components/FotosAnuncio';
import { AlterarFotosAnuncio } from './pages/alterFotoAnuncio';

interface IProtectedRoutes {
    user: boolean;
    children: ReactElement;
}

function AppRoutes() {
    const { signed } = useAuth();

    const ProtectedRoute = ({ user, children }: IProtectedRoutes) => {
        if (!user) {
            return <Navigate to="/" replace />;
        }

        return children;
    };
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="anuncio/:id" element={<PageAnuncio />} />
                    <Route
                        path="anuncio"
                        element={
                            <ProtectedRoute user={signed}>
                                <CriarAnuncio />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="meusanuncios"
                        element={
                            <ProtectedRoute user={signed}>
                                <MeusAnuncios />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="editanuncio/:id"
                        element={
                            <ProtectedRoute user={signed}>
                                <AlterarAnuncio />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="editfotoanuncio/:id"
                        element={
                            <ProtectedRoute user={signed}>
                                <AlterarFotosAnuncio />
                            </ProtectedRoute>
                        }
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export { AppRoutes };
