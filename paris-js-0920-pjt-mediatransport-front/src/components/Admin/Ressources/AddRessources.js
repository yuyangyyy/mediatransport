import React from 'react';
import axios from 'axios';
import './AddRessources.css';

const AddRessources = () => {
  const [nom, setNom] = React.useState('');
  const [choseFile, setChoseFile] = React.useState([]);
  const [ressourcesTypeId, setRessourcesTypeId] = React.useState('');

  const handleChangeNom = (e) => {
    setNom(e.target.value);
  };

  const handleChangeRessourcesType = (e) => {
    setRessourcesTypeId(e.target.value);
  };

  const handleForm = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('nom', nom);
    formData.append('ressources_type_id', ressourcesTypeId);
    formData.append('ressourcesImages', choseFile);
    try {
      await axios.post('/resources/res', formData);
    } catch (er) {}
  };

  return (
    <div className="form-add-ressources">
      <form
        className="bouton"
        onSubmit={handleForm}
        encType="multipart/form-data"
        method="post"
      >
        <div>
          <label htmlFor="nom">Nom du fichier : </label>
          <input id="nom" type="text" value={nom} onChange={handleChangeNom} />
        </div>

        <div>
          <label htmlFor="file">Choisir un fichier : </label>

          <input
            type="file"
            id="file"
            name="file"
            accept="image/png, image/jpeg"
            onChange={(event) => {
              setChoseFile(event.target.files[0]);
            }}
          />
        </div>

        <div>
          <label htmlFor="ressourcesTypeId">Type de fichier:</label>
          <select
            className="type-ressource"
            onChange={handleChangeRessourcesType}
            value={ressourcesTypeId}
          >
            <option value="1">Logo - 1</option>
            <option value="2">Fichier - 2</option>
            <option value="3">Divers - 3</option>
          </select>
        </div>

        <input className="btn" type="submit" value="Envoyer" />
      </form>
    </div>
  );
};

export default AddRessources;
