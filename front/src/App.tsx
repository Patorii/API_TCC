import React from 'react';
import { AppRoutes } from './appRoutes';
import { MainProvider } from './context/main';
import { AuthProvider } from './context/auth';

function App() {
    return (
        <AuthProvider>
            <MainProvider>
                <AppRoutes />
            </MainProvider>
        </AuthProvider>
    );
}

export default App;
