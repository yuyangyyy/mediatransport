import PropTypes from "prop-types";

import useRequest from "../../customHooks/useRequest";

const ActuFilterRub = ({ box }) => {
  const rubriques = useRequest("get", "/tag");
  const setCheckBox = box[1];

  const checkHandler = (e) => {
    setCheckBox(e.target.value);
  };

  return (
    <div className="date-filterrub">
      <select onChange={checkHandler}>
        {rubriques.data.map((rub) => {
          return (
            <option value={rub.id} key={rub.id}>
              {rub.nom}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default ActuFilterRub;

ActuFilterRub.propTypes = {
  box: PropTypes.array,
};
