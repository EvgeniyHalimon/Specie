import { CustomError } from '../../shared/CustomError';

import { categoryRepository } from './categories.repository';

export const categoryService = {
  getAll : async () => {
    const categories = await categoryRepository.getAll();
    if(!categories){
      throw new CustomError({ message: 'Something went wrong when you tried get all categories', status: 404 });
    }
    return categories;
  },
};