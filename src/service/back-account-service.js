import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { createBankAccountValidation } from "../validation/bank-account-validation.js";
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
export default { create };
