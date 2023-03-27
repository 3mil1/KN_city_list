import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import CityDetail from './pages/CityDetail';

import CitiesList from './pages/CitiesList';
import LoginPage from './pages/LoginPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthLayout } from './components/AuthLayout';
import ErrorPage from './pages/ErrorPage';

const router = createBrowserRouter([
    {
        element: <AuthLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to="/login" />,
                errorElement: <ErrorPage />,
            },
            {
                path: '/login',
                element: <LoginPage />,
                errorElement: <ErrorPage />,
            },
            {
                path: 'cities/page/:page',
                element: (
                    <ProtectedRoute>
                        <CitiesList />
                    </ProtectedRoute>
                ),
                errorElement: <ErrorPage />,
            },
            {
                path: '/city/:cityId',
                element: (
                    <ProtectedRoute>
                        <CityDetail />
                    </ProtectedRoute>
                ),
                errorElement: <ErrorPage />,
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
