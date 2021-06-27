const isMinSize = (value, size) => {
  return value.length >= size === true;
};

const onlyLetter = (text) => {
  return /^[A-Za-z\s]+$/.test(text);
};

const validator = { isMinSize, onlyLetter };

export default validator;
