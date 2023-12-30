import { Subcategory } from '../models';


export const subcategoryRepository = {
  getAll: async () => {
    return await Subcategory.find();
  },
};