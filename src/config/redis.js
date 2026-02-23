const Redis = require("ioredis");
const logger = require("../utils/logger");

let redis;

if (process.env.NODE_ENV !== "test") {

  redis = new Redis(
    process.env.REDIS_URL || "redis://127.0.0.1:6379"
  );

  redis.on("connect", () =>
    logger.info("Redis connected")
  );

  redis.on("error", err =>
    logger.error("Redis error:", err.message)
  );

  redis.on("reconnecting", () =>
    logger.warn("Redis reconnecting...")
  );

  redis.on("ready", () =>
    logger.info("Redis ready")
  );

} else {

  // Mock redis for tests
  redis = {
    get: async () => null,
    set: async () => null,
    del: async () => null,
    quit: async () => null,
    keys: async () => [],
    duplicate: () => ({
      get: async () => null,
      set: async () => null,
      del: async () => null,
      quit: async () => null,
      keys: async () => []
    })
  };

}

module.exports = redis;
