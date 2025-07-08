import React from 'react';
import CardImovel from './CardImovel';

function ListaImoveis({ imoveisFiltrados, pesquisado }) {
  return (
    <div className="grid">
      {pesquisado ? (
        imoveisFiltrados.length > 0 ? (
          imoveisFiltrados.map((imovel, index) => (
            <CardImovel key={index} imovel={imovel} />
          ))
        ) : (
          <p>Nenhum imóvel encontrado para os critérios selecionados.</p>
        )
      ) : (
        <p>Preencha os filtros e clique em "Pesquisar".</p>
      )}
    </div>
  );
}

export default ListaImoveis;
