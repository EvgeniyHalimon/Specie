import { category } from '../../shared/prismaClient';

export const categoryRepository = {
  getAll: async () => {
    return await category().findMany();
  },
};