import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import "./AccAnnoncesCard.css";

const AccAnnoncesCard = (props) => {
  return (
    <Link to={"/annonces/" + props.id}>
      <div className="acc-annonces-card-all">
        <div
          className="acc-annonces-img"
          style={{ backgroundImage: `url(/${props.img_url})` }}
        >
          <div className="acc-annonces-info">
            <h2>{props.titre}</h2>
            <p>{props.nom + " " + props.prenom}</p>
            {props.date && (
              <p>{props.date.split("T")[0].split("-").reverse().join("-")}</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AccAnnoncesCard;

AccAnnoncesCard.propTypes = {
  id: PropTypes.number,
  img_url: PropTypes.string,
  nom: PropTypes.string,
  prenom: PropTypes.string,
  date: PropTypes.string,
  titre: PropTypes.string,
};
