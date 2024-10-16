import { Document } from "mongoose";
import { OptionType } from "../models/enums/OptionTypeEnum";

export interface ITerm extends Document {
  description: string;
  options: IOption[];
  date: Date;
  isActual: boolean;
  usersSigned: ISignedUser[];
}

export interface IOption {
  _id: string;
  type: OptionType;
  description: string;
}

export interface ISignedUser {
  userId: string;
  date: Date;
  signedOptions: ISignedOption[];
  signs: ISignTerm[];
}

export interface ISignedOption {
  optionId: string;
  isAccepted: boolean;
  date: Date;
  signs: ISign[];
}

export interface ISignTerm {
  date: Date;
}

export interface ISign {
  date: Date;
  isAccepted: boolean;
}
