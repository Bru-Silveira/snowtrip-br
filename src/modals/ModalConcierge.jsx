import { useState } from "react";
import "../styles/modalConcierge.css";

const PRECO_SEMANA = 900; // euros por semana completa

const ModalConcierge = ({
  concluirModal,
  setMostrarModal,
  setConciergeTotal,
}) => {
  const [dataInicio, setDataInicio] = useState("");
  const [dias, setDias] = useState(1);
  const [mostrarResumo, setMostrarResumo] = useState(false);

  const calcularPreco = (numDias) => {
    // Calcula o número de semanas completas (arredonda para cima)
    const semanas = Math.ceil(numDias / 7);
    return semanas * PRECO_SEMANA;
  };

  const handleAdicionar = () => {
    if (!dataInicio || dias < 1) return;
    setMostrarResumo(true);
  };

  const handleConfirmar = () => {
    const preco = calcularPreco(dias);
    setConciergeTotal(preco);
    concluirModal({
      dataInicio,
      dias,
      preco,
    });
    setMostrarModal(false);
  };

  const handleVoltar = () => {
    setMostrarResumo(false);
  };

  const handleClose = () => {
    setDataInicio("");
    setDias(1);
    setMostrarResumo(false);
    setMostrarModal(false);
  };

  const precoTotal = calcularPreco(dias);

  return (
    <div className="modal-content ski-class-layout">
      <header className="modal-header">
        <h2 className="modal-title">Concierge</h2>
      </header>

      <div className="modal-body">
        {!mostrarResumo ? (
          <section className="modal-form">
            <div className="concierge-intro">
              <h3>Snow Trip Concierge</h3>
              <p className="intro-subtitle">
                Suporte completo para você aproveitar a neve sem se preocupar
                com nada.
              </p>
              <p className="intro-desc">
                O Snow Trip Concierge é o serviço ideal para quem quer viajar
                com conforto, organização e suporte real dentro da estação.
                Enquanto você curte Courchevel, a gente cuida da logística, das
                reservas, dos detalhes e de qualquer imprevisto que apareça.
              </p>
            </div>

            <div className="concierge-benefits">
              <h4>O que você recebe com o Concierge</h4>
              <ul className="benefits-list">
                <li>
                  🛎️ <strong>Assistência personalizada</strong> durante toda a
                  viagem
                </li>
                <li>
                  🍽️ <strong>Reservas de restaurantes</strong> - dos clássicos
                  ao Michelin
                </li>
                <li>
                  🎫 <strong>Atividades e experiências extras</strong> - spa,
                  passeios, eventos
                </li>
                <li>
                  🚐 <strong>Suporte com transporte</strong> interno e
                  deslocamentos
                </li>
                <li>
                  🧭 <strong>Orientação local</strong> e dicas de quem vive a
                  temporada
                </li>
                <li>
                  🔧 <strong>Ajustes e curadoria contínua</strong> - adaptamos
                  seu dia conforme necessário
                </li>
              </ul>
            </div>

            <div className="concierge-price-info">
              <span className="price-value">€{PRECO_SEMANA}</span>
              <span className="price-period">por semana</span>
            </div>

            <div className="concierge-form">
              <div className="row">
                <div className="col">
                  <label>Data de Início</label>
                  <input
                    type="date"
                    value={dataInicio}
                    onChange={(e) => setDataInicio(e.target.value)}
                  />
                </div>
                <div className="col">
                  <label>Quantos dias?</label>
                  <input
                    type="number"
                    min="1"
                    max="14"
                    value={dias}
                    onChange={(e) => setDias(parseInt(e.target.value) || 1)}
                  />
                </div>
              </div>

              <div className="preco-calculado">
                <span>Total estimado:</span>
                <strong>€{precoTotal}</strong>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-cancel" onClick={handleClose}>
                CANCELAR
              </button>
              <button
                className="btn-confirm"
                onClick={handleAdicionar}
                disabled={!dataInicio || dias < 1}
              >
                ADICIONAR
              </button>
            </div>
          </section>
        ) : (
          <section className="modal-form">
            <div className="resumo-compra">
              <h3>Resumo da Compra</h3>

              <div className="resumo-card">
                <div className="resumo-item">
                  <span className="resumo-label">Serviço:</span>
                  <span className="resumo-value">Snow Trip Concierge</span>
                </div>
                <div className="resumo-item">
                  <span className="resumo-label">Data de Início:</span>
                  <span className="resumo-value">
                    {new Date(dataInicio).toLocaleDateString("pt-BR")}
                  </span>
                </div>
                <div className="resumo-item">
                  <span className="resumo-label">Duração:</span>
                  <span className="resumo-value">
                    {dias} dia{dias > 1 ? "s" : ""}
                  </span>
                </div>
                <div className="resumo-total">
                  <span>Total:</span>
                  <strong>€{precoTotal}</strong>
                </div>
              </div>

              <div className="resumo-inclui">
                <h4>Inclui:</h4>
                <ul>
                  <li>✓ Assistência personalizada 24h</li>
                  <li>✓ Reservas de restaurantes</li>
                  <li>✓ Organização de atividades extras</li>
                  <li>✓ Suporte com transporte</li>
                  <li>✓ Orientação local em português</li>
                  <li>✓ Curadoria contínua da viagem</li>
                </ul>
              </div>

              <div className="modal-footer">
                <button className="btn-cancel" onClick={handleVoltar}>
                  VOLTAR
                </button>
                <button className="btn-confirm" onClick={handleConfirmar}>
                  CONFIRMAR
                </button>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ModalConcierge;
