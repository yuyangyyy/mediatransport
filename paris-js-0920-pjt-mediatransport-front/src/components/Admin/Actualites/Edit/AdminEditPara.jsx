import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import axion from "../../../../modules/axion";
import useRequest from "../../../../customHooks/useRequest";

const AdminEditPara = ({ actu, fetchData }) => {
  const [actuInfo, setActuInfo] = actu;
  const [refetch, setRefetch] = fetchData;
  const [paraPic, setParaPic] = useState([]);
  const [paraIndex, setParaIndex] = useState(0);
  const [succeedColor, setSuceedColor] = useState([]);
  const picPath = useRequest(
    "get",
    "/uploads/" + actuInfo.paragraphes[paraIndex].images_id
  );

  useEffect(() => {
    setSuceedColor(Array(actuInfo.paragraphes.length).fill("orange"));
    setParaPic(Array(actuInfo.paragraphes.length).fill({}));
  }, [actuInfo.paragraphes.length]);

  const inputHandler = (e) => {
    colorChanger("orange");
    const updatePara = { ...actuInfo };
    let soloUpdate = updatePara.paragraphes[paraIndex];
    soloUpdate = { ...soloUpdate, [e.target.name]: e.target.value };
    updatePara.paragraphes[paraIndex] = soloUpdate;
    setActuInfo(updatePara);
  };

  const modifyParaPic = (e) => {
    colorChanger("orange");
    const modifiedParaPic = [...paraPic];
    modifiedParaPic[paraIndex] = e.target.files[0];
    setParaPic(modifiedParaPic);
  };

  const colorChanger = (value) => {
    const tempColor = [...succeedColor];

    tempColor[paraIndex] = value;
    setSuceedColor(tempColor);
  };

  const deleteParaPic = async () => {
    const result = await axion(
      "delete",
      "/paragraphes/pic/" + actuInfo.paragraphes[paraIndex].id
    );
    if (typeof result !== "string") {
      setRefetch(!refetch);
    }
  };

  const modifyPara = async () => {
    const selectedPara = actuInfo.paragraphes[paraIndex];

    const formData = new FormData();
    formData.append("titre", selectedPara.titre);
    formData.append("contenu", selectedPara.contenu);
    formData.append("actualites_id", selectedPara.actualites_id);
    formData.append("images_id", selectedPara.images_id);
    formData.append("paraImg", paraPic[paraIndex]);

    const result = await axion(
      "put",
      "/paragraphes/act/" + selectedPara.id,
      formData
    );
    if (typeof result !== "string") {
      colorChanger("green");
      setRefetch(!refetch);
    } else {
      colorChanger("red");
    }
  };

  return (
    <div className="edit-para-all">
      <div className="edit-actu-wrapper">
        <div className="edit-actu-inputbox">
          <h2>Titre paragraphe</h2>
          <input
            name="titre"
            type="text"
            value={
              actuInfo.paragraphes[paraIndex].titre &&
              actuInfo.paragraphes[paraIndex].titre
            }
            onChange={inputHandler}
          />
        </div>

        <div className="edit-actu-parapic">
          {actuInfo.paragraphes[paraIndex].images_id && (
            <img src={"/" + picPath.data.path} alt="paraphoto" />
          )}

          <div className="edit-actu-parapic-btn">
            <label htmlFor="para-pic">
              {actuInfo.paragraphes[paraIndex].images_id ? (
                <p>Modifier</p>
              ) : (
                <p>Ajouter une photo</p>
              )}
            </label>

            <input
              id="para-pic"
              type="file"
              accept="image/jpeg , image/png"
              onChange={modifyParaPic}
            />

            {actuInfo.paragraphes[paraIndex].images_id && (
              <input
                className="edit-actu-delete"
                type="button"
                value="Supprimer"
                onClick={deleteParaPic}
              />
            )}
          </div>
        </div>
      </div>

      <div className="edit-actu-textarea">
        <h2>Contenu</h2>
        <textarea
          name="contenu"
          value={actuInfo.paragraphes[paraIndex].contenu}
          onChange={inputHandler}
        />
      </div>

      <div className="edit-actu-pagine">
        {actuInfo.paragraphes &&
          actuInfo.paragraphes.map((parag, index) => {
            return (
              <input
                id={index}
                type="button"
                value={index + 1}
                key={index}
                onClick={(e) => {
                  setParaIndex(parseInt(e.target.id));
                }}
              />
            );
          })}
      </div>

      <input
        className="edit-actu-launchmodif"
        type="button"
        value={"Modifier le paragraphe " + (paraIndex + 1)}
        onClick={modifyPara}
        style={{ backgroundColor: `${succeedColor[paraIndex]}` }}
      />
    </div>
  );
};

export default AdminEditPara;

AdminEditPara.propTypes = {
  actu: PropTypes.array,
  fetchData: PropTypes.array,
};
