import { useEffect, useState } from "react";
import Axios from "axios";

const useRequest = (method, url, option) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let isSubscribe = true;
    const fetchData = async () => {
      try {
        const result = await Axios[method](url);
        if (isSubscribe) {
          setData(result.data);
        }
      } catch (err) {
        if (isSubscribe) {
          setError(err);
          setData([]);
        }
      }
    };

    if (isSubscribe) {
      fetchData();
    }

    return () => {
      isSubscribe = false;
    };
  }, [url, method, option]);

  return { data, error };
};

export default useRequest;
