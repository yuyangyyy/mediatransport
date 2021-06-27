import PropTypes from "prop-types";

import useRequest from "../../customHooks/useRequest";
import Paragraphe from "./Paragraphe";

import "./ActualiteSolo.css";

const ActualiteSolo = ({ match }) => {
  const { data } = useRequest("get", "/actualites/" + match.params.id);

  return (
    <div>
      <div className="actu-solo-wrapper">
        <div className="actus-solo-retour"></div>
        <div className="actu-solo-container">
          <div className="actu-solot-topinfo">
            <h2>Poste le : {data.date}</h2>
            <h1>{data.titre}</h1>
          </div>
          <div className="actu-solo-info">
            <div
              className="actu-solo-header"
              style={{ backgroundImage: `url(${"/" + data.header_pic_path})` }}
            ></div>

            <div className="actu-solo-info-text">
              {data.paragraphes &&
                data.paragraphes.map((para, index) => {
                  return <Paragraphe {...para} index={index} key={para.id} />;
                })}
            </div>

            <div className="actu-solo-info-contenu"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActualiteSolo;

ActualiteSolo.propTypes = {
  match: PropTypes.object,
};
