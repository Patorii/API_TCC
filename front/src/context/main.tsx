import React, { createContext, ReactNode, useContext, useState } from 'react';

interface IMainContext {
    children: ReactNode;
}

interface IFilterOptions {
    tipo: string;
    especie: string;
    raca: string;
    sexo: string;
    uf: string | number;
}

interface IMainContextProps {
    setRefresh(): void;
    refreshMainGet: boolean;
    filterOptions: IFilterOptions;
    setFilter(data: IFilterOptions): void;
}
export function useMain() {
    const context = useContext(MainContext);
    return context;
}

export const MainContext = createContext<IMainContextProps>(
    {} as IMainContextProps
);

export function MainProvider({ children }: IMainContext) {
    const [refreshMainGet, setRefreshMainGet] = useState<boolean>(false);
    const [filterOptions, setFilterOptions] = useState<IFilterOptions>(
        {} as IFilterOptions
    );

    function setRefresh() {
        setRefreshMainGet(!refreshMainGet);
    }

    function setFilter(data: IFilterOptions) {
        setFilterOptions(data);
    }

    return (
        <MainContext.Provider
            value={{
                setRefresh,
                refreshMainGet,
                filterOptions,
                setFilter,
            }}
        >
            {children}
        </MainContext.Provider>
    );
}
