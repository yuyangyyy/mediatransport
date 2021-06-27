import { useState } from "react";
import PropTypes from "prop-types";

import SelectPagination from "../Pagination/SelectPagination";
import Pagination from "../Pagination/Pagination";
import useRequest from "../../customHooks/useRequest";
import ItemList from "./ItemList";

const AdminItemsFetcher = ({ type, putPath }) => {
  const selectOption = [10, 20, 30];
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(selectOption[0]);
  const [refetch, setRefetch] = useState(false);
  const { data } = useRequest(
    "get",
    `/${type}?page=${page}&limit=${limit}`,
    refetch
  );

  return (
    <div>
      <SelectPagination
        limitState={[limit, setLimit]}
        pageState={[page, setPage]}
        selectOption={selectOption}
      />
      {data[type] &&
        data[type].map((item) => {
          return (
            <ItemList
              {...item}
              key={item.id}
              refetcher={[refetch, setRefetch]}
              type={type}
              putPath={putPath}
            />
          );
        })}
      <Pagination maxLength={data.pageNbr} actualPage={[page, setPage]} />
    </div>
  );
};

export default AdminItemsFetcher;

AdminItemsFetcher.propTypes = {
  type: PropTypes.string,
  putPath: PropTypes.string,
};
