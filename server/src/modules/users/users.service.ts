

import { CustomError } from '../../shared/CustomError';
import { IUser } from '../../shared/types/types';

import { userRepository } from './users.repository';

const userService = {
  findByID : async (id: string) => {
    const user = await userRepository.findUserById(id);
    if (!user){
      throw new CustomError({ message: `User ID ${id} not found`, status: 404 });
    } 
    return user;
  },

  findByEmail : async (email: string) => {
    const user = await userRepository.findUser(email);
    if (!user){
      throw new CustomError({ message: 'No such email', status: 401 });
    } 
    return user;
  },

  checkIfUserExist : async (email: string): Promise<IUser> => {
    const user = await userRepository.findUser(email);
    if (user){
      throw new CustomError({ message: 'User already exists', status: 409 });
    } 
    return user;
  },
};

export { userService };
   