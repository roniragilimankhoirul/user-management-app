import { prismaClient } from "../src/application/database.js";

describe("Database Connection", () => {
  afterEach(async () => {
    await prismaClient.user.deleteMany({
      where: {
        email: "test@test.com",
      },
    });
  });

  it("should successfully get data", async () => {
    await prismaClient.user.create({
      data: {
        nama: "test",
        email: "test@test.com",
        telp: "082334738728",
        password: "test",
      },
    });
    const result = await prismaClient.user.findUnique({
      where: {
        email: "test@test.com",
      },
    });
    expect(result).toBeDefined();
  });
});
