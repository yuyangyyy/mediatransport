import { useState } from "react";
import PropTypes from "prop-types";

const HideShowButton = ({ children, name }) => {
  const [isDisplayed, setIsDisplayed] = useState(false);

  return (
    <div className="date-filterbloc">
      <div className="filter-showhide">
        <h2 onClick={() => setIsDisplayed(!isDisplayed)}>{name}</h2>
        <h2 style={{ transform: `rotate(${isDisplayed ? 90 : 0}deg)` }}>
          {">"}
        </h2>
      </div>
      {isDisplayed && children}
    </div>
  );
};

export default HideShowButton;

HideShowButton.propTypes = {
  children: PropTypes.object,
  name: PropTypes.string,
};
