const Redis = require("ioredis");

let redis;

if (process.env.NODE_ENV !== "test") {
  redis = new Redis({
    host: "127.0.0.1",
    port: 6379
  });

  redis.on("connect", () => console.log("Redis connected"));
  redis.on("error", err => console.error("Redis error:", err));
} else {
  redis = {
    get: async () => null,
    set: async () => null,
    del: async () => null,
    quit: async () => null
  };
}

module.exports = redis;