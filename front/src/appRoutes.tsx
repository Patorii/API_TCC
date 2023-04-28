import React, { ReactElement } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/home';
import { Layout } from './components/Layout';
import { useAuth } from './context/auth';
import { HomeLogado } from './pages/homeLogado';
import { PageAnuncio } from './pages/anuncio';

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
                        path="homel"
                        element={
                            <ProtectedRoute user={signed}>
                                <HomeLogado />
                            </ProtectedRoute>
                        }
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export { AppRoutes };
