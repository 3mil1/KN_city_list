import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const ProtectedRoute = ({ children }: { children: ReactNode }): any /* JSX.Element */ => {
    const { token } = useAuth();
    //console.log('ProtectedRoute ~ token:', token);
    if (!token) {
        return <Navigate to="/login" />;
    }
    return children;
};
