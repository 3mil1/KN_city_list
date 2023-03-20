import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CitiesList, { loader as citiesLoader } from './pages/CitiesList';
import CityDetail from './pages/CityDetail';
import ErrorPage from './pages/ErrorPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <CitiesList />,
        errorElement: <ErrorPage />,
        loader: citiesLoader,
        children: [
            {
                path: '/cities/page/:page',
                element: <CitiesList />,
                errorElement: <ErrorPage />,
            },
        ],
    },
    {
        path: '/city/:cityId',
        element: <CityDetail />,
        errorElement: <ErrorPage />,
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
