interface IUser {
  _id?: string | undefined | null;
  password: string;
  data: IUserData;
  signedTerms?: ISignedTerm[];
}

interface IUserData {
  name: string;
  lastName: string;
  email: string;
}

interface ISignedTerm {
  description: string;
  termId: string;
  isAccepted: boolean;
  date: Date;
  signedOptions: ISignedOption[];
}

interface ISignedOption {
  optionId: string;
  isAccepted: boolean;
}

interface ITerm {
  _id: string;
  description: string;
  options: IOption[];
}

interface IOption {
  _id: string;
  description: string;
}

interface Product {
  id: number;
  image: string;
  name: string;
  description: string;
  price: string;
}

interface ProductProps {
  product: Product;
}

export type {
  IOption,
  ISignedOption,
  ISignedTerm,
  ITerm,
  IUserData,
  IUser,
  Product,
  ProductProps,
};
