import { Category } from '../models';

export const categoryRepository = {
  getAll: async () => {
    return await Category.find();
  },
};