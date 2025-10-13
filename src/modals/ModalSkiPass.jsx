import { useState } from "react";
import tabelaImg from "../img/tabela-ski.jpg";

const ModalSkiPass = ({
  skiPassEntries,
  setSkiPassEntries,
  skiPassTotal,
  concluirModal,
  setMostrarModal,
}) => {
  const [area, setArea] = useState("courchevel");
  const [dataInicio, setDataInicio] = useState("");
  const [dias, setDias] = useState(1);
  const [seguro, setSeguro] = useState(true);
  const [tipoSkiPass, setTipoSkiPass] = useState("");

  console.log("skiPassEntries:", skiPassEntries);

  const jsonBasePorTipoSkiPass = new Map();
  jsonBasePorTipoSkiPass.set("family", {
    adultos: [
      { nome: "", dataNasc: "" },
      { nome: "", dataNasc: "" },
    ],
    criancas: [
      { nome: "", dataNasc: "" },
      { nome: "", dataNasc: "" },
      { nome: "", dataNasc: "" },
    ],
  });
  jsonBasePorTipoSkiPass.set("adulto", { nome: "", dataNasc: "" });
  jsonBasePorTipoSkiPass.set("crianca", { nome: "", dataNasc: "" });

  const removeSkiPassEntry = (index) => {
    setSkiPassEntries((prev) => prev.filter((_, i) => i !== index));
  };

  const addSkiPassEntry = () => {
    console.log("Adicionando ski pass:", {
      tipoSkiPass,
      jsonBasePorTipoSkiPass,
    });
    setSkiPassEntries((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        dataInicio: dataInicio,
        dias: dias,
        tipo: tipoSkiPass,
        esquiadores: jsonBasePorTipoSkiPass.get(tipoSkiPass) || [],
        seguro: seguro,
      },
    ]);
  };

  const updateSkiPassEntry = (index, changes) => {
    setSkiPassEntries((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], ...changes };
      return copy;
    });
  };

  return (
    <div className="modal-content ski-pass-layout">
      <header className="modal-header">
        <h2 className="modal-title">Ski Pass</h2>

        <div className="tabela-help-right">
          <div className="tabela-tooltip-wrapper">
            <button
              type="button"
              className="tabela-tooltip-btn"
              aria-describedby="tabela-tooltip"
            >
              Confira tabela de valores.
              <span className="tabela-tooltip-icon" aria-hidden="true">
                ⓘ
              </span>
            </button>

            <div
              id="tabela-tooltip"
              role="tooltip"
              className="tabela-tooltip"
              aria-hidden="true"
            >
              <img src={tabelaImg} alt="Tabela de valores Ski Pass" />
            </div>
          </div>
        </div>
      </header>

      <div className="modal-body">
        <aside className="modal-aside">
          <div className="tabela-box">
            {/* tabela/preview de valores (sem o texto "Confira tabela de valores.") */}
            {/* ... */}
          </div>
        </aside>

        <section className="modal-form">
          <div className="row">
            <label className="col">
              Área:
              <div className="area-options">
                <label>
                  <input
                    type="radio"
                    name="area-courchevel"
                    value="courchevel"
                    checked={area === "courchevel"}
                    onChange={() => setArea("courchevel")}
                  />
                  Courchevel
                </label>
                <label>
                  <input
                    type="radio"
                    name="3valles"
                    value="3vallees"
                    checked={area === "3vallees"}
                    onChange={() => setArea("3vallees")}
                  />
                  Les 3 Vallées
                </label>
              </div>
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
              Dias:
              <select
                value={dias}
                onChange={(e) => setDias(parseInt(e.target.value || "1", 10))}
              >
                {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                  <option key={d} value={d}>
                    {d} dia{d > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="row">
            <label className="full">
              Tipo de entrada:
              <select
                value={tipoSkiPass}
                onChange={(e) => setTipoSkiPass(e.target.value)}
              >
                <option value="">Selecione</option>
                <option value="family">
                  Family Flex (mínimo 2 adultos e 3 crianças)
                </option>
                <option value="adulto">Solo Adulto (18 - 75 anos)</option>
                <option value="crianca">Solo Criança (5 - 18 anos)</option>
              </select>
            </label>
            <button type="button" className="btn-add" onClick={addSkiPassEntry}>
              Adicionar
            </button>
          </div>

          {skiPassEntries.map((entry, idx) => (
            <div key={entry.id} className="entry-card">
              <div className="entry-top">
                <div className="entry-number"> {entry.tipo + (idx + 1)}</div>
                <div className="entry-actions">
                    <button
                      type="button"
                      className="btn-small btn-remove"
                      onClick={() => removeSkiPassEntry(idx)}
                    >
                      −
                    </button>
                  
                </div>
              </div>

              <div className="row people-section">
                {entry.tipo === "family" && (
                  <div className="family-grid">
                    <div className="subtitle">Adultos</div>
                    {entry.esquiadores.adultos.map((adulto, idx_adulto) => (
                      <div key={idx_adulto} className="person-row">
                        <input
                          type="text"
                          placeholder={`Adulto ${
                            idx_adulto + 1
                          } - Nome completo`}
                          value={adulto.nome || ""}
                          onChange={(ev) => {
                            const newAdults = [...entry.esquiadores.adultos];
                            newAdults[idx_adulto] = {
                              ...newAdults[idx_adulto],
                              nome: ev.target.value,
                            };
                            updateSkiPassEntry(idx, {
                              adultos: newAdults,
                            });
                          }}
                        />
                        <input
                          type="date"
                          value={adulto.dataNasc || ""}
                          onChange={(ev) => {
                            const newAdults = [...entry.esquiadores.adultos];
                            newAdults[idx_adulto] = {
                              ...newAdults[idx_adulto],
                              dataNasc: ev.target.value,
                            };
                            updateSkiPassEntry(idx, {
                              adultos: newAdults,
                            });
                          }}
                        />
                      </div>
                    ))}

                    <div className="subtitle">Crianças</div>
                    {entry.esquiadores.criancas.map((c, ci) => (
                      <div key={ci} className="person-row">
                        <input
                          type="text"
                          placeholder={`Criança ${ci + 1} - Nome completo`}
                          value={c.nome || ""}
                          onChange={(ev) => {
                            const newCriancas = [...entry.esquiadores.criancas];
                            newCriancas[ci] = {
                              ...newCriancas[ci],
                              nome: ev.target.value,
                            };
                            updateSkiPassEntry(idx, {
                              criancas: newCriancas,
                            });
                          }}
                        />
                        <input
                          type="date"
                          value={c.dataNasc || ""}
                          onChange={(ev) => {
                            const newCriancas = [...entry.esquiadores.criancas];
                            newCriancas[ci] = {
                              ...newCriancas[ci],
                              dataNasc: ev.target.value,
                            };
                            updateSkiPassEntry(idx, {
                              criancas: newCriancas,
                            });
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {entry.tipo === "adulto" && (
                  <div className="single-grid">
                    <div key={`nome-` + idx} className="person-row">
                      <input
                        type="text"
                        placeholder={`Nome completo`}
                        value={entry.esquiadores.nome || ""}
                        onChange={(ev) =>
                          updateSkiPassEntry(idx, {
                            esquiadores: { nome: ev.target.value , dataNasc: entry.esquiadores.dataNasc || "" },
                          })
                        }
                      />
                      <input
                        type="date"
                        value={entry.esquiadores.dataNasc || ""}
                        onChange={(ev) =>
                          updateSkiPassEntry(idx, {
                            esquiadores: { nome:entry.esquiadores.nome || "", dataNasc: ev.target.value },
                          })
                        }
                      />
                    </div>
                  </div>
                )}

                {entry.tipo === "crianca" && (
                  <div className="single-grid">
                      <div key={`nome-` + idx} className="person-row">
                        <input
                          type="text"
                          placeholder={`Nome completo`}
                          value={entry.esquiadores.nome || ""}
                          onChange={(ev) => 
                            updateSkiPassEntry(idx, {
                            esquiadores: { nome: ev.target.value , dataNasc: entry.esquiadores.dataNasc || "" },
                          })}
                        />
                        <input
                          type="date"
                          value={entry.esquiadores.dataNasc || ""}
                          onChange={(ev) => {
                            updateSkiPassEntry(idx, {
                            esquiadores: { nome:entry.esquiadores.nome || "", dataNasc: ev.target.value },
                          })}}
                        />
                      </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          <div className="row entry-bottom">
            <label className="inline" style={{ position: "relative" }}>
              Seguro Carré Neige:
              {/* botão com tooltip */}
              <button
                type="button"
                className="tooltip-btn"
                aria-describedby="tooltip-seguro"
              >
                ?
              </button>
              <div id="tooltip-seguro" role="tooltip" className="tooltip">
                <strong>Por apenas € 3,50 por pessoa/dia</strong>
                <div style={{ marginTop: 6 }}>
                  Resgate imediato nas pistas em caso de acidente
                  <br />
                  Cobertura médica e hospitalar, incluindo transporte sanitário
                </div>
              </div>
              <label>
                <input
                  type="radio"
                  name="seguro-sim"
                  checked={seguro}
                  onChange={() => setSeguro(true)}
                />
                Sim
              </label>
              <label>
                <input
                  type="radio"
                  name="seguro-nao"
                  checked={!seguro}
                  onChange={() => setSeguro(false)}
                />
                Não
              </label>
            </label>
          </div>
          <div className="entries-actions">
            <div className="ski-total">
              TOTAL SKI PASS: € {skiPassTotal.toFixed(2).replace(".", ",")}
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

export default ModalSkiPass;
