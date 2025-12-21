import descobertaImg from "../img/equipamentos/ski/adulto/descoberta.jpg";
import sensacaoImg from "../img/equipamentos/ski/adulto/sensacao.jpg";
import excelenciaImg from "../img/equipamentos/ski/adulto/excelencia.jpg";

import descobertaBadge from "../img/equipamentos/ski/adulto/descoberta-badge.png";
import sensacaoBadge from "../img/equipamentos/ski/adulto/sensacao-badge.png";
import excelenciaBadge from "../img/equipamentos/ski/adulto/excelencia-badge.png";

import miniKidImg from "../img/equipamentos/ski/infantil/mini-kid.jpg";
import espoirImg from "../img/equipamentos/ski/infantil/espoir.jpg";
import riderJuniorImg from "../img/equipamentos/ski/infantil/rider-junior.jpg";

import miniBadge from "../img/equipamentos/ski/infantil/mini-badge.png";
import espoirBadge from "../img/equipamentos/ski/infantil/espoir-badge.png";
import riderBadge from "../img/equipamentos/ski/infantil/rider-badge.png";

import sensacaoSnowboardImg from "../img/equipamentos/snowboard/adulto/sensacao.jpg";
import excelenciaSnowboardImg from "../img/equipamentos/snowboard/adulto/excelencia.jpg";
import sensacaoSnowboardBadge from "../img/equipamentos/snowboard/adulto/sensacao-badge.png";
import excelenciaSnowboardBadge from "../img/equipamentos/snowboard/adulto/excelencia-badge.png";
import riderJuniorSnowboardImg from "../img/equipamentos/snowboard/infantil/rider-junior.jpg";
import riderJuniorSnowboardBadge from "../img/equipamentos/snowboard/infantil/rider-badge.png";


const equipamentosImagens = {
  "ski": {
    "adulto": {
      "Descoberta": descobertaImg,
      "Sensação": sensacaoImg,
      "Excelência": excelenciaImg
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
      "Excelência": excelenciaSnowboardImg
    },
    "infantil": {
      "Rider Junior": riderJuniorSnowboardImg
    }
  }
}

const equipamentoBadges = {
  "ski": {
    "adulto": {
      "Descoberta": descobertaBadge,
      "Sensação": sensacaoBadge,
      "Excelência": excelenciaBadge
    },
    "infantil": {
      "Mini Kid": miniBadge,
      "Espoir": espoirBadge,
      "Rider Junior": riderBadge
    }
  },
  "snowboard": {
    "adulto": {
      "Sensação": sensacaoSnowboardBadge,
      "Excelência": excelenciaSnowboardBadge
    },
    "infantil": {
      "Rider Junior": riderJuniorSnowboardBadge
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
 * Busca o badge/ícone de um equipamento baseado em modalidade, categoria e nome
 * @param {string} modalidade - 'ski' ou 'snowboard'
 * @param {string} categoria - 'adulto' ou 'infantil'
 * @param {string} nomeEquipamento - Nome do equipamento (ex: "Descoberta")
 * @returns {string} URL do badge do equipamento ou null
 */
export const getBadgeEquipamento = (modalidade, categoria, nomeEquipamento) => {
  try {
    const badge = equipamentoBadges[modalidade]?.[categoria]?.[nomeEquipamento];
    
    if (!badge) {
      return null;
    }
    
    return badge;
  } catch (error) {
    console.error("❌ Erro ao buscar badge do equipamento:", error);
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
