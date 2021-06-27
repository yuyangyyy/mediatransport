import { useState } from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import useRequest from "../../customHooks/useRequest";

import Postannonce from "./Postannonce";
import PannCard from "./PannCard";
import PannonceSolo from "./PannonceSolo";
import Pagination from "../Pagination/Pagination";
import SelectPagination from "../Pagination/SelectPagination";

import "./Pannonces.css";

const Pannonces = (props) => {
  const selectOption = [5, 10, 15];
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(selectOption[0]);
  const [refetch, setRefetch] = useState(false);
  const { data } = useRequest(
    "get",
    `pannonces?page=${page}&limit=${limit}&publie=1`,
    refetch
  );

  return (
    <div className="annonces-container">
      <div className="annonces-wrapper">
        <div className="annonces-total-card">
          <h1>Petites Annonces</h1>
          <div className="annonces-card-container">
            <Route exact path="/annonces">
              <SelectPagination
                limitState={[limit, setLimit]}
                pageState={[page, setPage]}
                selectOption={selectOption}
              />
              {data.pannonces &&
                data.pannonces.map((annonce) => {
                  return <PannCard {...annonce} key={annonce.id} />;
                })}
              <Pagination
                maxLength={data.pageNbr}
                actualPage={[page, setPage]}
              />
            </Route>
            <Route path="/annonces/:id">
              <PannonceSolo
                pathName={props.location.pathname}
                refetcher={[refetch, setRefetch]}
              />
            </Route>
          </div>
        </div>
      </div>
      <Postannonce addAnn={[refetch, setRefetch]} />
    </div>
  );
};

export default Pannonces;

Pannonces.propTypes = {
  location: PropTypes.object,
};
