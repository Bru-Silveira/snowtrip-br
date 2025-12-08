import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import hospedagemImg from "./img/cards/hospedagem.jpg";
import ModalSkiPass from "./modals/ModalSkiPass";
import ModalEquipamentos from "./modals/ModalEquipamentos";
import ModalAulasSki from "./modals/ModalAulasSki";

import "./Carrinho.css";

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

  // estados para ski pass
  const [skiPassEntries, setSkiPassEntries] = useState([]);
  const [skiPassTotal, setSkiPassTotal] = useState(0);

  // estados para aulas de ski
  const [classEntries, setClassEntries] = useState([]);
  const [classTotal, setClassTotal] = useState(0);

  const servicos = [
    {
      id: 1,
      slug: "hospedagem",
      nome: "Hospedagem XYZ",
      preco: 5000,
      imagem: hospedagemImg,
    },
    { id: 2, slug: "aulas", nome: "Aulas", preco: 0, entries: [] },
    {
      id: 3,
      slug: "equip-ski",
      nome: "Equipamentos de Ski",
      preco: 0,
      entries: [],
    },
    { id: 4, slug: "ski-pass", nome: "Ski Pass", preco: 0, entries: [] },
    { id: 5, slug: "transfer", nome: "Transfer", preco: 0, entries: [] },
    { id: 6, slug: "concierge", nome: "Concierge", preco: 0, entries: [] },
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
    setServicoSelecionado(servico);

    // Abre modal para serviços que precisam de configuração
    if (
      ["ski-pass", "aulas", "equip-ski", "equip-snow"].includes(servico.slug)
    ) {
      setMostrarModal(true);
    } else {
      // Adiciona direto ao carrinho para outros serviços
      setCarrinho((prev) => [...prev, servico]);
    }
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
    console.log("Concluir modal para serviço:", servicoSelecionado);
    if (!servicoSelecionado) {
      setMostrarModal(false);
      return;
    }

    if (servicoSelecionado.slug === "aulas") {
      if (classEntries.length === 0) {
        toast.error("Adicione pelo menos uma aula antes de concluir.");
        return;
      }

      const novos = classEntries.map((entry) => {
        const descricao = `${entry.modalidade} - ${entry.resort} 
        - ${entry.dias} dia${entry.dias > 1 ? "s" : ""} 
        - ${entry.periodo === "halfday" ? "Half day" : "Full day"}
        ${entry.qtdeAdultos > 0 ? (" - " + entry.qtdeAdultos +" adultos") : ""} 
        ${entry.qtdeCriancas > 0 ? (" - " + entry.qtdeCriancas +" crianças") : ""}`;
        return {
          ...servicoSelecionado,
          nome: `${servicoSelecionado.nome} de ${descricao}`,
          preco: entry.subtotal || 0,
          entries: entry,
        };
      });

      setCarrinho((prev) => [...prev, ...novos]);
      setClassEntries([]);
    }

    if (servicoSelecionado.slug === "equip-ski") {
      if (!equipamentoSelecionado || !categoria || !tamanho || dias < 1) {
        toast.error("Preencha todas as informações do equipamento!");
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

    if (servicoSelecionado.slug === "ski-pass") {
      const novos = skiPassEntries.map((e) => {
        const descricao = `${
          e.area === "courchevel" ? "Courchevel" : "Les 3 Vallées"
        } - ${e.dias} dias - ${e.tipo}${e.seguro ? " + Seguro" : ""}`;
        return {
          ...servicoSelecionado,
          nome: `${servicoSelecionado.nome} - ${descricao}`,
          preco: skiPassTotal,
          entries: e,
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
    setClassEntries([]);
  };

  const removerDoCarrinho = (id) =>
    setCarrinho((prev) => prev.filter((_, index) => index !== id));
  const total = carrinho.reduce((acc, item) => acc + (item.preco || 0), 0);

  return (
    <>
      {mostrarModal && (
        <div className="modal-overlay">
          {servicoSelecionado?.slug === "ski-pass" ? (
            <ModalSkiPass
              skiPassEntries={skiPassEntries}
              setSkiPassEntries={setSkiPassEntries}
              skiPassTotal={skiPassTotal}
              setSkiPassTotal={setSkiPassTotal}
              concluirModal={concluirModal}
              setMostrarModal={setMostrarModal}
            />
          ) : servicoSelecionado?.slug === "aulas" ? (
            <ModalAulasSki
              classEntries={classEntries}
              setClassEntries={setClassEntries}
              classTotal={classTotal}
              setClassTotal={setClassTotal}
              concluirModal={concluirModal}
              setMostrarModal={setMostrarModal}
            />
          ) : (
            <ModalEquipamentos
              servicoSelecionado={servicoSelecionado}
              categoria={categoria}
              setCategoria={setCategoria}
              equipamentoSelecionado={equipamentoSelecionado}
              setEquipamentoSelecionado={setEquipamentoSelecionado}
              tamanho={tamanho}
              setTamanho={setTamanho}
              dias={dias}
              setDias={setDias}
              equipamentos={equipamentos}
              snowCategoria={snowCategoria}
              setSnowCategoria={setSnowCategoria}
              snowEquipamentoSelecionado={snowEquipamentoSelecionado}
              setSnowEquipamentoSelecionado={setSnowEquipamentoSelecionado}
              snowTamanho={snowTamanho}
              setSnowTamanho={setSnowTamanho}
              snowDias={snowDias}
              setSnowDias={setSnowDias}
              snowboardEquipamentos={snowboardEquipamentos}
              concluirModal={concluirModal}
              setMostrarModal={setMostrarModal}
            />
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
