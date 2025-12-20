import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

import { encontrarEstadiasNoPeriodo } from "./utils/calculadoraEstadia.js";

function App() {
  const [imoveis, setImoveis] = useState([]);
  const [cidade, setCidade] = useState("");
  const [dataChegada, setDataChegada] = useState(null);
  const [dataPartida, setDataPartida] = useState(null);
  const [quantidadePessoas, setQuantidadePessoas] = useState(1);
  const [adultos, setAdultos] = useState("");
  const [criancas, setCriancas] = useState("");
  const [imoveisFiltrados, setImoveisFiltrados] = useState([]);
  const [pesquisado, setPesquisado] = useState(false);

  const checkinRef = useRef(null);
  const checkoutRef = useRef(null);

  const params = new URLSearchParams({
    cidade: cidade,
    dataChegada: dataChegada,
    dataPartida: dataPartida,
    adultos: adultos,
    criancas: criancas,
  });

  const queryString = params.toString();

  useEffect(() => {
    if (window.runLuxexScripts) {
      window.runLuxexScripts(); // Chama a função para rodar os scripts do Luxex
    }
  }, []);

  useEffect(() => {
    console.log("Buscando Imóveis...")
    fetch("http://18.116.12.206:5000/api/imoveis")
      .then((res) => res.json())
      .then((data) => {
        console.log("Busca Finalizada")
        setImoveis(data);
      })
      .catch((err) => console.error("Erro no fetch:", err));
  }, []);

  const handleCidade = (e) => {
    setCidade(e.target.value);
  };

  const filtrarImoveis = () => {
    const inicio = dataChegada;
    const fim = dataPartida;
    const numAdultos = parseInt(adultos) || 0;
    const numCriancas = parseInt(criancas) || 0;
    const faixaPreco = [0, Infinity]; // ou defina como quiser futuramente

    const imoveisFiltrados = imoveis.filter((imovel, index) => {
      // Filtro por cidade (normalizado)
      const cidadeInput = cidade?.trim().toLowerCase();
      const cidadeImovel = imovel.resumo.ville?.trim().toLowerCase();
      const cidadeValida = cidadeInput
        ? cidadeImovel?.includes(cidadeInput)
        : true;

      // Filtro por número de adultos
      const qtdeAdulttosValido =
        !numAdultos || imovel.detalhes?.detail?.nb_adultes >= numAdultos;

      // Filtro por número de crianças
      const qtdeCriancasValido =
        !numCriancas || imovel.detalhes?.detail?.nb_enfants >= numCriancas;

      // Filtro de disponibilidade por data
      const dataValida = (() => {
        if (!inicio || !fim) return true; // Permite caso datas não sejam selecionadas
        const disponibilidades = imovel.disponibilidade.sejours.sejour || [];
        if (!Array.isArray(disponibilidades) || disponibilidades.length === 0) {
          console.log("Disponibilidades inválidas para o imóvel:", imovel);
          return false;
        }

        const {
          estadias: estadiasEncontradas,
          disponivel: periodoTotalmenteCoberto,
        } = encontrarEstadiasNoPeriodo(disponibilidades, inicio, fim);

        if(periodoTotalmenteCoberto){
          console.log("Imóvel disponível para o período!", imovel.resumo.titre);
          console.log("Estadias encontradas", estadiasEncontradas);
        }
        return periodoTotalmenteCoberto;
      })();

      return (
        cidadeValida && qtdeAdulttosValido && qtdeCriancasValido && dataValida
      );
    });
    console.log("Imoveis filtrados: ", imoveisFiltrados.length);
    return imoveisFiltrados;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Filtrando imóveis");
    const resultados = filtrarImoveis();
    console.log("Resultado: ", resultados);

    setImoveisFiltrados(resultados);
    setPesquisado(true);
  };

  return (
    <>
      <div className="preloader-bg"></div>
      <div id="preloader">
        <div id="preloader-status">
          <div className="preloader-position loader">
            <span></span>
          </div>
        </div>
      </div>
      <div className="tst-line-t"></div>
      <div className="tst-line-l"></div>
      <div className="tst-line-r"></div>
      <div className="tst-line-b"></div>
      <div className="container-fluid nopadding">
        <div className="extra-margin-border">
          <div className="border-top"></div>
        </div>
      </div>
      <nav className="navbar navbar-fixed-top navbar-bg-switch">
        <div className="container-fluid nopadding">
          <div className="navbar-header fadeIn-element">
            <div className="logo">
              <a className="navbar-brand logo" href="index.html">
                <img
                  alt="Logo"
                  className="logo-light"
                  src="/img/logo-snowtrip.png"
                  style={{
                    position: "relative",
                    top: -40,
                    left: 0,
                    width: "250px",
                    height: "150px",
                    fontWeight: "bold",
                  }}
                />
                {/* <img alt="Logo" className="logo-dark" src="img/logo-dark.png"/> */}
              </a>
            </div>
          </div>
          <div className="main-navigation fadeIn-element">
            <div className="navbar-header">
              <button
                aria-expanded="false"
                className="navbar-toggle collapsed"
                data-target="#navbar-collapse"
                data-toggle="collapse"
                type="button"
              >
                <span className="sr-only">Toggle navigation</span>{" "}
                <span className="icon-bar"></span>{" "}
                <span className="icon-bar"></span>{" "}
                <span className="icon-bar"></span>
              </button>
            </div>
            <div className="collapse navbar-collapse" id="navbar-collapse">
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <a href="index.html" style={{ fontSize: 14 }}>
                    Home
                  </a>
                </li>
                <li>
                  <a href="gallery.html" style={{ fontSize: 14 }}>
                    Gallery
                  </a>
                </li>
                <li>
                  <a href="contact.html" style={{ fontSize: 14 }}>
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="http://18.116.12.206:3000/Carrinho"
                    style={{ fontSize: 14 }}
                  >
                    Monte sua Trip
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <div className="upper-page bg-dark" id="home">
        <div className="hero-fullscreen">
          <div className="hero-fullscreen-FIX">
            <div className="hero-bg">
              <div className="swiper-container-wrapper">
                <div className="swiper-container swiper2">
                  <div className="swiper-wrapper">
                    <div className="swiper-slide">
                      <div className="swiper-slide-inner">
                        <div className="swiper-slide-inner-bg bg-img-1 overlay overlay-dark">
                          <video
                            src="/videos/videoplayback.mp4"
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="auto"
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              zIndex: 0,
                            }}
                          />
                        </div>
                        <div className="swiper-slide-inner-txt-2">
                          <div className="divider-m"></div>
                          <h1 className="hero-heading hero-heading-home fadeIn-element">
                            HOSPEDAGEM
                          </h1>
                          <div className="divider-m"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="scroll-indicator scroll-indicator-home">
          <div className="scroll-indicator-wrapper">
            <div className="scroll-line fadeIn-element"></div>
          </div>
        </div>
      </div>
      <div
        id="reservation-form-wrapper"
        className="section-all bg-dark reservation-form-wrapper-home"
      >
        <div className="container-fluid nopadding nopadding-xs">
          <div className="extra-margin-container">
            <div className="row">
              <div className="col-lg-12">
                <div className="divider-l"></div>
                <div className="the-line"></div>
                <div className="divider-l"></div>
                <div className="divider-l visible-mobile-devices-2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* reservation form wrapper start */}
      <div>
        {/* reservation form start */}
        <div className="reservation-wrapper reservation-wrapper-home fadeIn-element">
          {/* container start */}
          <div className="container">
            <div className="extra-margin-container">
              <div className="reservation-inner clearfix">
                <form id="form-2" className="form-2" name="send">
                  <div className="col-1 c-1">
                    <div className="input-wrapper">
                      <label>Check-In</label>
                      <input
                        id="checkinField"
                        type="date"
                        value={dataChegada || ""}
                        onChange={(e) => setDataChegada(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        className="select-hospedagem"
                      />
                    </div>
                  </div>
                  <div className="col-1 c-2">
                    <div className="input-wrapper">
                      <label>Check-Out</label>
                      <input
                        id="checkoutField"
                        type="date"
                        value={dataPartida || ""}
                        onChange={(e) => setDataPartida(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        className="select-hospedagem"
                      />
                    </div>
                  </div>
                  <div className="col-2 c-3">
                    <div className="select-wrapper">
                      <label>Cidade</label>
                      <div>
                        <select
                          className="requiredField-r city select-hospedagem"
                          id="city"
                          name="city"
                          value={cidade}
                          onChange={(e) => handleCidade(e)}
                        >
                          <option className="">Cidade</option>
                          <option value="Chamonix">Chamonix</option>
                          <option value="Courchevel">Courchevel</option>
                          <option value="Morzine">Morzine</option>
                          <option value="Megève">Megève</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-2 c-4">
                    <div className="select-wrapper">
                      <label>Adultos</label>
                      <div>
                        <select
                          className="adultos select-hospedagem"
                          id="adultos"
                          name="adultos"
                          onChange={(e) => setAdultos(e.target.value)}
                        >
                          <option value="">Adultos</option>
                          <option value="1">1 Adulto</option>
                          <option value="2">2 Adultos</option>
                          <option value="3">3 Adultos</option>
                          <option value="4">4 Adultos</option>
                          <option value="5">5 Adultos</option>
                          <option value="6">6 Adultos</option>
                          <option value="7">7 Adultos</option>
                          <option value="8">8 Adultos</option>
                          <option value="9">9 Adultos</option>
                          <option value="10">10 Adultos</option>
                          {/* <option value="acima de 10">Acima de 10 Adultos</option> */}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-2 c-5">
                    <div className="select-wrapper">
                      <label>Crianças</label>
                      <div>
                        <select
                          className="requiredField-r criancas select-hospedagem"
                          id="criancas"
                          name="criancas"
                          onChange={(e) => setCriancas(e.target.value)}
                        >
                          <option value="">Crianças</option>
                          <option value="1">1 Criança</option>
                          <option value="2">2 Crianças</option>
                          <option value="3">3 Crianças</option>
                          <option value="4">4 Crianças</option>
                          <option value="5">5 Crianças</option>
                          {/* <option value="acima de 5">Acima de 5 Crianças</option> */}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-3 c-6">
                    <button
                      type="submit"
                      className="reservation-button"
                      onClick={handleSubmit}
                    >
                      Monte sua Trip
                    </button>
                  </div>
                </form>
                {/* Exibição dos cards de imóveis filtrados */}
                <div className="grid">
                  {pesquisado &&
                    (imoveisFiltrados.length > 0 ? (
                      imoveisFiltrados.map((imovel, index) => (
                        <div className="card" key={index}>
                          <img
                            src={
                              imovel.resumo.image
                                ? imovel.resumo.image
                                : "https://via.placeholder.com/150"
                            }
                            alt={imovel.resumo.titre || "Sem título"}
                          />
                          <h2>
                            {imovel.resumo?.titre || "Nome da Hospedagem"}
                          </h2>
                          <p>
                            {imovel.resumo?.ville || "Cidade"} -{" "}
                            {imovel.detalhes?.detail?.secteur[0] || "Setor"}
                          </p>
                          <p>
                            {imovel.detalhes?.detail?.nb_adultes || "xx"}{" "}
                            adultos |{" "}
                            {imovel.detalhes?.detail?.nb_enfants || "xx"}{" "}
                            crianças
                          </p>
                          <p>
                            {" "}
                            {imovel.detalhes?.detail?.nombre_chambres ||
                              "xx"}{" "}
                            quartos |{" "}
                            {imovel.detalhes?.detail?.nombre_sdb || "xx"}{" "}
                            banheiros |{" "}
                            {imovel.detalhes?.detail?.surface || "xx"} m²
                          </p>
                          <p>
                            {imovel.detalhes?.detail?.piste_distance_m || "xx"}{" "}
                            metros da estação de esqui
                          </p>

                          {imovel.resumo.id && (
                            <Link
                              to={`/detalhes/${imovel.resumo.id}?${queryString}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <button>Details</button>
                            </Link>
                          )}
                        </div>
                      ))
                    ) : (
                      <p>
                        Nenhum imóvel encontrado para os critérios selecionados.
                      </p>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
