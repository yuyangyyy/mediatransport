import { useEffect, useState } from "react";

import useRequest from "../../customHooks/useRequest";
import ActuCard from "./ActuCard";
import Pagination from "../Pagination/Pagination";
import SelectPagination from "../Pagination/SelectPagination";
import ActuFilterBloc from "./ActuFilterBloc";

import "./Actualite.css";

const Actualite = () => {
  const selectOption = [5, 10, 15];
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(selectOption[0]);
  const [checkBox, setCheckBox] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const { data, error } = useRequest(
    "get",
    `actualites?page=${page}&limit=${limit}&publie=1${
      checkBox ? "&tag_id=" + checkBox : ""
    }${filterDate ? "&date=" + filterDate : ""}`
  );

  useEffect(() => {
    error.response && console.error(error.response.data);
  }, [error]);

  useEffect(() => {
    setPage(1);
  }, [checkBox, filterDate]);

  return (
    <div>
      <div className="actu-container">
        <div className="actu-wrapper">
          <div className="actu-total-card">
            <h1>Actualites</h1>
            <div className="actu-card-container">
              <SelectPagination
                limitState={[limit, setLimit]}
                pageState={[page, setPage]}
                selectOption={selectOption}
              />
              <div className="actu-articles-all">
                {data.actualites &&
                  data.actualites.map((actu) => {
                    return <ActuCard {...actu} key={actu.id} />;
                  })}
              </div>
              <div className="actu-page-selector">
                <Pagination
                  maxLength={data.pageNbr}
                  actualPage={[page, setPage]}
                />
              </div>
            </div>
          </div>
        </div>
        <ActuFilterBloc
          box={[checkBox, setCheckBox]}
          date={[filterDate, setFilterDate]}
          setPage={setPage}
        />
      </div>
    </div>
  );
};

export default Actualite;
