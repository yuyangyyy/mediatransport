import { useRouteMatch, Route, Switch } from "react-router-dom";
import AdminItemsFetcher from "../AdminItemsFetcher";
import AutoPubBtn from "./AutoPubBtn";
import AdminEditPa from "./Edit/AdminEditPa";

const AdminPa = () => {
  const match = useRouteMatch();
  return (
    <div className="admin-actu-all">
      <div className="admin-actu-wrapper">
        <div className="admin-actu-container">
          <div className="admin-actu-topbar"></div>
          <div className="admin-actu-content">
            <Switch>
              <Route exact path={match.url + "/"}>
                <AutoPubBtn />
                <AdminItemsFetcher type="pannonces" putPath="ann" />
              </Route>
              <Route path={match.url + "/:id"} component={AdminEditPa} />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPa;
