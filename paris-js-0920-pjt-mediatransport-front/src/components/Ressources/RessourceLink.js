import PropTypes from 'prop-types';
import './RessourceLink.css';
import { Link } from 'react-router-dom';

const RessourceLink = (props) => {
  return (
    <div className="ressource-link">
      <Link to={props.href}>{props.label}</Link>
    </div>
  );
};

export default RessourceLink;

RessourceLink.propTypes = {
  href: PropTypes.string,
  label: PropTypes.string,
};
