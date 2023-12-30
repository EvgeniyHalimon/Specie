import { IUser } from '../../shared/types/types';
import { User } from '../models';

//REFACTOR
const userRepository = {
  findUserById: async (id: string): Promise<IUser> => {
    return await User.findById(id);
  },

  findUser: async (email: string): Promise<IUser> => {
    return await User.findOne({
      where: {
        email: email,
      },
    });
  },

  createNewUser: async(userObject: IUser) => {
    return await User.create(userObject);
  },
};

export{ userRepository };