import React from 'react';
import { AppRoutes } from './appRoutes';
import { MainProvider } from './context/main';

function App() {
    return (
        <MainProvider>
            <AppRoutes />
        </MainProvider>
    );
}

export default App;
