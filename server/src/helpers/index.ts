import crypto from "crypto";
import { UserData } from "../interfaces/user";

const SECRET = process.env.SECRET || "SECRET";
const ALGORITHM = "aes-256-cbc";
const IV_LENGTH = 16;

export const authentication = (salt: string, password: string): string => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(SECRET)
    .digest("hex");
};

export const cryptography = (salt: string, data: UserData): string => {
  const iv = crypto.randomBytes(IV_LENGTH);
  const key = crypto.scryptSync(SECRET, salt, 32);

  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  let encrypted = cipher.update(JSON.stringify(data), "utf-8", "hex");
  encrypted += cipher.final("hex");

  const hmac = crypto.createHmac("sha256", salt);
  hmac.update(encrypted);
  const hash = hmac.digest("hex");

  return `${hash}:${iv.toString("hex")}:${encrypted}`;
};

export const decryption = (
  salt: string,
  encryptedData: string
): UserData | null => {
  const [hash, ivHex, data] = encryptedData.split(":");

  const hmac = crypto.createHmac("sha256", salt);
  hmac.update(data);
  const calculatedHash = hmac.digest("hex");

  if (hash !== calculatedHash) {
    return null;
  }

  const iv = Buffer.from(ivHex, "hex");
  const key = crypto.scryptSync(SECRET, salt, 32);

  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  let decrypted = decipher.update(data, "hex", "utf-8");
  decrypted += decipher.final("utf-8");

  return JSON.parse(decrypted);
};

export const random = () => crypto.randomBytes(128).toString("base64");
