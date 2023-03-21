import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import CityDetail from './pages/CityDetail';

import CitiesList from './pages/Cities/CitiesList';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/cities/page/1" />,
    },
    {
        path: 'cities/page/:page',
        element: <CitiesList />,
    },
    {
        path: '/city/:cityId',
        element: <CityDetail />,
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
