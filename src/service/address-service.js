import { validate } from "../validation/validation.js";
import {
  createAddressValidation,
  getAddressValidation,
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
    throw new ResponseError(409, "User Alamat already exist");
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

export default {
  create,
  get,
};
