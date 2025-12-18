import { useState } from "react";
import "../styles/ModalCommon.css";
import "../styles/ModalTransfer.css";

const ModalTransfer = ({ concluirModal, setMostrarModal }) => {
  const [rota, setRota] = useState("");
  const [destino, setDestino] = useState("");
  const [numPessoas, setNumPessoas] = useState("");
  const [dataTransfer, setDataTransfer] = useState("");
  const [extras, setExtras] = useState([]);
  const [mostrarResumo, setMostrarResumo] = useState(false);

  const rotasData = {
    "Tarentaise à Chambery": {
      destinos: [
        {
          nome: "Val Thorens",
          precos: { "1/2": 400, "3/4": 420, "5/6": 470, "7/8": 520 },
        },
        {
          nome: "Courchevel",
          precos: { "1/2": 380, "3/4": 420, "5/6": 470, "7/8": 520 },
        },
        {
          nome: "Tania / Meribel / St Martin / Champagny",
          precos: { "1/2": 350, "3/4": 400, "5/6": 410, "7/8": 460 },
        },
        {
          nome: "Les Allues / Bozel / Le Praz / Valmorel",
          precos: { "1/2": 330, "3/4": 380, "5/6": 385, "7/8": 435 },
        },
      ],
      extras: [
        { nome: "Extra reboque", preco: 80 },
        { nome: "Extra V-Class", preco: 100 },
      ],
    },
    "Haute Tarentaise à Chambery": {
      destinos: [
        {
          nome: "Val d'Isère / Tignes",
          precos: { "1/2": 420, "3/4": 470, "5/6": 520, "7/8": 570 },
        },
      ],
      extras: [
        { nome: "Extra reboque", preco: 80 },
        { nome: "Extra V-Class", preco: 100 },
      ],
    },
    "Tarentaise à Geneve Aeroport (por Annecy)": {
      destinos: [
        {
          nome: "Val Thorens",
          precos: { "1/2": 600, "3/4": 630, "5/6": 680, "7/8": 720 },
        },
        {
          nome: "Courchevel",
          precos: { "1/2": 600, "3/4": 630, "5/6": 650, "7/8": 700 },
        },
        {
          nome: "Tania / Meribel / St Martin / Champagny",
          precos: { "1/2": 510, "3/4": 555, "5/6": 580, "7/8": 630 },
        },
        {
          nome: "Les Allues / Bozel / Le Praz / Valmorel",
          precos: { "1/2": 480, "3/4": 530, "5/6": 560, "7/8": 600 },
        },
      ],
      extras: [
        { nome: "Extra reboque", preco: 80 },
        { nome: "Extra V-Class", preco: 150 },
      ],
    },
    "Haute Tarentaise à Geneve Aeroport (por Annecy)": {
      destinos: [
        {
          nome: "Val d'Isère / Tignes",
          precos: { "1/2": 650, "3/4": 680, "5/6": 720, "7/8": 840 },
        },
      ],
      extras: [
        { nome: "Extra reboque", preco: 80 },
        { nome: "Extra V-Class", preco: 150 },
      ],
    },
    "Tarentaise à Lyon / Grenoble / Geneve (autoroute)": {
      destinos: [
        {
          nome: "Val Thorens",
          precos: { "1/2": 680, "3/4": 720, "5/6": 780, "7/8": 820 },
        },
        {
          nome: "Courchevel",
          precos: { "1/2": 650, "3/4": 700, "5/6": 750, "7/8": 800 },
        },
        {
          nome: "Tania / Meribel / St Martin / Champagny",
          precos: { "1/2": 600, "3/4": 650, "5/6": 700, "7/8": 750 },
        },
        {
          nome: "Les Allues / Bozel / Le Praz / Valmorel",
          precos: { "1/2": 580, "3/4": 630, "5/6": 680, "7/8": 720 },
        },
      ],
      extras: [
        { nome: "Extra reboque", preco: 150 },
        { nome: "Extra V-Class", preco: 150 },
      ],
    },
    "Haute Tarentaise à Lyon / Grenoble / Geneve (autoroute)": {
      destinos: [
        {
          nome: "Val d'Isère / Tignes",
          precos: { "1/2": 700, "3/4": 750, "5/6": 800, "7/8": 850 },
        },
      ],
      extras: [
        { nome: "Extra reboque", preco: 150 },
        { nome: "Extra V-Class", preco: 150 },
      ],
    },
    "Moutiers / Tarentaise": {
      destinos: [
        {
          nome: "Bozel",
          precos: { "1/2": 80, "3/4": 100, "5/6": 120, "7/8": 140 },
        },
        {
          nome: "Meribel Centre",
          precos: { "1/2": 110, "3/4": 130, "5/6": 150, "7/8": 180 },
        },
        {
          nome: "Meribel Altiport / Mottaret",
          precos: { "1/2": 150, "3/4": 170, "5/6": 200, "7/8": 230 },
        },
        {
          nome: "Courchevel / Jardin Alpin e Altiport",
          precos: { "1/2": 170, "3/4": 200, "5/6": 250, "7/8": 270 },
        },
        {
          nome: "Val Thorens",
          precos: { "1/2": 200, "3/4": 220, "5/6": 240, "7/8": 260 },
        },
        {
          nome: "Bourg Saint Maurice",
          precos: { "1/2": 100, "3/4": 120, "5/6": 150, "7/8": 180 },
        },
        {
          nome: "La Plagne",
          precos: { "1/2": 160, "3/4": 175, "5/6": 200, "7/8": 220 },
        },
        {
          nome: "Les Arcs 1600 / 1800",
          precos: { "1/2": 200, "3/4": 250, "5/6": 270, "7/8": 300 },
        },
        {
          nome: "Val d'Isère / Tignes / Arcs 1950-2000 / Rosiere",
          precos: { "1/2": 250, "3/4": 300, "5/6": 330, "7/8": 350 },
        },
      ],
      extras: [{ nome: "Extra reboque ou V-Class", preco: 30 }],
    },
  };

  const calcularPreco = () => {
    if (!rota || !destino || !numPessoas) return 0;

    const rotaInfo = rotasData[rota];
    const destinoInfo = rotaInfo.destinos.find((d) => d.nome === destino);
    if (!destinoInfo) return 0;

    let total = destinoInfo.precos[numPessoas] || 0;

    extras.forEach((extra) => {
      const extraInfo = rotaInfo.extras.find((e) => e.nome === extra);
      if (extraInfo) total += extraInfo.preco;
    });

    return total;
  };

  const handleAdicionar = () => {
    if (!rota || !destino || !numPessoas || !dataTransfer) {
      alert("Por favor, preencha todos os campos obrigatórios");
      return;
    }
    setMostrarResumo(true);
  };

  const handleConfirmar = () => {
    const preco = calcularPreco();

    concluirModal({
      rota,
      destino,
      numPessoas,
      dataTransfer,
      extras,
      preco,
    });
  };

  const preco = calcularPreco();

  if (mostrarResumo) {
    return (
      <div className="modal-content ski-class-layout">
        <header className="modal-header">
          <h2 className="modal-title">Resumo Transfer</h2>
        </header>

        <div className="modal-body">
          <div className="resumo-compra">
            <div className="resumo-card">
              <div className="resumo-item">
                <span className="resumo-label">Rota:</span>
                <span className="resumo-value">{rota}</span>
              </div>
              <div className="resumo-item">
                <span className="resumo-label">Destino:</span>
                <span className="resumo-value">{destino}</span>
              </div>
              <div className="resumo-item">
                <span className="resumo-label">Passageiros:</span>
                <span className="resumo-value">{numPessoas} pessoas</span>
              </div>
              <div className="resumo-item">
                <span className="resumo-label">Data:</span>
                <span className="resumo-value">
                  {new Date(dataTransfer).toLocaleDateString("pt-BR")}
                </span>
              </div>
              {extras.length > 0 && (
                <div className="resumo-item">
                  <span className="resumo-label">Extras:</span>
                  <span className="resumo-value">{extras.join(", ")}</span>
                </div>
              )}
              <div className="resumo-total">
                <span className="resumo-label">Total:</span>
                <strong>€{preco}</strong>
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="btn-cancel"
                onClick={() => setMostrarResumo(false)}
              >
                VOLTAR
              </button>
              <button className="btn-confirm" onClick={handleConfirmar}>
                CONFIRMAR
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-content ski-class-layout">
      <header className="modal-header">
        <h2 className="modal-title">Transfer</h2>
      </header>

      <div className="modal-body">
        <section className="modal-form">
          <div className="row">
            <label className="col" htmlFor="rota">
              Rota *
              <select
                id="rota"
                value={rota}
                onChange={(e) => {
                  setRota(e.target.value);
                  setDestino("");
                  setExtras([]);
                }}
              >
                <option value="">Selecione uma rota</option>
                {Object.keys(rotasData).map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </label>

            <label className="col" htmlFor="destino">
              Destino *
              <select
                id="destino"
                value={destino}
                onChange={(e) => setDestino(e.target.value)}
                disabled={!rota}
              >
                <option value="">Selecione um destino</option>
                {rota &&
                  rotasData[rota].destinos.map((d) => (
                    <option key={d.nome} value={d.nome}>
                      {d.nome}
                    </option>
                  ))}
              </select>
            </label>
          </div>

          <div className="row">
            <label className="col" htmlFor="numPessoas">
              Número de Passageiros *
              <select
                id="numPessoas"
                value={numPessoas}
                onChange={(e) => setNumPessoas(e.target.value)}
                disabled={!destino}
              >
                <option value="">Selecione</option>
                <option value="1/2">1-2 pessoas</option>
                <option value="3/4">3-4 pessoas</option>
                <option value="5/6">5-6 pessoas</option>
                <option value="7/8">7-8 pessoas</option>
              </select>
            </label>

            <label className="col" htmlFor="dataTransfer">
              Data do Transfer *
              <input
                id="dataTransfer"
                type="date"
                value={dataTransfer}
                onChange={(e) => setDataTransfer(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                disabled={!numPessoas}
              />
            </label>
          </div>

          <div className="form-group">
            <label>Extras Adicionais</label>
            <div className="extras-list">
              {rota &&
                rotasData[rota].extras.map((extra) => (
                  <label key={extra.nome} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={extras.includes(extra.nome)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setExtras([...extras, extra.nome]);
                        } else {
                          setExtras(extras.filter((ex) => ex !== extra.nome));
                        }
                      }}
                      disabled={!numPessoas}
                    />
                    <span>
                      {extra.nome} (+€{extra.preco})
                    </span>
                  </label>
                ))}
            </div>
          </div>

          {preco > 0 && (
            <div className="preco-calculado">
              <span>Total:</span>
              <strong>€{preco}</strong>
            </div>
          )}

          <div className="modal-footer">
            <button
              className="btn-cancel"
              onClick={() => setMostrarModal(false)}
            >
              CANCELAR
            </button>
            <button
              className="btn-confirm"
              onClick={handleAdicionar}
              disabled={!rota || !destino || !numPessoas || !dataTransfer}
            >
              PRÓXIMO
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ModalTransfer;
