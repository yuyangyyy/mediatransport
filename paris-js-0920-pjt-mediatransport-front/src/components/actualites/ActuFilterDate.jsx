import { useState } from "react";
import PropTypes from "prop-types";

import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css";

const ActuFilterDate = ({ date }) => {
  const [value, onChange] = useState(new Date());
  const setFilterDate = date[1];

  const setDate = (value) => {
    let userDateChoice = value.toLocaleDateString();
    userDateChoice = userDateChoice.split("/").slice(1).join("-");
    setFilterDate(userDateChoice);
    onChange(value);
  };

  return (
    <div className="date-filterbloc">
      <Calendar onClickMonth={setDate} value={value} view="year" />
    </div>
  );
};

export default ActuFilterDate;

ActuFilterDate.propTypes = {
  box: PropTypes.array,
  date: PropTypes.array,
};
