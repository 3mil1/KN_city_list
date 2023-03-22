import { createContext, useContext, useMemo, ReactNode, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from './useLocalStorage';
import { LoginProps } from '../pages/LoginPage';

interface AuthContextProps {
    //loading: boolean;
    token: string;
    login: (data: any) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
    token: '',
    login: (data) => {
        return data;
    },
    logout: () => {
        return;
    },
});

const postLogin = async (data: LoginProps) => {
    //const response = await fetch(`/api/auth/login`, {
    const response = await fetch(`/api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    // console.log('postLogin', await response.json());
    if (!response.ok) {
        throw new Error('Failed to login');
    }
    return response.json();
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate();
    //const [token, setToken] = useLocalStorage('token', null);
    const [token, setToken] = useState('');

    useEffect(() => {
        //console.log('AuthProvider ~ token:', token);
        navigate('/cities/page/1');
    }, [token]);

    const login = async (data: LoginProps) => {
        const { access_token } = await postLogin(data);
        if (access_token) {
            //console.log('access_token:', access_token);
            //setToken('token', access_token);
            setToken(access_token);
            navigate('/cities/page/1');
        }
    };

    const logout = () => {
        //setToken('token', '');
        setToken('');
    };

    const value = useMemo(
        () => ({
            token,
            login,
            logout,
        }),
        [token],
    );
    //console.log('AuthProvider ~ value:', value);
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    //console.log('useAuth', useContext(AuthContext));
    return useContext(AuthContext);
};
