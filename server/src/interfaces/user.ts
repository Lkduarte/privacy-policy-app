import mongoose, { Document } from "mongoose";

export interface IEmailList {
  email: string;
  _id: string;
}

export interface IUser extends Document {
  data: string;
  authentication: UserAuthentication;
}

export interface IKey extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  key: string;
}

interface UserAuthentication {
  password: string;
  salt: string;
  sessionToken: string;
}

export interface UserData {
  name: string;
  lastName: string;
  email: string;
}
