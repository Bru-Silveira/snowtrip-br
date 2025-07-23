import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./css/style.css";
import "./css/plugins.css"
import logoLight from './img/logo-light.png';
import logoDark from './img/logo-dark.png';

// Imports das imagens de menu
import menuImg1 from './img/menu/1.jpg';
import menuImg2 from './img/menu/2.jpg';
import menuImg5 from './img/menu/5.jpg';
import menuImg6 from './img/menu/6.jpg';

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

    const listWelcomeServices = imovel.resumo?.welcomeServices?.map((service) =>
        <li>{service}</li>) || "Nenhum serviço de boas-vindas encontrado";

    const listHousekeeping = imovel.resumo?.housekeeping?.map((service) =>
        <li>{service}</li>) || "Nenhum serviço de limpeza e roupas de cama encontrado";

    const listGeneralEquipment = imovel.resumo?.generalEquipment?.map((equipment) =>
        <li>{equipment}</li>) || "Nenhum equipamento geral encontrado";

    const homeAppliances = imovel.resumo?.homeAppliances?.map((appliance) =>
        <li>{appliance}</li>) || "Nenhum eletrodoméstico encontrado";

    const notIncluded = imovel.resumo?.notIncluded?.map((item) =>
        <li>{item}</li>) || "Nenhum item não incluído encontrado"; 
    
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
                                                    <video playsInline autoPlay={true} muted loop>
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

            <div id="about" className="section-all bg-dark">
                <div className="container-fluid nopadding nopadding-xs">
                    <div className="extra-margin-container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="the-line"></div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-lg-12">
                                <div class="post-list">
                                    <div class="post-list-content-wrapper">
                                        <div class="post-list-wrapper">
                                            <div class="post-list-item">
                                                <div class="container-custom post-list-item-container">
                                                    <div class="row post-list-row">
                                                        <div class="col-lg-4-custom col-md-6-custom offset-lg-7-custom">
                                                            <div class="post-list-content">
                                                                <div class="row">
                                                                    <div class="col-md-12">
                                                                        <div class="divider-l visible-mobile-devices"></div>
                                                                        <div class="divider-m"></div>
                                                                        <h2 class="hero-heading hero-heading-dark">
                                                                            {imovel.resumo?.titre || "Nome da Hospedagem"}
                                                                        </h2>
                                                                        <div class="divider-m"></div>
                                                                        <div>
                                                                            <p class="detalhes-hospedagem">
                                                                                {imovel.resumo?.ville || "Cidade"} - {imovel.detalhes?.detail?.secteur[0] || "Setor"}<br />
                                                                                {imovel.detalhes?.detail?.nb_adultes || "xx"} adultos | {imovel.detalhes?.detail?.nb_enfants || "xx"} crianças <br />
                                                                                {imovel.detalhes?.detail?.nombre_chambres || "xx"} quartos | {imovel.detalhes?.detail?.nombre_sdb || "xx"} banheiros | {imovel.detalhes?.detail?.surface || "xx"} m² <br />
                                                                                {imovel.detalhes?.detail?.piste_distance_m || "xx"} metros da estação de esqui
                                                                            </p>
                                                                        </div>
                                                                        <div class="divider-s"></div>
                                                                        <p class="text">
                                                                            {imovel.detalhes_pt?.detail?.descriptif_court || "Descrição não disponível"}
                                                                        </p>
                                                                        <div class="divider-l visible-mobile-devices"></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    className="post-list-bg detalhes-hospedagem-bg"
                                                    style={{ backgroundImage: `url(${imovel.resumo?.image})` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* col end */}
                        </div>
                        {/* row end */}
                        {/* menu start */}
                        <div id="menu" class="section-all bg-light">                        
                            {/* container start */}
                            <div class="container">
                                <div class="extra-margin-container">
                                    {/* row start */}
                                    <div class="row">
                                        {/* col start */}
                                        <div class="col-lg-12">
                                            <ul class="nav navbar-nav navbar-right">
                                                {/* items selector start */}
                                                <li class="item-selector">
                                                    <a href="#" class="item-button" data-target="menu-1">Serviços Inclusos</a>
                                                </li>
                                                <li class="item-selector">
                                                    <a href="#" class="item-button" data-target="menu-2">Ítens que a hospedagem oferece</a>
                                                </li>
                                            </ul>
                                            {/* items selector end */}
                                            {/* divider start */}
                                            <div class="divider-m"></div>
                                            {/* divider end */}
                                            {/* divider start */}
                                            <div class="divider-l"></div>
                                            {/* divider end */}
                                            {/* items group 1 start */}
                                            <div class="menu menu-visible" id="menu-1">
                                                <div class="item">
                                                    <div class="item-wrapper">
                                                        {/* items img start */}
                                                        <div class="menu-img">
                                                            <div class="menu-img-inner">
                                                                <a class="popup-photo" href={menuImg1} title="IMG Description">
                                                                    <img src={menuImg1} alt="Img" />
                                                                </a>
                                                            </div>
                                                        </div>
                                                        {/* items img end */}
                                                        {/* section title start */}
                                                        <h3 class="item-name">Boas Vindas</h3>
                                                        <span class="item-divider"></span>
                                                        {/* section title end */}
                                                    </div>
                                                    {/* divider start */}
                                                    <div class="divider-m"></div>
                                                    {/* divider end */}
                                                    {/* section txt start */}
                                                    <p class="item-description">
                                                        <ul class="list-item-description">{listWelcomeServices}</ul>
                                                    </p>
                                                    {/* section txt end */}
                                                </div>
                                                <div class="item">
                                                    <div class="item-wrapper">
                                                        {/* items img start */}
                                                        <div class="menu-img">
                                                            <div class="menu-img-inner">
                                                                <a class="popup-photo" href={menuImg2} title="IMG Description">
                                                                    <img src={menuImg2} alt="Img" />
                                                                </a>
                                                            </div>
                                                        </div>
                                                        {/* items img end */}
                                                        {/* section title start */}
                                                        <h3 class="item-name">Limpeza | Roupa de Cama</h3>
                                                        <span class="item-divider"></span>
                                                        {/* section title end */}
                                                    </div>
                                                    {/* divider start */}
                                                    <div class="divider-m"></div>
                                                    {/* divider end */}
                                                    {/* section txt start */}
                                                    <p class="item-description text">
                                                        <ul class="list-item-description">{listHousekeeping}</ul>
                                                    </p>
                                                    {/* section txt end */}
                                                </div>
                                            </div>
                                            {/* items group 1 end */}
                                            {/* items group 2 start */}
                                            <div class="menu" id="menu-2">
                                                <div class="item">
                                                    <div class="item-wrapper">
                                                        {/* items img start */}
                                                        <div class="menu-img">
                                                            <div class="menu-img-inner">
                                                                <a class="popup-photo" href={menuImg5} title="IMG Description">
                                                                    <img src={menuImg5} alt="Img" />
                                                                </a>
                                                            </div>
                                                        </div>
                                                        {/* items img end */}
                                                        {/* section title start */}
                                                        <h3 class="item-name">Geral</h3>
                                                        <span class="item-divider"></span>
                                                        {/* section title end */}
                                                    </div>
                                                    {/* divider start */}
                                                    <div class="divider-m"></div>
                                                    {/* divider end */}
                                                    {/* section txt start */}
                                                    <p class="item-description text">
                                                        <ul class="list-item-description">{listGeneralEquipment}</ul>
                                                    </p>
                                                    {/* section txt end */}
                                                </div>
                                                <div class="item">
                                                    <div class="item-wrapper">
                                                        {/* items img start */}
                                                        <div class="menu-img">
                                                            <div class="menu-img-inner">
                                                                <a class="popup-photo" href={menuImg6} title="IMG Description">
                                                                    <img src={menuImg6} alt="Img" />
                                                                </a>
                                                            </div>
                                                        </div>
                                                        {/* items img end */}
                                                        {/* section title start */}
                                                        <h3 class="item-name">Eletrodomésticos</h3>
                                                        <span class="item-divider"></span>
                                                        {/* section title end */}
                                                    </div>
                                                    {/* divider start */}
                                                    <div class="divider-m"></div>
                                                    {/* divider end */}
                                                    {/* section txt start */}
                                                    <p class="item-description text">
                                                        <ul class="list-item-description">{homeAppliances}</ul>
                                                    </p>
                                                    {/* section txt end */}
                                                </div>
                                                <div class="item">
                                                    <div class="item-wrapper">
                                                        {/* items img start */}
                                                        <div class="menu-img">
                                                            <div class="menu-img-inner">
                                                                <a class="popup-photo" href={menuImg6} title="IMG Description">
                                                                    <img src={menuImg6} alt="Img" />
                                                                </a>
                                                            </div>
                                                        </div>
                                                        {/* items img end */}
                                                        {/* section title start */}
                                                        <h3 class="item-name">Não inclusos</h3>
                                                        <span class="item-divider"></span>
                                                        {/* section title end */}
                                                    </div>
                                                    {/* divider start */}
                                                    <div class="divider-m"></div>
                                                    {/* divider end */}
                                                    {/* section txt start */}
                                                    <p class="item-description text">
                                                        <ul class="list-item-description">{notIncluded}</ul>
                                                    </p>
                                                    {/* section txt end */}
                                                </div>
                                            </div>
                                            {/* items group 2 end */}

                                        </div>
                                        {/* col end */}
                                    </div>
                                    {/* row end */}
                                    {/* row start */}
                                    <div class="row">
                                        {/* col start */}
                                        <div class="col-lg-12">
                                            {/* divider start */}
                                            <div class="divider-l"></div>
                                            {/* divider end */}
                                            {/* line start */}
                                            <div class="the-line"></div>
                                            {/* line end */}
                                            {/* divider start */}
                                            <div class="divider-l"></div>
                                            {/* divider end */}
                                        </div>
                                        {/* col end */}
                                    </div>
                                    {/* row end */}
                                </div>
                            </div>
                            {/* container end */}
                        </div>
                        {/* menu end */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Detalhes;

