import mongoose, { Model } from "mongoose";
import { nanoid } from "nanoid";
import { OptionType } from "./enums/OptionTypeEnum";

const OptionSchema = new mongoose.Schema({
  _id: { type: String, default: () => nanoid() },
  description: { type: String, required: true },
  type: { type: OptionType, required: false },
});

const SignOptionHistorySchema = new mongoose.Schema({
  date: { type: Date, required: true },
  isAccepted: { type: Boolean, required: true },
});

const SignedOptionSchema = new mongoose.Schema({
  optionId: { type: String, required: true },
  isAccepted: { type: Boolean, required: true },
  date: { type: Date, required: true },
  signs: { type: Array, required: true },
});

const SignSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  isAccepted: { type: Boolean, required: true },
  date: { type: Date, required: true },
  signedOptions: { type: Array, required: true },
});

export const TermSchema = new mongoose.Schema({
  _id: { type: String, default: () => nanoid() },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  isActual: { type: Boolean, required: true },
  options: [OptionSchema],
  usersSigned: { type: Array, required: true },
});
