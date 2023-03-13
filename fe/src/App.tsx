import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Nav } from './components/nav/nav';
import { SomePage } from './pages/somePage';
import CitiesList from './pages/CitiesList';
import CityDetail from './pages/CityDetail';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<CitiesList />} />
                <Route path="/detail/:cityId" element={<CityDetail />} />
            </Routes>
        </div>
    );
}

export default App;
