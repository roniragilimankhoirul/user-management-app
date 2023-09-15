import { prismaClient } from "../src/application/database.js";
import bcrypt from "bcrypt";

export const removeCreatedUser = async () => {
  await prismaClient.user.deleteMany({
    where: {
      email: "test@test.com",
    },
  });
};

export const createUser = async () => {
  const user = await prismaClient.user.create({
    data: {
      nama: "test",
      email: "test@test.com",
      telp: "082334738728",
      password: await bcrypt.hash("testtest", 10),
    },
  });
  return user.id;
};
