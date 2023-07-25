import dotenv from 'dotenv';
import { NextFunction, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';

import { CustomError } from '../CustomError';
import { CustomRequest, IDecoded } from '../types/types';

dotenv.config();

const ACCESS_KEY: Secret = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_KEY: Secret = process.env.REFRESH_TOKEN_SECRET;

const ALLOWED_URLS = ['/auth/register', '/auth/login', '/auth/logout'];

type AuthHeader = string | undefined;

const verifyJWT = (req: CustomRequest, res: Response, next: NextFunction): void => {
  const exampleUrl = '/auth/confirm/*';
  const regex = new RegExp(exampleUrl);
  const testRegex = (url: string) => regex.test(url);

  const isAllowedUrl = ALLOWED_URLS.includes(req.url) || testRegex(req.url);
  if (isAllowedUrl) {
    return next();
  }

  const authHeader: AuthHeader = req.headers['authorization'];
  if (!authHeader) {
    throw new CustomError({ message: 'Unauthorized', status: 401 });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    throw new CustomError({ message: 'Unauthorized', status: 401 });
  }

  const key = req.url === '/auth/refresh' ? REFRESH_KEY : ACCESS_KEY;
  jwt.verify(token, key, (err: any, decoded: IDecoded) => {
    if (err) {
      throw new CustomError({ message: 'Forbidden', status: 403 });
    }

    req.id = Number(decoded.userInfo.id);
    next();
  });
};

export default verifyJWT;
