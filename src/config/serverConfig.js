const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

module.exports = {
    PORT,
    MONGO_URI,
    JWT_SECRET,
    JWT_EXPIRES_IN
};
