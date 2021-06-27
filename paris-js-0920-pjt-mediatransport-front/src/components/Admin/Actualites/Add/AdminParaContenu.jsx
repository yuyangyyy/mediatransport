import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import "./AdminParaContenu.css";

const AdminParaContenu = ({ content }) => {
  const [contenu, setContenu] = content;
  const [preview, setPreview] = useState([]);

  const removePara = (e) => {
    e.preventDefault();
    const deleteOne = contenu.filter(
      (cont, index) => index !== parseInt(e.target.id)
    );
    setContenu(deleteOne);
    setPreview(deleteOne);
  };

  useEffect(() => {
    if (contenu.length === 0) {
      setPreview([]);
    }
    contenu.forEach((cont, index) => {
      if (cont.photos) {
        const reader = new FileReader();
        const picReady = () => {
          const addUrl = [...contenu];
          addUrl[index].url = reader.result;
          setPreview(addUrl);
        };
        reader.readAsDataURL(cont.photos);
        reader.addEventListener("load", picReady);
      } else {
        setPreview(contenu);
      }
    });
  }, [contenu]);

  return (
    <div className="paragraphecontenu-all">
      {preview.map((cont, index) => {
        return (
          <div className="paragraphecontenu-wrap" key={index}>
            <button id={index} onClick={removePara}>
              Retirer le paragraphe
            </button>
            {cont.url && (
              <img
                src={cont.url}
                alt="preview"
                style={{ float: `${index % 2 === 0 ? "left" : "right"}` }}
              />
            )}
            <h3>{cont.titre}</h3>
            <p>{cont.contenu}</p>
          </div>
        );
      })}
    </div>
  );
};

export default AdminParaContenu;

AdminParaContenu.propTypes = {
  content: PropTypes.array,
};
