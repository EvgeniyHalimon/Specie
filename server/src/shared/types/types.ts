import { Request } from 'express';

export interface CustomRequest extends Request {
  id: string,
}

export interface IUser {
  id?: number,
  email: string,
  password?: string,
  firstname: string,
  lastname: string,
}

export interface IDecoded {
  userInfo: { id: number },
  iat: number,
  exp: number
}