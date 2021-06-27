import { useState, useEffect } from 'react';
import axios from 'axios';
import RessourceDownloadIcon from '../RessourceDownloadIcon';
import './index.css';
import SelectPagination from '../../Pagination/SelectPagination';
import Pagination from '../../Pagination/Pagination';

const RessourcesFichiers = (props) => {
  const selectOption = [5, 10, 15];
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(selectOption[0]);
  const [ressources, setRessources] = useState([]);

  useEffect(() => {
    const fetchRessources = async () => {
      const result = await axios.get(
        `/resources/logos?&page=${page}&limit=${limit}&ressourceid=2`
      );
      setRessources(result.data);
    };
    fetchRessources();
  }, []);

  return (
    <div className="ressource-fichier">
      <SelectPagination
        limitState={[limit, setLimit]}
        pageState={[page, setPage]}
        selectOption={selectOption}
      />
      {ressources.data &&
        ressources.data.map((ressource) => (
          <div key={ressource.nom}>
            <div className="fichier-image">
              <img className="file_image" src="/file.png" />
            </div>
            <div className="fichier-description">{ressource.nom}</div>
            <RessourceDownloadIcon ressourceId={ressource.id} />
          </div>
        ))}
      <Pagination maxLength={ressources.pageNbr} actualPage={[page, setPage]} />
    </div>
  );
};

export default RessourcesFichiers;
