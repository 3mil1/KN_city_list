import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Nav } from './components/nav/nav';
import { SomePage } from './pages/somePage';
import CitiesList from './pages/CitiesList';
import CityDetail from './pages/CityDetail';

import ErrorPage from './pages/ErrorPage';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
    {
        path: '/',
        element: <CitiesList />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/detail/:cityId',
        element: <CityDetail />,
    },
]);

function App() {
    return (
        <div className="App">
            <RouterProvider router={router} />
            {/*             <Routes>
                <Route path="/" element={<CitiesList />} />
                <Route path="/detail/:cityId" element={<CityDetail />} />
            </Routes> */}
        </div>
    );
}

export default App;
