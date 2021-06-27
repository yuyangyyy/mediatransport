import { useState, useEffect } from 'react';
import SelectPagination from '../../Pagination/SelectPagination';
import Pagination from '../../Pagination/Pagination';
import axios from 'axios';
import './index.css';
import RessourceDownloadIcon from '../RessourceDownloadIcon';

const RessourcesDivers = (props) => {
  const selectOption = [5, 10, 15];
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(selectOption[0]);
  const [ressources, setRessources] = useState([]);
  const [picSrc, setPicSrc] = useState([]);

  useEffect(() => {
    const { data } = ressources;
    if (data) {
      const picturesSource = data.map((image) => {
        const mime = image.path.split('.')[1];
        const authorisedExt = ['jpg', 'jpeg', 'png'];
        if (authorisedExt.includes(mime)) {
          return '/' + image.path;
        } else {
          return '/file.png';
        }
      });
      setPicSrc([...picturesSource]);
    }
  }, [ressources]);

  useEffect(() => {
    const fetchRessources = async () => {
      const result = await axios.get(
        `/resources/logos?&page=${page}&limit=${limit}&ressourceid=3`
      );
      setRessources(result.data);
    };
    fetchRessources();
  }, [page, limit]);

  return (
    <div className="ressource-divers">
      <SelectPagination
        limitState={[limit, setLimit]}
        pageState={[page, setPage]}
        selectOption={selectOption}
      />
      {ressources.data &&
        ressources.data.map((ressource, index) => (
          <div key={ressource.nom}>
            <div>
              <img className="divers-image" src={picSrc[index]} />
            </div>
            <div className="logo-description">{ressource.nom}</div>

            <RessourceDownloadIcon ressourceId={ressource.id} />
          </div>
        ))}
      <Pagination maxLength={ressources.pageNbr} actualPage={[page, setPage]} />
    </div>
  );
};

export default RessourcesDivers;
