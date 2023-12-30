import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt, { Secret } from 'jsonwebtoken';

import { CustomError } from '../../shared/CustomError';
import { SALT_ROUNDS } from '../../shared/constants/constants';

import { sendConfirmationEmail } from '../../shared/nodemailer';
import { IGoogleUser, IUser } from '../../shared/types/types';
import { userRepository } from '../users/users.repository';
import { userService } from '../users/users.service';

import { ITokens } from './types';

dotenv.config();

const ACCESS_KEY: Secret = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_KEY: Secret = process.env.REFRESH_TOKEN_SECRET;
const SECRET: Secret = process.env.SECRET;

export const generateTokens = (foundUser: IUser): ITokens => {
  const accessToken = jwt.sign(
    {
      'userInfo': {
        'id': foundUser._id,
      },
    },
    ACCESS_KEY,
    { expiresIn: '1d' },
  );
  const refreshToken = jwt.sign(
    {
      'userInfo': {
        'id': foundUser._id,
      },
    },
    REFRESH_KEY,
    { expiresIn: '1d' },
  );
  return { accessToken, refreshToken };
};

const authorizationService = {
  login: async (body: IUser) : Promise<ITokens | undefined> => {
    const foundUser = await userService.findByEmail(body.email);
    // evaluate password 
    const match = await bcrypt.compare(body.password, foundUser.password);
    if (!match) {
      throw new CustomError({ message: 'Password is invalid', status: 400 });
    }
    if (foundUser.status != 'active') {
      throw new CustomError({ message: 'Pending Account. Please Verify Your Email!', status: 400 });
    }
    return generateTokens(foundUser);
  },

  loginWithGoogle: async (body: IGoogleUser) : Promise<ITokens | undefined> => {
    const foundUser = await userService.findByEmail(body.email);
  
    if(!foundUser){
      throw new CustomError({ message: 'User doesnt exist', status: 400 });
    }
    return generateTokens(foundUser);
  },

  register: async (body: IUser): Promise<void> => {
    const foundUser = await userService.checkIfUserExist(body.email);
    if(foundUser){
      throw new CustomError({ message: 'User already exist', status: 400 });
    }
    //encrypt the password
    const hashedPwd = await bcrypt.hash(body.password, SALT_ROUNDS);
    const confirmationCode = jwt.sign({ email: body.email }, SECRET);
    //create and store the new user
    sendConfirmationEmail(
      body.firstname,
      body.email,
      confirmationCode,
    );
    await userRepository.createNewUser({
      firstname: body.firstname,
      lastname: body.lastname,
      password: hashedPwd,
      email: body.email,
      confirmationCode: confirmationCode,
      status: 'pending',
    });
  },
  
  refreshToken: async (id: string): Promise<ITokens | undefined> => {
    const foundUser = await userService.findByID(id);
    // evaluate jwt 
    if(foundUser){
      return generateTokens(foundUser);
    }
  },

  registerWithGoogle: async (body: IGoogleUser): Promise<void> => {
    const foundUser = await userService.checkIfUserExist(body.email);
    if(foundUser){
      throw new CustomError({ message: 'User already exist', status: 400 });
    }
    
    //create and store the new user
    await userRepository.createNewUser({
      firstname: body.firstname,
      lastname: body.lastname,
      email: body.email,
      confirmationCode: body.confirmationCode,
      status: body.status,
    });
  },

  verifyUser: async (confirmationCode: string) => {
    const foundUser = await userRepository.findUserByConfirmationCode(confirmationCode);
    if(!foundUser){
      throw new CustomError({ message: 'User doesn`t exist', status: 404 });
    }
    await userRepository.updateStatus(foundUser.id);
  },

};

export { authorizationService };