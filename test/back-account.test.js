import {
  createAddress,
  createUser,
  removeAddress,
  removeBankAccount,
  removeCreatedUser,
} from "./test-util.js";
import "dotenv/config";
import jwt from "jsonwebtoken";
import supertest from "supertest";
import { app } from "../src/application/app.js";

describe("POST /api/bank-accounts", () => {
  let userId;
  beforeEach(async () => {
    userId = await createUser();
  });

  afterEach(async () => {
    await removeBankAccount(userId);
    await removeCreatedUser();
  });

  it("should success create new user bank account", async () => {
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({ email: "test@test.com" }, secret, {
      expiresIn: "7d",
    });

    const result = await supertest(app)
      .post(`/api/bank-accounts`)
      .set("Authorization", token)
      .send({
        nama_bank: "MANDIRI",
        no_rekening: "352646346544",
        saldo: 50000,
      });
    expect(result.status).toBe(200);
  });

  it("should error invalid request", async () => {
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({ email: "test@test.com" }, secret, {
      expiresIn: "7d",
    });

    const result = await supertest(app)
      .post(`/api/bank-accounts`)
      .set("Authorization", token)
      .send({
        nama_bank: "",
        no_rekening: "",
        saldo: "",
      });
    expect(result.status).toBe(400);
  });

  it("should error because user not found", async () => {
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({ email: "tes@test.com" }, secret, {
      expiresIn: "7d",
    });

    const result = await supertest(app)
      .post(`/api/bank-accounts`)
      .set("Authorization", token)
      .send({
        nama_bank: "MANDIRI",
        no_rekening: "352646346544",
        saldo: 50000,
      });
    expect(result.status).toBe(404);
  });

  it("should error because bank account already exist", async () => {
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({ email: "test@test.com" }, secret, {
      expiresIn: "7d",
    });

    let result = await supertest(app)
      .post(`/api/bank-accounts`)
      .set("Authorization", token)
      .send({
        nama_bank: "MANDIRI",
        no_rekening: "352646346544",
        saldo: 50000,
      });
    result = await supertest(app)
      .post(`/api/bank-accounts`)
      .set("Authorization", token)
      .send({
        nama_bank: "MANDIRI",
        no_rekening: "352646346544",
        saldo: 50000,
      });
    expect(result.status).toBe(409);
  });
});
