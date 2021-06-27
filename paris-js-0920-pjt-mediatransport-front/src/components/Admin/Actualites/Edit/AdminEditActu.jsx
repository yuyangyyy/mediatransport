import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import axion from "../../../../modules/axion";
import useRequest from "../../../../customHooks/useRequest";
import AdminEditPara from "./AdminEditPara";

import "./AdminEditActu.css";

const actuInfoInit = {
  titre: "",
  header_pic_path: "",
  tag_id: "",
  paragraphes: [
    {
      titre: "",
      contenu: "",
    },
  ],
};

const AdminEditActu = ({ match }) => {
  const [actuInfo, setActuInfo] = useState(actuInfoInit);
  const [headerPic, setHeaderPic] = useState([]);
  const [succeedColor, setSuceedColor] = useState("orange");
  const [refetch, setRefetch] = useState(false);
  const { data } = useRequest("get", "/actualites/" + match.params.id, refetch);
  const tagsList = useRequest("get", "/tag/");

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      setActuInfo(data);
    }
  }, [data]);

  useEffect(() => {
    setSuceedColor("orange");
  }, [headerPic]);

  const inputHandler = (e) => {
    setSuceedColor("orange");
    if (e.target.name === "header_pic_path") {
      setActuInfo({ ...actuInfo, [e.target.name]: e.target.files[0] });
    } else {
      setActuInfo({ ...actuInfo, [e.target.name]: e.target.value });
    }
  };

  const editArticle = async () => {
    const formData = new FormData();
    formData.append("titre", actuInfo.titre);
    formData.append("tag_id", actuInfo.tag_id);
    formData.append("header_pic_path", actuInfo.header_pic_path);
    formData.append("header", headerPic);

    const result = await axion(
      "put",
      "/actualites/act/" + match.params.id,
      formData
    );
    if (typeof result !== "string") {
      setSuceedColor("green");
      setRefetch(!refetch);
    } else {
      setSuceedColor("red");
    }
  };

  return (
    <div className="edit-actu-all">
      <div className="edit-actu-wrapper">
        <div className="edit-actu-inputbox">
          <h2>Titre de l article</h2>
          <input
            name="titre"
            type="text"
            value={actuInfo.titre}
            onChange={inputHandler}
          />
        </div>

        <div className="edit-actu-inputbox">
          <h2>Rubrique</h2>
          <select name="tag_id" value={actuInfo.tag_id} onChange={inputHandler}>
            {tagsList.data &&
              tagsList.data.map((tag) => {
                return (
                  <option value={tag.id} key={tag.id}>
                    {tag.nom}
                  </option>
                );
              })}
          </select>
        </div>

        <div className="edit-actu-parapic">
          <img src={"/" + actuInfo.header_pic_path} alt="header" />
          <div className="edit-actu-parapic-btn">
            <label htmlFor="header-pic">
              <p>Modifier le header</p>
            </label>
  
            <input
              id="header-pic"
              type="file"
              name="header_pic_path"
              accept="image/jpeg , image/png"
              onChange={(e) => setHeaderPic(e.target.files[0])}
            />
          </div>

        </div>

        <input
          className="edit-actu-launchmodif"
          type="button"
          value="Modifier l article"
          onClick={editArticle}
          style={{ backgroundColor: `${succeedColor}` }}
        />
      </div>

      <div className="edit-actu-wrapper">
        <AdminEditPara
          actu={[actuInfo, setActuInfo]}
          fetchData={[refetch, setRefetch]}
        />
      </div>
    </div>
  );
};

export default AdminEditActu;

AdminEditActu.propTypes = {
  match: PropTypes.object,
};
