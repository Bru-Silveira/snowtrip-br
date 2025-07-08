// import { useEffect, useState } from "react";
// import { Link } from 'react-router-dom';
// import './assets/styles/App.css';

// function App() {
//   const [imoveis, setImoveis] = useState([]);
//   const [cidade, setCidade] = useState("");
//   const [dataChegada, setDataChegada] = useState("");
//   const [dataPartida, setDataPartida] = useState("");
//   const [quantidadePessoas, setQuantidadePessoas] = useState(1);
//   const [imoveisFiltrados, setImoveisFiltrados] = useState([]);
//   const [pesquisado, setPesquisado] = useState(false);  // Novo estado para controlar a pesquisa

//   useEffect(() => {
//     fetch("http://localhost:5000/api/imoveis")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("Dados recebidos:", data);
//         setImoveis(data); // Armazenando todos os imóveis recebidos na API
//       })
//       .catch((err) => console.error("Erro no fetch:", err));
//   }, []);

//   const filtrarImoveis = () => {
//     console.log("Filtrar clicado");
  
//     const filtrados = imoveis.filter(imovel => {
//       console.log("Imóvel sendo testado:", imovel);
      
//       // Cidade
//       const cidadeInput = cidade?.toLowerCase();
//       const cidadeImovel = imovel.resumo.ville?.toLowerCase();
//       const cidadeValida = cidadeInput ? cidadeImovel?.includes(cidadeInput) : true;
//       console.log("Cidade válida?", cidadeValida);
//       console.log("Cidade informada:", cidade);
//       console.log("Cidade no imóvel:", imovel.resumo.ville);
      
//       // Log completo do objeto para inspecionar
//       console.log("🔍 Imóvel completo:", JSON.stringify(imovel, null, 2));

//             // Log do objeto imovel para verificar a estrutura completa
//       console.log("Objeto imovel:", imovel);

//       // Pessoas
//       // Garantir que nb_adultes e nb_enfants não sejam nulos ou undefined
//       const nbAdultes = (imovel.detalhes.detail.nb_adultes !== undefined && imovel.detalhes.detail.nb_adultes !== null) ? parseInt(imovel.detalhes.detail.nb_adultes) : 0;
//       const nbEnfants = (imovel.detalhes.detail.nb_enfants !== undefined && imovel.detalhes.detail.nb_enfants !== null) ? parseInt(imovel.detalhes.detail.nb_enfants) : 0;
//       console.log("Somando nb_adultes + nb_enfants:", nbAdultes, "+", nbEnfants);
//       // Verifica se a capacidade é suficiente para as pessoas solicitadas
//       const quantidadeDePessoas = isNaN(parseInt(quantidadePessoas, 10)) ? 0 : parseInt(quantidadePessoas, 10);
//       const pessoasValida = nbAdultes >= quantidadeDePessoas;
//       // Logs finais
//       console.log("Quantidade de pessoas solicitadas:", quantidadePessoas);
//       console.log("→ pessoasValida?", pessoasValida);

//       // Dados obrigatórios
//       const dadosValidos =
//         imovel.resumo.titre &&
//         imovel.resumo.ville &&
//         (imovel.resumo.prix || imovel.resumo.prix_ete || imovel.resumo.prix_hiver);
//       console.log("Dados válidos?", dadosValidos);
  
//       // Data
//       let dataDisponibilidade = [];
//       try {
//         let sejoursRaw = imovel.disponibilidade?.sejours;
  
//         if (typeof sejoursRaw === "string") {
//           // Ajuste para parse correto
//           sejoursRaw = sejoursRaw
//             .replace(/'/g, '"')
//             .replace(/\bNone\b/g, 'null');
  
//           const sejoursParsed = JSON.parse(sejoursRaw);
  
//           dataDisponibilidade = sejoursParsed?.sejour
//             ? Array.isArray(sejoursParsed.sejour)
//               ? sejoursParsed.sejour
//               : [sejoursParsed.sejour]
//             : [];
//         }
//       } catch (error) {
//         console.error("Erro ao parsear sejours:", error);
//       }
  
//       const dataValida =
//         dataDisponibilidade.length === 0 ||
//         (dataChegada && dataPartida &&
//           dataDisponibilidade.some(sejour => {
//             const inicio = new Date(sejour.date_debut);
//             const fim = new Date(sejour.date_fin);
//             return new Date(dataChegada) <= fim && new Date(dataPartida) >= inicio;
//           }));
//       console.log("Data válida?", dataValida);
  
