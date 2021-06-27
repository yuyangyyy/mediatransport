import PropTypes from "prop-types";
import { useState } from "react";
import { Redirect } from "react-router-dom";



const PannCard = (props) => {
  const [seeOne, setSeeOne] = useState(false);

  return (
    <div
      className="annonces-card"
      onClick={() => {
        setSeeOne(true);
      }}
    >
      <div
        className="annonces-card-pic-holder"
        style={{
          backgroundImage: `url(${props.img_url})`,
        }}
      ></div>
      <div className="annonces-card-info">
        <h2>{props.titre}</h2>
        <h3>{props.nom}</h3>
        <h3>{props.prenom}</h3>
        <p>poste le : {props.date.split("T")[0]}</p>
        {props.tags &&
          props.tags.map((tag) => {
            return <p key={tag}>{tag}</p>;
          })}
      </div>
      {seeOne && <Redirect to={`/annonces/${props.id}`} />}
    </div>
  );
};

export default PannCard;

PannCard.propTypes = {
  id: PropTypes.number,
  titre: PropTypes.string,
  date: PropTypes.string,
  contenu: PropTypes.string,
  img_url: PropTypes.string,
  nom: PropTypes.string,
  prenom: PropTypes.string,
  tags: PropTypes.array,
};
