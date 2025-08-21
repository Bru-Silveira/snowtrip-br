import { useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom';
import "./Carrinho.css";
import hospedagemImg from "./img/cards/hospedagem.jpg";

function Carrinho () {
    const [carrinho, setCarrinho] = useState([]);

    const servicos = [
      { id: 1, slug: "hospedagem", nome: "Hospedagem XYZ", preco: 5000, imagem: hospedagemImg },
      { id: 2, slug: "aulas-ski", nome: "Aulas de Ski", preco: 2000 },
      { id: 3, slug: "equip-ski", nome: "Equipamentos de Ski", preco: 1500 },
      { id: 4, slug: "equip-snow", nome: "Equipamentos de Snow Board", preco: 2000 },
      { id: 5, slug: "ski-pass", nome: "Ski Pass", preco: 2000 },
      { id: 6, slug: "transfer", nome: "Transfer", preco: 2000 },
      { id: 7, slug: "concierge", nome: "Concierge", preco: 2000 },
    ];

    const adicionarAoCarrinho = (servico) => {
    setCarrinho([...carrinho, servico]);
    };

    const removerDoCarrinho = (id) => {
    setCarrinho(carrinho.filter((item, index) => index !== id));
    };

    const total = carrinho.reduce((acc, item) => acc + item.preco, 0);

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
                <a href="http://18.116.12.206:3000" style={{ fontSize: 14 }}>
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
                          MONTE SUA TRIP
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
    <div className="carrinho-container">
    
        {/* Serviços em cima */}
        <div className="carrinho-servicos">
          <div className="lista-servicos">
            {servicos.map((servico) => (
              <div key={servico.id} className={`card-wrapper card-${servico.slug}`}>
                <div className="card-servico">
                  <p className="servico-nome">{servico.nome}</p>
                  <small className="servico-tipo">{servico.tipo}</small>
                </div>
                <button
                  onClick={() => adicionarAoCarrinho(servico)}
                  className="btn-adicionar"
                >
                  Adicionar
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Layout em 2 colunas: detalhes + carrinho */}
        <div className="carrinho-inferior">
            
            {/* Esquerda - detalhes */}
            <div className="carrinho-detalhes">
                <h2 className="carrinho-dias">8 Dias</h2>
                <p className="carrinho-pessoas">2 adultos e 2 crianças</p>

                <div className="carrinho-total">
                    Total: R$ {total.toLocaleString("pt-BR")}
                </div>

                <button className="carrinho-reservar">
                    Reserve agora!
                </button>
            </div>

            {/* Direita - carrinho */}
            <div className="carrinho-lista">
                <ul className="lista-carrinho">
                    {carrinho.map((item, index) => (
                        <li key={index} className="item-carrinho">
                            <span className="carrinho-info">
                                {item.nome} - {item.tipo}
                            </span>
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