//       return cidadeValida && dataValida && pessoasValida && dadosValidos;
//     });
  
//     console.log("Imóveis filtrados:", filtrados);
//     setImoveisFiltrados(filtrados);
//     setPesquisado(true);
//   };
  
//  return (
//     <>
//       {/* Preloader */}
//       <div className="preloader-bg"></div>
//       <div id="preloader">
//         <div id="preloader-status">
//           <div className="preloader-position loader"><span></span></div>
//         </div>
//       </div>

//       {/* Linhas decorativas */}
//       <div className="tst-line-t"></div>
//       <div className="tst-line-l"></div>
//       <div className="tst-line-r"></div>
//       <div className="tst-line-b"></div>

//       {/* Navbar */}
//       <nav className="navbar navbar-fixed-top navbar-bg-switch">
//         <div className="container-fluid nopadding">
//           <div className="navbar-header fadeIn-element">
//             <div className="logo">
//               <a className="navbar-brand logo" href="/">
//                 <img alt="Logo" className="logo-light" src="/img/logo-light.png" />
//                 {/* <img alt="Logo" className="logo-dark" src="/img/logo-dark.png" /> */}
//               </a>
//             </div>
//           </div>
//           <div className="main-navigation fadeIn-element">
//             <div className="navbar-header">
//               <button className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse">
//                 <span className="sr-only">Toggle navigation</span>
//                 <span className="icon-bar"></span>
//                 <span className="icon-bar"></span>
//                 <span className="icon-bar"></span>
//               </button>
//             </div>
//             <div className="collapse navbar-collapse" id="navbar-collapse">
//               <ul className="nav navbar-nav navbar-right">
//                 <li><a href="/">Home</a></li>
//                 <li><a href="/gallery.html">Gallery</a></li>
//                 <li><a href="/contact.html">Contact</a></li>
//                 <li><a href="http://18.116.12.206:3000">Teste com React</a></li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Hero section com vídeo e novo título */}
//       <div className="upper-page bg-dark" id="home">
//         <div className="hero-fullscreen">
//           <div className="hero-fullscreen-FIX">
//             <div className="hero-bg">
//               <div className="swiper-container-wrapper">
//                 <div className="swiper-container swiper2">
//                   <div className="swiper-wrapper">
//                     <div className="swiper-slide">
//                       <div className="swiper-slide-inner">
//                         <div className="swiper-slide-inner-bg bg-img-1 overlay overlay-dark">
//                           <video playsInline autoPlay muted loop>
//                             <source src="https://www.11-76.com/html5-videos-22/luxex/luxex-3.mp4" type="video/mp4" />
//                           </video>
//                         </div>
//                         <div className="swiper-slide-inner-txt-2">
//                           <div className="divider-m"></div>
//                           <h1 className="hero-heading hero-heading-home fadeIn-element">
//                             HOSPEDAGEM
//                           </h1>
//                           <div className="divider-m"></div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Scroll indicator */}
//         <div className="scroll-indicator scroll-indicator-home">
//           <div className="scroll-indicator-wrapper">
//             <div className="scroll-line fadeIn-element"></div>
//           </div>
//         </div>
//       </div>

//       {/* 🔍 AQUI vai o conteúdo do React que já existe */}
//       <div className="reservation-wrapper reservation-wrapper-home fadeIn-element">
//         <div className="container">
//           <div className="extra-margin-container">

//             {/* 🧠 SEÇÃO DE FILTROS (já é sua lógica, só estilizada) */}
//             <div className="form-2">
//               <div className="row">
//                 <div className="col-2 c-3">
//                   <label>Cidade</label>
//                   <select value={cidade} onChange={(e) => setCidade(e.target.value)} className="select form-control">
//                     <option value="">Selecione a cidade</option>
//                     <option value="Chamonix">Chamonix</option>
//                     <option value="Courchevel">Courchevel</option>
//                     <option value="Morzine">Morzine</option>
//                     <option value="Megève">Megève</option>
//                   </select>
//                 </div>

//                 <div className="col-1 c-1">
//                   <label>Check-In</label>
//                   <input type="date" value={dataChegada} onChange={(e) => setDataChegada(e.target.value)} className="form-control input" />
//                 </div>

//                 <div className="col-1 c-2">
//                   <label>Check-Out</label>
//                   <input type="date" value={dataPartida} onChange={(e) => setDataPartida(e.target.value)} className="form-control input" />
//                 </div>

