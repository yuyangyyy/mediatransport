const AdminReducer = (state, action) => {
  switch (action.type) {
    case "succeed":
      return {
        ...state,
        refetch: !state.refetch,
        message: "Annonce Modifiée",
        modifiedImage: [],
      };
    case "fail":
      return {
        ...state,
        message: action.payload,
      };
    case "setImage":
      return {
        ...state,
        modifiedImage: action.payload,
        message: "",
      };
    case "handleInputs":
      return {
        ...state,
        [action.target]: action.payload,
        message: "",
      };
    case "setInputs":
      return {
        ...state,
        ...action.payload,
      };

    default:
      break;
  }
};

export default AdminReducer;
