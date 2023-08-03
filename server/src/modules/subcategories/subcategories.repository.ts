import { subcategory } from '../../shared/prismaClient';

export const subcategoryRepository = {
  getAll: async () => {
    return await subcategory().findMany();
  },
};