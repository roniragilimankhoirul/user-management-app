import supertest from "supertest";
import { app } from "../src/application/app";

describe("GET /", () => {
  test("should succes to get data", async () => {
    const result = await supertest(app).get("/");
    expect(result.status).toBe(200);
  });
});
