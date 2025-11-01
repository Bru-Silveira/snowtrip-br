import { useState, useEffect } from "react";
import "../styles/ModalSkiClass.css";
import logoAdd from "../img/logo-add.png";

const ModalAulasSki = ({
  classEntries = [],
  setClassEntries = () => {},
  concluirModal = () => {},
  setMostrarModal = () => {},
}) => {
  const [regiao, setRegiao] = useState("franceses");
  const [resort, setResort] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dias, setDias] = useState(1);
  const [periodo, setPeriodo] = useState("halfday");
  const [modalidade, setModalidade] = useState("ski");
  const [totalPessoas, setTotalPessoas] = useState(1);
  const [qtdeCriancas, setQtdeCriancas] = useState(0);
  const [nivel, setNivel] = useState("");
  const [classTotal, setClassTotal] = useState(0);

  const resortsPorRegiao = {
    franceses: [
      "Courchevel",
      "Meribel",
      "Val Thorens",
      "Val d'Isère",
      "Tignes",
      "Chamonix",
      "Les Arcs",
      "La Plagne",
      "Alpe d'Huez",
      "Megève",
      "Avoriaz",
      "Morzine",
      "Samoëns",
    ],
    suicos: ["Zermatt", "St. Moritz"],
  };

  const niveisExperiencia = [
    { value: "iniciante", label: "Nunca Esquiamos (iniciantes absolutos)" },
    {
      value: "iniciante-praticante",
      label: "Já esquiamos mas ainda somos iniciantes",
    },
    {
      value: "intermediario",
      label: "Intermediário (Já descemos pistas verdes ou azuis)",
    },
    {
      value: "avancado",
      label: "Avançado (Já descemos pistas vermelhas ou pretas)",
    },
  ];

  const precosAulas = {
    halfday: {
      1: { 1: 250, 2: 280, 3: 310, 4: 340, 5: 370, 6: 400 },
      2: { 1: 300, 2: 330, 3: 360, 4: 390, 5: 420, 6: 450 },
      3: { 1: 350, 2: 380, 3: 410, 4: 440, 5: 470, 6: 500 },
      4: { 1: 400, 2: 430, 3: 460, 4: 490, 5: 520, 6: 550 },
      5: { 1: 450, 2: 480, 3: 510, 4: 540, 5: 570, 6: 600 },
    },
    fullday: {
      1: { 1: 350, 2: 390, 3: 430, 4: 470, 5: 510, 6: 550 },
      2: { 1: 420, 2: 460, 3: 500, 4: 540, 5: 580, 6: 620 },
      3: { 1: 490, 2: 530, 3: 570, 4: 610, 5: 650, 6: 690 },
      4: { 1: 560, 2: 600, 3: 640, 4: 680, 5: 720, 6: 760 },
      5: { 1: 630, 2: 670, 3: 710, 4: 750, 5: 790, 6: 830 },
    },
  };

  const addClassEntry = () => {
    if (!resort || !dataInicio || !nivel) {
      alert(
        "Por favor, preencha: Resort, Data de Início e Nível de Experiência"
      );
      return;
    }

    const idadesCriancas = Array.from({ length: qtdeCriancas }, () => ({
      age: "",
    }));

    setClassEntries([
      ...classEntries,
      {
        id: Date.now() + Math.random(),
        regiao,
        resort,
        dataInicio,
        dias,
        periodo,
        modalidade,
        totalPessoas,
        qtdeCriancas,
        idadesCriancas,
        nivel,
      },
    ]);

    // Limpar formulário após adicionar
    setRegiao("franceses");
    setResort("");
    setDataInicio("");
    setDias(1);
    setPeriodo("halfday");
    setModalidade("ski");
    setTotalPessoas(1);
    setQtdeCriancas(0);
    setNivel("");
  };

  const removeClassEntry = (index) => {
    setClassEntries(classEntries.filter((_, i) => i !== index));
  };

  const updateClassEntry = (index, changes) => {
    const copy = [...classEntries];
    copy[index] = { ...copy[index], ...changes };
    setClassEntries(copy);
  };

  const calcularPrecoParaEntrada = (entry) => {
    const pessoas = Math.min(5, entry.totalPessoas);
    const diasAula = Math.min(6, entry.dias);
    const tabelaPeriodo = precosAulas[entry.periodo];

    if (tabelaPeriodo && tabelaPeriodo[pessoas]) {
      return tabelaPeriodo[pessoas][diasAula] || 0;
    }
    return 0;
  };

  useEffect(() => {
    const total = classEntries.reduce((acc, entry) => {
      return acc + calcularPrecoParaEntrada(entry);
    }, 0);
    setClassTotal(total);
  }, [classEntries]);

  useEffect(() => {
    setResort("");
  }, [regiao]);

  return (
    <div className="modal-content ski-class-layout">
      <header className="modal-header">
        <h2 className="modal-title">Aulas de Ski / Snowboard</h2>
      </header>

      <div className="modal-body">
        <section className="modal-form">
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
                    onChange={() => setRegiao("franceses")}
                  />
                  🇫🇷 Alpes Franceses
                </label>
                <label>
                  <input
                    type="radio"
                    name="regiao"
                    value="suicos"
                    checked={regiao === "suicos"}
                    onChange={() => setRegiao("suicos")}
                  />
                  🇨🇭 Alpes Suíços
                </label>
              </div>
            </label>
          </div>

          <div className="row">
            <label className="full">
              Estação / Resort:
              <select
                value={resort}
                onChange={(e) => setResort(e.target.value)}
              >
                <option value="">Selecione</option>
                {resortsPorRegiao[regiao].map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="row">
            <label className="col">
              Data de Início:
              <input
                type="date"
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
              />
            </label>

            <label className="col">
              Dias de Aulas:
              <select
                value={dias}
                onChange={(e) => setDias(parseInt(e.target.value))}
              >
                {[1, 2, 3, 4, 5, 6].map((d) => (
                  <option key={d} value={d}>
                    {d} dia{d > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="row">
            <label className="col">
              Período:
              <div className="area-options">
                <label>
                  <input
                    type="radio"
                    name="periodo"
                    value="halfday"
                    checked={periodo === "halfday"}
                    onChange={() => setPeriodo("halfday")}
                  />
                  Half day (9:15 às 13:15)
                </label>
                <label>
                  <input
                    type="radio"
                    name="periodo"
                    value="fullday"
                    checked={periodo === "fullday"}
                    onChange={() => setPeriodo("fullday")}
                  />
                  Full day (9:00 às 16:30)
                </label>
              </div>
            </label>
          </div>

          <div className="row">
            <label className="col">
              Modalidade:
              <div className="area-options">
                <label>
                  <input
                    type="radio"
                    name="modalidade"
                    value="ski"
                    checked={modalidade === "ski"}
                    onChange={() => setModalidade("ski")}
                  />
                  Ski
                </label>
                <label>
                  <input
                    type="radio"
                    name="modalidade"
                    value="snowboard"
                    checked={modalidade === "snowboard"}
                    onChange={() => setModalidade("snowboard")}
                  />
                  Snowboard
                </label>
              </div>
            </label>
          </div>

          <div className="row">
            <label className="col">
              Total de Pessoas:
              <select
                value={totalPessoas}
                onChange={(e) => setTotalPessoas(parseInt(e.target.value))}
              >
                {[1, 2, 3, 4, 5].map((p) => (
                  <option key={p} value={p}>
                    {p} pessoa{p > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </label>

            <label className="col">
              Qtde. Crianças:
              <select
                value={qtdeCriancas}
                onChange={(e) => setQtdeCriancas(parseInt(e.target.value))}
              >
                <option value={0}>Nenhuma</option>
                {[1, 2, 3, 4, 5].map((c) => (
                  <option key={c} value={c}>
                    {c} criança{c > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {qtdeCriancas > 0 && (
            <div className="row">
              <div className="full">
                <div className="subtitle">Idades das Crianças</div>
                <div className="children-ages-grid">
                  {Array.from({ length: qtdeCriancas }).map((_, idx) => (
                    <input
                      key={idx}
                      type="number"
                      placeholder={`Idade criança ${idx + 1}`}
                      min="0"
                      max="17"
                      className="child-age-input"
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="row">
            <label className="full">
              Nível de Experiência:
              <div className="subtitle-small">
                Escolha o nível que mais se aproxima da experiência do grupo
              </div>
              <select value={nivel} onChange={(e) => setNivel(e.target.value)}>
                <option value="">Selecione</option>
                {niveisExperiencia.map((n) => (
                  <option key={n.value} value={n.value}>
                    {n.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="row add-button-row">
            <button type="button" className="btn-add" onClick={addClassEntry}>
              <img src={logoAdd} alt="Adicionar" className="icon" />
            </button>
            <span className="add-label">
              Monte seu grupo / Escolha seu professor
            </span>
          </div>

          {classEntries.map((entry, idx) => (
            <div key={entry.id} className="entry-card">
              <div className="entry-top">
                <div className="entry-number">
                  Grupo {idx + 1} - {entry.modalidade} (
                  {entry.periodo === "halfday" ? "Half day" : "Full day"})
                </div>
                <div className="entry-actions">
                  <button
                    type="button"
                    className="btn-small btn-remove"
                    onClick={() => removeClassEntry(idx)}
                  >
                    −
                  </button>
                </div>
              </div>

              <div className="entry-summary">
                <div className="summary-item">
                  <strong>Resort:</strong> {entry.resort}
                </div>
                <div className="summary-item">
                  <strong>Data:</strong>{" "}
                  {new Date(entry.dataInicio).toLocaleDateString("pt-BR")}
                </div>
                <div className="summary-item">
                  <strong>Dias:</strong> {entry.dias}
                </div>
                <div className="summary-item">
                  <strong>Pessoas:</strong> {entry.totalPessoas}
                  {entry.qtdeCriancas > 0 &&
                    ` (${entry.qtdeCriancas} criança${
                      entry.qtdeCriancas > 1 ? "s" : ""
                    })`}
                </div>
                <div className="summary-item">
                  <strong>Nível:</strong>{" "}
                  {
                    niveisExperiencia.find((n) => n.value === entry.nivel)
                      ?.label
                  }
                </div>
                <div className="summary-price">
                  € {calcularPrecoParaEntrada(entry).toFixed(2).replace(".", ",")}
                </div>
              </div>

              {entry.qtdeCriancas > 0 && (
                <div className="children-ages-section">
                  <div className="subtitle">Idades das Crianças</div>
                  <div className="children-ages-grid">
                    {entry.idadesCriancas.map((child, cidx) => (
                      <input
                        key={cidx}
                        type="number"
                        placeholder={`Idade ${cidx + 1}`}
                        min="0"
                        max="17"
                        value={child.age}
                        className="child-age-input"
                        onChange={(e) => {
                          const newAges = [...entry.idadesCriancas];
                          newAges[cidx] = { age: e.target.value };
                          updateClassEntry(idx, { idadesCriancas: newAges });
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          <div className="entries-actions">
            <div className="ski-total">
              TOTAL AULAS: € {classTotal.toFixed(2).replace(".", ",")}
            </div>
          </div>

          <div className="modal-footer">
            <button
              className="btn-cancel"
              onClick={() => setMostrarModal(false)}
            >
              CANCELAR
            </button>
            <button className="btn-confirm" onClick={concluirModal}>
              ADICIONAR
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ModalAulasSki;
