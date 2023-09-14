import Joi from "joi";

// Define a custom validation function for numeric strings
const isNumericString = (value, helpers) => {
  if (/^[0-9]+$/.test(value)) {
    return value;
  } else {
    return helpers.error("string.numeric");
  }
};

const registerUserValidation = Joi.object({
  nama: Joi.string().max(100).required(),
  email: Joi.string().email().max(100).required(),
  telp: Joi.string()
    .max(100)
    .required()
    .custom(isNumericString, "custom validation"),
  password: Joi.string().min(6).max(100).required(),
}).messages({
  "string.numeric": "{{#label}} must only contain numeric characters",
});

export { registerUserValidation };
