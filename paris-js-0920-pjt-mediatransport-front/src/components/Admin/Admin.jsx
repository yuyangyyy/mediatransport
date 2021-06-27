import { Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";

import AdminNav from "./AdminNav";
import AdminActualite from "./Actualites/AdminActualites";
import AdminPa from "./PetitesAnnonces/AdminPa";

import "./Admin.css";

const Admin = ({ match }) => {
  return (
    <div className="adminmain-all">
      <AdminNav />
      <Switch>
        <Route path={match.url + "/actualites"} component={AdminActualite} />
        <Route path={match.url + "/pannonces"} component={AdminPa} />
      </Switch>
    </div>
  );
};

export default Admin;

Admin.propTypes = {
  match: PropTypes.object,
};
