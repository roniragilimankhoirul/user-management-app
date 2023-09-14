import { prismaClient } from "../src/application/database.js";

describe("Database Connection", () => {
  afterEach(async () => {
    await prismaClient.user.deleteMany({
      where: {
        email: "test@teast.com",
      },
    });
  });

  it("should successfully get data", async () => {
    await prismaClient.user.create({
      data: {
        nama: "test",
        email: "test@teast.com",
        telp: "0823347398728",
        password: "testtest",
      },
    });
    const result = await prismaClient.user.findUnique({
      where: {
        email: "test@teast.com",
      },
    });
    expect(result).toBeDefined();
  });
});
