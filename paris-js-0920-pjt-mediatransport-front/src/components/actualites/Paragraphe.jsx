import PropTypes from "prop-types";

import useRequest from "../../customHooks/useRequest";

import "./Paragraphe.css";

const Paragraphe = (props) => {
  const images = useRequest("get", "/uploads/" + props.images_id);

  return (
    <div className="paragraphe-all">
      {images.data.path && (
        <img
          src={"/" + images.data.path}
          alt={props.titre}
          style={{ float: `${props.index % 2 === 0 ? "right" : "left"}` }}
        />
      )}
      <h4>{props.titre}</h4>
      <p>{props.contenu}</p>
    </div>
  );
};

export default Paragraphe;

Paragraphe.propTypes = {
  titre: PropTypes.string,
  contenu: PropTypes.string,
  images_id: PropTypes.number,
  index: PropTypes.number,
};
