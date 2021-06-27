import useRequest from "../../../../customHooks/useRequest";
import PropTypes from "prop-types";
import { useEffect, useReducer } from "react";
import Axios from "axios";
import AdminReducer from "../../../../reducers/AdminReducer";
import "./AdminEditPa.css";

const initState = {
  message: "",
  refetch: false,
  modifiedImage: [],
  titre: "",
  prenom: "",
  nom: "",
  contenu: "",
};

const AdminEditPa = ({ match }) => {
  const [state, dispatch] = useReducer(AdminReducer, initState);
  const { data } = useRequest(
    "get",
    "/pannonces/" + match.params.id,
    state.refetch
  );

  const sendModification = async () => {
    const formData = new FormData();
    formData.append("titre", state.titre);
    formData.append("nom", state.nom);
    formData.append("prenom", state.prenom);
    formData.append("contenu", state.contenu);
    formData.append("img_url", state.img_url);
    formData.append("annonceimg", state.modifiedImage);

    try {
      await Axios.put("/pannonces/ann/" + match.params.id, formData);
      dispatch({ type: "succeed" });
    } catch (err) {
      err.response && dispatch({ type: "fail", payload: err.response.data });
    }
  };

  useEffect(() => {
    dispatch({ type: "setInputs", payload: data });
  }, [data]);

  return (
    <div className="annonce-solo-container admin-pa">
      <img src={`/${data.img_url}`} alt={data.titre} />
      <label htmlFor="annoncepic">Modifier l image</label>
      <input
        id="annoncepic"
        type="file"
        onChange={(e) =>
          dispatch({ type: "setImage", payload: e.target.files[0] })
        }
      />
      <div className="annonce-solo-info">
        <div className="annonce-solo-info-text">
          <h3>Titre</h3>
          <input
            name="titre"
            type="text"
            value={state.titre}
            onChange={(e) => {
              dispatch({
                type: "handleInputs",
                payload: e.target.value,
                target: e.target.name,
              });
            }}
          />
          <h3>Nom</h3>
          <input
            name="nom"
            type="text"
            value={state.nom}
            onChange={(e) => {
              dispatch({
                type: "handleInputs",
                payload: e.target.value,
                target: e.target.name,
              });
            }}
          />
          <h3>Prenom</h3>
          <input
            name="prenom"
            type="text"
            value={state.prenom}
            onChange={(e) => {
              dispatch({
                type: "handleInputs",
                payload: e.target.value,
                target: e.target.name,
              });
            }}
          />
        </div>
        <div className="annonce-solo-info-contenu">
          <h3>Descriptif</h3>
          <textarea
            name="contenu"
            value={state.contenu}
            onChange={(e) => {
              dispatch({
                type: "handleInputs",
                payload: e.target.value,
                target: e.target.name,
              });
            }}
          />
        </div>
      </div>
      <input
        type="button"
        value="Modifier l'annonce"
        onClick={sendModification}
        className="modify-btn-pa-admin"
      />
      <p className="admin-succeed">{state.message}</p>
    </div>
  );
};

export default AdminEditPa;

AdminEditPa.propTypes = {
  match: PropTypes.object,
};
