import React, {
    useEffect,
    createContext,
    ReactNode,
    useContext,
    useState,
} from 'react';

import apiPets from '../services/apiPets';

interface IUserProps {
    nome: string;
    cod_usuario: number;
}

interface IAuthProviderProps {
    children: ReactNode;
}

interface ISigninProps {
    email: string;
    password: string;
}

interface IAuthContextProps {
    signed: boolean;
    Signin(data: ISigninProps): Promise<boolean>;
    SignOut(): void;
    user: IUserProps;
}

export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}

export const AuthContext = createContext<IAuthContextProps>(
    {} as IAuthContextProps
);

export const AuthProvider = ({ children }: IAuthProviderProps) => {
    const [user, setUser] = useState<IUserProps>({} as IUserProps);
    const [token, setToken] = useState('');
    const [refreshToken, setRefreshToken] = useState('');

    useEffect(() => {
        async function loadStorageData() {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            const storagedUser = localStorage.getItem('apeti:User');
            const storagedRefreshToken =
                localStorage.getItem('apeti:RefreshToken');

            if (storagedRefreshToken) {
                const getRefreshToken = await RefreshToken(
                    storagedRefreshToken || ''
                );
                if (getRefreshToken) {
                    storagedUser && setUser(JSON.parse(storagedUser));
                } else {
                    cleanLogin(true);
                }
            } else {
                cleanLogin(true);
            }
        }
        loadStorageData();
    }, []);

    async function RefreshToken(token: string): Promise<boolean> {
        try {
            const response = await apiPets.post('refresh-token', { token });

            if (response.data.token) {
                setToken(response.data.token);
                setRefreshToken(response.data.refresh_token);
                localStorage.setItem('apeti:Token', response.data.token);
                localStorage.setItem(
                    'apeti:RefreshToken',
                    response.data.refresh_token
                );
                apiPets.defaults.headers.Authorization = `Baerer ${response.data.token}`;
                return true;
            }
            return false;
        } catch (err) {
            console.log('erro RefreshToken', err);
            return false;
        }
    }

    function cleanLogin(forced: boolean) {
        setUser({} as IUserProps);
        setToken('');
        setRefreshToken('');
        apiPets.defaults.headers.Authorization = `Bearer `;
        forced && localStorage.removeItem('apeti:RefreshToken');
        localStorage.removeItem('apeti:Token');
        localStorage.removeItem('apeti:User');
    }

    async function Signin(data: ISigninProps) {
        try {
            const response = await apiPets.post('signin', {
                email: data.email,
                senha: data.password,
            });

            const user: IUserProps = response.data.user;

            localStorage.setItem('apeti:Token', response.data.token);
            localStorage.setItem(
                'apeti:RefreshToken',
                response.data.refresh_token
            );

            localStorage.setItem('apeti:User', JSON.stringify(user));
            setUser(user);
            setToken(response.data.token);
            setRefreshToken(response.data.refresh_token);
            apiPets.defaults.headers.Authorization = `Bearer ${response.data.token}`;

            if (response.data.user) {
                return true;
            }
            return false;
        } catch (error: any) {
            console.log(error);
            throw error.response?.data || error;
        }
    }

    function SignOut() {
        cleanLogin(false);

        localStorage.removeItem('apeti:RefreshToken');
    }

    return (
        <AuthContext.Provider
            value={{
                signed: Boolean(user.cod_usuario),
                Signin,
                SignOut,
                user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
