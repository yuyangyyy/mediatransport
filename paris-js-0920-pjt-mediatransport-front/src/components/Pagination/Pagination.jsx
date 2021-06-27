import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import "./Pagination.css";

const positionInit = {
  start: 0,
  end: 3,
};

const Pagination = ({ maxLength, actualPage }) => {
  const [page, setPage] = actualPage;
  const [postion, setPosition] = useState(positionInit);
  const [pagination, setPagination] = useState([]);

  useEffect(() => {
    if (page <= postion.start) {
      setPosition({ start: page - 3, end: page });
    } else if (page > postion.end) {
      setPosition({ start: page - 1, end: page + 2 });
    } else if (page === 1) {
      setPosition(positionInit);
    }
    setPagination(setInputs().slice(postion.start, postion.end));
  }, [maxLength, postion, page]);

  const handlePage = (e) => {
    if (e.target.name === "previous") {
      if (page > 1) {
        setPage(page - 1);
      }
    } else {
      if (page < maxLength) {
        setPage(page + 1);
      }
    }
  };

  const setInputs = () => {
    const inputsLength = [];
    for (let index = 0; index < maxLength; index++) {
      inputsLength.push(index);
    }
    return inputsLength;
  };

  const changePage = (e) => {
    const futurPage = parseInt(e.target.value);
    setPage(futurPage);
  };

  return (
    <div className="pagination-all">
      {maxLength > 3 && (
        <input
          type="button"
          name="previous"
          value="precendent"
          onClick={handlePage}
          className="pagination-arrow"
        />
      )}
      {pagination.map((item) => {
        return (
          <input
            type="button"
            className="pagination-index-selector"
            value={item + 1}
            key={item}
            style={{ backgroundColor: `${item + 1 === page ? "#0064d4" : ""}` }}
            onClick={changePage}
          />
        );
      })}
      {maxLength > 3 && (
        <input
          type="button"
          name="follow"
          value="suivant"
          onClick={handlePage}
          className="pagination-arrow"
        />
      )}
    </div>
  );
};

export default Pagination;

Pagination.propTypes = {
  maxLength: PropTypes.number,
  actualPage: PropTypes.array,
};
