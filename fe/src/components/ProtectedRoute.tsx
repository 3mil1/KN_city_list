import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import jwt_decode from 'jwt-decode';
import { DecodedProps } from '../pages/CitiesList';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { token } = useAuth();
    let validUntil;
    const now = new Date();
    if (token) {
        try {
            const decoded: DecodedProps = jwt_decode(token);
            validUntil = new Date(decoded.exp * 1000);
            if (validUntil < now) {
                return <Navigate to="/login" />;
            }
        } catch (error) {
            return <Navigate to="/login" />;
        }
    }

    if (!token) {
        return <Navigate to="/login" />;
    }
    return children;
};
