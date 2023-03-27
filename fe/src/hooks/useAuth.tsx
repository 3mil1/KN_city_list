import { createContext, useContext, useMemo, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { DecodedProps } from '../pages/CitiesList';
import { useLocalStorage } from './useLocalStorage';
import { LoginProps } from '../pages/LoginPage';

interface AuthContextProps {
    token: string;
    login: (data: LoginProps) => void;
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
    const response = await fetch(`/api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Failed to login');
    }
    return response.json();
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate();
    const [token, setToken] = useLocalStorage('token', null);

    useEffect(() => {
        const now = new Date();
        const decoded: DecodedProps = jwt_decode(token);
        const validUntil = new Date(decoded.exp * 1000);
        if (validUntil >= now) {
            navigate('/cities/page/1');
        }
    }, [token]);

    const login = async (data: LoginProps) => {
        const { access_token } = await postLogin(data);
        if (access_token) {
            setToken(access_token);
            navigate('/cities/page/1');
        }
    };

    const logout = () => {
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
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};
