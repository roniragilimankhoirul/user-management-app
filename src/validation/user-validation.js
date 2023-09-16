import Joi from "joi";
import { isNumericString } from "../helper/validationHelper.js";
const telpErr = {
  "string.numeric": "telp must only contain numeric characters",
};

const registerUserValidation = Joi.object({
  nama: Joi.string().max(100).required(),
  email: Joi.string().email().max(100).required(),
  telp: Joi.string()
    .max(100)
    .required()
    .custom(isNumericString, "custom validation")
    .messages(telpErr),
  password: Joi.string().min(6).max(100).required(),
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
    .custom(isNumericString, "custom validation")
    .messages(telpErr),
  password: Joi.string().min(6).max(100).optional(),
});

const deleteUserValidation = Joi.object({
  id: Joi.string().max(100).required(),
  email: Joi.string().email().max(100).required(),
});

export {
  registerUserValidation,
  loginUserValidation,
  getUserValidation,
  updateUserValidation,
  deleteUserValidation,
};
