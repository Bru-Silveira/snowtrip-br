import { useState, useEffect } from "react";
import "../styles/ModalEquipamentos.css";
import logoAdd from "../img/logo-add.png";
import helmetImg from "../img/helmet.png";
import next from "../img/next.png";
import back from "../img/back.png";
import {
  getPrecoEquipamento,
  EQUIPAMENTOS_DISPONÍVEIS,
  CAPACETE_ADICIONAL,
} from "../utils/equipamentosData.js";
import {
  getImagemEquipamento,
  getBadgeEquipamento,
} from "../utils/equipamentosImagens.js";

const ModalEquipamentos = ({
  servicoSelecionado = null,
  equipEntries = [],
  setEquipEntries = () => {},
  setEquipTotalCarrinho = () => {},
  concluirModal = () => {},
  setMostrarModal = () => {},
}) => {
  const [equipamentos, setEquipamentos] = useState([]);
  const [packSelecionado, setPackSelecionado] = useState(0);
  const [incluirCapacete, setIncluirCapacete] = useState(false);
  const [qtdePessoas] = useState(1);
  const [equipTotal, setEquipTotal] = useState(0);
  const [regiao, setRegiao] = useState("franceses");
  const [resort, setResort] = useState("");
  const [loja, setLoja] = useState("");
  const [categoriaEquipamento, setCategoriaEquipamento] = useState("adulto");
  const [modalidade, setModalidade] = useState("");
  const [dataRetirada, setDataRetirada] = useState("");
  const [dataDevolucao, setDataDevolucao] = useState("");
  const [mostrarFormularioExpandido, setMostrarFormularioExpandido] =
    useState(false);

  const resortsporRegiao = {
    franceses: [
      "Courchevel 1850",
      "Courchevel 1650 – Moriond",
      "Courchevel 1550",
      "Courchevel 1350 – Le Praz",
      "Val Thorens",
      "Meribel",
      "Meribel Mottaret",
      "Meribel Village",
      "Val d'Isère",
      "Tignes",
      "Chamonix 345 / 550",
      "Les Arcs 1600",
      "Les Arc 1800",
      "Les Arcs 1900",
      "Les Arcs 2000",
      "La Plagne",
      "Alpe d'Huez",
      "Megève",
      "Samoëns",
    ],
    suicos: ["Zermatt", "St. Moritz"],
  };

  const lojasporResort = {
    "Courchevel 1850": [
      "Centro Vila",
      "Ski Service Hotel Le Lana",
      "Ski Service Hotel Six Senses",
    ],
    "Courchevel 1650 – Moriond": ["Centro Vila"],
    "Courchevel 1550": ["Centro Vila"],
    "Courchevel 1350 – Le Praz": ["Centro Vila"],
    "Val Thorens": ["Centro Vila"],
    Meribel: ["Centro Villa"],
    "Meribel Mottaret": ["Centro Villa"],
    "Meribel Village": ["Sport Merbibel Villa"],
    "Val d'Isère": ["Centro Vila", "Chalet Val d'Isère", "Snow Berry"],
    Tignes: ["Centro Vila"],
    "Chamonix 345 / 550": ["Centro Vila", "Service Ski Hotel La Folie Douce"],
    "Les Arcs 1600": ["Centro Villa"],
    "Les Arc 1800": ["Centro Villa"],
    "Les Arcs 1900": ["Centro Villa"],
    "Les Arcs 2000": ["Centro Villa"],
    "La Plagne": ["Centro Vila", "Plagne Aime", "Plagne Soleil / outras"],
    "Alpe d'Huez": ["Centro Vila / outras"],
    Megève: ["Philippe Sport", "Ride"],
    Samoëns: ["Centro Villa", "1600"],
    Zermatt: ["Centro Vila / Demais"],
    "St. Moritz": ["Centro Vila / Demais"],
  };

  // Obter packs disponíveis baseado em modalidade e categoria
  const getPacksDisponíveis = () => {
    if (!modalidade || !categoriaEquipamento) return [];

    const equipamentos =
      EQUIPAMENTOS_DISPONÍVEIS[modalidade]?.[categoriaEquipamento] || [];

    return equipamentos.map((eq, index) => ({
      id: `pack-${modalidade}-${categoriaEquipamento}-${index}`,
      nome: eq.nome,
      nivel: eq.descricao,
      tipo: modalidade,
      categoria: categoriaEquipamento,
      tamanho: categoriaEquipamento === "adulto" ? "150-180 cm" : "100-150 cm",
      nomeCompleto: eq.nome, // Usar para buscar preço no JSON
      incluso:
        modalidade === "ski"
          ? ["Skis", "Botas", "Bastões"]
          : ["Snowboard", "Botas"],
    }));
  };

  const packsDisponiveis = getPacksDisponíveis();

  const [feedback, setFeedback] = useState({
    mensagem: "",
    tipo: "", // "erro" | "sucesso"
  });

  const handleRegioChange = (novaRegiao) => {
    setRegiao(novaRegiao);
    setResort("");
    setLoja("");
  };

  const handleResortChange = (novoResort) => {
    setResort(novoResort);
    setLoja("");
  };

  const calcularPrecoParaEntrada = (entrada) => {
    // Buscar preço do equipamento no JSON usando o número de dias
    const precoEquip = getPrecoEquipamento(
      entrada.pack.nomeCompleto,
      entrada.dias
    );
    let total = precoEquip * entrada.qtdePessoas;

    if (entrada.incluirCapacete) {
      // Buscar preço do capacete também
      const precoCapaceteJSON = getPrecoEquipamento(
        CAPACETE_ADICIONAL,
        entrada.dias
      );
      total += precoCapaceteJSON * entrada.qtdePessoas;
    }

    return total;
  };

  const calcularPrecoTotal = () => {
    if (packSelecionado >= packsDisponiveis.length) return 0;

    const pack = packsDisponiveis[packSelecionado];
    if (!pack) return 0;

    // Calcular dias entre datas
    if (!dataRetirada || !dataDevolucao) return 0;

    const dataRet = new Date(dataRetirada);
    const dataDev = new Date(dataDevolucao);
    const diasCalculados = Math.ceil(
      (dataDev - dataRet) / (1000 * 60 * 60 * 24)
    );

    if (diasCalculados <= 0) return 0;

    // Buscar preço do equipamento no JSON
    const precoEquip = getPrecoEquipamento(pack.nomeCompleto, diasCalculados);
    let total = precoEquip * qtdePessoas;

    if (incluirCapacete) {
      // Buscar preço do capacete também
      const precoCapaceteJSON = getPrecoEquipamento(
        CAPACETE_ADICIONAL,
        diasCalculados
      );
      total += precoCapaceteJSON * qtdePessoas;
    }

    return total;
  };

  const addEquipamento = () => {
    if (!resort || !loja) {
      alert("Por favor, selecione Resort e Loja");
      return;
    }

    if (!modalidade || !dataRetirada || !dataDevolucao) {
      alert("Por favor, preencha Modalidade e Datas");
      return;
    }

    // Calcular dias entre datas
    const dataRet = new Date(dataRetirada);
    const dataDev = new Date(dataDevolucao);
    const diasCalculados = Math.ceil(
      (dataDev - dataRet) / (1000 * 60 * 60 * 24)
    );

    if (diasCalculados <= 0) {
      alert("Data de devolução deve ser após a data de retirada");
      return;
    }

    // Validar packSelecionado
    if (packSelecionado >= packsDisponiveis.length) {
      alert("Selecione um equipamento válido");
      return;
    }

    const novoEquipamento = {
      id: Date.now(),
      pack: packsDisponiveis[packSelecionado],
      incluirCapacete,
      tamanhoCapacete: "",
      dias: diasCalculados,
      qtdePessoas: 1,
      regiao,
      resort,
      loja,
      categoriaEquipamento,
      modalidade,
      dataRetirada,
      dataDevolucao,
    };

    setEquipamentos([...equipamentos, novoEquipamento]);

    // Limpar formulário
    setIncluirCapacete(false);
    setCategoriaEquipamento("adulto");
    setModalidade("");
    setDataRetirada("");
    setDataDevolucao("");
    setPackSelecionado(0);
    setMostrarFormularioExpandido(false);
  };

  const removeEquipamento = (id) => {
    setEquipamentos(equipamentos.filter((eq) => eq.id !== id));
  };

  const proximoPack = () => {
    if (packsDisponiveis.length === 0) return;
    setPackSelecionado((prev) => (prev + 1) % packsDisponiveis.length);
  };

  const packAnterior = () => {
    if (packsDisponiveis.length === 0) return;
    setPackSelecionado(
      (prev) => (prev - 1 + packsDisponiveis.length) % packsDisponiveis.length
    );
  };

  useEffect(() => {
    const total = equipamentos.reduce(
      (sum, eq) => sum + calcularPrecoParaEntrada(eq),
      0
    );

    setEquipTotal(total);
    setEquipTotalCarrinho(total);
    setEquipEntries(equipamentos);
  }, [equipamentos]);

  const handleConfirm = () => {
    // ❌ Sem equipamentos
    if (equipamentos.length === 0) {
      setFeedback({
        mensagem: "Adicione pelo menos um equipamento antes de continuar.",
        tipo: "erro",
      });
      return;
    }
    // ✅ Com equipamentos
    setFeedback({
      mensagem: "Equipamento adicionado com sucesso!",
      tipo: "sucesso",
    });

    concluirModal(equipamentos);

    // Fecha o modal após um pequeno delay (UX melhor)
    setTimeout(() => {
      setMostrarModal(false);
      setFeedback({ mensagem: "", tipo: "" });
    }, 1200);
  };

  return (
    <div className="modal-content equip-layout">
      <header className="modal-header">
        <h2 className="modal-title">Equipamentos</h2>
      </header>

      <div className="modal-body">
        <section className="modal-form">
          {/* REGIÃO - ALPES */}
          <div className="row">
            <label className="col">
              Região:
              <div className="area-options">
                <label>
                  <input
                    type="radio"
                    name="regiao"
                    value="franceses"
                    checked={regiao === "franceses"}
                    onChange={() => handleRegioChange("franceses")}
                  />
                  Alpes Franceses
                </label>
                <label>
                  <input
                    type="radio"
                    name="regiao"
                    value="suicos"
                    checked={regiao === "suicos"}
                    onChange={() => handleRegioChange("suicos")}
                  />
                  Alpes Suíços
                </label>
              </div>
            </label>
          </div>

          {/* RESORT / ESTAÇÃO */}
          <div className="row">
            <label className="col">
              Estação / Resort:
              <select
                value={resort}
                onChange={(e) => handleResortChange(e.target.value)}
              >
                <option value="">Selecione</option>
                {resortsporRegiao[regiao].map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {/* LOJA */}
          <div className="row">
            <label className="col">
              Loja:
              <select
                value={loja}
                onChange={(e) => setLoja(e.target.value)}
                disabled={!resort}
              >
                <option value="">Selecione</option>
                {resort &&
                  (lojasporResort[resort] || []).map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
              </select>
            </label>
          </div>

          {/* ADICIONAR EQUIPAMENTO */}
          <div className="row add-button-row">
            <span className="add-label">Adicionar equipamento:</span>
            <button
              type="button"
              className="btn-add"
              onClick={() => {
                if (!resort || !loja) {
                  alert("Por favor, selecione Resort e Loja primeiro");
                  return;
                }
                setMostrarFormularioExpandido(true);
              }}
            >
              <img src={logoAdd} alt="Adicionar" className="icon" />
            </button>
          </div>

          {/* FORMULÁRIO EXPANDIDO - Aparece ao clicar no + */}
          {mostrarFormularioExpandido && (
            <>
              {/* CATEGORIA - ADULTO/INFANTIL */}
              <div className="row">
                <label className="col">
                  Tamanho:
                  <div className="area-options">
                    <label>
                      <input
                        type="radio"
                        name="tamanhoCategoria"
                        value="adulto"
                        checked={categoriaEquipamento === "adulto"}
                        onChange={() => setCategoriaEquipamento("adulto")}
                      />
                      Adulto
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="tamanhoCategoria"
                        value="infantil"
                        checked={categoriaEquipamento === "infantil"}
                        onChange={() => setCategoriaEquipamento("infantil")}
                      />
                      Infantil
                    </label>
                  </div>
                </label>
              </div>
            </>
          )}

          {/* CARROSSEL DE PACKS - Aparece apenas quando Tamanho é selecionado */}
          {mostrarFormularioExpandido && categoriaEquipamento && (
            <div className="pack-carousel">
              {modalidade && dataRetirada && dataDevolucao && (
                <button
                  type="button"
                  className="carousel-btn prev"
                  onClick={packAnterior}
                >
                  <img src={back} alt="Anterior" className="icon" />
                </button>
              )}

              <div className="pack-card">
                {/* CARD HEADER - TITULO, REMOVE E TOTAL */}
                {modalidade && dataRetirada && dataDevolucao && (
                  <div className="pack-card-top">
                    <span className="pack-card-title">Equipamento 1</span>
                    <div className="pack-card-actions">
                      <span className="pack-card-total">
                        € {calcularPrecoTotal().toFixed(2)}
                      </span>
                      <button
                        type="button"
                        className="btn-remove-card"
                        onClick={() => {
                          setMostrarFormularioExpandido(false);
                          setCategoriaEquipamento("");
                          setModalidade("");
                          setDataRetirada("");
                          setDataDevolucao("");
                          setIncluirCapacete(false);
                          setPackSelecionado(0);
                        }}
                        title="Remover"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                )}

                <div className="pack-card-header">
                  {/* IMAGEM - Aparece apenas quando modalidade é selecionada */}
                  {modalidade &&
                    dataRetirada &&
                    dataDevolucao &&
                    packsDisponiveis.length > 0 && (
                      <div className="pack-images-container">
                        <div className="pack-image">
                          <img
                            src={getImagemEquipamento(
                              modalidade,
                              categoriaEquipamento,
                              packsDisponiveis[packSelecionado]?.nome
                            )}
                            alt={`${modalidade} - ${packsDisponiveis[packSelecionado]?.nome}`}
                            crossOrigin="anonymous"
                          />
                        </div>
                        <div className="capacete-image-inline">
                          <img
                            src={helmetImg}
                            alt="Capacete"
                            className={incluirCapacete ? "" : "grayscale"}
                          />
                          <span className="capacete-preco-inline">
                            + €{" "}
                            {(() => {
                              if (!dataRetirada || !dataDevolucao)
                                return "0.00";
                              const dataRet = new Date(dataRetirada);
                              const dataDev = new Date(dataDevolucao);
                              const diasCalculados = Math.ceil(
                                (dataDev - dataRet) / (1000 * 60 * 60 * 24)
                              );
                              const precoCapaceteJSON = getPrecoEquipamento(
                                CAPACETE_ADICIONAL,
                                diasCalculados
                              );
                              return (precoCapaceteJSON * qtdePessoas).toFixed(
                                2
                              );
                            })()}
                          </span>
                          <label className="toggle-switch">
                            <input
                              type="checkbox"
                              checked={incluirCapacete}
                              onChange={(e) =>
                                setIncluirCapacete(e.target.checked)
                              }
                            />
                            <span className="toggle-slider"></span>
                          </label>
                        </div>
                      </div>
                    )}

                  {/* PACK INFO - Aparece apenas quando todos os campos estão preenchidos */}
                  {modalidade &&
                    dataRetirada &&
                    dataDevolucao &&
                    packsDisponiveis.length > 0 && (
                      <div className="pack-info">
                        <div className="pack-nome-container">
                          <h3 className="pack-nome">
                            {packsDisponiveis[packSelecionado]?.nome}
                          </h3>
                          {getBadgeEquipamento(
                            modalidade,
                            categoriaEquipamento,
                            packsDisponiveis[packSelecionado]?.nome
                          ) && (
                            <img
                              src={getBadgeEquipamento(
                                modalidade,
                                categoriaEquipamento,
                                packsDisponiveis[packSelecionado]?.nome
                              )}
                              alt="Badge"
                              className="pack-nome-badge"
                            />
                          )}
                        </div>
                        <p className="pack-nivel">
                          {packsDisponiveis[packSelecionado]?.nivel}
                        </p>

                        <div className="pack-preco">
                          <span className="preco-valor">
                            € {calcularPrecoTotal().toFixed(2)}
                          </span>
                        </div>

                        <div className="pack-incluso">
                          <p>Incluso:</p>
                          <p>
                            {packsDisponiveis[packSelecionado]?.incluso.join(
                              " + "
                            )}
                          </p>
                        </div>
                      </div>
                    )}
                </div>

                {/* INPUTS DENTRO DO CARD */}
                <div className="pack-card-inputs">
                  <div className="col">
                    <label>Modalidade</label>
                    <select
                      value={modalidade}
                      onChange={(e) => {
                        setModalidade(e.target.value);
                        setPackSelecionado(0);
                      }}
                    >
                      <option value="">Selecione</option>
                      <option value="ski">Ski</option>
                      <option value="snowboard">Snowboard</option>
                    </select>
                  </div>
                  <div className="col">
                    <label>Data de Retirada</label>
                    <input
                      type="date"
                      value={dataRetirada}
                      onChange={(e) => setDataRetirada(e.target.value)}
                    />
                  </div>
                  <div className="col">
                    <label>Data de Devolução</label>
                    <input
                      type="date"
                      value={dataDevolucao}
                      onChange={(e) => setDataDevolucao(e.target.value)}
                    />
                  </div>
                </div>

                {/* CAPACETE E BOTÃO - Aparecem apenas quando todos os campos estão preenchidos */}
                {modalidade && dataRetirada && dataDevolucao && (
                  <>
                    <button
                      type="button"
                      className="btn-adicionar-pack"
                      onClick={addEquipamento}
                    >
                      ADICIONAR
                    </button>
                  </>
                )}
              </div>

              {modalidade && dataRetirada && dataDevolucao && (
                <button
                  type="button"
                  className="carousel-btn next"
                  onClick={proximoPack}
                >
                  <img src={next} alt="Próximo" className="icon" />
                </button>
              )}
            </div>
          )}

          {/* LISTA DE EQUIPAMENTOS */}
          {equipamentos.map((eq, index) => (
            <div key={eq.id} className="entry-card">
              <div className="entry-top">
                <span className="entry-number">Equipamento {index + 1}</span>
                <div className="entry-actions">
                  <button
                    type="button"
                    className="btn-small btn-remove"
                    onClick={() => removeEquipamento(eq.id)}
                    title="Remover"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="entry-summary">
                <div className="summary-item">
                  <strong>Pack:</strong> {eq.pack.nome}
                </div>
                <div className="summary-item">
                  <strong>Nível:</strong> {eq.pack.nivel}
                </div>
                <div className="summary-item">
                  <strong>Tamanho:</strong> {eq.pack.tamanho}
                </div>
                <div className="summary-item">
                  <strong>Categoria:</strong>{" "}
                  {eq.categoriaEquipamento === "adulto" ? "Adulto" : "Infantil"}
                </div>
                <div className="summary-item">
                  <strong>Resort:</strong> {eq.resort}
                </div>
                <div className="summary-item">
                  <strong>Loja:</strong> {eq.loja}
                </div>
                <div className="summary-item">
                  <strong>Dias:</strong> {eq.dias}
                </div>
                <div className="summary-item">
                  <strong>Pessoas:</strong> {eq.qtdePessoas}
                </div>
                <div className="summary-item">
                  <strong>Capacete:</strong>{" "}
                  {eq.incluirCapacete ? `Sim (${eq.tamanhoCapacete})` : "Não"}
                </div>
                <div className="summary-total">
                  Total: €{calcularPrecoParaEntrada(eq).toFixed(2)}
                </div>
              </div>
            </div>
          ))}

          {equipamentos.length > 0 && (
            <div className="entries-actions">
              <div className="equip-total">
                TOTAL EQUIPAMENTOS: €{equipTotal.toFixed(2)}
              </div>
            </div>
          )}

          {/* BOTÕES FINAIS */}
          <div className="modal-footer">
            <button
              className="btn-cancel"
              onClick={() => setMostrarModal(false)}
            >
              CANCELAR
            </button>
            <button className="btn-confirm" onClick={handleConfirm}>
              ADICIONAR
            </button>
          </div>

          {feedback.mensagem && (
            <div className={`modal-feedback ${feedback.tipo}`}>
              {feedback.mensagem}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default ModalEquipamentos;
