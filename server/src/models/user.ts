import mongoose from "mongoose";
import { nanoid } from "nanoid";

export const UserSchema = new mongoose.Schema({
  _id: { type: String, default: () => nanoid() },
  data: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
});
