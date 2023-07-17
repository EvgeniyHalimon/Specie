import { CustomError } from '../../shared/CustomError';

import { subcategoryRepository } from './subcategories.repository';

export const subcategoryService = {
  getAll : async () => {
    const categories = await subcategoryRepository.getAll();
    if(!categories){
      throw new CustomError({ message: 'Something went wrong when you tried get all subcategories', status: 404 });
    }
    return categories;
  },
};