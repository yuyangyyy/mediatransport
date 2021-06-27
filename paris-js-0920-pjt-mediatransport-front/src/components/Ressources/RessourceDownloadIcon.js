import PropTypes from 'prop-types';
import './RessourceDownloadIcon.css';

const RessourceDownloadIcon = (props) => {
  const link = `http://localhost:5000/resources/download/${props.ressourceId}`;

  return (
    <a href={link}>
      <img className="RessourceDownloadIcon" src="/download.png" />
    </a>
  );
};

export default RessourceDownloadIcon;

RessourceDownloadIcon.propTypes = {
  ressourceId: PropTypes.number,
};
