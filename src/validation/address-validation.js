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
const updateAddressValidation = Joi.object({
  id: Joi.string().max(100).required(),
  email: Joi.string().max(100).email().required(),
  desa: Joi.string().max(100).optional(),
  kecamatan: Joi.string().max(100).optional(),
  kota: Joi.string().max(100).optional(),
  provinsi: Joi.string().max(100).optional(),
  kode_pos: Joi.string()
    .max(20)
    .custom(isNumericString)
    .optional()
    .messages(zipErr),
});

export {
  createAddressValidation,
  getAddressValidation,
  updateAddressValidation,
};
