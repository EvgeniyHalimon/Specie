import { user } from '../../shared/prismaClient';
import { IGoogleUser, IUser } from '../../shared/types/types';

const userRepository = {
  findUserById: async (id: number) => {
    return await user().findUnique({
      where: {
        id: id,
      },
    });
  },

  findUser: async (email: string) => {
    return await user().findUnique({
      where: {
        email: email,
      },
    });
  },

  findUserByConfirmationCode: async (confirmationCode: string) => {
    return await user().findFirst({
      where: {
        confirmationCode: confirmationCode,
      },
    });
  },

  createNewUser: async(userObject: IUser) => {
    return await user().create({
      data: { 
        email: userObject.email,
        password: userObject.password,
        firstname: userObject.firstname,
        lastname: userObject.lastname,
      },
    });
  },

  createNewUserWithGoogle: async(userObject: IGoogleUser) => {
    return await user().create({
      data: { 
        email: userObject.email,
        firstname: userObject.firstname,
        lastname: userObject.lastname,
        source: userObject.source,
      },
    });
  },

  updateStatus: async (id: number) => {
    return await user().update({
      where: {
        id: id,
      },
      data: {
        status: 'active',
      },
    });
  },
};

export{ userRepository };