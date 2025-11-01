import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Carrinho.css";
import hospedagemImg from "./img/cards/hospedagem.jpg";
import ModalSkiPass from "./modals/ModalSkiPass";
import ModalEquipamentos from "./modals/ModalEquipamentos";
import ModalAulasSki from "./modals/ModalAulasSki";

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

  // ADICIONAR: estado para aulas de ski
  const [classEntries, setClassEntries] = useState([]);

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
    setServicoSelecionado(servico);

    // Abre modal para serviços que precisam de configuração
    if (
      ["ski-pass", "aulas-ski", "equip-ski", "equip-snow"].includes(
        servico.slug
      )
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
    if (!servicoSelecionado) {
      setMostrarModal(false);
      return;
    }

    if (servicoSelecionado.slug === "aulas-ski") {
      if (classEntries.length === 0) {
        alert("Adicione pelo menos uma aula antes de concluir.");
        return;
      }

      const novos = classEntries.map((entry) => {
        const preco = calcularPrecoParaEntrada(entry);
        const descricao = `${entry.resort} - ${entry.modalidade} - ${
          entry.dias
        } dia${entry.dias > 1 ? "s" : ""} - ${
          entry.periodo === "halfday" ? "Half day" : "Full day"
        }`;
        return {
          ...servicoSelecionado,
          nome: `${servicoSelecionado.nome} - ${descricao}`,
          preco,
          dataInicio: entry.dataInicio,
          dias: entry.dias,
          modalidade: entry.modalidade,
          periodo: entry.periodo,
          resort: entry.resort,
          totalPessoas: entry.totalPessoas,
          qtdeCriancas: entry.qtdeCriancas,
          idadesCriancas: entry.idadesCriancas,
          nivel: entry.nivel,
        };
      });

      setCarrinho((prev) => [...prev, ...novos]);
      setClassEntries([]);
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
              concluirModal={concluirModal}
              setMostrarModal={setMostrarModal}
            />
          ) : servicoSelecionado?.slug === "aulas-ski" ? (
            <ModalAulasSki
              classEntries={classEntries}
              setClassEntries={setClassEntries}
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
