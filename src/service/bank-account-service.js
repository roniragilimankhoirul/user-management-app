import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import {
  createBankAccountValidation,
  getBankAccountValidation,
} from "../validation/bank-account-validation.js";
import { validate } from "../validation/validation.js";

const create = async (user, request) => {
  request = validate(createBankAccountValidation, request);
  const userInDatabase = await prismaClient.user.findUnique({
    where: {
      email: user.email,
    },
  });
  if (!userInDatabase) {
    throw new ResponseError(404, "User Not Found");
  }

  const bankAccountInDatabase = await prismaClient.bank.findUnique({
    where: {
      no_rekening: request.no_rekening,
    },
  });

  if (bankAccountInDatabase) {
    throw new ResponseError(409, "User back account already exist");
  }
  request.user_id = userInDatabase.id;
  return prismaClient.bank.create({
    data: request,
  });
};

const get = async (user) => {
  user = validate(getBankAccountValidation, user);
  const userInDatabase = await prismaClient.user.findUnique({
    where: {
      email: user,
    },
  });
  if (!userInDatabase) {
    throw new ResponseError(404, "User Not Found");
  }
  const bankAccountInDatabase = await prismaClient.bank.findMany({
    where: {
      user_id: userInDatabase.id,
    },
  });
  if (bankAccountInDatabase.length === 0) {
    throw new ResponseError(404, "User Bank Account Not Found");
  }

  return bankAccountInDatabase;
};
export default { create, get };