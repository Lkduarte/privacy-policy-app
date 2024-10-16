import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";

import router from "./router";
import mongoose, { Model } from "mongoose";
import { config } from "./config/config";
import { IEmailList, IKey, IUser } from "./interfaces/user";
import { UserSchema } from "./models/user";
import { ITerm } from "./interfaces/term";
import { TermSchema } from "./models/term";
import { KeySchema } from "./models/key";
import { listAllEmails } from "./services/keyServices";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const mongoConnection = mongoose.createConnection(config.mongo.url);

const mongoKeysConnection = mongoose.createConnection(config.mongoKeys.url);

mongoose.Promise = Promise;

app.use("/", router());

const User: Model<IUser> = mongoConnection.model<IUser>("User", UserSchema);

const Term: Model<ITerm> = mongoConnection.model<ITerm>("Term", TermSchema);

const Key: Model<IKey> = mongoKeysConnection.model<IKey>("Key", KeySchema);

const listaEmails: IEmailList[] = [];

function removeFromListaEmails(data: string) {
  const itemFound = listaEmails.find((i) => i._id === data || i.email === data);
  if (!itemFound) return false;

  const itemFoundIndex = listaEmails.indexOf(itemFound);
  listaEmails.splice(itemFoundIndex, 1);
  return true;
}

const server = http.createServer(app);

server.listen(config.server.port, async () => {
  console.log(`Server running on http://localhost:${config.server.port}/`);

  const data = await listAllEmails();
  if (data && data.length > 0) {
    data.forEach((i) => listaEmails.push(i));
  }
});

export {
  mongoConnection,
  mongoKeysConnection,
  listaEmails,
  removeFromListaEmails,
  User,
  Term,
  Key,
};
