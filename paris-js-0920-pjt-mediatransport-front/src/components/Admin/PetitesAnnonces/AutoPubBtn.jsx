import useRequest from "../../../customHooks/useRequest";
import Switch from "react-switch";
import { useEffect, useState } from "react";
import Axios from "axios";

const AutoPubBtn = () => {
  const [refetch, setRefetch] = useState(false);
  const autoPubValue = useRequest("get", "/autopub", refetch);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (autoPubValue.data[0]) {
      const btnValue = autoPubValue.data[0].pannonces === 1 && true;
      setChecked(btnValue);
    }
  }, [autoPubValue]);

  const changeAutoPub = async () => {
    try {
      await Axios.get("/autopub/update");
      setRefetch(!refetch);
    } catch (err) {}
  };

  return (
    <div style={{ display: "flex", alignItems: "center", margin: "0.5em" }}>
      <p style={{ marginRight: "10px" }}>Autopublication</p>
      <Switch checked={checked} onChange={changeAutoPub} />
    </div>
  );
};

export default AutoPubBtn;
