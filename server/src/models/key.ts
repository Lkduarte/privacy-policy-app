import mongoose from "mongoose";

export const KeySchema = new mongoose.Schema({
  userId: { type: String, unique: true },
  key: { type: String, required: true },
});
