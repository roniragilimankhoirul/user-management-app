import Joi from "joi";
import { isNumericString } from "../helper/validationHelper.js";
const zipErr = {
  "string.numeric": "kode pos must only contain numeric characters",
};

const createAddressValidation = Joi.object({
  desa: Joi.string().max(100).required(),
  kecamatan: Joi.string().max(100).required(),
  kota: Joi.string().max(100).required(),
  provinsi: Joi.string().max(100).required(),
  kode_pos: Joi.string()
    .max(20)
    .custom(isNumericString)
    .required()
    .messages(zipErr),
});

const getAddressValidation = Joi.string().max(100).email().required();

export { createAddressValidation, getAddressValidation };
