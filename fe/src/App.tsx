import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import CityDetail from './pages/CityDetail';

import CitiesList from './pages/Cities/CitiesList';
import LoginPage from './pages/LoginPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthLayout } from './components/AuthLayout';

const router = createBrowserRouter([
    {
        element: <AuthLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to="/login" />,
            },
            {
                path: '/login',
                element: <LoginPage />,
            },
            {
                path: 'cities/page/:page',
                element: (
                    <ProtectedRoute>
                        <CitiesList />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/city/:cityId',
                element: (
                    <ProtectedRoute>
                        <CityDetail />
                    </ProtectedRoute>
                ),
            },
        ],
    },
]);

function App() {
    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
