import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { registerUserValidation } from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";
import bcrypt from "bcrypt";

const register = async (request) => {
  const user = validate(registerUserValidation, request);

  const userInDatabase = await prismaClient.user.count({
    where: {
      OR: [
        {
          email: user.email,
        },
        {
          telp: user.telp,
        },
      ],
    },
  });

  if (userInDatabase === 1) {
    throw new ResponseError(
      400,
      "User with this email or telephone number already exists"
    );
  }

  user.password = await bcrypt.hash(user.password, 10);
  return prismaClient.user.create({
    data: user,
  });
};

export default {
  register,
};
