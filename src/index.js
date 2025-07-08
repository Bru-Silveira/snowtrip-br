import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './assets/styles/index.css';
import App from './App.jsx';
import Reserva from './components/Reserva'; // <-- novo componente que você ainda vai criar

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/reserva/:id" element={<Reserva />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
