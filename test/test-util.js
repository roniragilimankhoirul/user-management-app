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

export const removeAddress = async (userId) => {
  await prismaClient.alamat.deleteMany({
    where: {
      user_id: userId,
    },
  });
};

export const createAddress = async (userId) => {
  const address = await prismaClient.alamat.create({
    data: {
      desa: "test",
      kecamatan: "test",
      kota: "test",
      provinsi: "test",
      kode_pos: "test",
      user_id: userId,
    },
  });
  return address.id;
};

export const removeBankAccount = async (userId) => {
  await prismaClient.bank.deleteMany({
    where: {
      user_id: userId,
    },
  });
};

export const createBankAccount = async (userId) => {
  const bankAccount = await prismaClient.bank.create({
    data: {
      nama_bank: "BCA",
      no_rekening: "3526223465",
      saldo: 50000,
      user_id: userId,
    },
  });
  return bankAccount.id;
};
