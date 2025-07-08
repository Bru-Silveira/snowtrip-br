import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Reserva from './Reserva'; // <-- novo componente que você ainda vai criar
import Detalhes from './Detalhes.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/reserva/:id" element={<Reserva />} />
        <Route path="/detalhes/:id" element={<Detalhes />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
