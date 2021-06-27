import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import "./AccActuCard.css";

const AccActuCard = (props) => {
  return (
    <Link to={"/actualite/" + props.id}>
      <div
        className="accactu-card-pic"
        style={{ backgroundImage: `url(${props.header_pic_path})` }}
      >
        <div className="accactu-card-info">
          <h2>{props.titre}</h2>
          <p>Posté le : {props.date}</p>
        </div>
      </div>
    </Link>
  );
};

export default AccActuCard;

AccActuCard.propTypes = {
  id: PropTypes.number,
  header_pic_path: PropTypes.string,
  titre: PropTypes.string,
  date: PropTypes.string,
};
