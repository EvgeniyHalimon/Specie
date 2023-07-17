import { Request } from 'express';

export interface CustomRequest extends Request {
  id: number,
}

export interface IUser {
  id?: number,
  email: string,
  password?: string,
  firstname: string,
  lastname: string,
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