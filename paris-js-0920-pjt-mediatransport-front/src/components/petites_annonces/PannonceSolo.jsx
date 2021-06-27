import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import Axios from "axios";
import PropTypes from "prop-types";

const PannonceSolo = ({ pathName, refetcher }) => {
  const [annonce, setAnnonce] = useState([]);
  const [refetch, setRefetch] = refetcher;

  useEffect(() => {
    const id = pathName.split("/")[2];
    const getOne = async () => {
      const result = await Axios.get("/pannonces/" + id);
      setAnnonce(result.data);
    };
    getOne();
  }, []);

  return (
    <div className="annonce-solo-wrapper">
      <div className="annonces-solo-retour">
        <Link to="/annonces" onClick={() => setRefetch(!refetch)}>
          <IoIosArrowBack size={30} color={"#3bafe2"} /> <h2>Retour</h2>
        </Link>
      </div>
      <div className="annonce-solo-container">
        <img src={`/${annonce.img_url}`} alt={annonce.titre} />
        <div className="annonce-solo-info">
          <div className="annonce-solo-info-text">
            <h2>{annonce.titre}</h2>
            <p>
              <b>{annonce.nom + "  " + annonce.prenom}</b>
            </p>
            <p>Le {annonce.date && annonce.date.split("T")[0]}</p>
          </div>

          <div className="annonce-solo-info-contenu">
            <p>{annonce.contenu}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PannonceSolo;

PannonceSolo.propTypes = {
  pathName: PropTypes.string,
  refetcher: PropTypes.array,
};
