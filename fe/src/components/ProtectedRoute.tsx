import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import jwt_decode from 'jwt-decode';
import { DecodedProps } from '../pages/CitiesList';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { token } = useAuth();
    const now = new Date();
    const decoded: DecodedProps = jwt_decode(token);
    const validUntil = new Date(decoded.exp * 1000);

    if (!token || validUntil < now) {
        return <Navigate to="/login" />;
    }
    return children;
};
