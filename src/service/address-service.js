import { validate } from "../validation/validation.js";
import {
  createAddressValidation,
  getAddressValidation,
  updateAddressValidation,
} from "../validation/address-validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";

const create = async (user, request) => {
  request = validate(createAddressValidation, request);
  const userInDatabase = await prismaClient.user.findUnique({
    where: {
      email: user.email,
    },
  });

  if (!userInDatabase) {
    throw new ResponseError(404, "User Not Found");
  }

  const addressInDatabase = await prismaClient.alamat.findUnique({
    where: {
      user_id: userInDatabase.id,
    },
  });

  if (addressInDatabase) {
    throw new ResponseError(409, "User Address already exist");
  }

  request.user_id = userInDatabase.id;

  return prismaClient.alamat.create({
    data: request,
  });
};

const get = async (request) => {
  request = validate(getAddressValidation, request);
  const userInDatabase = await prismaClient.user.findUnique({
    where: {
      email: request,
    },
  });
  if (!userInDatabase) {
    throw new ResponseError(404, "User Not Found");
  }
  const addressInDatabase = await prismaClient.alamat.findUnique({
    where: {
      user_id: userInDatabase.id,
    },
  });
  if (!addressInDatabase) {
    throw new ResponseError(404, "Address Not Found");
  }

  return addressInDatabase;
};

const update = async (request) => {
  request = validate(updateAddressValidation, request);
  const userInDatabase = await prismaClient.user.findUnique({
    where: {
      email: request.email,
    },
  });
  if (!userInDatabase) {
    throw new ResponseError(404, "User not Found");
  }
  const addressInDatabase = await prismaClient.alamat.findUnique({
    where: {
      id: request.id,
    },
  });
  if (!addressInDatabase) {
    throw new ResponseError(404, "Address not Found");
  }
  const data = {};
  if (request.desa) {
    data.desa = request.desa;
  }
  if (request.kecamatan) {
    data.kecamatan = request.kecamatan;
  }
  if (request.kota) {
    data.kota = request.kota;
  }
  if (request.provinsi) {
    data.provinsi = request.provinsi;
  }
  if (request.kode_pos) {
    data.kode_pos = request.kode_pos;
  }
  return prismaClient.alamat.update({
    where: {
      id: addressInDatabase.id,
    },
    data: data,
  });
};

export default {
  create,
  get,
  update,
};
