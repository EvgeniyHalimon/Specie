import { Request } from 'express';
export interface CustomRequest extends Request {
  _id: string,
}

export interface IUser {
  _id?: string;
  email: string;
  password?: string;
  firstname: string;
  lastname: string;
  bills?: string[]
}

export interface IBill {
  _id: string;
  price: number;
  comment: string;
  category: string;
  subcategory: string;
  user: string;
}

export interface ICategory {
  _id: string;
  name: string;
}

export interface ISubcategory {
  _id: string;
  name: string;
  category: string;
}

export interface ICategory {
  _id: string,
  name: string,
}

export interface IDecoded {
  userInfo: { _id: string },
  iat: number,
  exp: number
}