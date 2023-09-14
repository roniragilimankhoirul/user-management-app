const supertest = require("supertest");
import { app } from "../src/application/app.js";
import { prismaClient } from "../src/application/database.js";

describe("POST /api/users", () => {
  afterEach(async () => {
    await prismaClient.user.deleteMany({
      where: {
        email: "test@test.com",
      },
    });
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
});
