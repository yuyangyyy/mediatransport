import Axios from "axios";
import { useState, useRef } from "react";

import AdminParagraphes from "./AdminParagraphes";
import AdminParaContenu from "./AdminParaContenu";
import useRequest from "../../../../customHooks/useRequest";

import "./AdminAddActualites.css";

const inputsInit = {
  titre: "",
  tag: "Actualités",
  checkbox: false,
};

const AdminActualites = () => {
  const tags = useRequest("get", "/tag");
  const [inputs, setInputs] = useState(inputsInit);
  const [headerPic, setHeaderPic] = useState([]);
  const [contenu, setContenu] = useState([]);
  const [error, setError] = useState({});
  const selectRef = useRef();

  const inputsHandler = (e) => {
    setError({});
    if (e.target.name === "checkbox") {
      setInputs({ ...inputs, checkbox: !inputs.checkbox });
    } else {
      setInputs({ ...inputs, [e.target.name]: e.target.value });
    }
  };

  const sendArticle = async (e) => {
    e.preventDefault();
    const date = new Date();
    const formatedDate = date
      .toISOString()
      .slice(0, 10)
      .split("-")
      .reverse()
      .join("-");
    const formData = new FormData();
    formData.append("titre", inputs.titre);
    formData.append("tag", inputs.tag);
    formData.append("date", formatedDate);
    formData.append("publie", inputs.checkbox);
    formData.append("paragraphes", JSON.stringify(contenu));
    formData.append("header", headerPic);
    contenu.forEach((cont, index) => {
      formData.append("paraimg", cont.photos);
    });

    try {
      const post = await Axios.post("/actualites/act", formData);
      setContenu([]);
      setError({ valide: `${post.data.titre} bien ajoutée` });
      setInputs(inputsInit);
    } catch (err) {
      if (err.response) {
        setError(err.response.data);
      }
    }
  };

  return (
    <div className="actualite-all">
      <div className="actualite-main">
        <form
          encType="multipart/form-data"
          method="post"
          onSubmit={sendArticle}
        >
          <div className="actualite-top-info">
            <div className="actualite-header">
              <div className="actualite-titre">
                <h2>Titre de l article</h2>

                <input
                  name="titre"
                  type="text"
                  value={inputs.titre}
                  onChange={inputsHandler}
                />
              </div>

              <p className="back-error">{error.titre}</p>

              <div className="actualite-tags-result">
                <div className="actualite-tags">
                  <h2>Rubrique</h2>

                  <select
                    name="tag"
                    value={inputs.tag}
                    onChange={inputsHandler}
                    ref={selectRef}
                  >
                    {tags.data.map((tag) => {
                      return (
                        <option
                          id={tag.id}
                          name="tag"
                          value={tag.nom}
                          key={tag.id}
                        >
                          {tag.nom}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>

            <label className="photo-btn" htmlFor="article-header">
              Photo Principale
            </label>

            <input
              id="article-header"
              type="file"
              accept="image/jpeg , image/png"
              onChange={(e) => {
                setError({});
                setHeaderPic(e.target.files[0]);
              }}
            />
          </div>

          <AdminParagraphes content={[contenu, setContenu]} />

          <p className="back-error">{error.header}</p>
          <div className="actualite-publie-choix">
            <p>Publie</p>
            <input
              type="checkbox"
              name="checkbox"
              value={inputs.checkbox}
              onChange={inputsHandler}
            />
          </div>

          <button className="actualite-send-btn" type="submit">
            Poster l article
          </button>

          <p className="back-error">{error.valide}</p>
        </form>

        <AdminParaContenu content={[contenu, setContenu]} />
      </div>
    </div>
  );
};

export default AdminActualites;
