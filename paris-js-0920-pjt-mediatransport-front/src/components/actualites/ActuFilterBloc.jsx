import PropTypes from "prop-types";

import ActuFilterRub from "./ActuFilterRub";
import ActuFilterDate from "./ActuFilterDate";
import HideShowButton from "./HideShowButton";

const ActuFilterBloc = ({ box, date }) => {
  const setCheckBox = box[1];
  const setFilterDate = date[1];
  return (
    <div className="annonces-post-wrapper">
      <h1>
        Filtrer les actualités
        <source />
      </h1>
      <div className="annonces-post-container">
        <div className="filter-all">
          <HideShowButton name="Rubrique">
            <ActuFilterRub box={box} />
          </HideShowButton>
          <HideShowButton name="Date">
            <ActuFilterDate date={date} />
          </HideShowButton>
          <input
            type="button"
            value="Reset"
            onClick={() => {
              setFilterDate("");
              setCheckBox([]);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ActuFilterBloc;

ActuFilterBloc.propTypes = {
  box: PropTypes.array,
  date: PropTypes.array,
};
