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

export { createBankAccountValidation };
