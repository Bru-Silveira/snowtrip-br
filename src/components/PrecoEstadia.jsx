import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  encontrarEstadiasNoPeriodo,
  calcularPrecoTotal,
} from "../utils/calculadoraEstadia.js";

const PrecoEstadia = ({ sejours, dataChegada, dataPartida, adultos, criancas }) => {
  const [preco, setPreco] = useState(null);

  useEffect(() => {
    console.log("Sejours: ", sejours);
    if (dataChegada && dataPartida) {
      const {
        estadias: estadiasEncontradas,
        disponivel: periodoTotalmenteCoberto,
        erro: erroBusca,
      } = encontrarEstadiasNoPeriodo(sejours, dataChegada, dataPartida);

      if (erroBusca) {
        setPreco({ total: 0, disponivel: false, erro: erroBusca });
        return;
      }

      const { total: precoCalculado, todosDisponiveis: blocosDisponiveis } =
        calcularPrecoTotal(estadiasEncontradas);

      const disponivel = periodoTotalmenteCoberto && blocosDisponiveis;

      console.log("Estadias Encontradas: ", estadiasEncontradas);
      console.log(
        "Preço Calculado: ",
        precoCalculado,
        "Disponível: ",
        periodoTotalmenteCoberto
      );

      setPreco({
        total: precoCalculado,
        disponivel: disponivel,
        erro: !disponivel ? "Indisponível" : undefined,
      });
    }
  }, [dataChegada, dataPartida, sejours]);

  const handleSaveSession = () => {
    preco.dataChegada = dataChegada;
    preco.dataPartida = dataPartida;
    preco.qtdeAdultos = adultos;
    preco.criancas = criancas;
    sessionStorage.setItem("precoEstadia", JSON.stringify(preco));
  }

  return (
    <>
      <div className="spacer-fixo"></div>
      <div className="reserva-container">
        {/* Conteúdo à Esquerda (Ex: Total ou Infos) */}
        <div className="reserva-infos">
          {preco && preco.disponivel && <h4>€ {preco.total}</h4>}
          {preco && preco.erro && <h4>{preco.erro}</h4>}
          <p>{`${dataChegada} a ${dataPartida}`}</p>
        </div>

        {/* Conteúdo à Direita (Seu Botão) */}
        <Link to={`/carrinho`} onClick={handleSaveSession} reloadDocument>
          <button className="carrinho-reservar-fixo">Reservar</button>
        </Link>
      </div>
    </>
  );
};

export default PrecoEstadia;
