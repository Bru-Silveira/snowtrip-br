// src/utils/equipamentos.js

export const CAPACETE_ADICIONAL = "capacete";

const tabelaPrecos = {
  capacete: {
    1: 6,
    2: 12,
    3: 18,
    4: 24,
    5: 30,
    6: 36,
    7: 42,
  },

  // exemplos — ajuste para seus packs reais
  "ski-adulto": {
    1: 35,
    2: 70,
    3: 105,
    4: 140,
    5: 175,
    6: 210,
    7: 245,
  },
  "snowboard-adulto": {
    1: 40,
    2: 80,
    3: 120,
    4: 160,
    5: 200,
    6: 240,
    7: 280,
  },
};

export const getPrecoEquipamento = (packNome, dias) => {
  const pack = tabelaPrecos[packNome];
  if (!pack) return 0;

  return pack[dias] || 0;
};
