import Axios from "axios";
import { useState } from "react";
import PropTypes from "prop-types";

import validator from "../../modules/validator";
import useRequest from "../../customHooks/useRequest";


const inputsInit = {
  nom: "",
  prenom: "",
  titre: "",
  contenu: "",
};

const Postannonce = (props) => {
  const autoPub = useRequest("get", "/autopub");
  const [inputs, setInputs] = useState(inputsInit);
  const [error, setError] = useState({});
  const [pic, setPic] = useState({});
  const [refetch, setRefetch] = props.addAnn;

  const inputsHandler = (e) => {
    setError({});
    setInputs({ ...inputs, [e.target.id]: e.target.value });
  };

  const passTest = (e) => {
    e.preventDefault();
    let tempError = {};
    for (const key in inputs) {
      if (!validator.isMinSize(inputs[key], 3)) {
        tempError = { ...tempError, [key]: "Minimum 3 caracteres" };
      } else if (!validator.onlyLetter(inputs[key]) && key !== "contenu") {
        tempError = { ...tempError, [key]: "Uniquement des lettres" };
      }
    }

    if (!pic.size) {
      tempError = { ...tempError, send: "Ajouter une photo" };
    }

    if (Object.keys(tempError).length > 0) {
      setError(tempError);
    } else {
      postAnn();
    }
  };

  const postAnn = async () => {
    let date = new Date();
    date = date.toISOString().slice(0, 19).replace("T", " ");
    const formData = new FormData();
    formData.append("nom", inputs.nom);
    formData.append("prenom", inputs.prenom);
    formData.append("titre", inputs.titre);
    formData.append("date", date);
    formData.append("contenu", inputs.contenu);
    formData.append("publie", autoPub.data[0].pannonces);
    formData.append("annonceimg", pic);

    try {
      await Axios.post("/pannonces/ann", formData);
      setInputs(inputsInit);
      setError({ ...error, success: "Merci de votre contribution" });
    } catch (err) {
      setError(err);
    }

    setRefetch(!refetch);
  };

  return (
    <div className="annonces-post-wrapper">
      <h1>Poster une annonce</h1>
      <div className="annonces-post-container" onSubmit={passTest}>
        <form encType="multipart/form-data" method="post">
          <div className="annonces-post-text">
            <h3>Nom</h3>
            <input
              type="text"
              id="nom"
              placeholder="Inserez votre nom"
              value={inputs.nom}
              onChange={inputsHandler}
            />
            <p className="annonces-error">{error.nom}</p>
            <h3>Prenom</h3>
            <input
              type="text"
              id="prenom"
              placeholder="Inserez votre prenom"
              value={inputs.prenom}
              onChange={inputsHandler}
            />
            <p className="annonces-error">{error.prenom}</p>
            <h3>Titre</h3>
            <input
              placeholder="Titre de l'annonce"
              type="text"
              id="titre"
              value={inputs.titre}
              onChange={inputsHandler}
            />
            <p className="annonces-error">{error.titre}</p>

            <textarea
              placeholder="Descriptif"
              id="contenu"
              value={inputs.contenu}
              onChange={inputsHandler}
            ></textarea>
            <p className="annonces-error">{error.contenu}</p>
          </div>
          <label htmlFor="annonces-file">Ajouter une photo</label>
          <input
            id="annonces-file"
            type="file"
            onChange={(e) => {
              setPic(e.target.files[0]);
            }}
          />

          <p className="annonces-error-pic">{error.send}</p>
          <input type="submit" value="Envoyer" />
          <p className="annonces-success">{error.success}</p>
        </form>
      </div>
    </div>
  );
};

export default Postannonce;

Postannonce.propTypes = {
  addAnn: PropTypes.array,
};
