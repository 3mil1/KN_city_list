import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Nav } from './components/nav/nav';
import { SomePage } from './pages/somePage';

function App() {
  return (
    <div className="App">
      <div>Hello</div>

      <Nav />
      <Routes>
        <Route path="/some" element={<SomePage />} />
      </Routes>
    </div>
  );
}

export default App;
