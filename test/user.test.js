import supertest from "supertest";
import { app } from "../src/application/app.js";
import { createUser, removeCreatedUser } from "./test-util.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

describe("POST /api/users", () => {
  afterEach(async () => {
    await removeCreatedUser();
  });
  it("should succes register new user", async () => {
    const result = await supertest(app).post("/api/users").send({
      nama: "test",
      email: "test@test.com",
      telp: "082334738728",
      password: "testtest",
    });
    expect(result.status).toBe(200);
  });

  test("should error because invalid request", async () => {
    const result = await supertest(app).post("/api/users").send({
      nama: "",
      email: "",
      telp: "",
      password: "",
    });
    expect(result.status).toBe(400);
  });

  test("should error because already existing user", async () => {
    let result = await supertest(app).post("/api/users").send({
      nama: "test",
      email: "test@test.com",
      telp: "082334738728",
      password: "testtest",
    });

    result = await supertest(app).post("/api/users").send({
      nama: "test",
      email: "test@test.com",
      telp: "082334738728",
      password: "testtest",
    });
    expect(result.status).toBe(400);
  });

  it("should reject register because of not numeric in telp", async () => {
    const result = await supertest(app).post("/api/users").send({
      nama: "test",
      email: "test@test.com",
      telp: "test",
      password: "testtest",
    });

    expect(result.status).toBe(400);
  });
});

describe("POST /api/users/login", () => {
  beforeEach(async () => {
    await createUser();
  });
  afterEach(async () => {
    await removeCreatedUser();
  });

  it("should succes login existing user", async () => {
    const result = await supertest(app).post("/api/users/login").send({
      email: "test@test.com",
      password: "testtest",
    });
    expect(result.status).toBe(200);
    expect(result.body.token).toBeDefined();
  });

  it("should reject invalid login request", async () => {
    const result = await supertest(app).post("/api/users/login").send({
      email: "",
      password: "",
    });
    expect(result.status).toBe(400);
  });

  it("should reject login request because wrong email", async () => {
    const result = await supertest(app).post("/api/users/login").send({
      email: "tes@test.com",
      password: "testtest",
    });
    expect(result.status).toBe(401);
  });

  it("should reject login request because wrong password", async () => {
    const result = await supertest(app).post("/api/users/login").send({
      email: "test@test.com",
      password: "testtes",
    });
    expect(result.status).toBe(401);
  });
});

describe("GET /api/users", () => {
  beforeEach(async () => {
    await createUser();
  });
  afterEach(async () => {
    await removeCreatedUser();
  });

  it("should success get user data", async () => {
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({ email: "test@test.com" }, secret, {
      expiresIn: "7d",
    });
    const result = await supertest(app)
      .get("/api/users")
      .set("Authorization", token);
    expect(result.status).toBe(200);
  });

  it("should failed get user data because user not found", async () => {
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({ email: "test@tst.com" }, secret, {
      expiresIn: "7d",
    });
    const result = await supertest(app)
      .get("/api/users")
      .set("Authorization", token);
    expect(result.status).toBe(404);
  });

  it("should failed get user data because invalid token", async () => {
    const secret = "ss";
    const token = jwt.sign({ email: "test@tst.com" }, secret, {
      expiresIn: "7d",
    });
    const result = await supertest(app)
      .get("/api/users")
      .set("Authorization", token);
    expect(result.status).toBe(498);
  });

  it("should failed get user data because token not found", async () => {
    const result = await supertest(app)
      .get("/api/users")
      .set("Authorization", "");
    expect(result.status).toBe(498);
  });
});

describe("PUT /api/user/:id", () => {
  let userId;

  beforeEach(async () => {
    userId = await createUser();
  });

  afterEach(async () => {
    await removeCreatedUser();
  });

  it("should success update data", async () => {
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({ email: "test@test.com" }, secret, {
      expiresIn: "7d",
    });
    const result = await supertest(app)
      .put(`/api/users/${userId}`)
      .set("Authorization", token)
      .send({
        nama: "roni",
      });
    expect(result.status).toBe(200);
    expect(result.body.message).toBe("user updated succesfully");
  });

  it("should error user not found", async () => {
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({ email: "test@tet.com" }, secret, {
      expiresIn: "7d",
    });
    const result = await supertest(app)
      .put(`/api/users/${userId}`)
      .set("Authorization", token)
      .send({
        nama: "roni",
      });
    expect(result.status).toBe(404);
  });

  it("should error invalid tokem", async () => {
    const secret = process.env.JWT_SECRET;
    jwt.sign({ email: "test@test.com" }, secret, {
      expiresIn: "7d",
    });
    const result = await supertest(app)
      .put(`/api/users/${userId}`)
      .set("Authorization", "ds")
      .send({
        nama: "roni",
      });
    expect(result.status).toBe(498);
  });

  it("should success update data telp & password", async () => {
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({ email: "test@test.com" }, secret, {
      expiresIn: "7d",
    });
    const result = await supertest(app)
      .put(`/api/users/${userId}`)
      .set("Authorization", token)
      .send({
        telp: "081223882887",
        password: "hohohihe",
      });
    expect(result.status).toBe(200);
    expect(result.body.message).toBe("user updated succesfully");
  });
});

describe("DELETE /api/user/:id", () => {
  let userId;

  beforeEach(async () => {
    userId = await createUser();
  });

  afterEach(async () => {
    await removeCreatedUser();
  });

  it("should successfully delete user", async () => {
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({ email: "test@test.com" }, secret, {
      expiresIn: "7d",
    });

    const result = await supertest(app)
      .delete(`/api/users/${userId}`)
      .set("Authorization", token);

    expect(result.status).toBe(200);
  });

  it("should successfully delete user", async () => {
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({ email: "test@tst.com" }, secret, {
      expiresIn: "7d",
    });

    const result = await supertest(app)
      .delete(`/api/users/${userId}`)
      .set("Authorization", token);
    expect(result.status).toBe(404);
  });
});
