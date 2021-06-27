import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import "./AdminParagraphes.css";

const inputsInit = {
  titre: "",
  contenu: "",
  photos: null,
};

const AdminParagraphes = ({ content }) => {
  const [contenu, setContenu] = content;
  const [paraPhoto, setParaPhoto] = useState(null);
  const [error, setError] = useState("");
  const [paragraphes, setParagraphes] = useState(inputsInit);

  const inputsHandler = (e) => {
    setParagraphes({ ...paragraphes, [e.target.name]: e.target.value });
  };

  const addPara = (e) => {
    e.preventDefault();
    if (paragraphes.contenu) {
      setContenu([
        ...contenu,
        {
          titre: paragraphes.titre,
          contenu: paragraphes.contenu,
          photos: paraPhoto,
        },
      ]);
      setParagraphes(inputsInit);
      setError("");
    } else {
      setError("Merci de remplir le contenu du paragraphe");
    }
  };

  useEffect(() => {
    setParaPhoto(null);
  }, [contenu]);

  return (
    <div className="paragraphes-all">
      <div className="paragraphes-titre">
        <p>Titre du paragraphe</p>
        <input
          type="text"
          name="titre"
          value={paragraphes.titre}
          onChange={inputsHandler}
        />
      </div>
      <div className="paragraphes-contenu">
        <div className="paragraphes-contenu-info">
          <p>Contenu</p>
          <label className="photo-btn" htmlFor="photopara">
            Ajouter photo au paragraphe
          </label>
          <input
            id="photopara"
            type="file"
            onChange={(e) => setParaPhoto(e.target.files[0])}
          />
        </div>
        <textarea
          name="contenu"
          value={paragraphes.contenu}
          onChange={inputsHandler}
        ></textarea>
      </div>
      <div className="paragraphes-photo-envoi">
        <button onClick={addPara}>Ajouter le paragraphe</button>
      </div>
      <p>{error}</p>
    </div>
  );
};

export default AdminParagraphes;

AdminParagraphes.propTypes = {
  content: PropTypes.array,
  pics: PropTypes.array,
};
