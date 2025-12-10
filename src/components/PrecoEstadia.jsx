import {
  parseISO,
  isWithinInterval,
  startOfDay,
  endOfDay,
  isBefore,
  isEqual,
  isAfter,
} from "date-fns";
import { useState, useEffect } from "react";

const PrecoEstadia = ({ sejours, dataChegada, dataPartida }) => {
  const [preco, setPreco] = useState(null);
    
  useEffect(() => {
    console.log("Sejours: ", sejours);
        if (dataChegada && dataPartida) {
            const res = calcularPrecoEstadia(sejours, dataChegada, dataPartida);
            setPreco(res);
            console.log("Preco: ", res);
        }
    }, [dataChegada, dataPartida, sejours]);

  const calcularPrecoEstadia = (sejours, dataCheckInStr, dataCheckOutStr) => {
    let precoTotal = 0;
    let todosDisponiveis = true;
    const estadiasEncontradas = [];

    // Converte as strings do usuário para objetos Date
    const checkInUsuario = startOfDay(parseISO(dataCheckInStr));
    const checkOutUsuario = startOfDay(parseISO(dataCheckOutStr));

    // 1. Validação de Datas
    if (
      isBefore(checkOutUsuario, checkInUsuario) ||
      isEqual(checkOutUsuario, checkInUsuario)
    ) {
      return {
        total: 0,
        disponivel: false,
        erro: "A data de check-out deve ser posterior à data de check-in.",
      };
    }

    // 2. Itera sobre os períodos de estadia fixos
    for (const sejour of sejours) {
      // Converte as datas do JSON para objetos Date
      const sejourStart = startOfDay(parseISO(sejour.date_debut));
      const sejourEnd = startOfDay(parseISO(sejour.date_fin));

      // Verifica se o período do sejour se intercepta com o período do usuário
      const sejourDentroIntervalo =
        // O check-in do usuário cai dentro deste período (incluindo a data de início mas não a data fim)
        isEqual(sejourStart, checkInUsuario) 
        ||
        // O check-out do usuário cai dentro deste período (incluindo a data de fim mas não a data de início)
        isEqual(sejourEnd, checkOutUsuario)

      if (sejourDentroIntervalo) {
        // 3. Verificação de Disponibilidade
        if (sejour.etat_reservation !== "libre") {
          todosDisponiveis = false; // Se um único bloco estiver indisponível
        }

        
        // 4. Cálculo do Preço
        // Prioriza 'montant' se for 'libre', senão usa 'montant_archive' (preço da reserva/período fechado)
        let precoStr = sejour.montant;

        if (
          sejour.etat_reservation !== "libre" ||
          precoStr === "0.00" ||
          precoStr === null
        ) {
          precoStr = sejour.montant_archive;
        }

        const precoPeriodo = parseFloat(precoStr || 0);

        // Se o período do usuário for exatamente o período da estadia, usa o preço total.
        // NOTA: Para estadias que abrangem múltiplos blocos, SOMAMOS os preços dos blocos.
        precoTotal += precoPeriodo;
        estadiasEncontradas.push(sejour);
      }
    }

    // Verifica se o último período encontrado termina na data de partida do usuário
    const estadiasSuficientes = estadiasEncontradas.length > 0 && estadiasEncontradas[estadiasEncontradas.length - 1].date_fin == dataPartida;
    return {
      total: todosDisponiveis ? precoTotal : 0, // Retorna 0 se não estiver disponível
      disponivel: todosDisponiveis && estadiasSuficientes, // Deve ter encontrado pelo menos um período
      detalhes: estadiasEncontradas,
      erro:
        !estadiasSuficientes
          ? "Indisponível"
          : undefined,
    };
  };

  return (
    <>
      <div className="spacer-fixo"></div>
      <div className="reserva-container">
        {/* Conteúdo à Esquerda (Ex: Total ou Infos) */}
        <div className="reserva-infos">
         {preco && preco.disponivel && <h4>{preco.total}</h4>}
         {preco && preco.erro && <h4>{preco.erro}</h4>}
          <p>{`${dataChegada} a ${dataPartida}`}</p>
        </div>

        {/* Conteúdo à Direita (Seu Botão) */}
        <button className="carrinho-reservar-fixo">Reservar</button>
      </div>
    </>
  );
};

export default PrecoEstadia;
