import PropTypes from "prop-types";
import { Link, useRouteMatch } from "react-router-dom";

import axion from "../../modules/axion";

import "./ItemList.css";

const ItemList = ({ id, titre, refetcher, publie, type, putPath }) => {
  const [refetch, setRefetch] = refetcher;
  const match = useRouteMatch();

  const deleteItem = async () => {
    const fetchDelete = await axion("delete", `/${type}/` + id);
    if (fetchDelete === 209) {
      setRefetch(!refetch);
    }
  };

  const publish = async () => {
    await axion("put", `/${type}/${putPath}/` + id, { publie: 1 });   
    setRefetch(!refetch);
  };

  return (
    <div className="itemlist-all">
      <div className="itemlist-info">
        <h2>id</h2>
        <p>{id}</p>
        <h2>Titre</h2>
        <p> {titre}</p>
      </div>
      <div className="itemlist-button">
        {publie === 0 && (
          <input type="button" value="Publier" onClick={publish} />
        )}
        <Link to={match.url + "/" + id}>
          <input type="button" value="Editer" />
        </Link>
        <input type="button" value="Effacer" onClick={deleteItem} />
      </div>
    </div>
  );
};

export default ItemList;

ItemList.propTypes = {
  id: PropTypes.number,
  titre: PropTypes.string,
  type: PropTypes.string,
  refetcher: PropTypes.array,
  publie: PropTypes.number,
  putPath: PropTypes.string,
};
