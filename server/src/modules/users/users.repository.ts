import { user } from '../../shared/prismaClient';
import { IUser } from '../../shared/types/types';

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
};

export{ userRepository };
