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
import ModalConsierge from "./modals/ModalConcierge";

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

  const handleAtualizarCarrinho = (novoTotal) => {
    setSkiPassTotal(novoTotal);
  };

  const precoEstadia = JSON.parse(sessionStorage.getItem("precoEstadia"));
  console.log("Estado Recebido no Carrinho:", precoEstadia);
  console.log("Carrinho", carrinho)
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
    if (["ski-pass", "aulas", "equip-ski", "transfer", "concierge"].includes(servico.slug)) {
    setMostrarModal(true);
  } else if (servico.slug === "hospedagem") {
    // Não faz nada ou mostra um aviso, pois o useEffect já gerencia isso
    toast.info("A hospedagem é adicionada automaticamente com base na sua busca.");
  } else {
    // Adiciona apenas se não for hospedagem e não exigir modal
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
    const servicoBaseHospedagem = servicos.find(s => s.slug === "hospedagem");

    setCarrinho(prev => {
    const hospedagemNoCarrinho = prev.find(item => item.slug === "hospedagem");

    if (preco <= 0 || !precoEstadia?.disponivel) {
      return prev.filter(item => item.slug !== "hospedagem");
    }

    if (hospedagemNoCarrinho) {
      if (hospedagemNoCarrinho.preco !== preco) {
        return prev.map(item => 
          item.slug === "hospedagem" 
            ? { ...item, preco: preco, entries: precoEstadia } 
            : item
        );
      }
      return prev; 
    } else if (servicoBaseHospedagem) {
      const novoItemHospedagem = {
        ...servicoBaseHospedagem,
        id: 1,
        preco: preco,
        entries: precoEstadia, 
        nome: "Hospedagem",
      };
      return [novoItemHospedagem, ...prev];
    }
    return prev;
  });

}, [precoEstadia]);

  const concluirModal = () => {
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

    if (servicoSelecionado.slug === "transfer") {
      setCarrinho((prev) => [
        ...prev,
        {
          ...servicoSelecionado,
          nome: `${servicoSelecionado.nome} - Tenho interesse!`,
          preco: 0,
        },
      ]);
    }

    if (servicoSelecionado.slug === "concierge") {
      setCarrinho((prev) => [
        ...prev,
        {
          ...servicoSelecionado,
          nome: `${servicoSelecionado.nome} - Tenho interesse!`,
          preco: 0,
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

      // Adicione cases para "equip-ski", "transfer", etc., se necessário

      default:
        // Para outros slugs, apenas retorna o básico
        break;
    }

    return detalhes;
  };

  const enviarWhatsApp = () => {
    const numeroTelefone = "5511910011691";

    console.log("Carrinho ao enviar para WhatsApp:", carrinho);

    // 1. Constrói a lista de itens no carrinho
    const itensLista = carrinho.map(formatarDetalhesItem).join("\n");

    const total = carrinho.reduce((acc, item) => acc + (item.preco || 0), 0);

    // 2. Constrói a mensagem completa
    const mensagemPadrao =
      `*--- 📝 NOVA SOLICITAÇÃO DE RESERVA ---*\n\n` +
      `Olá! Gostaria de reservar minha Trip com os seguintes itens:\n\n` +
      `${itensLista}\n\n` +
      `*TOTAL GERAL ESTIMADO: € ${total.toLocaleString("pt-BR")}*\n\n` +
      `Aguardamos a confirmação dos detalhes!`;

    // 3. Codifica a mensagem e constrói o link
    const linkWhatsApp = `https://wa.me/${numeroTelefone}?text=${encodeURIComponent(
      mensagemPadrao
    )}`;

    // 4. Abre o link em uma nova aba
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
          ) : servicoSelecionado?.slug === "transfer" ? (
            <ModalTransfer
              concluirModal={concluirModal}
              setMostrarModal={setMostrarModal}
            />
          ) : servicoSelecionado?.slug === "concierge" ? (
            <ModalConsierge 
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
                      <span className="carrinho-preco">
                        à consultar
                      </span>
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
            {precoEstadia?.diasPorPeriodo && <h2 className="carrinho-dias">{precoEstadia?.diasPorPeriodo} Dias</h2>}
            {precoEstadia?.qtdeAdultos && <p className="carrinho-pessoas">{precoEstadia?.qtdeAdultos} adultos e {precoEstadia?.qtdeCriancas} crianças</p>}
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
