const request = require("supertest");
const app = require("../src/app");

let token;

jest.setTimeout(20000);

beforeAll(async () => {

  await request(app).post("/auth/register").send({ 
    email:"b@test.com",
    password:"123456"
 });

  const res = await request(app)
    .post("/auth/login")
    .send({
        email:"b@test.com",
        password:"123456"
    });

  token = res.body.data.token;
});

describe("Board API", () => {

  test("create board", async () => {
    const res = await request(app)
      .post("/boards")
      .set("Authorization", `Bearer ${token}`)
      .send({ name:"Test Board" });

    expect(res.statusCode).toBe(201);
  });
});
