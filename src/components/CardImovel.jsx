import React from 'react';
import { Link } from 'react-router-dom';

function CardImovel({ imovel }) {
  return (
    <div className="card">
      <img src={imovel.resumo.image || "https://via.placeholder.com/150"} alt={imovel.resumo.titre} />
      <h2>{imovel.resumo.titre}</h2>
      <p>{imovel.resumo.ville}</p>
      <p>Preço: {imovel.resumo.prix_hiver || "N/A"}</p>
      <p><strong>Detalhes:</strong> {imovel.detalhes.detail.gastronomie}</p>
      {imovel.resumo.id && (
        <Link to={`/reserva/${imovel.resumo.id}`}>
          <button>Reservar</button>
        </Link>
      )}
    </div>
  );
}

export default CardImovel;
