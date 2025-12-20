import descobertaImg from "../img/equipamentos/ski/adulto/descoberta.jpg";
import sensacaoImg from "../img/equipamentos/ski/adulto/sensacao.jpg";
import excelenciaImg from "../img/equipamentos/ski/adulto/excelencia.jpg";
import miniKidImg from "../img/equipamentos/ski/infantil/mini-kid.jpg";
import espoirImg from "../img/equipamentos/ski/infantil/espoir.jpg";
import riderJuniorImg from "../img/equipamentos/ski/infantil/rider-junior.jpg";

import sensacaoSnowboardImg from "../img/equipamentos/snowboard/adulto/sensacao.jpg";
import excelenciaSnowboardImg from "../img/equipamentos/snowboard/adulto/excelencia.jpg";
import riderJuniorSnowboardImg from "../img/equipamentos/snowboard/infantil/rider-junior.jpg";

const equipamentosImagens = {
  "ski": {
    "adulto": {
      "Descoberta": descobertaImg,
      "Sensação": sensacaoImg,
      "Exelencia": excelenciaImg
    },
    "infantil": {
      "Mini Kid": miniKidImg,
      "Espoir": espoirImg,
      "Rider Junior": riderJuniorImg
    }
  },
  "snowboard": {
    "adulto": {
      "Sensação": sensacaoSnowboardImg,
      "Exelencia": excelenciaSnowboardImg
    },
    "infantil": {
      "Rider Junior": riderJuniorSnowboardImg
    }
  }
}

/**
 * Busca a imagem de um equipamento baseado em modalidade, categoria e nome
 * @param {string} modalidade - 'ski' ou 'snowboard'
 * @param {string} categoria - 'adulto' ou 'infantil'
 * @param {string} nomeEquipamento - Nome do equipamento (ex: "Descoberta", "Sensação")
 * @returns {string} URL da imagem do equipamento ou null
 */
export const getImagemEquipamento = (modalidade, categoria, nomeEquipamento) => {
  try {
    const imagem = equipamentosImagens[modalidade]?.[categoria]?.[nomeEquipamento];
    
    console.log(`🖼️ Buscando imagem: ${modalidade}/${categoria}/${nomeEquipamento}`, imagem);
    
    if (!imagem) {
      console.warn(
        `⚠️ Imagem não encontrada para: ${modalidade}/${categoria}/${nomeEquipamento}`
      );
      return null;
    }
    
    return imagem;
  } catch (error) {
    console.error("❌ Erro ao buscar imagem do equipamento:", error);
    return null;
  }
};

/**
 * Obtém todas as imagens disponíveis
 * @returns {object} Objeto com todas as imagens mapeadas
 */
export const obterTodasAsImagens = () => {
  return equipamentosImagens;
};
