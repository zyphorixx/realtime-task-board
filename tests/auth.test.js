const request = require("supertest");
const app = require("../src/app");

jest.setTimeout(20000);

describe("Auth API", () => {

  test("register user", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({
        email:`user${Date.now()}@mail.com`,
        password:"123456"
      });

    expect(res.statusCode).toBe(201);
  });

  test("login user", async () => {
    const email = await `login${Date.now()}@mail.com`;

    await request(app).post("/auth/register").send({
      email,
      password:"123456"
    });

    const res = await request(app).post("/auth/login").send({
      email,
      password:"123456"
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.data.token).toBeDefined();
  });

});