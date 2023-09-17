import Joi from "joi";

import { isNumericString } from "../helper/validationHelper.js";
const noRekErr = {
  "string.numeric": "no_rekening must only contain numeric characters",
};

const NamaBank = ["BCA", "BNI", "BRI", "MANDIRI"];

const createBankAccountValidation = Joi.object({
  nama_bank: Joi.string()
    .valid(...NamaBank)
    .required(),
  no_rekening: Joi.string()
    .max(20)
    .custom(isNumericString)
    .required()
    .messages(noRekErr),
  saldo: Joi.number().required(),
});

const getBankAccountValidation = Joi.string().max(100).email().required();
const getBankAccountValidationById = Joi.object({
  email: Joi.string().max(100).email().required(),
  id: Joi.string().max(100).required(),
});

const updateBankAccountValidation = Joi.object({
  email: Joi.string().max(100).email().required(),
  id: Joi.string().max(100).required(),
  saldo: Joi.number().required(),
});

const deleteBankAccountValidation = Joi.object({
  email: Joi.string().max(100).email().required(),
  id: Joi.string().max(100).required(),
});

export {
  createBankAccountValidation,
  getBankAccountValidation,
  getBankAccountValidationById,
  updateBankAccountValidation,
  deleteBankAccountValidation,
};
