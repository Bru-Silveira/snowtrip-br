import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Carrinho.css";
import hospedagemImg from "./img/cards/hospedagem.jpg";

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
  
  // Estados para Ski Pass
  const [skiPassArea, setSkiPassArea] = useState("courchevel");
  const [skiPassDataInicio, setSkiPassDataInicio] = useState("");
  const [skiPassDias, setSkiPassDias] = useState(1);
  const [skiPassTipo, setSkiPassTipo] = useState("");
  const [skiPassAdultos, setSkiPassAdultos] = useState([{ nome: "", dataNasc: "" }, { nome: "", dataNasc: "" }]);
  const [skiPassCriancas, setSkiPassCriancas] = useState([]);
  const [skiPassSeguro, setSkiPassSeguro] = useState(false);
  const [skiPassTotal, setSkiPassTotal] = useState(0);
  
  // Atualizar o valor total do Ski Pass sempre que os parâmetros mudarem
  useEffect(() => {
    if (skiPassTipo) {
      const novoTotal = calcularPrecoSkiPass();
      setSkiPassTotal(novoTotal);
    }
  }, [skiPassTipo, skiPassArea, skiPassDias, skiPassAdultos, skiPassCriancas, skiPassSeguro]);

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
  
  // Tabela de preços para Ski Pass
  const skiPassPrecos = {
    courchevel: {
      adulto: {
        1: 65, 2: 130, 3: 195, 4: 260, 5: 325, 6: 390, 7: 455
      },
      crianca: {
        1: 52, 2: 104, 3: 156, 4: 208, 5: 260, 6: 312, 7: 364
      },
      family: {
        5: 405, 6: 486, 7: 567
      }
    },
    "3vallees": {
      adulto: {
        1: 66, 2: 132, 3: 198, 4: 264, 5: 330, 6: 396, 7: 462
      },
      crianca: {
        1: 53, 2: 106, 3: 159, 4: 212, 5: 265, 6: 318, 7: 371
      },
      family: {
        5: 818, 6: 981, 7: 1144
      }
    }
  };

  const abrirModal = (servico) => {
    if (
      servico.slug === "aulas-ski" ||
      servico.slug === "equip-ski" ||
      servico.slug === "equip-snow" ||
      servico.slug === "ski-pass"
    ) {
      setServicoSelecionado(servico);
      setMostrarModal(true);
    } else {
      setCarrinho([...carrinho, servico]);
    }
  };

  // Função para calcular o preço do Ski Pass
  const calcularPrecoSkiPass = () => {
    let precoTotal = 0;
    
    if (skiPassTipo === "family") {
      // Preço base do Family Flex
      precoTotal = skiPassPrecos[skiPassArea][skiPassTipo][skiPassDias] || 0;
    } else if (skiPassTipo === "adulto") {
      // Preço por adulto * número de adultos
      const precoUnitario = skiPassPrecos[skiPassArea][skiPassTipo][skiPassDias] || 0;
      precoTotal = precoUnitario * skiPassAdultos.length;
    } else if (skiPassTipo === "crianca") {
      // Preço por criança * número de crianças
      const precoUnitario = skiPassPrecos[skiPassArea][skiPassTipo][skiPassDias] || 0;
      precoTotal = precoUnitario * skiPassCriancas.length;
    }
    
    // Adicionar seguro se selecionado (3.50€ por pessoa por dia)
    if (skiPassSeguro) {
      const totalPessoas = 
        skiPassTipo === "family" 
          ? skiPassAdultos.length + skiPassCriancas.length
          : skiPassTipo === "adulto" 
            ? skiPassAdultos.length 
            : skiPassCriancas.length;
      
      precoTotal += 3.5 * totalPessoas * skiPassDias;
    }
    
    return precoTotal;
  };

  // Atualizar o preço total quando os dados mudam
  useEffect(() => {
    if (skiPassTipo) {
      const novoTotal = calcularPrecoSkiPass();
      setSkiPassTotal(novoTotal);
    }
  }, [skiPassArea, skiPassDias, skiPassTipo, skiPassAdultos.length, skiPassCriancas.length, skiPassSeguro]);

  const concluirModal = () => {
    if (servicoSelecionado.slug === "aulas-ski") {
      if (!opcaoSelecionada || !dataSelecionada) {
        alert("Selecione a data e o pacote!");
        return;
      }
      const pacote = pacotesSki.find((p) => p.id === opcaoSelecionada);
      const servicoComDetalhes = {
        ...servicoSelecionado,
        nome: `${servicoSelecionado.nome} - ${pacote.nome}`,
        preco: pacote.preco,
        data: dataSelecionada,
      };
      setCarrinho([...carrinho, servicoComDetalhes]);
    }

    if (servicoSelecionado.slug === "equip-ski") {
      if (!equipamentoSelecionado || !categoria || !tamanho || dias < 1) {
        alert("Preencha todas as informações do equipamento!");
        return;
      }
      const equipamento = equipamentos.find(
        (e) => e.id === equipamentoSelecionado
      );
      const precoBase = equipamento.preco[categoria];
      const precoTotal = precoBase * dias;

      const servicoComDetalhes = {
        ...servicoSelecionado,
        nome: `${servicoSelecionado.nome} - ${equipamento.nome}`,
        preco: precoTotal,
        dias,
        categoria,
        tamanho,
      };
      setCarrinho([...carrinho, servicoComDetalhes]);
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
      const precoBase = equipamento.preco[snowCategoria];
      const precoTotal = precoBase * snowDias;

      const servicoComDetalhes = {
        ...servicoSelecionado,
        nome: `${servicoSelecionado.nome} - ${equipamento.nome}`,
        preco: precoTotal,
        dias: snowDias,
        categoria: snowCategoria,
        tamanho: snowTamanho,
      };
      setCarrinho([...carrinho, servicoComDetalhes]);
    }
    
    if (servicoSelecionado.slug === "ski-pass") {
      if (!skiPassDataInicio || !skiPassTipo) {
        alert("Preencha todos os campos obrigatórios!");
        return;
      }
      
      // Verificar se os formulários estão preenchidos corretamente
      if (skiPassTipo === "family") {
        if (skiPassDias < 5) {
          alert("Family Flex só pode ser selecionado a partir de 5 dias de esqui.");
          return;
        }
        
        if (skiPassAdultos.length < 2 || skiPassCriancas.length < 3) {
          alert("Family Flex requer no mínimo 2 adultos e 3 crianças.");
          return;
        }
        
        // Verificar se todos os campos estão preenchidos
        const todosAdultosPreenchidos = skiPassAdultos.every(a => a.nome && a.dataNasc);
        const todasCriancasPreenchidas = skiPassCriancas.every(c => c.nome && c.dataNasc);
        
        if (!todosAdultosPreenchidos || !todasCriancasPreenchidas) {
          alert("Preencha o nome e data de nascimento de todos os participantes.");
          return;
        }
      } else if (skiPassTipo === "adulto") {
        const todosAdultosPreenchidos = skiPassAdultos.every(a => a.nome && a.dataNasc);
        if (!todosAdultosPreenchidos) {
          alert("Preencha o nome e data de nascimento de todos os adultos.");
          return;
        }
      } else if (skiPassTipo === "crianca") {
        const todasCriancasPreenchidas = skiPassCriancas.every(c => c.nome && c.dataNasc);
        if (!todasCriancasPreenchidas) {
          alert("Preencha o nome e data de nascimento de todas as crianças.");
          return;
        }
      }
      
      // Calcular o preço final
      const precoTotal = calcularPrecoSkiPass();
      
      // Criar descrição do serviço
      let descricao = `${skiPassArea === "courchevel" ? "Courchevel Pass" : "Les 3 Vallées Pass"} - ${skiPassDias} dias`;
      if (skiPassTipo === "family") {
        descricao += ` - Family Flex (${skiPassAdultos.length} adultos, ${skiPassCriancas.length} crianças)`;
      } else if (skiPassTipo === "adulto") {
        descricao += ` - Solo Adulto (${skiPassAdultos.length})`;
      } else if (skiPassTipo === "crianca") {
        descricao += ` - Solo Criança (${skiPassCriancas.length})`;
      }
      
      if (skiPassSeguro) {
        descricao += " + Seguro Carré Neige";
      }
      
      const servicoComDetalhes = {
        ...servicoSelecionado,
        nome: `${servicoSelecionado.nome} - ${descricao}`,
        preco: precoTotal,
        dataInicio: skiPassDataInicio,
        dias: skiPassDias,
        tipo: skiPassTipo,
        area: skiPassArea,
        adultos: [...skiPassAdultos],
        criancas: [...skiPassCriancas],
        seguro: skiPassSeguro
      };
      
      setCarrinho([...carrinho, servicoComDetalhes]);
    }

    // Reset modal
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
  };

  const removerDoCarrinho = (id) => {
    setCarrinho(carrinho.filter((item, index) => index !== id));
  };

  const total = carrinho.reduce((acc, item) => acc + (item.preco || 0), 0);

  return (
    <>
      {/* --- Modal --- */}
      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{servicoSelecionado?.nome}</h2>

             {/* MODAL AULAS DE SKI 
             <label>
              Data da aula:
              <input
                type="date"
                value={dataSelecionada}
                onChange={(e) => setDataSelecionada(e.target.value)}
              />
            </label>

            <div className="modal-pacotes">
              {pacotesSki.map((p) => (
                <div key={p.id} className="pacote-opcao">
                  <input
                    type="radio"
                    name="pacote"
                    value={p.id}
                    checked={opcaoSelecionada === p.id}
                    onChange={() => setOpcaoSelecionada(p.id)}
                  />
                  <span>
                    <strong>{p.nome}</strong> - {p.descricao} - R${" "}
                    {p.preco.toLocaleString("pt-BR")}
                  </span>
                </div>
              ))}
            </div> */}

            {/* MODAL EQUIPAMENTOS SKI */}
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

                {/* Mostrar os outros filtros somente se a categoria estiver selecionada */}
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
                          <option value="4-6 anos">
                            4-6 anos - R${" "}
                            {(servicoSelecionado.slug === "equip-ski"
                              ? categoria
                                ? equipamentos.find(
                                    (eq) => eq.id === equipamentoSelecionado
                                  )?.preco[categoria] || 0
                                : 0
                              : snowCategoria
                              ? snowboardEquipamentos.find(
                                  (eq) => eq.id === snowEquipamentoSelecionado
                                )?.preco[snowCategoria] || 0
                              : 0
                            ).toLocaleString("pt-BR")}
                          </option>
                          <option value="8-10 anos">
                            8-10 anos - R${" "}
                            {(servicoSelecionado.slug === "equip-ski"
                              ? categoria
                                ? equipamentos.find(
                                    (eq) => eq.id === equipamentoSelecionado
                                  )?.preco[categoria] || 0
                                : 0
                              : snowCategoria
                              ? snowboardEquipamentos.find(
                                  (eq) => eq.id === snowEquipamentoSelecionado
                                )?.preco[snowCategoria] || 0
                              : 0
                            ).toLocaleString("pt-BR")}
                          </option>
                        </optgroup>
                        <optgroup label="Adulto">
                          <option value="P">
                            P - R${" "}
                            {(servicoSelecionado.slug === "equip-ski"
                              ? categoria
                                ? equipamentos.find(
                                    (eq) => eq.id === equipamentoSelecionado
                                  )?.preco[categoria] || 0
                                : 0
                              : snowCategoria
                              ? snowboardEquipamentos.find(
                                  (eq) => eq.id === snowEquipamentoSelecionado
                                )?.preco[snowCategoria] || 0
                              : 0
                            ).toLocaleString("pt-BR")}
                          </option>
                          <option value="M">
                            M - R${" "}
                            {(servicoSelecionado.slug === "equip-ski"
                              ? categoria
                                ? equipamentos.find(
                                    (eq) => eq.id === equipamentoSelecionado
                                  )?.preco[categoria] || 0
                                : 0
                              : snowCategoria
                              ? snowboardEquipamentos.find(
                                  (eq) => eq.id === snowEquipamentoSelecionado
                                )?.preco[snowCategoria] || 0
                              : 0
                            ).toLocaleString("pt-BR")}
                          </option>
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
                            ? setDias(parseInt(e.target.value))
                            : setSnowDias(parseInt(e.target.value))
                        }
                      />
                    </label>
                  </>
                )}
              </>
            )}

            {/* MODAL SKI PASS */}
            {servicoSelecionado?.slug === "ski-pass" && (
              <div className="ski-pass-modal">
                <h3></h3>
                <div className="tabela-valores">
                  <a href="#" onClick={(e) => {e.preventDefault(); alert("Tabela de valores será exibida aqui");}}>Confira tabela de valores.</a>
                </div>
                
                <div className="ski-pass-form">
                  <div className="form-group">
                    <label className="form-label">Área:</label>
                    <div className="radio-buttons">
                      <label className={`area-option ${skiPassArea === "courchevel" ? "selected" : ""}`}>
                        <input
                          type="radio"
                          name="area"
                          value="courchevel"
                          checked={skiPassArea === "courchevel"}
                          onChange={() => setSkiPassArea("courchevel")}
                        />
                        <span>Courchevel Pass</span>
                      </label>
                      <label className={`area-option ${skiPassArea === "3vallees" ? "selected" : ""}`}>
                        <input
                          type="radio"
                          name="area"
                          value="3vallees"
                          checked={skiPassArea === "3vallees"}
                          onChange={() => setSkiPassArea("3vallees")}
                        />
                        <span>Les 3 Vallées Pass</span>
                      </label>
                    </div>
                  </div>

                  <div className="form-row date-days-row">
                    <div className="form-group half">
                      <label className="form-label">
                        Data de Início:
                        <div className="input-with-icon">
                          <input
                            type="date"
                            className="date-input"
                            value={skiPassDataInicio}
                            onChange={(e) => setSkiPassDataInicio(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                          />
                          <span className="info-icon">ⓘ</span>
                        </div>
                      </label>
                    </div>

                    <div className="form-group half">
                      <label className="form-label">
                        Dias de Ski:
                        <select
                          className="days-select"
                          value={skiPassDias}
                          onChange={(e) => {
                            const dias = parseInt(e.target.value);
                            setSkiPassDias(dias);
                            // Se o tipo de passe for Family Flex e os dias forem menos que 5, resetar o tipo
                            if (skiPassTipo === "family" && dias < 5) {
                              alert("Family Flex só pode ser selecionado a partir de 5 dias de esqui.");
                              setSkiPassTipo("");
                            }
                          }}
                        >
                          <option value="1">1 dia</option>
                          <option value="2">2 dias</option>
                          <option value="3">3 dias</option>
                          <option value="4">4 dias</option>
                          <option value="5">5 dias</option>
                          <option value="6">6 dias</option>
                          <option value="7">7 dias</option>
                        </select>
                      </label>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Tipo de passe:
                      <div className="pass-type-container">
                        <select
                          className="pass-type-select"
                          value={skiPassTipo}
                          onChange={(e) => {
                            const tipo = e.target.value;
                            setSkiPassTipo(tipo);
                            if (tipo === "family") {
                              if (skiPassDias < 5) {
                                alert("Family Flex só pode ser selecionado a partir de 5 dias de esqui.");
                                setSkiPassTipo("");
                              } else {
                                setSkiPassAdultos([
                                  { nome: "", dataNasc: "" },
                                  { nome: "", dataNasc: "" }
                                ]);
                                setSkiPassCriancas([
                                  { nome: "", dataNasc: "" },
                                  { nome: "", dataNasc: "" },
                                  { nome: "", dataNasc: "" }
                                ]);
                              }
                            } else if (tipo === "adulto") {
                              setSkiPassAdultos([{ nome: "", dataNasc: "" }, { nome: "", dataNasc: "" }]);
                              setSkiPassCriancas([]);
                            } else if (tipo === "crianca") {
                              setSkiPassAdultos([{ nome: "", dataNasc: "" }, { nome: "", dataNasc: "" }]);
                              setSkiPassCriancas([{ nome: "", dataNasc: "" }]);
                            }
                          }}
                        >
                          <option value="">Selecione</option>
                          <option value="family">Family Flex</option>
                          <option value="adulto">Solo Adulto (18 - 75 anos)</option>
                          <option value="crianca">Solo Criança (5 - 18 anos)</option>
                        </select>
                        <button 
                          className="btn-add-person" 
                          type="button"
                          onClick={() => {
                            if (skiPassTipo === "family") {
                              if (skiPassCriancas.length < 6) {
                                setSkiPassCriancas([...skiPassCriancas, { nome: "", dataNasc: "" }]);
                              }
                            }
                          }}
                        >
                          +
                        </button>
                      </div>
                    </label>
                    {skiPassTipo === "family" && (
                      <div className="family-flex-notice">Mínimo 2 adultos e 3 crianças</div>
                    )}
                  </div>



                {/* Formulários dinâmicos baseados no tipo de passe */}
                  {skiPassTipo === "family" && (
                    <div className="family-form">
                      {skiPassAdultos.map((adulto, index) => (
                        <div key={`adulto-${index}`} className="pessoa-form">
                          <div className="pessoa-header">
                            <h4>Adulto {index + 1}</h4>
                            {index > 1 && (
                              <button 
                                className="btn-remove" 
                                type="button"
                                onClick={() => {
                                  const newAdultos = [...skiPassAdultos];
                                  newAdultos.splice(index, 1);
                                  setSkiPassAdultos(newAdultos);
                                }}
                              >
                                −
                              </button>
                            )}
                          </div>
                          <div className="form-row">
                            <label>
                              Nome Completo:
                              <input
                                type="text"
                                className="nome-input"
                                value={adulto.nome}
                                onChange={(e) => {
                                  const newAdultos = [...skiPassAdultos];
                                  newAdultos[index].nome = e.target.value;
                                  setSkiPassAdultos(newAdultos);
                                }}
                              />
                            </label>
                            <label>
                              Data Nasc.:
                              <input
                                type="date"
                                className="data-nasc-input"
                                value={adulto.dataNasc}
                                onChange={(e) => {
                                  const newAdultos = [...skiPassAdultos];
                                  newAdultos[index].dataNasc = e.target.value;
                                  setSkiPassAdultos(newAdultos);
                                }}
                              />
                            </label>
                          </div>
                        </div>
                      ))}

                      {skiPassCriancas.map((crianca, index) => (
                        <div key={`crianca-${index}`} className="pessoa-form">
                          <h4>Criança {index + 1}</h4>
                          <div className="form-row">
                            <label>
                              Nome Completo:
                              <input
                                type="text"
                                value={crianca.nome}
                                onChange={(e) => {
                                  const newCriancas = [...skiPassCriancas];
                                  newCriancas[index].nome = e.target.value;
                                  setSkiPassCriancas(newCriancas);
                                }}
                              />
                            </label>
                            <label>
                              Data Nasc.:
                              <input
                                type="date"
                                value={crianca.dataNasc}
                                onChange={(e) => {
                                  const newCriancas = [...skiPassCriancas];
                                  newCriancas[index].dataNasc = e.target.value;
                                  setSkiPassCriancas(newCriancas);
                                }}
                              />
                            </label>
                            {index > 2 && (
                              <button
                                className="btn-remove"
                                onClick={() => {
                                  const newCriancas = [...skiPassCriancas];
                                  newCriancas.splice(index, 1);
                                  setSkiPassCriancas(newCriancas);
                                }}
                              >
                                -
                              </button>
                            )}
                          </div>
                        </div>
                      ))}

                      {skiPassCriancas.length < 6 && (
                        <button
                          className="btn-add-crianca"
                          onClick={() => {
                            if (skiPassCriancas.length < 6) {
                              setSkiPassCriancas([...skiPassCriancas, { nome: "", dataNasc: "" }]);
                            }
                          }}
                        >
                          Adicionar Criança
                        </button>
                      )}
                    </div>
                  )}

                  {skiPassTipo === "adulto" && (
                    <div className="adulto-form">
                      {skiPassAdultos.map((adulto, index) => (
                        <div key={`adulto-solo-${index}`} className="pessoa-form">
                          <h4>Adulto Solo {index + 1}</h4>
                          <div className="form-row">
                            <label>
                              Nome Completo:
                              <input
                                type="text"
                                value={adulto.nome}
                                onChange={(e) => {
                                  const newAdultos = [...skiPassAdultos];
                                  newAdultos[index].nome = e.target.value;
                                  setSkiPassAdultos(newAdultos);
                                }}
                              />
                            </label>
                            <label>
                              Data Nasc.:
                              <input
                                type="date"
                                value={adulto.dataNasc}
                                onChange={(e) => {
                                  const newAdultos = [...skiPassAdultos];
                                  newAdultos[index].dataNasc = e.target.value;
                                  setSkiPassAdultos(newAdultos);
                                }}
                              />
                            </label>
                            {index > 0 && (
                              <button
                                className="btn-remove"
                                onClick={() => {
                                  const newAdultos = [...skiPassAdultos];
                                  newAdultos.splice(index, 1);
                                  setSkiPassAdultos(newAdultos);
                                }}
                              >
                                -
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {skiPassTipo === "crianca" && (
                    <div className="crianca-form">
                      {skiPassCriancas.map((crianca, index) => (
                        <div key={`crianca-solo-${index}`} className="pessoa-form">
                          <h4>Criança Solo {index + 1}</h4>
                          <div className="form-row">
                            <label>
                              Nome Completo:
                              <input
                                type="text"
                                value={crianca.nome}
                                onChange={(e) => {
                                  const newCriancas = [...skiPassCriancas];
                                  newCriancas[index].nome = e.target.value;
                                  setSkiPassCriancas(newCriancas);
                                }}
                              />
                            </label>
                            <label>
                              Data Nasc.:
                              <input
                                type="date"
                                value={crianca.dataNasc}
                                onChange={(e) => {
                                  const newCriancas = [...skiPassCriancas];
                                  newCriancas[index].dataNasc = e.target.value;
                                  setSkiPassCriancas(newCriancas);
                                }}
                              />
                            </label>
                            {index > 0 && (
                              <button
                                className="btn-remove"
                                onClick={() => {
                                  const newCriancas = [...skiPassCriancas];
                                  newCriancas.splice(index, 1);
                                  setSkiPassCriancas(newCriancas);
                                }}
                              >
                                -
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="form-row seguro">
                    <label>
                      Seguro Carré Neige:
                      <div className="tooltip">
                        <span className="tooltip-icon">i</span>
                        <span className="tooltip-text">
                          Por apenas € 3,50 por pessoa/dia, você garante tranquilidade total:
                          • Resgate imediato nas pistas em caso de acidente
                          • Cobertura médica e hospitalar completa
                          • Reembolso de despesas médicas
                          • Transporte sanitário
                          • Assistência 24h durante toda sua estadia
                          • Reembolso de aulas e passes não utilizados
                        </span>
                      </div>
                      <div className="seguro-options">
                        <label className="radio-label">
                          <input
                            type="radio"
                            name="seguro"
                            value="sim"
                            checked={skiPassSeguro}
                            onChange={() => setSkiPassSeguro(true)}
                          />
                          Sim
                        </label>
                        <label className="radio-label">
                          <input
                            type="radio"
                            name="seguro"
                            value="nao"
                            checked={!skiPassSeguro}
                            onChange={() => setSkiPassSeguro(false)}
                          />
                          Não
                        </label>
                      </div>
                    </label>
                  </div>

                  <div className="aviso-legal">
                    ATENÇÃO: Seu Ski Pass será emitido somente após a confirmação do pagamento
                  </div>

                  <div className="total-ski-pass">
                    TOTAL SKI PASS: € {skiPassTotal.toFixed(2).replace('.', ',')}
                  </div>
                </div>
              </div>
            )}

            <button onClick={concluirModal} className="btn-concluir">
              Concluir
            </button>
            <button
              onClick={() => setMostrarModal(false)}
              className="btn-cancelar"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Carrinho UI */}
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
                    R$ {item.preco.toLocaleString("pt-BR")}
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
