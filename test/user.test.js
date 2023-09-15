import supertest from "supertest";
import { app } from "../src/application/app.js";
import { createUser, removeCreatedUser } from "./test-util.js";

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
      email: "roni@gmail.com",
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
