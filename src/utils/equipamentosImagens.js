import equipamentosImagens from './equipamentosImagens.json';

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
