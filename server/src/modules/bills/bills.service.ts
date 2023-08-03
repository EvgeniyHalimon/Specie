import { CustomError } from '../../shared/CustomError';
import { IQueries } from '../../shared/types/types';

import { billRepository } from './bills.repository';

const buildQueryObject = (query: IQueries): IQueries => {
  return {
    take: Number(query.take) || 5,
    skip: Number(query.skip) || 0,
    search: query.search.toString() || '',
    sortBy: query.sortBy.toString() || '',
    sort: query.sort || 'asc',
  };
};

export const billService = {
  deleteBill: async (id: number, billIds: number[]) => {
    try {
      return await billRepository.deleteBills(id, billIds);
    } catch (error) {
      throw new CustomError({ message: 'Something went wrong when you tried to delete bill', status: error.status });
    }
  },
  getAllUserBills: async (id: number) =>{
    const bills = await billRepository.getAll(id);
    if(!bills){
      return [];
    }
    return bills;
  },
  get: async (id: number, queries: IQueries) => {
    const accounts = await billRepository.getAllAndPaginate(id, buildQueryObject(queries));
    if (!accounts){
      throw new CustomError({ message: 'Accounts not found', status: 404 });
    }
    return accounts;
  },
  update: async (data: any) => {
    const updatedBill = await billRepository.update(data);
    if(!updatedBill){
      throw new CustomError({ message: 'Something went wrong when you tried to update bill', status: 409 });
    }
    return updatedBill;
  },
  create: async (id: number, data: any) => {
    const createdBill = await billRepository.create(id, data);
    if(!createdBill){
      throw new CustomError({ message: 'Something went wrong when you tried to create bill', status: 401 });
    }
    return createdBill;
  },
};