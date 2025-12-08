import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import "../styles/ModalCommon.css";
import "../styles/ModalSkiClass.css";

const ModalAulasSki = ({
  classEntries,
  setClassEntries,
  concluirModal,
  setMostrarModal,
}) => {
  const [regiao, setRegiao] = useState("franceses");
  const [resort, setResort] = useState("");
  const [idadesCriancasForm, setIdadesCriancasForm] = useState([]);
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
      1: {
        1: 350,
        2: 390,
        3: 430,
        4: 470,
        5: 510,
        6: 550,
        7: 590,
        8: 630,
        9: 670,
        10: 710,
        11: 750,
        12: 790,
        13: 830,
        14: 870,
      },
      2: {
        1: 420,
        2: 460,
        3: 500,
        4: 540,
        5: 580,
        6: 620,
        7: 660,
        8: 700,
        9: 740,
        10: 780,
        11: 820,
        12: 860,
        13: 900,
        14: 940,
      },
      3: {
        1: 490,
        2: 530,
        3: 570,
        4: 610,
        5: 650,
        6: 690,
        7: 730,
        8: 770,
        9: 810,
        10: 850,
        11: 890,
        12: 930,
        13: 970,
        14: 1010,
      },
      4: {
        1: 560,
        2: 600,
        3: 640,
        4: 680,
        5: 720,
        6: 760,
        7: 800,
        8: 840,
        9: 880,
        10: 920,
        11: 960,
        12: 1000,
        13: 1040,
        14: 1080,
      },
      5: {
        1: 630,
        2: 670,
        3: 710,
        4: 750,
        5: 790,
        6: 830,
        7: 870,
        8: 910,
        9: 950,
        10: 990,
        11: 1030,
        12: 1070,
        13: 1110,
        14: 1150,
      },
    },
  };

  const calcularMaximoCriancas = (idx) => {
    const entry = classEntries[idx];
    entry.totalPessoas = entry.qtdeAdultos + entry.qtdeCriancas;
    return Math.max(0, 5 - entry.qtdeAdultos);
  };

  const calcularMaximoAdultos = (idx) => {
    const entry = classEntries[idx];
    entry.totalPessoas = entry.qtdeAdultos + entry.qtdeCriancas;
    return Math.max(0, 5 - entry.qtdeCriancas);
  };

  const adicionarClassEntry = () => {
    if (!regiao || !resort) {
      toast.error("Por favor, preencha: A Região e o Resort");
      return;
    }

    setClassEntries([
      ...classEntries,
      {
        id: Date.now() + Math.random(),
        regiao,
        resort,
        dataInicio: "",
        dias: 0,
        periodo: "",
        modalidade: "",
        qtdeAdultos: 0,
        qtdeCriancas: 0,
        totalPessoas: 0,
        idadesCriancas: idadesCriancasForm.map((age) => ({ age })),
        nivel: "",
      },
    ]);
  };

  const removeClassEntry = (index) => {
    setClassEntries(classEntries.filter((_, i) => i !== index));
  };

  const updateClassEntry = (index, changes) => {
    const copy = [...classEntries];
    copy[index] = { ...copy[index], ...changes };
    setClassEntries(copy);

    console.log("Updating entry at index", index, "with changes", changes);
  };

  const calcularPrecoParaEntrada = (entry) => {
    console.log("Calculating price for entry", entry);
    const pessoas = Math.min(5, entry.totalPessoas);
    const diasAula = Math.min(14, entry.dias);
    const tabelaPeriodo = precosAulas[entry.periodo];
    
    if (tabelaPeriodo && tabelaPeriodo[pessoas]) {
      return tabelaPeriodo[pessoas][diasAula] || 0;
    }
    return 0;

  };

  const enviarParaCarrinho = () => {
    concluirModal();
  }

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
        <h2 className="modal-title">Aulas Ski / Snowboard</h2>
      </header>

      <div className="modal-body">
        <section className="modal-form">
          <div className="row">
            <label className="col area-inline">
              Área:
              <div className="area-options">
                <label>
                  <input
                    type="radio"
                    name="regiao"
                    value="franceses"
                    checked={regiao === "franceses"}
                    onChange={() => setRegiao("franceses")}
                  />
                  Alpes Franceses
                </label>
                <label>
                  <input
                    type="radio"
                    name="regiao"
                    value="suicos"
                    checked={regiao === "suicos"}
                    onChange={() => setRegiao("suicos")}
                  />
                  Alpes Suíços
                </label>
              </div>
            </label>
          </div>

          <div className="row">
            <label className="col">
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
            <label>
              Adicionar Grupo:
              <button type="button" onClick={adicionarClassEntry}>
                <span class="material-symbols-outlined">add_circle</span>
              </button>
            </label>
          </div>

          {classEntries.map((entry, idx) => (
            <div key={entry.id} className="entry-card">
              <div className="entry-top">
                <div className="entry-number">
                  Grupo {idx + 1}: {entry.modalidade} (
                  {entry.periodo === "halfday" ? "Half day" : "Full day"})
                </div>
                <div className="summary-price">
                  €{" "}
                  {calcularPrecoParaEntrada(entry).toFixed(2).replace(".", ",")}
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

              <div className="row">
                <label className="col">
                  Modalidade:
                  <div className="area-options">
                    <label>
                      <input
                        type="radio"
                        name="modalidade"
                        value="ski"
                        checked={entry.modalidade === "ski"}
                        onChange={() =>
                          updateClassEntry(idx, { modalidade: "ski" })
                        }
                      />
                      Ski
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="modalidade"
                        value="snowboard"
                        checked={entry.modalidade === "snowboard"}
                        onChange={() =>
                          updateClassEntry(idx, { modalidade: "snowboard" })
                        }
                      />
                      Snowboard
                    </label>
                  </div>
                </label>
              </div>
              <div className="row">
                <label className="col">
                  Data de Início:
                  <input
                    type="date"
                    value={entry.dataInicio}
                    onChange={(e) =>
                      updateClassEntry(idx, { dataInicio: e.target.value })
                    }
                    min={new Date().toISOString().split("T")[0]}
                  />
                </label>

                <label className="col">
                  Dias de Aulas:
                  <select
                    value={entry.dias}
                    onChange={(e) =>
                      updateClassEntry(idx, { dias: parseInt(e.target.value) })
                    }
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(
                      (d) => (
                        <option key={d} value={d}>
                          {d} dia{d > 1 ? "s" : ""}
                        </option>
                      )
                    )}
                  </select>
                </label>
              </div>

              <div className="row">
                <label className="col">
                  Período:
                  <div className="col">
                    <label>
                      <input
                        type="radio"
                        name="periodo"
                        value="halfday"
                        checked={entry.periodo === "halfday"}
                        onChange={() =>
                          updateClassEntry(idx, { periodo: "halfday" })
                        }
                      />
                      Half day (9:15 às 13:15)
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="periodo"
                        value="fullday"
                        checked={entry.periodo === "fullday"}
                        onChange={() =>
                          updateClassEntry(idx, { periodo: "fullday" })
                        }
                      />
                      Full day (9:00 às 16:30)
                    </label>
                  </div>
                </label>
              </div>

              <div className="row">
                <label className="col">
                  Qtde. Adultos:
                  <p className="subtitle-small">
                    Máx. 5 pessoas por grupo
                  </p>
                  <select
                    value={entry.qtdeAdultos}
                    onChange={(e) =>
                      updateClassEntry(idx, {
                        qtdeAdultos: parseInt(e.target.value),
                      })
                    }
                  >
                    <option value={0}>Nenhuma</option>

                    {Array.from(
                      { length: calcularMaximoAdultos(idx) },
                      (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1} adulto{i + 1 > 1 ? "s" : ""}
                        </option>
                      )
                    )}
                  </select>
                </label>

                <label className="col">
                  Qtde. Crianças:
                  <p className="subtitle-small">
                    Máx. 5 pessoas por grupo
                  </p>
                  <select
                    value={entry.qtdeCriancas}
                    onChange={(e) =>
                      updateClassEntry(idx, {
                        qtdeCriancas: parseInt(e.target.value),
                      })
                    }
                  >
                    <option value={0}>Nenhuma</option>
                    {Array.from(
                      { length: calcularMaximoCriancas(idx) },
                      (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1} criança{i + 1 > 1 ? "s" : ""}
                        </option>
                      )
                    )}
                  </select>
                </label>
              </div>

              {entry.qtdeCriancas > 0 && (
                <div className="row">
                  <div className="full">
                    <div className="children-ages-grid">
                      {Array.from({ length: entry.qtdeCriancas }).map(
                        (_, idx) => (
                          <div className="person-row">
                            <label className="person-label">{`Criança ${
                              idx + 1
                            }`}</label>
                            <label>Idade:</label>
                            <input
                              key={idx}
                              type="number"
                              min="0"
                              max="17"
                              value={idadesCriancasForm[idx] || ""}
                              onChange={(e) => {
                                const newAges = [...idadesCriancasForm];
                                newAges[idx] = e.target.value;
                                setIdadesCriancasForm(newAges);
                              }}
                              className="child-age-input"
                            />
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="row">
                <label className="col">
                  Nível de Experiência:
                  <p className="subtitle-small">
                    Escolha o nível que mais se aproxima da experiência do grupo
                  </p>
                  <select
                    value={entry.nivel}
                    onChange={(e) =>
                      updateClassEntry(idx, { nivel: e.target.value })
                    }
                  >
                    <option value="">Selecione</option>
                    {niveisExperiencia.map((n) => (
                      <option key={n.value} value={n.value}>
                        {n.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
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
            <button className="btn-confirm" onClick={enviarParaCarrinho}>
              ADICIONAR
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ModalAulasSki;