//                 <div className="col-2 c-4">
//                   <label>Pessoas</label>
//                   <input type="number" value={quantidadePessoas} onChange={(e) => setQuantidadePessoas(e.target.value)} className="form-control input" placeholder="Quantidade" />
//                 </div>

//                 <div className="col-3 c-6">
//                   <button onClick={filtrarImoveis} className="reservation-button">Pesquisar</button>
//                 </div>
//               </div>
//             </div>

//             {/* 🧱 CARDS */}
//             <div className="grid">
//               {pesquisado ? (
//                 imoveisFiltrados.length > 0 ? (
//                   imoveisFiltrados.map((imovel, index) => (
//                     <div className="card" key={index}>
//                       <img src={imovel.resumo.image || "https://via.placeholder.com/150"} alt={imovel.resumo.titre} />
//                       <h2>{imovel.resumo.titre}</h2>
//                       <p>{imovel.resumo.ville}</p>
//                       <p>Preço: {imovel.resumo.prix_hiver || "N/A"}</p>
//                       <p><strong>Detalhes:</strong> {imovel.detalhes.detail.gastronomie}</p>
//                       {imovel.resumo.id && (
//                         <Link to={`/reserva/${imovel.resumo.id}`}>
//                           <button>Reservar</button>
//                         </Link>
//                       )}
//                     </div>
//                   ))
//                 ) : (
//                   <p>Nenhum imóvel encontrado para os critérios selecionados.</p>
//                 )
//               ) : (
//                 <p>Preencha os filtros e clique em "Pesquisar".</p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default App;
import { useEffect, useState } from "react";
import './assets/styles/App.css';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FiltroBusca from './components/FiltroBusca';
import ListaImoveis from './components/ListaImoveis';

function App() {
  const [imoveis, setImoveis] = useState([]);
  const [cidade, setCidade] = useState("");
  const [dataChegada, setDataChegada] = useState("");
  const [dataPartida, setDataPartida] = useState("");
  const [quantidadePessoas, setQuantidadePessoas] = useState(1);
  const [imoveisFiltrados, setImoveisFiltrados] = useState([]);
  const [pesquisado, setPesquisado] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/imoveis")
      .then((res) => res.json())
      .then((data) => {
        setImoveis(data);
      })
      .catch((err) => console.error("Erro no fetch:", err));
  }, []);

  const filtrarImoveis = () => {
    const filtrados = imoveis.filter(imovel => {
      // Cidade
      const cidadeInput = cidade?.toLowerCase();
      const cidadeImovel = imovel.resumo.ville?.toLowerCase();
      const cidadeValida = cidadeInput ? cidadeImovel?.includes(cidadeInput) : true;

      // Pessoas
      const nbAdultes = (imovel.detalhes.detail.nb_adultes !== undefined && imovel.detalhes.detail.nb_adultes !== null) ? parseInt(imovel.detalhes.detail.nb_adultes) : 0;
      const nbEnfants = (imovel.detalhes.detail.nb_enfants !== undefined && imovel.detalhes.detail.nb_enfants !== null) ? parseInt(imovel.detalhes.detail.nb_enfants) : 0;
      const quantidadeDePessoas = isNaN(parseInt(quantidadePessoas, 10)) ? 0 : parseInt(quantidadePessoas, 10);
      const pessoasValida = nbAdultes >= quantidadeDePessoas;

      // Dados obrigatórios
      const dadosValidos =
        imovel.resumo.titre &&
        imovel.resumo.ville &&
        (imovel.resumo.prix || imovel.resumo.prix_ete || imovel.resumo.prix_hiver);

      return cidadeValida && pessoasValida && dadosValidos;
    });

    setImoveisFiltrados(filtrados);
    setPesquisado(true);
  };

  return (
    <>
      {/* Se quiser manter preloader e linhas decorativas, coloque aqui */}

      <Navbar />
      <Hero />

      <div className="reservation-wrapper reservation-wrapper-home fadeIn-element">
        <div className="container">
          <div className="extra-margin-container">
            <FiltroBusca
              cidade={cidade}
              setCidade={setCidade}
              dataChegada={dataChegada}
              setDataChegada={setDataChegada}
              dataPartida={dataPartida}
              setDataPartida={setDataPartida}
              quantidadePessoas={quantidadePessoas}
              setQuantidadePessoas={setQuantidadePessoas}
              onPesquisar={filtrarImoveis}
            />
            <ListaImoveis imoveisFiltrados={imoveisFiltrados} pesquisado={pesquisado} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
