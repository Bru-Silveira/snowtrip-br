import React from 'react';
import './FiltroBusca.css'; // Crie esse CSS

const FiltroBusca = ({
  cidade,
  setCidade,
  dataChegada,
  setDataChegada,
  dataPartida,
  setDataPartida,
  quantidadePessoas,
  setQuantidadePessoas,
  onPesquisar,
}) => {
  return (
    <div className="filtro-container">
      <input
        type="date"
        value={dataChegada}
        onChange={(e) => setDataChegada(e.target.value)}
        className="filtro-input"
      />
      <input
        type="date"
        value={dataPartida}
        onChange={(e) => setDataPartida(e.target.value)}
        className="filtro-input"
      />
      <select
        value={cidade}
        onChange={(e) => setCidade(e.target.value)}
        className="filtro-input"
      >
        <option value="">Destino</option>
        <option value="Chamonix">Chamonix</option>
        <option value="Courchevel">Courchevel</option>
        <option value="Morzine">Morzine</option>
        <option value="Megève">Megève</option>
      </select>
      <input
        type="number"
        min="1"
        value={quantidadePessoas}
        onChange={(e) => setQuantidadePessoas(e.target.value)}
        className="filtro-input"
        placeholder="Pessoas"
      />
      <button onClick={onPesquisar} className="filtro-button">
        MONTE SUA TRIP
      </button>
    </div>
  );
};

export default FiltroBusca;
