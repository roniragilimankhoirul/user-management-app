import {
  createAddress,
  createUser,
  removeAddress,
  removeCreatedUser,
} from "./test-util.js";
import "dotenv/config";
import jwt from "jsonwebtoken";
import supertest from "supertest";
import { app } from "../src/application/app.js";

describe("POST /api/address", () => {
  let userId;
  beforeEach(async () => {
    userId = await createUser();
  });

  afterEach(async () => {
    await removeAddress(userId);
    await removeCreatedUser();
  });

  it("should success create new user address", async () => {
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({ email: "test@test.com" }, secret, {
      expiresIn: "7d",
    });

    const result = await supertest(app)
      .post(`/api/address`)
      .set("Authorization", token)
      .send({
        desa: "test",
        kecamatan: "test",
        kota: "test",
        provinsi: "test",
        kode_pos: "0000",
      });
    expect(result.status).toBe(200);
  });

  it("should reject beacuse invalid request", async () => {
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({ email: "test@test.com" }, secret, {
      expiresIn: "7d",
    });

    const result = await supertest(app)
      .post(`/api/address`)
      .set("Authorization", token)
      .send({
        desa: "",
        kecamatan: "",
        kota: "",
        provinsi: "",
        kode_pos: "",
      });
    expect(result.status).toBe(400);
  });

  it("should reject request because address already exist", async () => {
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({ email: "test@test.com" }, secret, {
      expiresIn: "7d",
    });

    let result = await supertest(app)
      .post(`/api/address`)
      .set("Authorization", token)
      .send({
        desa: "test",
        kecamatan: "test",
        kota: "test",
        provinsi: "test",
        kode_pos: "0000",
      });

    result = await supertest(app)
      .post(`/api/address`)
      .set("Authorization", token)
      .send({
        desa: "test",
        kecamatan: "test",
        kota: "test",
        provinsi: "test",
        kode_pos: "0000",
      });
    expect(result.status).toBe(409);
  });
  it("should reject request because of user not found", async () => {
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({ email: "test@tesdt.com" }, secret, {
      expiresIn: "7d",
    });

    const result = await supertest(app)
      .post(`/api/address`)
      .set("Authorization", token)
      .send({
        desa: "test",
        kecamatan: "test",
        kota: "test",
        provinsi: "test",
        kode_pos: "0000",
      });
    expect(result.status).toBe(404);
  });
});

describe("GET /api/address", () => {
  let userId;
  beforeEach(async () => {
    userId = await createUser();
    await createAddress(userId);
  });

  afterEach(async () => {
    await removeAddress(userId);
    await removeCreatedUser();
  });
  it("should success get user address", async () => {
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({ email: "test@test.com" }, secret, {
      expiresIn: "7d",
    });

    const result = await supertest(app)
      .get(`/api/address`)
      .set("Authorization", token);
    expect(result.status).toBe(200);
  });

  it("should return error user not found", async () => {
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({ email: "tet@test.com" }, secret, {
      expiresIn: "7d",
    });

    const result = await supertest(app)
      .get(`/api/address`)
      .set("Authorization", token);
    expect(result.status).toBe(404);
  });

  it("should return error alamat not found", async () => {
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({ email: "test@test.com" }, secret, {
      expiresIn: "7d",
    });
    await removeAddress(userId);
    const result = await supertest(app)
      .get(`/api/address`)
      .set("Authorization", token);
    expect(result.status).toBe(404);
  });
});

describe("PUT /api/address/:id", () => {
  let userId;
  let addressId;
  beforeEach(async () => {
    userId = await createUser();
    addressId = await createAddress(userId);
  });

  afterEach(async () => {
    await removeAddress(userId);
    await removeCreatedUser();
  });
  it("should success update user address", async () => {
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({ email: "test@test.com" }, secret, {
      expiresIn: "7d",
    });

    const result = await supertest(app)
      .put(`/api/address/${addressId}`)
      .set("Authorization", token)
      .send({
        desa: "Gondang",
        kecamatan: "Tulungagung",
        provinsi: "Jawa Barat",
        kota: "Malang",
        kode_pos: "334243",
      });
    expect(result.status).toBe(200);
    expect(result.body.message).toBe("User Address updated Successfully");
  });
  it("should error invalid request", async () => {
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({ email: "test@test.com" }, secret, {
      expiresIn: "7d",
    });

    const result = await supertest(app)
      .put(`/api/address/${addressId}`)
      .set("Authorization", token)
      .send({
        desa: 1212,
        kecamatan: 212121,
        provinsi: 212121,
        kota: 21212,
        kode_pos: "dsasda",
      });
    expect(result.status).toBe(400);
  });

  it("should error because user not found", async () => {
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({ email: "test@tst.com" }, secret, {
      expiresIn: "7d",
    });

    const result = await supertest(app)
      .put(`/api/address/${addressId}`)
      .set("Authorization", token);
    expect(result.status).toBe(404);
  });
  it("should error because user not found", async () => {
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({ email: "test@test.com" }, secret, {
      expiresIn: "7d",
    });
    await removeAddress(userId);
    const result = await supertest(app)
      .put(`/api/address/${addressId}`)
      .set("Authorization", token);
    expect(result.status).toBe(404);
  });
});

describe("DELETE /api/address/:id", () => {
  let userId;
  let addressId;
  beforeEach(async () => {
    userId = await createUser();
    addressId = await createAddress(userId);
  });

  afterEach(async () => {
    await removeAddress(userId);
    await removeCreatedUser();
  });
  it("should success delete user address", async () => {
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({ email: "test@test.com" }, secret, {
      expiresIn: "7d",
    });

    const result = await supertest(app)
      .delete(`/api/address/${addressId}`)
      .set("Authorization", token);
    expect(result.status).toBe(200);
  });

  it("should error because user not found", async () => {
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({ email: "est@test.com" }, secret, {
      expiresIn: "7d",
    });

    const result = await supertest(app)
      .delete(`/api/address/${addressId}`)
      .set("Authorization", token);
    expect(result.status).toBe(404);
  });

  it("should error because address not found", async () => {
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({ email: "test@test.com" }, secret, {
      expiresIn: "7d",
    });
    const result = await supertest(app)
      .delete(`/api/address/${addressId}c`)
      .set("Authorization", token);
    expect(result.status).toBe(404);
  });
});
