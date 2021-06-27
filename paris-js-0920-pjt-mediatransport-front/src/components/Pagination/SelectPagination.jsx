import { useState } from "react";
import PropTypes from "prop-types";
import './SelectPagination.css'

const SelectPagination = ({ limitState, pageState, selectOption }) => {
    
  const [select, setSelect] = useState("");
  const setLimit = limitState[1];
  const setPage = pageState[1];

  return (
    <div className="select-pagination-selectnumber">
      <p>Nombre d articles par page</p>
      <select
        value={select}
        onChange={(e) => {
          setSelect(e.target.value);
          setLimit(e.target.value);
          setPage(1);
        }}
      >
        {selectOption.map((option) => {
          return (
            <option key={option} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectPagination;

SelectPagination.propTypes = {
  limitState: PropTypes.array,
  pageState: PropTypes.array,
  selectOption: PropTypes.array,
};
