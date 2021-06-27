import { Switch, Route, Redirect } from "react-router-dom";
import Contact from "../Contact/Compocontact";
import Pannonces from "../petites_annonces/Pannonces";
import Ressources from "../Ressources/Comporessources";
import Actualite from "../actualites/Actualite";
import ActualiteSolo from "../actualites/ActualiteSolo";
import Admin from "../Admin/Admin";
import AdminLog from "../Admin/AdminLog";
import PrivateRoute from "../Routes/PrivateRoute";
import Accueil from "../Accueil/Accueil";

const Routes = () => {
  return (
    <div className="content">
      <Switch>
        <Route exact path="/" component={Accueil} />
        <Route path="/actualites" component={Actualite} />
        <Route path="/actualite/:id" component={ActualiteSolo} />
        <Route path="/annonces" component={Pannonces} />
        <Route path="/ressources" component={Ressources} />
        <Route path="/contacts" component={Contact} />
        <Route path="/adminlog" component={AdminLog} />
        <PrivateRoute path="/admin" component={Admin} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
};

export default Routes;
