import Joi from "joi";

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

const loginUserValidation = Joi.object({
  email: Joi.string().email().max(100).required(),
  password: Joi.string().min(6).max(100).required(),
});

const getUserValidation = Joi.string().email().max(100).required();

const updateUserValidation = Joi.object({
  id: Joi.string().max(100).required(),
  email: Joi.string().email().max(100).required(),
  nama: Joi.string().max(100).optional(),
  telp: Joi.string()
    .max(100)
    .optional()
    .custom(isNumericString, "custom validation"),
  password: Joi.string().min(6).max(100).optional(),
}).messages({
  "string.numeric": "{{#label}} must only contain numeric characters",
});

export {
  registerUserValidation,
  loginUserValidation,
  getUserValidation,
  updateUserValidation,
};
