export const isNumericString = (value, helpers) => {
  if (/^[0-9]+$/.test(value)) {
    return value;
  } else {
    return helpers.error("string.numeric");
  }
};
