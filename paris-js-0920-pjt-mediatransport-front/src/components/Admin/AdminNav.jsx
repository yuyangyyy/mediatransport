import { Link, useRouteMatch, useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import "./AdminNav.css";

const AdminNav = () => {
  const match = useRouteMatch();
  const history = useHistory();

  const logOut = () => {
    localStorage.clear();
    history.push("/");
  };

  return (
    <nav className="adminnavbar-all">
      <ul>
        <Link to={match.url + "/actualites/editactu"}>
          <li>A la une</li>
        </Link>
        <Link to={match.url + "/pannonces"}>
          <li>Petites Annonces</li>
        </Link>
        <li onClick={logOut}>Se déconnecter</li>
      </ul>
    </nav>
  );
};

export default AdminNav;

AdminNav.propTypes = {
  match: PropTypes.object,
};
