import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { usePreloadImages } from "./hooks/UsePreloadImages";

import Header from "./components/Header";
import PrecoEstadia from "./components/PrecoEstadia";

import "./Detalhes.css";

function Detalhes() {
  const { id } = useParams(); // Pega o ID da URL
  const [searchParams, setSearchParams] = useSearchParams(); //Pega os parâmetros de busca da URL
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

  const listWelcomeServices =
    imovel.resumo?.welcomeServices?.map((service) => (
      <li key={service}>{service}</li>
    )) || "Nenhum serviço de boas-vindas encontrado";

  const listHousekeeping =
    imovel.resumo?.housekeeping?.map((service) => (
      <li key={service}>{service}</li>
    )) || "Nenhum serviço de limpeza e roupas de cama encontrado";

  const listGeneralEquipment =
    imovel.resumo?.generalEquipment?.map((equipment) => (
      <li key={equipment}>{equipment}</li>
    )) || "Nenhum equipamento geral encontrado";

  const homeAppliances =
    imovel.resumo?.homeAppliances?.map((appliance) => (
      <li key={appliance}>{appliance}</li>
    )) || "Nenhum eletrodoméstico encontrado";

  const notIncluded =
    imovel.resumo?.notIncluded?.map((item) => <li key={item}>{item}</li>) ||
    "Nenhum item não incluído encontrado";

  const listFloor =
    imovel.detalhes_pt?.detail?.node_etage?.etage?.map((floor) => (
      <div className="floors">
        <h3 className="floor-header">{floor.nom_bien_etage}</h3>
        <div className="floor-container">
          {floor.node_chambre?.chambre?.map((bedroom) => (
            <ul className="bedrooms">
              <h4>Quarto {bedroom.localid}</h4>
              <li>
                {bedroom.node_lits?.lit?.quantite_lit} x{" "}
                {bedroom.node_lits?.lit?.libelle[1]} <br />(
                {bedroom.node_lits?.lit?.longueur} x{" "}
                {bedroom.node_lits?.lit?.largeur})
              </li>
              {bedroom.node_sdb?.sdb?.node_equipement_sdb?.equipement_sdb
                .length > 0 ? (
                <li>
                  Banheiro:{" "}
                  {bedroom.node_sdb?.sdb?.node_equipement_sdb?.equipement_sdb
                    .map((value) => value.libelle[1])
                    .join(", ")}
                </li>
              ) : (
                ""
              )}
            </ul>
          )) || ""}

          {floor.node_piece_vie?.piece_vie?.length > 0 ? (
            <ul className="livingroom">
              <h4>Sala de Estar</h4>
              {floor.node_piece_vie.piece_vie.map((item) => (
                <li>{item.libelle[1]}</li>
              ))}
            </ul>
          ) : (
            ""
          )}

          {floor.node_sdb?.sdb?.node_equipement_sdb?.equipement_sdb?.length >
          0 ? (
            <ul className="bathrooms">
              <h4>Banheiro</h4>
              {floor.node_sdb?.sdb?.node_equipement_sdb.equipement_sdb.map(
                (item) => (
                  <li>{item.libelle[1]}</li>
                )
              )}
            </ul>
          ) : (
            ""
          )}
          {floor.node_sdb?.sdb?.node_equipement_sdb?.equipement_sdb?.libelle ? (
            <ul className="bathrooms">
              <h4>Banheiro</h4>
              <li>
                {
                  floor.node_sdb?.sdb?.node_equipement_sdb?.equipement_sdb
                    ?.libelle[1]
                }
              </li>
            </ul>
          ) : (
            ""
          )}

          {floor.node_espace_loisir?.espace_loisir ? (
            <ul className="leiruse">
              <h4>Área de Lazer</h4>
              <li>
                {floor.node_espace_loisir?.espace_loisir
                  ?.map((item) => item.libelle[1])
                  .join(", ")}
              </li>
            </ul>
          ) : (
            ""
          )}

          {floor.node_salle_gym?.salle_gym ? (
            <ul className="gym">
              <h4>Academia</h4>
              <li>
                {floor.node_salle_gym?.salle_gym
                  ?.map((item) => item.libelle[1])
                  .join(", ")}
              </li>
            </ul>
          ) : (
            ""
          )}

          {floor.node_autre_espace?.autre_espace ? (
            <ul className="Outros Espaços">
              <h4>Outros Espaços</h4>
              <li>
                {floor.node_autre_espace?.autre_espace
                  ?.map((item) => item.libelle[1])
                  .join(", ")}
              </li>
            </ul>
          ) : (
            ""
          )}
        </div>
      </div>
    )) || "Nenhum andar listado";

  const centre_distance_m = imovel.detalhes_pt?.detail?.centre_distance_m
    ? imovel.detalhes_pt?.detail?.centre_distance_m + " m"
    : "";
  const telesiege_distance_m = imovel.detalhes_pt?.detail?.telesiege_distance_m
    ? imovel.detalhes_pt?.detail?.telesiege_distance_m + " m"
    : "";
  const piste_distance_m = imovel.detalhes_pt?.detail?.piste_distance_m
    ? imovel.detalhes_pt?.detail?.piste_distance_m + " m"
    : "";
  const ecole_ski_distance_m = imovel.detalhes_pt?.detail?.ecole_ski_distance_m
    ? imovel.detalhes_pt?.detail?.ecole_ski_distance_m + " m"
    : "";

  const latitude = imovel.detalhes_pt?.detail?.latitude || "";
  const longitude = imovel.detalhes_pt?.detail?.longitude || "";
  const linkGoogleMaps = imovel.detalhes?.detail?.url_googlesat || "";

  const sejours = imovel.disponibilidade?.sejours?.sejour || [];

  return (
    <>
      <Header titulo="DETALHES HOSPEDAGEM"></Header>
      {/* Carrossel de imagens */}
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

      <div className="detalhes-hospedagem-container">
        <h2 className="detalhes-hospedagem-title">
          {imovel.resumo?.titre || "Nome da Hospedagem"}
        </h2>
        <p className="resumo-hospedagem">
          {imovel.resumo?.ville || "Cidade"} -{" "}
          {imovel.detalhes?.detail?.secteur[0] || "Setor"}
          <br />
          {imovel.detalhes?.detail?.nb_adultes || "xx"} adultos |{" "}
          {imovel.detalhes?.detail?.nb_enfants || "xx"} crianças <br />
          {imovel.detalhes?.detail?.nombre_chambres || "xx"} quartos |{" "}
          {imovel.detalhes?.detail?.nombre_sdb || "xx"} banheiros |{" "}
          {imovel.detalhes?.detail?.surface || "xx"} m² <br />
          {imovel.detalhes?.detail?.piste_distance_m || "xx"} metros da estação
          de esqui
        </p>
        <p className="hospedagem-text">
          {imovel.detalhes_pt?.detail?.descriptif_court ||
            "Descrição não disponível"}
        </p>
      </div>

      <div className="services-container">
        <h3 className="services-title">SERVIÇOS INCLUSOS</h3>
        <ul className="service-list">
          <li className="list-header">Serviços de Boas Vindas</li>
          {listWelcomeServices}
        </ul>
        <ul className="service-list">
          <li className="list-header">Limpeza | Roupa de Cama</li>
          {listHousekeeping}
        </ul>
      </div>

      <div className="services-container">
        <h3 className="services-title">ÍTENS INCLUSOS</h3>
        <ul className="service-list">
          <li className="list-header">Geral</li>
          {listGeneralEquipment}
        </ul>
        <ul className="service-list">
          <li className="list-header">Eletrodomésticos</li>
          {homeAppliances}
        </ul>

        <ul className="service-list">
          <li className="list-header">Não Inclusos</li>
          {notIncluded}
        </ul>
      </div>

      <div className="services-container">
        <h3 className="services-title">LAYOUT</h3>
        {listFloor}
      </div>

      <div className="services-container">
        <h3 className="services-title">LOCALIZAÇÃO</h3>
        <ul className="service-list">
          <li className="list-header">Distâncias</li>
          <li>Distância do centro: {centre_distance_m}</li>
          <li>Distância do teleférico: {telesiege_distance_m}</li>
          <li>Distância da pista: {piste_distance_m}</li>
          <li>Distância da escola de esqui: {ecole_ski_distance_m}</li>
        </ul>
        <ul className="item-description">
          <li className="list-header">Detalhes</li>
          <li>Latitude: {latitude}</li>
          <li>Longitude: {longitude}</li>
          <li>
            <a
              className="google-maps-link"
              href={linkGoogleMaps}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver no Google Maps
            </a>
          </li>
        </ul>
      </div>
      <PrecoEstadia
        sejours={sejours}
        dataChegada={searchParams.get("dataChegada")}
        dataPartida={searchParams.get("dataPartida")}
        adultos={searchParams.get("adultos")}
        criancas={searchParams.get("criancas")}
      />
    </>
  );
}

export default Detalhes;
