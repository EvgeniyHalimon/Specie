import { IGoogleUser, IUser } from '../../shared/types/types';
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

  createNewUserWithGoogle: async(userObject: IGoogleUser) => {
    return await User.create({
      data: { 
        email: userObject.email,
        firstname: userObject.firstname,
        lastname: userObject.lastname,
        source: userObject.source,
      },
    });
  },

  updateStatus: async (id: number) => {
    return await User.updateOne({
      where: {
        id: id,
      },
      data: {
        status: 'active',
      },
    });
  },

  findUserByConfirmationCode: async (confirmationCode: string) => {
    return await User.findOne({
      where: {
        confirmationCode: confirmationCode,
      },
    });
  },
};

export{ userRepository };