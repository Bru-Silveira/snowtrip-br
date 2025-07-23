import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./css/style.css";
import "./css/plugins.css"
import logoLight from './img/logo-light.png';
import logoDark from './img/logo-dark.png';

function Detalhes() {
  const { id } = useParams();  // Pega o ID da URL
  const [imovel, setImovel] = useState({}); 
  useEffect(() => {
    fetch("http://localhost:5000/api/imoveis/" + id) 
      .then((res) => res.json())
      .then((data) => {
        console.log("Dados recebidos:", data);
        setImovel(data); 
      })
      .catch((err) => console.error("Erro no fetch:", err));
  }, [id]);

  return (
    <>
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
                            <img alt="Logo" className="logo-light" src={logoLight}></img>
                            <img alt="Logo" className="logo-dark" src={logoDark}></img>
                        </a>
                    </div>
                </div>
                <div className="main-navigation fadeIn-element">
                    <div className="navbar-header">
                        <button aria-expanded="false" className="navbar-toggle collapsed" data-target="#navbar-collapse" data-toggle="collapse" type="button"><span className="sr-only">Toggle
                        navigation</span> <span className="icon-bar"></span> <span className="icon-bar"></span> <span className="icon-bar"></span></button>
                    </div>
                    <div className="collapse navbar-collapse" id="navbar-collapse">
                        <ul className="nav navbar-nav navbar-right">
                            <li>
                                <a href="index.html">Home</a>
                            </li>
                            <li>
                                <a href="gallery.html">Galeria</a>
                            </li>
                            <li>
                                <a href="contact.html">Contatos</a>
                            </li>
                            <li>
                                <a href="http://18.116.12.206:3000">Monte sua Trip!</a>
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
                                                <video playsinline autoplay muted loop>
                                                    <source src="https://www.11-76.com/html5-videos-22/luxex/luxex-3.mp4" type="video/mp4"></source>
                                                </video>
                                            </div>
                                            <div className="swiper-slide-inner-txt-2">
                            
                                                <div className="divider-m"></div>
                                                <h1 className="hero-heading hero-heading-home fadeIn-element">
                                                    DETALHES DA HOSPEDAGEM
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
        <div className="vertical-lines-wrapper">
            <div className="vertical-lines"></div>
        </div>
      </>
  );
}

export default Detalhes;

