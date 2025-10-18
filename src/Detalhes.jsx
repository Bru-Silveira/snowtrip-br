import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePreloadImages } from "./hooks/UsePreloadImages"; 

import logoLight from './img/logo-snowtrip.png';
import logoDark from './img/logo-snowtrip.png';
import './Detalhes.css';

// Imports das imagens de menu
import menuImg1 from './img/menu/1.jpg';
import menuImg2 from './img/menu/2.jpg';
import menuImg5 from './img/menu/5.jpg';
import menuImg6 from './img/menu/6.jpg';

function Detalhes() {
    const { id } = useParams();  // Pega o ID da URL
    const [imovel, setImovel] = useState({});
    const [current, setCurrent] = useState(0); //Para o carrossel de imagens
    const [imagens, setImagens] = useState([]); // Para armazenar as imagens do imóvel

    useEffect(() => {
        if (window.runLuxexScripts) {
            window.runLuxexScripts(); // Chama a função para rodar os scripts do Luxex
        }
    }, []);

    useEffect(() => {
        fetch("http://localhost:5000/api/imoveis/" + id)
            .then((res) => res.json())
            .then((data) => {
                console.log("Dados recebidos:", data);
                setImovel(data);

                //Pega as imagens do imóvel
                const imageObj = data.detalhes?.detail?.node_photo?.photo || {};
                const originalUrls = Object.values(imageObj).map((image) => image.url);
                setImagens(originalUrls); 
            })
            .catch((err) => console.error("Erro no fetch:", err));
    }, [id]);

    const imagesLoaded = usePreloadImages(imagens); // Usa o hook para pré-carregar as imagens
    console.log("Imagens carregadas:", imagesLoaded);
    const nextSlide = () => {
        console.log("Next");
        setCurrent((prev) => (prev + 1) % imagens.length);
    };

    const prevSlide = () => {
        console.log("Prev");
        setCurrent((prev) => (prev - 1 + imagens.length) % imagens.length);
    };

    const listWelcomeServices = imovel.resumo?.welcomeServices?.map((service) =>
        <li key={service}>{service}</li>) || "Nenhum serviço de boas-vindas encontrado";

    const listHousekeeping = imovel.resumo?.housekeeping?.map((service) =>
        <li key={service}>{service}</li>) || "Nenhum serviço de limpeza e roupas de cama encontrado";

    const listGeneralEquipment = imovel.resumo?.generalEquipment?.map((equipment) =>
        <li key={equipment}>{equipment}</li>) || "Nenhum equipamento geral encontrado";

    const homeAppliances = imovel.resumo?.homeAppliances?.map((appliance) =>
        <li key={appliance}>{appliance}</li>) || "Nenhum eletrodoméstico encontrado";

    const notIncluded = imovel.resumo?.notIncluded?.map((item) =>
        <li key={item}>{item}</li>) || "Nenhum item não incluído encontrado";

    const listFloor = imovel.detalhes_pt?.detail?.node_etage?.etage?.map((floor) =>
        <div className="item">
            <div className="item-wrapper">
                <div className="menu-img">
                    <div className="menu-img-inner">
                        <a className="popup-photo" href={menuImg5} title="IMG Description">
                            <img src={menuImg5} alt="Img" />
                        </a>
                    </div>
                </div>
                <h3 className="item-name">{floor.nom_bien_etage}</h3>
                <span className="item-divider"></span>
            </div>
            <div className="divider-m"></div>
            <div className="floor-container">

                {floor.node_chambre?.chambre?.map((bedroom) =>
                    <ul className="bedrooms">
                        <h4>Quarto {bedroom.localid}</h4>
                        <li>{bedroom.node_lits?.lit?.quantite_lit} x {bedroom.node_lits?.lit?.libelle[1]} <br />({bedroom.node_lits?.lit?.longueur} x {bedroom.node_lits?.lit?.largeur})</li>
                        {bedroom.node_sdb?.sdb?.node_equipement_sdb?.equipement_sdb.length > 0 ? <li>Banheiro: {bedroom.node_sdb?.sdb?.node_equipement_sdb?.equipement_sdb.map((value) => value.libelle[1]).join(", ")}</li> : ""}
                    </ul>) || ""}

                {floor.node_piece_vie?.piece_vie?.length > 0 ?
                    <ul className="livingroom">
                        <h4>Sala de Estar</h4>
                        {floor.node_piece_vie.piece_vie.map((item) => <li>{item.libelle[1]}</li>)}
                    </ul> : ""}

                {floor.node_sdb?.sdb?.node_equipement_sdb?.equipement_sdb?.length > 0 ?
                    <ul className="bathrooms">
                        <h4>Banheiro</h4>
                        {floor.node_sdb?.sdb?.node_equipement_sdb.equipement_sdb.map((item) => <li>{item.libelle[1]}</li>)}
                    </ul> : ""}
                {floor.node_sdb?.sdb?.node_equipement_sdb?.equipement_sdb?.libelle ?
                    <ul className="bathrooms">
                        <h4>Banheiro</h4>
                        <li>{floor.node_sdb?.sdb?.node_equipement_sdb?.equipement_sdb?.libelle[1]}</li>
                    </ul> : ""}

                {floor.node_espace_loisir?.espace_loisir ?
                    <ul className="leiruse">
                        <h4>Área de Lazer</h4>
                        <li>{floor.node_espace_loisir?.espace_loisir?.map((item) => item.libelle[1]).join(", ")}</li>
                    </ul> : ""}

                {floor.node_salle_gym?.salle_gym ?
                    <ul className="gym">
                        <h4>Academia</h4>
                        <li>{floor.node_salle_gym?.salle_gym?.map((item) => item.libelle[1]).join(", ")}</li>
                    </ul> : ""}

                {floor.node_autre_espace?.autre_espace ?
                    <ul className="Outros Espaços">
                        <h4>Outros Espaços</h4>
                        <li>{floor.node_autre_espace?.autre_espace?.map((item) => item.libelle[1]).join(", ")}</li>
                    </ul> : ""}
            </div>
        </div>
    ) || "Nenhum andar listado";

    const centre_distance_m = imovel.detalhes_pt?.detail?.centre_distance_m ? imovel.detalhes_pt?.detail?.centre_distance_m + " m" : "";
    const telesiege_distance_m = imovel.detalhes_pt?.detail?.telesiege_distance_m ? imovel.detalhes_pt?.detail?.telesiege_distance_m + " m" : "";
    const piste_distance_m = imovel.detalhes_pt?.detail?.piste_distance_m ? imovel.detalhes_pt?.detail?.piste_distance_m + " m" : "";
    const ecole_ski_distance_m = imovel.detalhes_pt?.detail?.ecole_ski_distance_m ? imovel.detalhes_pt?.detail?.ecole_ski_distance_m + " m" : "";

    const latitude = imovel.detalhes_pt?.detail?.latitude || "";
    const longitude = imovel.detalhes_pt?.detail?.longitude || "";
    const linkGoogleMaps = imovel.detalhes?.detail?.url_googlesat || "";

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
                            <a className="navbar-brand logo" href="http://localhost:3000">
                                <img alt="Logo" className="logo-light" src={logoLight} style={{ position: 'relative', top: -40, left: 0, width: '250px', height: '150px', fontWeight: 'bold' }}></img>
                                {/*<img alt="Logo" className="logo-dark" src={logoDark}></img>*/}
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
                                                        <source src='/videos/videoplayback.mp4' type="video/mp4"></source>
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

                        <div className="row">
                            <div className="col-lg-12">
                                <div className="post-list">
                                    <div className="post-list-content-wrapper">
                                        <div className="post-list-wrapper">
                                            <div className="post-list-item">
                                                <div className="container-custom post-list-item-container">
                                                    <div className="row post-list-row">
                                                        <div className="col-lg-4-custom col-md-6-custom offset-lg-7-custom">
                                                            <div className="post-list-content">
                                                                <div className="row">
                                                                    <div className="col-md-12">
                                                                        <div className="divider-l visible-mobile-devices"></div>
                                                                        <div className="divider-s"></div>
                                                                        <h2 className="hero-heading hero-heading-dark">
                                                                            {imovel.resumo?.titre || "Nome da Hospedagem"}
                                                                        </h2>
                                                                        <div className="divider-m"></div>
                                                                        <div>
                                                                            <p className="detalhes-hospedagem">
                                                                                {imovel.resumo?.ville || "Cidade"} - {imovel.detalhes?.detail?.secteur[0] || "Setor"}<br />
                                                                                {imovel.detalhes?.detail?.nb_adultes || "xx"} adultos | {imovel.detalhes?.detail?.nb_enfants || "xx"} crianças <br />
                                                                                {imovel.detalhes?.detail?.nombre_chambres || "xx"} quartos | {imovel.detalhes?.detail?.nombre_sdb || "xx"} banheiros | {imovel.detalhes?.detail?.surface || "xx"} m² <br />
                                                                                {imovel.detalhes?.detail?.piste_distance_m || "xx"} metros da estação de esqui
                                                                            </p>
                                                                        </div>
                                                                        <div className="divider-s"></div>
                                                                        <p className="text">
                                                                            {imovel.detalhes_pt?.detail?.descriptif_court || "Descrição não disponível"}
                                                                        </p>
                                                                        <div className="divider-l visible-mobile-devices"></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Carrossel de imagens */}
                                                <div id="detalhes-hospedagem-bg" className="post-list-bg">
                                                    {/* <img className="hospedagem-img" src={imovel.resumo?.image || "https://www.11-76.com/html5-images-22/luxex/luxex-3.jpg"} alt="Imagem da Hospedagem" />  */}
                                                    <div className="custom-carousel">
                                                        <button className="carousel-btn prev" onClick={prevSlide}>
                                                            ❮
                                                        </button>
                                                        <div className="carousel-slide">
                                                            <img
                                                                src={imagens[current]}
                                                                alt={`Foto ${current + 1}`}
                                                                className="carousel-img"
                                                            />
                                                        </div>
                                                        <button className="carousel-btn next" onClick={nextSlide}>
                                                            ❯
                                                        </button>

                                                        {/* Bolinhas de navegação */}
                                                        <div className="carousel-dots">
                                                            {imagens.map((_, i) => (
                                                                <span
                                                                    key={i}
                                                                    className={`dot ${i === current ? "active" : ""}`}
                                                                    onClick={() => setCurrent(i)}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* col end */}
                        </div>
                        {/* row end */}
                        {/* divider start */}
                        <div className="divider-m"></div>
                        {/* divider end */}
                        {/* menu start */}
                        <div id="menu" className="section-all bg-light">
                            {/* container start */}
                            <div className="container">
                                <div className="extra-margin-container">
                                    {/* row start */}
                                    <div className="row">
                                        {/* col start */}
                                        <div className="col-lg-12">
                                            <ul id="menu-detalhes" className="nav navbar-nav text-center menu-detalhes">
                                                {/* items selector start */}
                                                <li className="item-selector">
                                                    <a href="#" className="item-button" data-target="menu-1">Serviços Inclusos</a>
                                                </li>
                                                <li className="item-selector">
                                                    <a href="#" className="item-button" data-target="menu-2">Ítens que a hospedagem oferece</a>
                                                </li>
                                                <li className="item-selector">
                                                    <a href="#" className="item-button" data-target="menu-3">Layout</a>
                                                </li>
                                                <li className="item-selector">
                                                    <a href="#" className="item-button" data-target="menu-4">Localização</a>
                                                </li>
                                            </ul>
                                            {/* items selector end */}
                                            {/* divider start */}
                                            <div className="divider-m"></div>
                                            {/* divider end */}
                                            {/* divider start */}
                                            <div className="divider-l"></div>
                                            {/* divider end */}
                                            {/* items group 1 start */}
                                            <div className="menu menu-visible" id="menu-1">
                                                <div className="item">
                                                    <div className="item-wrapper">
                                                        {/* items img start */}
                                                        <div className="menu-img">
                                                            <div className="menu-img-inner">
                                                                <a className="popup-photo" href={menuImg1} title="IMG Description">
                                                                    <img src={menuImg1} alt="Img" />
                                                                </a>
                                                            </div>
                                                        </div>
                                                        {/* items img end */}
                                                        {/* section title start */}
                                                        <h3 className="item-name">Boas Vindas</h3>
                                                        <span className="item-divider"></span>
                                                        {/* section title end */}
                                                    </div>
                                                    {/* divider start */}
                                                    <div className="divider-m"></div>
                                                    {/* divider end */}
                                                    {/* section txt start */}
                                                    <ul className="item-description">
                                                        {listWelcomeServices}
                                                    </ul>
                                                    {/* section txt end */}
                                                </div>
                                                <div className="item">
                                                    <div className="item-wrapper">
                                                        {/* items img start */}
                                                        <div className="menu-img">
                                                            <div className="menu-img-inner">
                                                                <a className="popup-photo" href={menuImg2} title="IMG Description">
                                                                    <img src={menuImg2} alt="Img" />
                                                                </a>
                                                            </div>
                                                        </div>
                                                        {/* items img end */}
                                                        {/* section title start */}
                                                        <h3 className="item-name">Limpeza | Roupa de Cama</h3>
                                                        <span className="item-divider"></span>
                                                        {/* section title end */}
                                                    </div>
                                                    {/* divider start */}
                                                    <div className="divider-m"></div>
                                                    {/* divider end */}
                                                    {/* section txt start */}
                                                    <ul className="item-description text">
                                                        {listHousekeeping}
                                                    </ul>
                                                    {/* section txt end */}
                                                </div>
                                            </div>
                                            {/* items group 1 end */}
                                            {/* items group 2 start */}
                                            <div className="menu" id="menu-2">
                                                <div className="item">
                                                    <div className="item-wrapper">
                                                        {/* items img start */}
                                                        <div className="menu-img">
                                                            <div className="menu-img-inner">
                                                                <a className="popup-photo" href={menuImg5} title="IMG Description">
                                                                    <img src={menuImg5} alt="Img" />
                                                                </a>
                                                            </div>
                                                        </div>
                                                        {/* items img end */}
                                                        {/* section title start */}
                                                        <h3 className="item-name">Geral</h3>
                                                        <span className="item-divider"></span>
                                                        {/* section title end */}
                                                    </div>
                                                    {/* divider start */}
                                                    <div className="divider-m"></div>
                                                    {/* divider end */}
                                                    {/* section txt start */}
                                                    <ul className="item-description text">
                                                        {listGeneralEquipment}
                                                    </ul>
                                                    {/* section txt end */}
                                                </div>
                                                <div className="item">
                                                    <div className="item-wrapper">
                                                        {/* items img start */}
                                                        <div className="menu-img">
                                                            <div className="menu-img-inner">
                                                                <a className="popup-photo" href={menuImg6} title="IMG Description">
                                                                    <img src={menuImg6} alt="Img" />
                                                                </a>
                                                            </div>
                                                        </div>
                                                        {/* items img end */}
                                                        {/* section title start */}
                                                        <h3 className="item-name">Eletrodomésticos</h3>
                                                        <span className="item-divider"></span>
                                                        {/* section title end */}
                                                    </div>
                                                    {/* divider start */}
                                                    <div className="divider-m"></div>
                                                    {/* divider end */}
                                                    {/* section txt start */}
                                                    <ul className="item-description text">
                                                        {homeAppliances}
                                                    </ul>
                                                    {/* section txt end */}
                                                </div>
                                                <div className="item">
                                                    <div className="item-wrapper">
                                                        {/* items img start */}
                                                        <div className="menu-img">
                                                            <div className="menu-img-inner">
                                                                <a className="popup-photo" href={menuImg6} title="IMG Description">
                                                                    <img src={menuImg6} alt="Img" />
                                                                </a>
                                                            </div>
                                                        </div>
                                                        {/* items img end */}
                                                        {/* section title start */}
                                                        <h3 className="item-name">Não inclusos</h3>
                                                        <span className="item-divider"></span>
                                                        {/* section title end */}
                                                    </div>
                                                    {/* divider start */}
                                                    <div className="divider-m"></div>
                                                    {/* divider end */}
                                                    {/* section txt start */}
                                                    <ul className="item-description text">
                                                        {notIncluded}
                                                    </ul>
                                                    {/* section txt end */}
                                                </div>
                                            </div>
                                            {/* items group 2 end */}
                                            {/* items group 3 start */}
                                            <div className="menu" id="menu-3">
                                                {listFloor}
                                            </div>
                                            {/* items group 3 end */}
                                            {/* items group 4 start */}
                                            <div className="menu" id="menu-4">
                                                <div className="item">
                                                    <div className="item-wrapper">
                                                        {/* items img start */}
                                                        <div className="menu-img">
                                                            <div className="menu-img-inner">
                                                                <a className="popup-photo" href={menuImg1} title="IMG Description">
                                                                    <img src={menuImg1} alt="Img" />
                                                                </a>
                                                            </div>
                                                        </div>
                                                        {/* items img end */}
                                                        {/* section title start */}
                                                        <h3 className="item-name">Distâncias</h3>
                                                        <span className="item-divider"></span>
                                                        {/* section title end */}
                                                    </div>
                                                    {/* divider start */}
                                                    <div className="divider-m"></div>
                                                    {/* divider end */}
                                                    {/* section txt start */}
                                                    <ul className="item-description">
                                                        <li>Distância do centro: {centre_distance_m}</li>
                                                        <li>Distância do teleférico: {telesiege_distance_m}</li>
                                                        <li>Distância da pista: {piste_distance_m}</li>
                                                        <li>Distância da escola de esqui: {ecole_ski_distance_m}</li>
                                                    </ul>
                                                    {/* section txt end */}
                                                </div>
                                                <div className="item">
                                                    <div className="item-wrapper">
                                                        {/* items img start */}
                                                        <div className="menu-img">
                                                            <div className="menu-img-inner">
                                                                <a className="popup-photo" href={menuImg2} title="IMG Description">
                                                                    <img src={menuImg2} alt="Img" />
                                                                </a>
                                                            </div>
                                                        </div>
                                                        {/* items img end */}
                                                        {/* section title start */}
                                                        <h3 className="item-name">Detalhes</h3>
                                                        <span className="item-divider"></span>
                                                        {/* section title end */}
                                                    </div>
                                                    {/* divider start */}
                                                    <div className="divider-m"></div>
                                                    {/* divider end */}
                                                    {/* section txt start */}
                                                    <ul className="item-description text">
                                                        <li>Latitude: {latitude}</li>
                                                        <li>Longitude: {longitude}</li>
                                                        <li><a className="google-maps-link" href={linkGoogleMaps} target="_blank" rel="noopener noreferrer">Ver no Google Maps</a></li>

                                                    </ul>
                                                    {/* section txt end */}
                                                </div>
                                            </div>
                                            {/* items group 4 end */}
                                        </div>
                                        {/* col end */}
                                    </div>
                                    {/* row end */}
                                    {/* row start */}
                                    <div className="row">
                                        {/* col start */}
                                        <div className="col-lg-12">
                                            {/* divider start */}
                                            <div className="divider-l"></div>
                                            {/* divider end */}
                                            {/* line start */}
                                            <div className="the-line"></div>
                                            {/* line end */}
                                            {/* divider start */}
                                            <div className="divider-l"></div>
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

