import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import useRequest from "../../customHooks/useRequest";

const ActuCard = (props) => {
  const tagName = useRequest("get", "tag/" + props.tag_id);

  return (
    <Link to={"/actualite/" + props.id}>
      <div className="annonces-card">
        <div
          className="actu-card-pic-holder"
          style={{
            backgroundImage: `url(/${props.header_pic_path})`,
          }}
        ></div>
        <div className="annonces-card-info">
          <h2 className="actu-card-big-title">{props.titre}</h2>
          <h3>{tagName.data.nom}</h3>
          <h4>Posté le : {props.date}</h4>
          <h3></h3>
        </div>
      </div>
    </Link>
  );
};

export default ActuCard;

ActuCard.propTypes = {
  header_pic_path: PropTypes.string,
  tag_id: PropTypes.number,
  titre: PropTypes.string,
  id: PropTypes.number,
  date: PropTypes.string,
};
