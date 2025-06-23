import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import "./App.css";

function App() {
  const [imoveis, setImoveis] = useState([]);
  const [cidade, setCidade] = useState("");
  const [dataChegada, setDataChegada] = useState("");
  const [dataPartida, setDataPartida] = useState("");
  const [quantidadePessoas, setQuantidadePessoas] = useState(1);
  const [imoveisFiltrados, setImoveisFiltrados] = useState([]);
  const [pesquisado, setPesquisado] = useState(false);  // Novo estado para controlar a pesquisa

  useEffect(() => {
    fetch("http://localhost:5000/api/imoveis")
      .then((res) => res.json())
      .then((data) => {
        console.log("Dados recebidos:", data);
        setImoveis(data); // Armazenando todos os imóveis recebidos na API
      })
      .catch((err) => console.error("Erro no fetch:", err));
  }, []);

  const filtrarImoveis = () => {
    console.log("Filtrar clicado");
  
    const filtrados = imoveis.filter(imovel => {
      console.log("Imóvel sendo testado:", imovel);
      
      // Cidade
      const cidadeInput = cidade?.toLowerCase();
      const cidadeImovel = imovel.resumo.ville?.toLowerCase();
      const cidadeValida = cidadeInput ? cidadeImovel?.includes(cidadeInput) : true;
      console.log("Cidade válida?", cidadeValida);
      console.log("Cidade informada:", cidade);
      console.log("Cidade no imóvel:", imovel.resumo.ville);
      
      // Log completo do objeto para inspecionar
      console.log("🔍 Imóvel completo:", JSON.stringify(imovel, null, 2));

            // Log do objeto imovel para verificar a estrutura completa
      console.log("Objeto imovel:", imovel);

      // Pessoas
      // Garantir que nb_adultes e nb_enfants não sejam nulos ou undefined
      const nbAdultes = (imovel.detalhes.detail.nb_adultes !== undefined && imovel.detalhes.detail.nb_adultes !== null) ? parseInt(imovel.detalhes.detail.nb_adultes) : 0;
      const nbEnfants = (imovel.detalhes.detail.nb_enfants !== undefined && imovel.detalhes.detail.nb_enfants !== null) ? parseInt(imovel.detalhes.detail.nb_enfants) : 0;
      console.log("Somando nb_adultes + nb_enfants:", nbAdultes, "+", nbEnfants);
      // Verifica se a capacidade é suficiente para as pessoas solicitadas
      const quantidadeDePessoas = isNaN(parseInt(quantidadePessoas, 10)) ? 0 : parseInt(quantidadePessoas, 10);
      const pessoasValida = nbAdultes >= quantidadeDePessoas;
      // Logs finais
      console.log("Quantidade de pessoas solicitadas:", quantidadePessoas);
      console.log("→ pessoasValida?", pessoasValida);

      // Dados obrigatórios
      const dadosValidos =
        imovel.resumo.titre &&
        imovel.resumo.ville &&
        (imovel.resumo.prix || imovel.resumo.prix_ete || imovel.resumo.prix_hiver);
      console.log("Dados válidos?", dadosValidos);
  
      // Data
      let dataDisponibilidade = [];
      try {
        let sejoursRaw = imovel.disponibilidade?.sejours;
  
        if (typeof sejoursRaw === "string") {
          // Ajuste para parse correto
          sejoursRaw = sejoursRaw
            .replace(/'/g, '"')
            .replace(/\bNone\b/g, 'null');
  
          const sejoursParsed = JSON.parse(sejoursRaw);
  
          dataDisponibilidade = sejoursParsed?.sejour
            ? Array.isArray(sejoursParsed.sejour)
              ? sejoursParsed.sejour
              : [sejoursParsed.sejour]
            : [];
        }
      } catch (error) {
        console.error("Erro ao parsear sejours:", error);
      }
  
      const dataValida =
        dataDisponibilidade.length === 0 ||
        (dataChegada && dataPartida &&
          dataDisponibilidade.some(sejour => {
            const inicio = new Date(sejour.date_debut);
            const fim = new Date(sejour.date_fin);
            return new Date(dataChegada) <= fim && new Date(dataPartida) >= inicio;
          }));
      console.log("Data válida?", dataValida);
  
      return cidadeValida && dataValida && pessoasValida && dadosValidos;
    });
  
    console.log("Imóveis filtrados:", filtrados);
    setImoveisFiltrados(filtrados);
    setPesquisado(true);
  };
  
  return (
    <div className="container">
      <h1>Imóveis disponíveis</h1>

      {/* Filtros */}
      <div className="filtros">
        <select
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
        >
          <option value="">Selecione a cidade</option>
          <option value="Chamonix">Chamonix</option>
          <option value="Courchevel">Courchevel</option>
          <option value="Morzine">Morzine</option>
          <option value="Megève">Megève</option>
          
        </select>

        <input
          type="date"
          value={dataChegada}
          onChange={(e) => setDataChegada(e.target.value)}
        />
        <input
          type="date"
          value={dataPartida}
          onChange={(e) => setDataPartida(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantidade de pessoas"
          value={quantidadePessoas}
          onChange={(e) => setQuantidadePessoas(e.target.value)}
        />
        <button onClick={filtrarImoveis}>Pesquisar</button>
      </div>

      {/* Exibição dos cards de imóveis filtrados */}
      <div className="grid">
        {pesquisado ? (
          imoveisFiltrados.length > 0 ? (
            imoveisFiltrados.map((imovel, index) => (
              <div className="card" key={index}>
                <img 
                  src={imovel.resumo.image ? imovel.resumo.image : "https://via.placeholder.com/150"} 
                  alt={imovel.resumo.titre || "Sem título"} 
                />
                <h2>{imovel.resumo.titre || "Título indisponível"}</h2>
                <p>{imovel.resumo.ville || "Cidade não informada"}</p>
                <p>Preço: {imovel.resumo.prix_hiver || "N/A"}</p>
                <p><strong>Detalhes:</strong> {imovel.detalhes.detail.gastronomie || "Detalhe não informado"}</p>
                {/* <p><strong>Último update (disponibilidade):</strong> {imovel.disponibilidade.datetime || "Data não informada"}</p> */}

                {imovel.resumo.id && (
                  <Link to={`/reserva/${imovel.resumo.id}`}>
                    <button>Reservar</button>
                  </Link>
                )}
              </div>
            ))
          ) : (
            <p>Nenhum imóvel encontrado para os critérios selecionados.</p>
          )
        ) : (
          <p>Por favor, preencha os filtros e clique em "Pesquisar" para ver os imóveis disponíveis.</p>
        )}
      </div>
    </div>
  );
}

export default App;

