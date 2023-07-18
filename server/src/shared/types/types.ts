import { Request } from 'express';

export interface CustomRequest extends Request {
  id: number,
}

export interface IUser {
  id?: number,
  googleID?: string,
  email: string,
  password?: string,
  firstname: string,
  lastname: string,
  source?: string
}

export interface IGoogleUser extends Omit<IUser, 'password'>{
  source: string,
}

export interface IBill {
  id: number,
  price: number,
  comment: string,
  categoryID: number,
  subcategoryID: number,
  userID: number,
}

export interface ICategory {
  id: number,
  name: string,
}

export interface ISubcategory {
  id: number,
  name: string,
  categoryID: number
}

export interface IDecoded {
  userInfo: { id: number },
  iat: number,
  exp: number
}