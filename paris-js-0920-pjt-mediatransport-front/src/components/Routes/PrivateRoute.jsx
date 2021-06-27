import { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import Axios from "axios";
import PropTypes from "prop-types";

Axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    config.headers.authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [logged, setLogged] = useState(true);

  useEffect(() => {
    const getLogStatus = async () => {
      try {
        await Axios.get("/adminuser/log");
        setLogged(true);
      } catch (err) {
        setLogged(false);
      }
    };
    getLogStatus();
  }, []);

  return (
    <div className="private-all">
      <Route
        {...rest}
        render={(props) =>
          logged ? <Component {...props} /> : <Redirect to="/" />
        }
      />
    </div>
  );
};

export default PrivateRoute;

PrivateRoute.propTypes = {
  component: PropTypes.func,
  path: PropTypes.string,
};
