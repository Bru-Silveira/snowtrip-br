import valoresEquipamentos from '../valoresEquipamentos.json';

/**
 * Parse dos dados de equipamentos para uma estrutura mais organizada
 * Converte o array desordenado do JSON para um objeto indexado por resort, loja, tipo e modalidade
 */

export const parseEquipamentosData = () => {
  const dados = {};

  valoresEquipamentos.forEach((item) => {
    // Extrair informações do cabeçalho
    const header = item["Valores Equipamentos 25/26 Courchevel 1850 Loja  Ski Adulto "];
    
    if (!header) return;

    // Se não tem preço, pula (é apenas um separador)
    if (!item["Ski Service Center  Valor 2 dias "]) return;

    // Parse da chave do header para extrair: Resort, Loja, Tipo (Ski/Snow), Categoria (Adulto/Infantil)
    // Formato esperado: "Valores Equipamentos 25/26 [Resort] Loja [Loja] [Tipo] [Categoria]"
    // Exemplo: "Valores Equipamentos 25/26 Courchevel 1850 Loja  Ski Adulto "

    // Extrair valores por dias
    const precosPorDias = {
      2: item["Ski Service Center  Valor 2 dias "],
      3: item["Valor 3 dias "],
      4: item["Valor 4 dias "],
      5: item["Valor 5 dias "],
      6: item["Valor 6 dias "],
      7: item["Valor 7 dias "],
      8: item["Valor 8 dias "],
      9: item["Valor 9 dias "],
      10: item["  Valor 10 dias "],
      14: item[" Valor 14 dias "],
    };

    // Armazenar dados
    const equipName = header.trim();
    
    if (!dados[equipName]) {
      dados[equipName] = {
        nome: equipName,
        precosPorDias,
        desconto: item["Desconto "] || 0,
      };
    }
  });

  return dados;
};

/**
 * Busca o preço de um equipamento baseado em dias
 * @param {string} equipmentName - Nome do equipamento
 * @param {number} dias - Número de dias
 * @returns {number} Preço do equipamento
 */
export const getPrecoEquipamento = (equipmentName, dias) => {
  const dados = parseEquipamentosData();
  const equipamento = dados[equipmentName];

  if (!equipamento) {
    console.warn(`Equipamento "${equipmentName}" não encontrado`);
    return 0;
  }

  // Tentar encontrar o preço exato para o número de dias
  if (equipamento.precosPorDias[dias]) {
    return equipamento.precosPorDias[dias];
  }

  // Se não encontrar, retornar o preço mais próximo
  const diasDisponiveis = Object.keys(equipamento.precosPorDias)
    .map(Number)
    .sort((a, b) => a - b);

  const diasMaisProximo = diasDisponiveis.reduce((prev, curr) => {
    return Math.abs(curr - dias) < Math.abs(prev - dias) ? curr : prev;
  });

  return equipamento.precosPorDias[diasMaisProximo];
};

/**
 * Lista de equipamentos por tipo e categoria
 * Mapeamento manual baseado no que está no JSON
 */
export const EQUIPAMENTOS_DISPONÍVEIS = {
  ski: {
    adulto: [
      { nome: "Descoberta", descricao: "Nível Iniciante" },
      { nome: "Sensação", descricao: "Nível Intermediário" },
      { nome: "Exelencia", descricao: "Nível Avançado" },
    ],
    infantil: [
      { nome: "Mini Kid", descricao: "Infantil Pequeno" },
      { nome: "Espoir", descricao: "Infantil Médio" },
      { nome: "Rider Junior", descricao: "Infantil Grande" },
    ],
  },
  snowboard: {
    adulto: [
      { nome: "Sensação", descricao: "Nível Intermediário" },
      { nome: "Exelencia", descricao: "Nível Avançado" },
    ],
    infantil: [
      { nome: "Rider Junior", descricao: "Infantil" },
    ],
  },
};

/**
 * Capacete adicional
 */
export const CAPACETE_ADICIONAL = "Capacete adicional";
