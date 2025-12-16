import { useEffect, useState, useMemo } from "react";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

import ModalSkiPass from "./modals/ModalSkiPass";
import ModalEquipamentos from "./modals/ModalEquipamentos";
import ModalAulasSki from "./modals/ModalAulasSki";
import ModalTransfer from "./modals/ModalTransfer";
import Header from "./components/Header";

import hospedagemImg from "./img/cards/hospedagem.jpg";
import "./Carrinho.css";
import ModalConcierge from "./modals/ModalConcierge";
import { getPrecoEquipamento, CAPACETE_ADICIONAL } from "./utils/equipamentos";

const calcularPrecoEquipamento = (entry) => {
  const precoEquip = getPrecoEquipamento(entry.pack.nomeCompleto, entry.dias);

  let total = precoEquip * entry.qtdePessoas;

  if (entry.incluirCapacete) {
    const precoCapacete = getPrecoEquipamento(CAPACETE_ADICIONAL, entry.dias);
    total += precoCapacete * entry.qtdePessoas;
  }

  return total;
};

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

  // estados para equipamentos
  const [equipEntries, setEquipEntries] = useState([]);
  const [equipTotal, setEquipTotal] = useState(0);

  // estados para concierge
  const [conciergeData, setConciergeData] = useState(null);

  // estados para transfer
  const [transferData, setTransferData] = useState(null);

  const handleAtualizarCarrinho = (novoTotal) => {
    setSkiPassTotal(novoTotal);
  };

  const precoEstadia = JSON.parse(sessionStorage.getItem("precoEstadia"));
  console.log("Estado Recebido no Carrinho:", precoEstadia);
  console.log("Carrinho", carrinho);
  const servicos = [
    {
      id: 1,
      slug: "hospedagem",
      nome: "Hospedagem",
      preco: precoEstadia?.total || 0,
      imagem: hospedagemImg,
    },
    { id: 2, slug: "aulas", nome: "Aulas", preco: 0, entries: [] },
    { id: 3, slug: "equip-ski", nome: "Equipamentos", preco: 0, entries: [] },
    { id: 4, slug: "ski-pass", nome: "Ski Pass", preco: 0, entries: [] },
    { id: 5, slug: "transfer", nome: "Transfer", preco: 0, entries: [] },
    { id: 6, slug: "concierge", nome: "Concierge", preco: 0, entries: [] },
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

  const abrirModal = (servico) => {
    // reset modal genérico
    setServicoSelecionado(null);
    setOpcaoSelecionada(null);
    setDataSelecionada("");
    setEquipamentoSelecionado("");
    setSnowEquipamentoSelecionado("");
    setQuantidade(1);
    setDias(1);
    setCategoria("");
    setTamanho("");
    setSnowCategoria("");
    setSnowTamanho("");
    setSnowDias(1);
    setSkiPassTotal(0);
    setClassEntries([]);

    setServicoSelecionado(servico);

    // Abre modal para serviços que precisam de configuração
    if (
      ["ski-pass", "aulas", "equip-ski", "transfer", "concierge"].includes(
        servico.slug
      )
    ) {
      setMostrarModal(true);
    } else {
      // Adiciona direto ao carrinho para outros serviços
      setCarrinho((prev) => [...prev, servico]);
    }
  };

  useEffect(() => {
    document.body.classList.toggle("modal-open", mostrarModal);
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [mostrarModal]);

  useEffect(() => {
    if (skiPassEntries.length === 0 || skiPassTotal === 0) {
      return; // Nada a adicionar
    }

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

    // Você pode adicionar qualquer lógica de atualização de outros totais do carrinho aqui.
  }, [skiPassTotal]); // Depende do estado do carrinho

  useEffect(() => {
    const preco = precoEstadia?.total || 0;
    const servicoBaseHospedagem = servicos.find((s) => s.slug === "hospedagem");
    const hospedagemNoCarrinho = carrinho.find(
      (item) => item.slug === "hospedagem"
    );

    if (preco <= 0 || !precoEstadia?.disponivel) {
      // Se a hospedagem está no carrinho, remove.
      setCarrinho((prev) => prev.filter((item) => item.slug !== "hospedagem"));
      return;
    }

    if (hospedagemNoCarrinho) {
      // Se já existe, apenas atualiza o preço (caso tenha mudado)
      if (hospedagemNoCarrinho.preco !== preco) {
        setCarrinho((prev) =>
          prev.map((item) =>
            item.slug === "hospedagem"
              ? { ...item, preco: preco, entries: precoEstadia } // Atualiza preço e detalhes
              : item
          )
        );
      }
    } else if (servicoBaseHospedagem) {
      // 3. Adiciona ao carrinho se não existir
      const novoItemHospedagem = {
        ...servicoBaseHospedagem,
        id: 1,
        preco: preco,
        // Adiciona os detalhes da estadia (check-in/out, etc.) nos entries
        entries: precoEstadia,
        nome: "Hospedagem", // Mantém o nome simples ou refine com datas se precisar
      };

      // Adiciona a hospedagem no início do carrinho
      setCarrinho((prev) => [novoItemHospedagem, ...prev]);
    }
  }, [precoEstadia]);

  useEffect(() => {
    if (equipEntries.length === 0 || equipTotal === 0) return;

    const novos = equipEntries.map((entry) => {
      const descricao = `${entry.pack.nome} - ${entry.dias} dias - ${
        entry.modalidade === "ski" ? "Ski" : "Snowboard"
      }${entry.incluirCapacete ? " + Capacete" : ""}`;

      return {
        ...servicoSelecionado,
        slug: "equip-ski",
        nome: `${servicoSelecionado.nome} - ${descricao}`,
        preco: calcularPrecoEquipamento(entry), // já explico abaixo
        entries: entry,
      };
    });

    setCarrinho((prev) => [...prev, ...novos]);
    setEquipEntries([]);
  }, [equipTotal]);

  const concluirModal = (dados) => {
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
        ${entry.qtdeAdultos > 0 ? "- " + entry.qtdeAdultos + " adultos" : ""} 
        ${
          entry.qtdeCriancas > 0 ? "- " + entry.qtdeCriancas + " crianças" : ""
        }`;
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
      if (!dados || dados.length === 0) {
        toast.error("Adicione pelo menos um equipamento antes de concluir.");
        return;
      }
      // Os dados dos equipamentos já são adicionados pelo useEffect em equipTotal
      // Aqui apenas confirmamos que há dados
    }

    if (servicoSelecionado.slug === "transfer") {
      setTransferData(dados);
      setCarrinho((prev) => [
        ...prev,
        {
          ...servicoSelecionado,
          nome: `${servicoSelecionado.nome} - ${dados.destino} (${dados.numPessoas} pessoas)`,
          preco: dados.preco,
          entries: dados,
        },
      ]);
    }

    if (servicoSelecionado.slug === "concierge") {
      setConciergeData(dados);
      setCarrinho((prev) => [
        ...prev,
        {
          ...servicoSelecionado,
          nome: `${servicoSelecionado.nome} - ${dados.dias} dia${
            dados.dias > 1 ? "s" : ""
          } (${new Date(dados.dataInicio).toLocaleDateString("pt-BR")})`,
          preco: dados.preco,
          entries: dados,
        },
      ]);
    }

    setMostrarModal(false);
  };

  const formatarDetalhesItem = (item) => {
    // 1. Inicia a descrição com o nome principal e preço
    let detalhes = `*${item.nome
      .trim()
      .replace(/\s+/g, " ")}:* € ${item.preco.toLocaleString("pt-BR")}`;

    // 2. Extrai e formata os detalhes específicos por slug
    const entry = item.entries;

    if (!entry) {
      return detalhes; // Retorna apenas nome/preço se não houver detalhes
    }

    switch (item.slug) {
      case "aulas":
        detalhes += `\n  - Modalidade: ${entry.modalidade.toUpperCase()}`;
        detalhes += `\n  - Resort: ${entry.resort} (${entry.regiao})`;
        detalhes += `\n  - Duração: ${entry.dias} dias (${
          entry.periodo === "halfday" ? "Half Day" : "Full Day"
        })`;
        detalhes += `\n  - Pessoas: ${entry.qtdeAdultos} Adulto(s) / ${entry.qtdeCriancas} Criança(s)`;
        detalhes += `\n  - Nível: ${entry.nivel}`;
        detalhes += `\n  - Data Início: ${entry.dataInicio}`;
        break;

      case "ski-pass":
        detalhes += `\n  - Área: ${
          entry.area === "courchevel" ? "Courchevel" : "Les 3 Vallées"
        }`;
        detalhes += `\n  - Duração: ${entry.dias} dias`;
        detalhes += `\n  - Tipo: ${entry.tipo.toUpperCase()}`;

        // Adiciona detalhes do esquiador (se houver)
        if (entry.esquiadores && entry.esquiadores.nome) {
          detalhes += `\n  - Esquiador: ${entry.esquiadores.nome}`;
        } else if (entry.esquiadores && entry.esquiadores.adultos) {
          // Lógica para passes Family ou Multi-pessoa
          const totalEsquiadores =
            entry.esquiadores.adultos.length +
            entry.esquiadores.criancas.length;
          detalhes += `\n  - Total Esquiadores: ${totalEsquiadores}`;
        }
        break;

      case "concierge":
        detalhes += `\n  - Data de Início: ${new Date(
          entry.dataInicio
        ).toLocaleDateString("pt-BR")}`;
        detalhes += `\n  - Duração: ${entry.dias} dia${
          entry.dias > 1 ? "s" : ""
        }`;
        detalhes += `\n  - Inclui: Assistência 24h, reservas, atividades e orientação local`;
        break;

      case "equip-ski":
        detalhes += `\n  - Equipamento: ${entry.pack.nomeCompleto}`;
        detalhes += `\n  - Modalidade: ${
          entry.modalidade === "ski" ? "Ski" : "Snowboard"
        }`;
        detalhes += `\n  - Duração: ${entry.dias} dias`;
        detalhes += `\n  - Categoria: ${entry.categoria}`;
        detalhes += `\n  - Tamanho: ${entry.tamanho}`;
        detalhes += `\n  - Quantidade de Pessoas: ${entry.qtdePessoas}`;
        if (entry.incluirCapacete) {
          detalhes += `\n  - Capacete Adicional: Sim`;
        }
        break;

      case "transfer":
        detalhes += `\n  - Rota: ${entry.rota}`;
        detalhes += `\n  - Destino: ${entry.destino}`;
        detalhes += `\n  - Passageiros: ${entry.numPessoas} pessoas`;
        if (entry.extras && entry.extras.length > 0) {
          detalhes += `\n  - Extras: ${entry.extras.join(", ")}`;
        }
        break;

      default:
        // Para outros slugs, apenas retorna o básico
        break;
    }

    return detalhes;
  };

  const enviarWhatsApp = () => {
    const numeroTelefone = "5511966278110";

    const itensLista = carrinho.map(formatarDetalhesItem).join("\n");
    const total = carrinho.reduce((acc, item) => acc + (item.preco || 0), 0);

    const mensagemPadrao =
      `*--- 📝 NOVA SOLICITAÇÃO DE RESERVA ---*\n\n` +
      `Olá! Gostaria de reservar minha Trip com os seguintes itens:\n\n` +
      `${itensLista}\n\n` +
      `*TOTAL GERAL ESTIMADO: € ${total.toLocaleString("pt-BR")}*\n\n` +
      `Aguardamos a confirmação dos detalhes!`;

    const linkWhatsApp = `https://wa.me/${numeroTelefone}?text=${encodeURIComponent(
      mensagemPadrao
    )}`;

    window.open(linkWhatsApp, "_blank");
  };

  const removerDoCarrinho = (id) =>
    setCarrinho((prev) => prev.filter((_, index) => index !== id));
  const total = carrinho.reduce((acc, item) => acc + (item.preco || 0), 0);

  const addedServiceSlugs = useMemo(() => {
    // Cria um Set (conjunto) para buscas rápidas.
    // Usamos item.id para rastrear de qual serviço o item veio.
    const slugs = carrinho.map((item) => item.slug);
    return new Set(slugs);
  }, [carrinho]);

  return (
    <>
      {mostrarModal && (
        <div className="modal-overlay">
          {servicoSelecionado?.slug === "ski-pass" ? (
            <ModalSkiPass
              skiPassEntries={skiPassEntries}
              setSkiPassEntries={setSkiPassEntries}
              setSkiPassTotalCarrinho={handleAtualizarCarrinho}
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
          ) : servicoSelecionado?.slug === "concierge" ? (
            <ModalConcierge
              concluirModal={concluirModal}
              setMostrarModal={setMostrarModal}
            />
          ) : servicoSelecionado?.slug === "transfer" ? (
            <ModalTransfer
              concluirModal={concluirModal}
              setMostrarModal={setMostrarModal}
            />
          ) : servicoSelecionado?.slug === "equip-ski" ? (
            <ModalEquipamentos
              servicoSelecionado={servicoSelecionado}
              equipEntries={equipEntries}
              setEquipEntries={setEquipEntries}
              setEquipTotalCarrinho={setEquipTotal}
              concluirModal={concluirModal}
              setMostrarModal={setMostrarModal}
            />
          ) : (
            <ModalEquipamentos
              servicoSelecionado={servicoSelecionado}
              equipEntries={equipEntries}
              setEquipEntries={setEquipEntries}
              setEquipTotalCarrinho={setEquipTotal}
              concluirModal={concluirModal}
              setMostrarModal={setMostrarModal}
            />
          )}
        </div>
      )}

      <Header titulo="Monte sua Trip!"></Header>

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
                {addedServiceSlugs.has(servico.slug) ? (
                  <button
                    onClick={() => abrirModal(servico)}
                    className="btn-check"
                  >
                    <span className="material-symbols-outlined">check</span>
                  </button>
                ) : (
                  <button
                    onClick={() => abrirModal(servico)}
                    className="btn-adicionar"
                  >
                    <span className="material-symbols-outlined">add</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="carrinho-inferior">
          <div className="carrinho-lista">
            <ul className="lista-carrinho">
              <li className="item-carrinho titulo">
                <span className="carrinho-info">Serviço</span>
                <span className="carrinho-preco">Preço</span>
                <span className="carrinho-remover"></span>
              </li>
              {carrinho.length > 0 ? (
                carrinho.map((item, index) => (
                  <li key={index} className="item-carrinho">
                    <span className="carrinho-info">{item.nome}</span>
                    {item.slug === "transfer" || item.slug === "concierge" ? (
                      <span className="carrinho-preco">à consultar</span>
                    ) : (
                      <span className="carrinho-preco">
                        € {(item.preco || 0).toFixed(2).replace(".", ",")}
                      </span>
                    )}
                    <button
                      onClick={() => removerDoCarrinho(index)}
                      className="btn-remover"
                    >
                      X
                    </button>
                  </li>
                ))
              ) : (
                <span className="carrinho-info">Seu carrinho está vazio.</span>
              )}
            </ul>
          </div>

          <div className="carrinho-detalhes">
            <h2 className="carrinho-dias">8 Dias</h2>
            <p className="carrinho-pessoas">2 adultos e 2 crianças</p>
            <div className="carrinho-total">
              Total: € {total.toFixed(2).replace(".", ",")}
            </div>
            <button className="carrinho-reservar" onClick={enviarWhatsApp}>
              Reserve agora!
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Carrinho;
