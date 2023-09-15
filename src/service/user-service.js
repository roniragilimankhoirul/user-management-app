import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import {
  getUserValidation,
  loginUserValidation,
  registerUserValidation,
  updateUserValidation,
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
  const token = jwt.sign(
    {
      email: userInDatabase.email,
    },
    secret,
    {
      expiresIn: "7d",
    }
  );
  return token;
};

const get = async (user) => {
  user = validate(getUserValidation, user);
  const userInDatabase = await prismaClient.user.findUnique({
    where: {
      email: user,
    },
  });

  if (!userInDatabase) {
    throw new ResponseError(404, "User Not Found");
  }
  return userInDatabase;
};

const update = async (request) => {
  request = validate(updateUserValidation, request);
  const userInDatabase = await prismaClient.user.findUnique({
    where: {
      email: request.email,
    },
  });
  if (!userInDatabase) {
    throw new ResponseError(404, "User not Found");
  }
  const data = {};
  if (request.nama) {
    data.nama = request.nama;
  }
  if (request.password) {
    data.password = await bcrypt.hash(request.password, 10);
  }

  if (request.telp) {
    data.telp = request.telp;
  }
  return prismaClient.user.update({
    where: {
      email: userInDatabase.email,
    },
    data: data,
  });
};

export default {
  register,
  login,
  get,
  update,
};
