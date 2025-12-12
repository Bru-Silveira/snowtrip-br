
import { parseISO, startOfDay, isBefore, isEqual } from 'date-fns';

export const encontrarEstadiasNoPeriodo = (sejours, dataCheckInStr, dataCheckOutStr) => {
    
    const estadiasEncontradas = [];
    const checkInUsuario = startOfDay(parseISO(dataCheckInStr));
    const checkOutUsuario = startOfDay(parseISO(dataCheckOutStr));

    // 1. Validação de Datas de Check-in/out
    if (isBefore(checkOutUsuario, checkInUsuario) || isEqual(checkOutUsuario, checkInUsuario)) {
        return { 
            estadias: [], 
            disponivel: false,
            erro: "A data de check-out deve ser posterior à data de check-in." 
        };
    }

    // 2. Itera e filtra os blocos com base nas fronteiras
    for (const sejour of sejours) {
        const sejourStart = startOfDay(parseISO(sejour.date_debut));
        const sejourEnd = startOfDay(parseISO(sejour.date_fin));

        const sejourDentroIntervalo = 
            isEqual(sejourStart, checkInUsuario) || // Bloco começa no check-in do usuário
            isEqual(sejourEnd, checkOutUsuario);    // OU Bloco termina no check-out do usuário

        if (sejourDentroIntervalo) {
            estadiasEncontradas.push(sejour);
        }
    }

    // 3. Validação da Cobertura Total
    // Verifica se o ÚLTIMO período encontrado termina exatamente na data de check-out do usuário.
    // Verifica se o PRIMEIRO período encontrado começa exatamente na data de check-in do usuário.
    const ultimaEstadia = estadiasEncontradas[estadiasEncontradas.length - 1];
    const ultimaDataFim = ultimaEstadia ? ultimaEstadia.date_fin : null;
    
    const primeiraEstadia = estadiasEncontradas[0];
    const primeiraDataInicio = primeiraEstadia ? primeiraEstadia.date_debut : null;

    const estadiasSuficientes = ultimaDataFim === dataCheckOutStr && primeiraDataInicio === dataCheckInStr; 
    
    //Verificando se todas as estadias encontradas estão livres
    const estadiasLivres = estadiasEncontradas.every((sejour) => sejour.etat_reservation === "libre");
    
    return { 
        estadias: estadiasEncontradas, 
        disponivel: estadiasSuficientes && estadiasLivres,
        erro: !estadiasSuficientes ? "As datas selecionadas não correspondem a períodos completos de estadia." : null
    };
};

export const calcularPrecoTotal = (estadiasEncontradas) => {
    let precoTotal = 0;
    let todosDisponiveis = true;

    if (!estadiasEncontradas || estadiasEncontradas.length === 0) {
        return { total: 0, todosDisponiveis: false };
    }

    for (const sejour of estadiasEncontradas) {
        
        // 1. Verificação de Disponibilidade
        if (sejour.etat_reservation !== "libre") {
            todosDisponiveis = false; 
        }

        // 2. Cálculo do Preço (Lógica de prioridade)
        let precoStr = sejour.montant;

        // Se indisponível, ou se o preço livre for zero/nulo, usa o preço arquivado.
        if (
            sejour.etat_reservation !== "libre" ||
            precoStr === "0.00" ||
            precoStr === null
        ) {
            precoStr = sejour.montant_archive;
        }

        const precoPeriodo = parseFloat(precoStr || 0);
        precoTotal += precoPeriodo;
    }

    // Retorna o resultado final
    return {
        total: todosDisponiveis ? precoTotal : 0,
        todosDisponiveis: todosDisponiveis
    };
};