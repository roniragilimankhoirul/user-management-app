import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import {
  loginUserValidation,
  registerUserValidation,
} from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

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

const login = async (request) => {
  request = validate(loginUserValidation, request);
  const userInDatabase = await prismaClient.user.findUnique({
    where: {
      email: request.email,
    },
  });

  if (!userInDatabase) {
    throw new ResponseError(
      401,
      "The email address or password is incorrect. Please retry..."
    );
  }

  const isPasswordValid = await bcrypt.compare(
    request.password,
    userInDatabase.password
  );

  if (!isPasswordValid) {
    throw new ResponseError(
      401,
      "The email address or password is incorrect. Please retry..."
    );
  }

  const secret = process.env.JWT_SECRET;
  const token = jwt.sign({ userInDatabase }, secret, { expiresIn: "7d" });
  await prismaClient.user.findUnique({
    where: {
      email: userInDatabase.email,
    },
  });
  return token;
};

export default {
  register,
  login,
};
