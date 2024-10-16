import dotenv from "dotenv";

dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT
  ? Number(process.env.SERVER_PORT)
  : 8080;

//Database
const MONGO_USERNAME = process.env.MONGO_USERNAME || "";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
const MONGO_DATA_BASE = process.env.MONGO_DATA_BASE || "";
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_DATA_BASE}.jmpmu.mongodb.net/lgpd-db`;

// KEYS Database
const MONGO_KEY_USERNAME = process.env.MONGO_KEY_USERNAME || "";
const MONGO_KEY_PASSWORD = process.env.MONGO_KEY_PASSWORD || "";
const MONGO_KEY_DATABASE = process.env.MONGO_KEY_DATABASE || "";
const MONGO_KEYS_URL = `mongodb+srv://${MONGO_KEY_USERNAME}:${MONGO_KEY_PASSWORD}@${MONGO_KEY_DATABASE}.71x3m.mongodb.net/lgpd-keys`;

//JWT
const SERVER_TOKEN_EXPIRATION = process.env.SERVER_TOKEN_EXPIRATION || 3000;
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || "coolIssuer";
const SERVER_TOKEN_SECRET =
  process.env.SERVER_TOKEN_SECRET || "superencryptedsecret";

export const config = {
  mongo: {
    url: MONGO_URL,
  },
  server: {
    port: SERVER_PORT,
  },
  token: {
    expireTime: SERVER_TOKEN_EXPIRATION,
    issuer: SERVER_TOKEN_ISSUER,
    secret: SERVER_TOKEN_SECRET,
  },
  mongoKeys: {
    url: MONGO_KEYS_URL,
  },
};
