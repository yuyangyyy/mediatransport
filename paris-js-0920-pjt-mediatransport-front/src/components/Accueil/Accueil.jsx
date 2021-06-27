import Carousel from "react-multi-carousel";
import useRequest from "../../customHooks/useRequest";
import AccActuCard from "./AccActuCard";
import AccAnnoncesCard from "./AccAnnoncesCard";

import { responsive } from "../../modules/carousselcfg";

import "./Accueil.css";
import "react-multi-carousel/lib/styles.css";

const Accueil = () => {
  const actu = useRequest("get", `actualites?page=1&limit=5&publie=1`);
  const pannonces = useRequest("get", `pannonces?page=1&limit=5&publie=1`);

  return (
    <div className="accueil-all">
      <div className="accueil-actu-container">
        <div className="actu-card-container">
          <h2>A la une</h2>
          {actu.data.actualites && (
            <Carousel
              responsive={responsive}
              containerClass="carousel-cont"
              dotListClass="carousel-dot"
              showDots={true}
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={10000}
              arrows={false}
            >
              {actu.data.actualites.map((act) => {
                return <AccActuCard {...act} key={act.id} />;
              })}
            </Carousel>
          )}
        </div>
      </div>
      <div className="accueil-annonces-container">
        <div className="actu-card-container">
          <h2>Petites Annonces</h2>
          {pannonces.data.pannonces && (
            <Carousel
              responsive={responsive}
              containerClass="carousel-cont"
              dotListClass="carousel-dot"
              showDots={true}
              infinite={true}
              arrows={false}
            >
              {pannonces.data.pannonces.map((annonce) => {
                return <AccAnnoncesCard {...annonce} key={annonce.id} />;
              })}
            </Carousel>
          )}
        </div>
      </div>
      <div className="accueil-contact-container">
        <div className="actu-card-container">
          <h2>Annuaire</h2>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad temporibus
          ipsam mollitia expedita culpa itaque ipsum maiores odit debitis, animi
          error libero laboriosam repudiandae eligendi omnis eveniet, enim
          soluta repellat! Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Ad temporibus ipsam mollitia expedita culpa itaque ipsum maiores
          odit debitis, animi error libero laboriosam repudiandae eligendi omnis
          eveniet, enim soluta repellat! Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Ad temporibus ipsam mollitia expedita culpa itaque
          ipsum maiores odit debitis, animi error libero laboriosam repudiandae
          eligendi omnis eveniet, enim soluta repellat! Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Ad temporibus ipsam mollitia
          expedita culpa itaque ipsum maiores odit debitis, animi error libero
          laboriosam repudiandae eligendi omnis eveniet, enim soluta repellat!
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad temporibus
          ipsam mollitia expedita culpa itaque ipsum maiores odit debitis, animi
          error libero laboriosam repudiandae eligendi omnis eveniet, enim
          soluta repellat! met consectetur adipisicing elit. Ad temporibus ipsam
          mollitia expedita culpa itaque ipsum maiores odit debitis, animi error
          libero laboriosam repudiandae eligendi omnis eveniet, enim soluta
          repellat! Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad
          temporibus ipsam mollitia expedita culpa itaque ipsum maiores odit
          debitis, animi error libero laboriosam
        </div>
      </div>
      <div className="accueil-annuaire-container">
        <div className="actu-card-container">
          <h2>Contact</h2>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad temporibus
          ipsam mollitia expedita culpa itaque ipsum maiores odit debitis, animi
          error libero laboriosam repudiandae eligendi omnis eveniet, enim
          soluta repellat! Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Ad temporibus ipsam mollitia expedita culpa itaque ipsum maiores
          odit debitis, animi error libero laboriosam repudiandae eligendi omnis
          eveniet, enim soluta repellat! Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Ad temporibus ipsam mollitia expedita culpa itaque
          ipsum maiores odit debitis, animi error libero laboriosam repudiandae
          eligendi omnis eveniet, enim soluta repellat! Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Ad temporibus ipsam mollitia
          expedita culpa itaque ipsum maiores odit debitis, animi error libero
          laboriosam repudiandae eligendi omnis eveniet, enim soluta repellat!
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad temporibus
          ipsam mollitia expedita culpa itaque ipsum maiores odit debitis, animi
          error libero laboriosam repudiandae eligendi omnis eveniet, enim
          soluta repellat! met consectetur adipisicing elit. Ad temporibus ipsam
          mollitia expedita culpa itaque ipsum maiores odit debitis, animi error
          libero laboriosam repudiandae eligendi omnis eveniet, enim soluta
          repellat! Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad
          temporibus ipsam mollitia expedita culpa itaque ipsum maiores odit
          debitis, animi error libero laboriosam
        </div>
      </div>
    </div>
  );
};

export default Accueil;
