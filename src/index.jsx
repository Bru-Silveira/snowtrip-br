import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from './App.jsx';
import Reserva from './Reserva.jsx'; // <-- novo componente que você ainda vai criar
import Detalhes from './Detalhes.jsx';
import Carrinho from './Carrinho';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastContainer />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/reserva/:id" element={<Reserva />} />
        <Route path="/detalhes/:id" element={<Detalhes />} />
        <Route path="/carrinho" element={<Carrinho />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
