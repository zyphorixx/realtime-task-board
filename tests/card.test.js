const request = require("supertest");
const app = require("../src/app");

let token;
let boardId;

jest.setTimeout(20000);

beforeAll(async () => {

  await request(app)
    .post("/auth/register")
    .send({ email:"card@test.com", password:"123456" });

  const login = await request(app)
    .post("/auth/login")
    .send({ email:"card@test.com", password:"123456" });

  token = login.body.data.token;

  const board = await request(app)
    .post("/boards")
    .set("Authorization",`Bearer ${token}`)
    .send({ name:"Board" });

  boardId = board.body._id;
});

describe("Card API", () => {

  test("create card", async () => {
    const res = await request(app)
      .post(`/cards/${boardId}`)
      .set("Authorization",`Bearer ${token}`)
      .send({ title:"My Card" });

    expect(res.statusCode).toBe(201);
  });

});