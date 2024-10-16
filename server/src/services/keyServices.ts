import { IEmailList } from "../interfaces/user";
import { decryption } from "../helpers";
import { Key, User } from "../index";
import { ObjectId } from "mongoose";

export const getKeyById = (id: string) => Key.findOne({ userId: id as any });

export const createKey = (values: Record<string, any>) =>
  new Key(values).save().then((user) => user.toObject());

export const deleteKeyByUserId = (id: string) =>
  Key.findOneAndDelete({ userId: id as any });

export const listAllEmails = async () => {
  const users = await User.find();
  const usersEmail: IEmailList[] = [];

  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const userToken = await getKeyById(user._id);

    if (userToken) {
      const dataDecrypted = decryption(userToken.key, user.data);

      if (dataDecrypted) {
        const object = { _id: user._id, email: dataDecrypted.email };
        usersEmail.push(object);
      }
    }
  }
  return usersEmail;
};
