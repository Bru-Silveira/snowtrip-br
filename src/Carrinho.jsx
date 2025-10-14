import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Carrinho.css";
import hospedagemImg from "./img/cards/hospedagem.jpg";

let tabelaImg;
try {
  tabelaImg = require("./img/tabela-ski.jpg");
} catch (e) {
  tabelaImg = "/img/tabela-ski.jpg"; // fallback para public/img
}

function Carrinho() {
  const [carrinho, setCarrinho] = useState([]);
  const [servicoSelecionado, setServicoSelecionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [opcaoSelecionada, setOpcaoSelecionada] = useState(null);
  const [dataSelecionada, setDataSelecionada] = useState("");
  const [equipamentoSelecionado, setEquipamentoSelecionado] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [dias, setDias] = useState(1);
  const [categoria, setCategoria] = useState("");
  const [tamanho, setTamanho] = useState("");

  const [snowEquipamentoSelecionado, setSnowEquipamentoSelecionado] =
    useState("");
  const [snowCategoria, setSnowCategoria] = useState("");
  const [snowTamanho, setSnowTamanho] = useState("");
  const [snowDias, setSnowDias] = useState(1);

  // entradas cumulativas de Ski Pass no modal
  const [skiPassEntries, setSkiPassEntries] = useState([]);
  const [skiPassTotal, setSkiPassTotal] = useState(0);
  const [skiPassDataInicio, setSkiPassDataInicio] = useState("");

  const servicos = [
    {
      id: 1,
      slug: "hospedagem",
      nome: "Hospedagem XYZ",
      preco: 5000,
      imagem: hospedagemImg,
    },
    { id: 2, slug: "aulas-ski", nome: "Aulas de Ski" },
    { id: 3, slug: "equip-ski", nome: "Equipamentos de Ski", preco: 1500 },
    {
      id: 4,
      slug: "equip-snow",
      nome: "Equipamentos de Snow Board",
      preco: 2000,
    },
    { id: 5, slug: "ski-pass", nome: "Ski Pass", preco: 2000 },
    { id: 6, slug: "transfer", nome: "Transfer", preco: 2000 },
    { id: 7, slug: "concierge", nome: "Concierge", preco: 2000 },
  ];

  const pacotesSki = [
    {
      id: "p1",
      nome: "Pacote 1 - Full Day",
      descricao: "6 horas de aula",
      preco: 1200,
    },
    {
      id: "p2",
      nome: "Pacote 2 - Part Day",
      descricao: "4 horas de aula (09:00 às 13:00)",
      preco: 900,
    },
  ];

  const equipamentos = [
    { id: "e1", nome: "Esquis Adulto", preco: { 1: 150, 2: 180, 3: 220 } },
    { id: "e2", nome: "Esquis Infantil", preco: { 1: 100, 2: 130, 3: 160 } },
    { id: "e3", nome: "Bastões", preco: { 1: 50, 2: 70, 3: 90 } },
    { id: "e4", nome: "Capacete", preco: { 1: 40, 2: 60, 3: 80 } },
  ];

  const snowboardEquipamentos = [
    { id: "sb1", nome: "Snowboard", preco: { 1: 250, 2: 350, 3: 450 } },
    { id: "sb2", nome: "Bota de Snowboard", preco: { 1: 100, 2: 150, 3: 200 } },
    { id: "sb3", nome: "Capacete", preco: { 1: 120, 2: 170, 3: 220 } },
  ];

  const skiPassPrecos = {
    courchevel: {
      adulto: { 1: 65, 2: 130, 3: 195, 4: 260, 5: 325, 6: 390, 7: 455 },
      crianca: { 1: 52, 2: 104, 3: 156, 4: 208, 5: 260, 6: 312, 7: 364 },
      family: { 5: 405, 6: 486, 7: 567 },
    },
    "3vallees": {
      adulto: { 1: 66, 2: 132, 3: 198, 4: 264, 5: 330, 6: 396, 7: 462 },
      crianca: { 1: 53, 2: 106, 3: 159, 4: 212, 5: 265, 6: 318, 7: 371 },
      family: { 5: 818, 6: 981, 7: 1144 },
    },
  };

  const abrirModal = (servico) => {
    if (servico.slug === "ski-pass") {
      setServicoSelecionado(servico);
      setMostrarModal(true);
      if (skiPassEntries.length === 0) {
        setSkiPassEntries([
          {
            id: Date.now(),
            area: "courchevel",
            dataInicio: "",
            dias: 1,
            tipo: "",
            adultos: [],
            criancas: [],
            seguro: false,
          },
        ]);
      }
    } else if (
      ["aulas-ski", "equip-ski", "equip-snow"].includes(servico.slug)
    ) {
      setServicoSelecionado(servico);
      setMostrarModal(true);
    } else {
      setCarrinho((prev) => [...prev, servico]);
    }
  };

  const addSkiPassEntry = () => {
    setSkiPassEntries((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        area: "courchevel",
        dataInicio: "",
        dias: 1,
        tipo: "",
        adultos: [],
        criancas: [],
        seguro: false,
      },
    ]);
  };

  const removeSkiPassEntry = (index) => {
    setSkiPassEntries((prev) => prev.filter((_, i) => i !== index));
  };

  const updateSkiPassEntry = (index, changes) => {
    setSkiPassEntries((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], ...changes };
      return copy;
    });
  };

  const setEntryTipo = (index, tipo) => {
    const base = {
      family: {
        adultos: [
          { nome: "", dataNasc: "" },
          { nome: "", dataNasc: "" },
        ],
        criancas: [
          { nome: "", dataNasc: "" },
          { nome: "", dataNasc: "" },
          { nome: "", dataNasc: "" },
        ],
      },
      adulto: { adultos: [{ nome: "", dataNasc: "" }], criancas: [] },
      crianca: { adultos: [], criancas: [{ nome: "", dataNasc: "" }] },
    }[tipo] || { adultos: [], criancas: [] };
    updateSkiPassEntry(index, {
      tipo,
      adultos: base.adultos,
      criancas: base.criancas,
    });
  };

  const calcularPrecoParaEntrada = (entry) => {
    if (!entry || !entry.tipo) return 0;
    const dias = Math.max(1, Number(entry.dias) || 1);
    const areaObj = skiPassPrecos[entry.area] || {};
    if (entry.tipo === "family")
      return (areaObj.family && areaObj.family[dias]) || 0;
    if (entry.tipo === "adulto") {
      const unit = (areaObj.adulto && areaObj.adulto[dias]) || 0;
      return unit * (entry.adultos?.length || 0);
    }
    if (entry.tipo === "crianca") {
      const unit = (areaObj.crianca && areaObj.crianca[dias]) || 0;
      return unit * (entry.criancas?.length || 0);
    }
    return 0;
  };

  useEffect(() => {
    const total = skiPassEntries.reduce((acc, entry) => {
      let preco = calcularPrecoParaEntrada(entry);
      if (entry.seguro) {
        const pessoas =
          (entry.adultos?.length || 0) + (entry.criancas?.length || 0);
        preco += 3.5 * pessoas * Math.max(1, Number(entry.dias) || 1);
      }
      return acc + preco;
    }, 0);
    setSkiPassTotal(total);
  }, [skiPassEntries]);

  useEffect(() => {
    document.body.classList.toggle("modal-open", mostrarModal);
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [mostrarModal]);

  const concluirModal = () => {
    if (!servicoSelecionado) {
      setMostrarModal(false);
      return;
    }

    if (servicoSelecionado.slug === "aulas-ski") {
      if (!opcaoSelecionada || !dataSelecionada) {
        alert("Selecione a data e o pacote!");
        return;
      }
      const pacote = pacotesSki.find((p) => p.id === opcaoSelecionada);
      setCarrinho((prev) => [
        ...prev,
        {
          ...servicoSelecionado,
          nome: `${servicoSelecionado.nome} - ${pacote?.nome || ""}`,
          preco: pacote?.preco || 0,
          data: dataSelecionada,
        },
      ]);
    }

    if (servicoSelecionado.slug === "equip-ski") {
      if (!equipamentoSelecionado || !categoria || !tamanho || dias < 1) {
        alert("Preencha todas as informações do equipamento!");
        return;
      }
      const equipamento = equipamentos.find(
        (e) => e.id === equipamentoSelecionado
      );
      const precoBase = equipamento?.preco?.[categoria] || 0;
      setCarrinho((prev) => [
        ...prev,
        {
          ...servicoSelecionado,
          nome: `${servicoSelecionado.nome} - ${equipamento?.nome || ""}`,
          preco: precoBase * dias,
          dias,
          categoria,
          tamanho,
        },
      ]);
    }

    if (servicoSelecionado.slug === "equip-snow") {
      if (
        !snowEquipamentoSelecionado ||
        !snowCategoria ||
        !snowTamanho ||
        snowDias < 1
      ) {
        alert("Preencha todas as informações do equipamento de Snowboard!");
        return;
      }
      const equipamento = snowboardEquipamentos.find(
        (e) => e.id === snowEquipamentoSelecionado
      );
      const precoBase = equipamento?.preco?.[snowCategoria] || 0;
      setCarrinho((prev) => [
        ...prev,
        {
          ...servicoSelecionado,
          nome: `${servicoSelecionado.nome} - ${equipamento?.nome || ""}`,
          preco: precoBase * snowDias,
          dias: snowDias,
          categoria: snowCategoria,
          tamanho: snowTamanho,
        },
      ]);
    }

    if (servicoSelecionado.slug === "ski-pass") {
      if (skiPassEntries.length === 0) {
        alert("Adicione pelo menos um passe antes de concluir.");
        return;
      }

      for (let i = 0; i < skiPassEntries.length; i += 1) {
        const e = skiPassEntries[i];
        if (!e.tipo || !e.dataInicio) {
          alert(`Preencha tipo e data de início para o passe #${i + 1}.`);
          return;
        }

        if (e.tipo === "family") {
          if ((e.adultos?.length || 0) < 2 || (e.criancas?.length || 0) < 3) {
            alert(
              `Passe Family (#${i + 1}) requer mínimo 2 adultos e 3 crianças.`
            );
            return;
          }
          const allFilled =
            e.adultos.every((a) => a.nome && a.dataNasc) &&
            e.criancas.every((c) => c.nome && c.dataNasc);
          if (!allFilled) {
            alert(
              `Preencha nome e data de nascimento de todos os participantes do Family (#${
                i + 1
              }).`
            );
            return;
          }
        } else if (e.tipo === "adulto") {
          if (!(e.adultos?.length > 0)) {
            alert(`Passe Adulto (#${i + 1}) precisa de pelo menos 1 adulto.`);
            return;
          }
          if (!e.adultos.every((a) => a.nome && a.dataNasc)) {
            alert(
              `Preencha nome e data de nascimento de todos os adultos do passe #${
                i + 1
              }.`
            );
            return;
          }
        } else if (e.tipo === "crianca") {
          if (!(e.criancas?.length > 0)) {
            alert(`Passe Criança (#${i + 1}) precisa de pelo menos 1 criança.`);
            return;
          }
          if (!e.criancas.every((c) => c.nome && c.dataNasc)) {
            alert(
              `Preencha nome e data de nascimento de todas as crianças do passe #${
                i + 1
              }.`
            );
            return;
          }
        }
      }

      const novos = skiPassEntries.map((e) => {
        const preco =
          calcularPrecoParaEntrada(e) +
          (e.seguro
            ? 3.5 *
              ((e.adultos?.length || 0) + (e.criancas?.length || 0)) *
              Math.max(1, Number(e.dias) || 1)
            : 0);
        const descricao = `${
          e.area === "courchevel" ? "Courchevel" : "Les 3 Vallées"
        } - ${e.dias} dias - ${e.tipo}${e.seguro ? " + Seguro" : ""}`;
        return {
          ...servicoSelecionado,
          nome: `${servicoSelecionado.nome} - ${descricao}`,
          preco,
          dataInicio: e.dataInicio,
          dias: e.dias,
          tipo: e.tipo,
          adultos: e.adultos ? [...e.adultos] : [],
          criancas: e.criancas ? [...e.criancas] : [],
          area: e.area,
          seguro: e.seguro,
        };
      });

      setCarrinho((prev) => [...prev, ...novos]);
      setSkiPassEntries([]);
    }

    // reset modal genérico
    setServicoSelecionado(null);
    setOpcaoSelecionada(null);
    setDataSelecionada("");
    setEquipamentoSelecionado("");
    setSnowEquipamentoSelecionado("");
    setQuantidade(1);
    setMostrarModal(false);
    setDias(1);
    setCategoria("");
    setTamanho("");
    setSnowCategoria("");
    setSnowTamanho("");
    setSnowDias(1);
    setSkiPassTotal(0);
    setSkiPassDataInicio("");
  };

  const removerDoCarrinho = (id) =>
    setCarrinho((prev) => prev.filter((_, index) => index !== id));
  const total = carrinho.reduce((acc, item) => acc + (item.preco || 0), 0);

  return (
    <>
      {mostrarModal && (
        <div className="modal-overlay">
          {servicoSelecionado?.slug === "ski-pass" ? (
            <div className="modal-content ski-pass-layout">
              <header className="modal-header">
                <h2 className="modal-title">{servicoSelecionado?.nome}</h2>

                <div className="tabela-help-right">
                  <div className="tabela-tooltip-wrapper">
                    <button
                      type="button"
                      className="tabela-tooltip-btn"
                      aria-describedby="tabela-tooltip"
                    >
                      Confira tabela de valores.
                      <span className="tabela-tooltip-icon" aria-hidden="true">
                        {" "}
                        ⓘ
                      </span>
                    </button>

                    <div
                      id="tabela-tooltip"
                      role="tooltip"
                      className="tabela-tooltip"
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
                  {skiPassEntries.map((entry, idx) => (
                    <div key={entry.id} className="entry-card">
                      <div className="entry-top">
                        
                        <div className="entry-actions">
                          {skiPassEntries.length > 1 && (
                            <button
                              type="button"
                              className="btn-small btn-remove"
                              onClick={() => removeSkiPassEntry(idx)}
                            >
                              −
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="row1">
                        <label className="col">
                          Área:
                          <div className="area-options1">
                            <label>
                              <input
                                type="radio"
                                name={`area-${entry.id}`}
                                value="courchevel"
                                checked={entry.area === "courchevel"}
                                onChange={() =>
                                  updateSkiPassEntry(idx, {
                                    area: "courchevel",
                                  })
                                }
                              />
                              Courchevel
                            </label>
                            <label>
                              <input
                                type="radio"
                                name={`area-${entry.id}`}
                                value="3vallees"
                                checked={entry.area === "3vallees"}
                                onChange={() =>
                                  updateSkiPassEntry(idx, { area: "3vallees" })
                                }
                              />
                              Les 3 Vallées
                            </label>
                          </div>
                        </label>

                        <label className="col2">
                          Data de Início:
                          <input
                            type="date"
                            value={entry.dataInicio}
                            onChange={(e) =>
                              updateSkiPassEntry(idx, {
                                dataInicio: e.target.value,
                              })
                            }
                            min={new Date().toISOString().split("T")[0]}
                          />
                        </label>

                        <label className="col">
                          Dias:
                          <select
                            value={entry.dias}
                            onChange={(e) =>
                              updateSkiPassEntry(idx, {
                                dias: parseInt(e.target.value || "1", 10),
                              })
                            }
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
                          Tipo de passe:
                          <select className="filter"
                            value={entry.tipo}
                            onChange={(e) => setEntryTipo(idx, e.target.value)}
                          >
                            <option value="">Selecione</option>
                            <option value="family">
                              Family Flex (mínimo 2 adultos e 3 crianças)
                            </option>
                            <option value="adulto">Solo Adulto</option>
                            <option value="crianca">Solo Criança</option>
                          </select>
                        </label>
                      </div>

                      <div className="row people-section">
                        {entry.tipo === "family" && (
                          <div className="family-grid">
                            <div className="subtitle">Adultos</div>
                            {entry.adultos.map((a, ai) => (
                              <div key={ai} className="person-row">
                                <input
                                  type="text"
                                  placeholder={`Adulto ${
                                    ai + 1
                                  } - Nome completo`}
                                  value={a.nome}
                                  onChange={(ev) => {
                                    const newAdults = [...entry.adultos];
                                    newAdults[ai] = {
                                      ...newAdults[ai],
                                      nome: ev.target.value,
                                    };
                                    updateSkiPassEntry(idx, {
                                      adultos: newAdults,
                                    });
                                  }}
                                />
                                <input
                                  type="date"
                                  value={a.dataNasc}
                                  onChange={(ev) => {
                                    const newAdults = [...entry.adultos];
                                    newAdults[ai] = {
                                      ...newAdults[ai],
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
                            {entry.criancas.map((c, ci) => (
                              <div key={ci} className="person-row">
                                <input
                                  type="text"
                                  placeholder={`Criança ${
                                    ci + 1
                                  } - Nome completo`}
                                  value={c.nome}
                                  onChange={(ev) => {
                                    const newCriancas = [...entry.criancas];
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
                                  value={c.dataNasc}
                                  onChange={(ev) => {
                                    const newCriancas = [...entry.criancas];
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
                            {entry.adultos.map((a, ai) => (
                              <div key={ai} className="person-row">
                                <input
                                  type="text"
                                  placeholder={`Nome completo`}
                                  value={a.nome}
                                  onChange={(ev) => {
                                    const newAdults = [...entry.adultos];
                                    newAdults[ai] = {
                                      ...newAdults[ai],
                                      nome: ev.target.value,
                                    };
                                    updateSkiPassEntry(idx, {
                                      adultos: newAdults,
                                    });
                                  }}
                                />
                                <input
                                  type="date"
                                  value={a.dataNasc}
                                  onChange={(ev) => {
                                    const newAdults = [...entry.adultos];
                                    newAdults[ai] = {
                                      ...newAdults[ai],
                                      dataNasc: ev.target.value,
                                    };
                                    updateSkiPassEntry(idx, {
                                      adultos: newAdults,
                                    });
                                  }}
                                />
                              </div>
                            ))}
                            <button
                              type="button"
                              onClick={() =>
                                updateSkiPassEntry(idx, {
                                  adultos: [
                                    ...(entry.adultos || []),
                                    { nome: "", dataNasc: "" },
                                  ],
                                })
                              }
                            >
                              Adicionar adulto
                            </button>
                          </div>
                        )}

                        {entry.tipo === "crianca" && (
                          <div className="single-grid">
                            {entry.criancas.map((c, ci) => (
                              <div key={ci} className="person-row">
                                <input
                                  type="text"
                                  placeholder={`Nome completo`}
                                  value={c.nome}
                                  onChange={(ev) => {
                                    const newCriancas = [...entry.criancas];
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
                                  value={c.dataNasc}
                                  onChange={(ev) => {
                                    const newCriancas = [...entry.criancas];
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
                            <button
                              type="button"
                              onClick={() =>
                                updateSkiPassEntry(idx, {
                                  criancas: [
                                    ...(entry.criancas || []),
                                    { nome: "", dataNasc: "" },
                                  ],
                                })
                              }
                            >
                              Adicionar criança
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="row entry-bottom">
                        <label
                          className="inline"
                          style={{ position: "relative" }}
                        >
                          Seguro Carré Neige:
                          {/* botão com tooltip */}
                          <button
                            type="button"
                            className="tooltip-btn"
                            aria-describedby={`tooltip-${entry.id}`}
                          >
                            ?
                          </button>
                          <div
                            id={`tooltip-${entry.id}`}
                            role="tooltip"
                            className="tooltip"
                          >
                            <strong>Por apenas € 3,50 por pessoa/dia</strong>
                            <div style={{ marginTop: 6 }}>
                              Resgate imediato nas pistas em caso de acidente
                              <br />
                              Cobertura médica e hospitalar, incluindo
                              transporte sanitário
                            </div>
                          </div>
                          <label>
                            <input
                              type="radio"
                              name={`seguro-${entry.id}`}
                              checked={!!entry.seguro}
                              onChange={() =>
                                updateSkiPassEntry(idx, { seguro: true })
                              }
                            />{" "}
                            Sim
                          </label>
                          <label>
                            <input
                              type="radio"
                              name={`seguro-${entry.id}`}
                              checked={!entry.seguro}
                              onChange={() =>
                                updateSkiPassEntry(idx, { seguro: false })
                              }
                            />{" "}
                            Não
                          </label>
                        </label>
                        <span className="notificacion">
                          ATENÇÃO: Seu Ski Pass será emitido somente após a
                          confirmação do pagamento
                        </span>
                      </div>
                    </div>
                  ))}

                  <div className="entries-actions">
                    <button
                      type="button"
                      className="btn-add"
                      onClick={addSkiPassEntry}
                    >
                      Adicionar outro passe
                    </button>
                  </div>

                  <div className="total-line" aria-live="polite">
                    <span className="label">TOTAL SKI PASS:</span>
                    <div className="value">
                      € {skiPassTotal.toFixed(2).replace(".", ",")}
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
          ) : (
            <div className="modal-content">
              <h2>{servicoSelecionado?.nome}</h2>

              {(servicoSelecionado?.slug === "equip-ski" ||
                servicoSelecionado?.slug === "equip-snow") && (
                <>
                  <label>
                    Categoria:
                    <select
                      value={
                        servicoSelecionado.slug === "equip-ski"
                          ? categoria
                          : snowCategoria
                      }
                      onChange={(e) =>
                        servicoSelecionado.slug === "equip-ski"
                          ? setCategoria(e.target.value)
                          : setSnowCategoria(e.target.value)
                      }
                    >
                      <option value="">Selecione</option>
                      <option value="1">Categoria 1 - Básico</option>
                      <option value="2">Categoria 2 - Intermediário</option>
                      <option value="3">Categoria 3 - Premium</option>
                    </select>
                  </label>

                  {(categoria || snowCategoria) && (
                    <>
                      <label>
                        Equipamento:
                        <select
                          value={
                            servicoSelecionado.slug === "equip-ski"
                              ? equipamentoSelecionado
                              : snowEquipamentoSelecionado
                          }
                          onChange={(e) =>
                            servicoSelecionado.slug === "equip-ski"
                              ? setEquipamentoSelecionado(e.target.value)
                              : setSnowEquipamentoSelecionado(e.target.value)
                          }
                        >
                          <option value="">Selecione</option>
                          {(servicoSelecionado.slug === "equip-ski"
                            ? equipamentos
                            : snowboardEquipamentos
                          ).map((e) => (
                            <option key={e.id} value={e.id}>
                              {e.nome}
                            </option>
                          ))}
                        </select>
                      </label>

                      <label>
                        Tamanho:
                        <select
                          value={
                            servicoSelecionado.slug === "equip-ski"
                              ? tamanho
                              : snowTamanho
                          }
                          onChange={(e) =>
                            servicoSelecionado.slug === "equip-ski"
                              ? setTamanho(e.target.value)
                              : setSnowTamanho(e.target.value)
                          }
                        >
                          <option value="">Selecione</option>
                          <optgroup label="Infantil">
                            <option value="4-6 anos">4-6 anos</option>
                            <option value="8-10 anos">8-10 anos</option>
                          </optgroup>
                          <optgroup label="Adulto">
                            <option value="P">P</option>
                            <option value="M">M</option>
                          </optgroup>
                        </select>
                      </label>

                      <label>
                        Quantidade de dias:
                        <input
                          type="number"
                          min="1"
                          value={
                            servicoSelecionado.slug === "equip-ski"
                              ? dias
                              : snowDias
                          }
                          onChange={(e) =>
                            servicoSelecionado.slug === "equip-ski"
                              ? setDias(parseInt(e.target.value || "1", 10))
                              : setSnowDias(parseInt(e.target.value || "1", 10))
                          }
                        />
                      </label>
                    </>
                  )}
                </>
              )}

              <button onClick={concluirModal} className="btn-concluir">
                Concluir e adicionar ao carrinho
              </button>
              <button
                onClick={() => setMostrarModal(false)}
                className="btn-cancelar"
              >
                Cancelar
              </button>
            </div>
          )}
        </div>
      )}

      <div className="carrinho-container">
        <div className="carrinho-servicos">
          <div className="lista-servicos">
            {servicos.map((servico) => (
              <div
                key={servico.id}
                className={`card-wrapper card-${servico.slug}`}
              >
                <div className="card-servico">
                  <p className="servico-nome">{servico.nome}</p>
                </div>
                <button
                  onClick={() => abrirModal(servico)}
                  className="btn-adicionar"
                >
                  Adicionar
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="carrinho-inferior">
          <div className="carrinho-detalhes">
            <h2 className="carrinho-dias">8 Dias</h2>
            <p className="carrinho-pessoas">2 adultos e 2 crianças</p>
            <div className="carrinho-total">
              Total: R$ {total.toLocaleString("pt-BR")}
            </div>
            <button className="carrinho-reservar">Reserve agora!</button>
          </div>

          <div className="carrinho-lista">
            <ul className="lista-carrinho">
              {carrinho.map((item, index) => (
                <li key={index} className="item-carrinho">
                  <span className="carrinho-info">{item.nome}</span>
                  <span className="carrinho-preco">
                    R$ {(item.preco || 0).toLocaleString("pt-BR")}
                  </span>
                  <button
                    onClick={() => removerDoCarrinho(index)}
                    className="btn-remover"
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Carrinho;
