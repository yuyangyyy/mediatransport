import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";

import "./AdminLog.css";

const inputsInit = [
  {
    name: "Login",
    value: "",
  },
  {
    name: "Password",
    value: "",
  },
];

const AdminLog = () => {
  const [inputs, setInputs] = useState(inputsInit);
  const [error, setError] = useState({
    Login: "",
    Password: "",
    mysql: "",
  });
  const history = useHistory();

  const inputHandler = (e) => {
    setError(inputsInit);
    const tempValue = [...inputs];
    tempValue[e.target.id].value = e.target.value;
    setInputs(tempValue);
  };

  const sendLog = async () => {
    const adminU = {
      login: inputs[0].value,
      password: inputs[1].value,
    };

    try {
      const token = await Axios.post("/adminuser", adminU);
      localStorage.setItem("token", token.data.accessToken);
      history.push("/admin");
    } catch (err) {
      if (err.response) {
        let fullError = {};

        if (err.response.data.login) {
          fullError = { ...fullError, Login: err.response.data.login };
        }

        if (err.response.data.password) {
          fullError = { ...fullError, Password: err.response.data.password };
        }

        if (!err.response.data.password && !err.response.data.login) {
          fullError = { ...fullError, mysql: err.response.data };
        }
        setError(fullError);
      }
    }
  };

  useEffect(() => {
    const getLogStatus = async () => {
      try {
        await Axios.get("/adminuser/log");
        history.push("/admin");
      } catch (err) {}
    };
    getLogStatus();
  }, []);

  return (
    <div className="admin-log-all">
      <h2>Administrateur</h2>
      <div className="admin-log-form">
        {inputs.map((input, index) => {
          return (
            <div className="admin-log-inputs" key={index}>
              <h3>{input.name}</h3>
              <input
                id={index}
                type="text"
                value={input.value}
                onChange={inputHandler}
              />
              <p style={{ color: "red", margin: "5px" }}>{error[input.name]}</p>
            </div>
          );
        })}
        <input type="button" value="envoyer" onClick={sendLog} />
        <p style={{ color: "red", margin: "5px" }}>{error.mysql}</p>
      </div>
    </div>
  );
};

export default AdminLog;
