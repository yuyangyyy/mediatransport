import { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';
import RessourceDownloadIcon from '../RessourceDownloadIcon';
import SelectPagination from '../../Pagination/SelectPagination';
import Pagination from '../../Pagination/Pagination';

const RessourcesLogos = (props) => {
  const selectOption = [5, 10, 15];
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(selectOption[0]);
  const [ressources, setRessources] = useState([]);

  useEffect(() => {
    const fetchRessources = async () => {
      const result = await axios.get(
        `/resources/logos?&page=${page}&limit=${limit}&ressourceid=1`
      );

      setRessources(result.data);
    };
    fetchRessources();
  }, [page, limit]);

  return (
    <div className="ressource-logo">
      <SelectPagination
        limitState={[limit, setLimit]}
        pageState={[page, setPage]}
        selectOption={selectOption}
      />
      {ressources.data &&
        ressources.data.map((ressource) => (
          <div key={ressource.nom}>
            <div>
              <img
                className="logo-image"
                src={`http://localhost:5000/${ressource.path}`}
              />
            </div>
            <div className="logo-description">{ressource.nom}</div>
            <RessourceDownloadIcon ressourceId={ressource.id} />
          </div>
        ))}
      <Pagination maxLength={ressources.pageNbr} actualPage={[page, setPage]} />
    </div>
  );
};

export default RessourcesLogos;
