const http = require("http");
const { Server } = require("socket.io");
const { io } = require("socket.io-client");

jest.setTimeout(20000);

describe("Socket", () => {

  let ioServer;
  let httpServer;

  beforeAll(done => {
    httpServer = http.createServer();
    ioServer = new Server(httpServer);

    httpServer.listen(4000, done);
  });

  afterAll(done => {
    ioServer.close();
    httpServer.close(done);
  });

  test("connects", done => {

    const socket = io("http://localhost:4000");

    socket.on("connect", ()=>{
      expect(socket.connected).toBe(true);
      socket.disconnect();
      done();
    });

  });

});