import { Link, Route, Switch, useRouteMatch } from "react-router-dom";

import AdminItemsFetcher from "../AdminItemsFetcher";
import AdminAddActualites from "./Add/AdminAddActualites";
import AdminEditActu from "./Edit/AdminEditActu";

import "./AdminActualites.css";

const AdminActualites = () => {
  const match = useRouteMatch();

  return (
    <div className="admin-actu-all">
      <div className="admin-actu-wrapper">
        <div className="admin-actu-choices">
          <Link to={match.url + "/editactu"}>
            <input type="button" value="Editer les articles" />
          </Link>
          <Link to={match.url + "/addactu"}>
            <input type="button" value="Ajouter un article" />
          </Link>
        </div>
        <div className="admin-actu-container">
          <div className="admin-actu-topbar"></div>
          <div className="admin-actu-content">
            <Switch>
              <Route exact path={match.url + "/editactu"}>
                <AdminItemsFetcher type="actualites" putPath="act" />
              </Route>
              <Route
                path={match.url + "/addactu"}
                component={AdminAddActualites}
              />
              <Route
                path={match.url + "/editactu/:id"}
                component={AdminEditActu}
              />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminActualites;
