import PropTypes from "prop-types";

import useRequest from "../../../../customHooks/useRequest";

const Tags = ({ id }) => {
  const tag = useRequest("get", "/tag/" + id);

  return <p>{tag.data.nom}</p>;
};

export default Tags;

Tags.propTypes = {
  id: PropTypes.string,
};
