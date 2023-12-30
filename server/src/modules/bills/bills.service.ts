

import { CustomError } from '../../shared/CustomError';

import { billRepository } from './bills.repository';

export const billService = {
  deleteBill: async (id: string) => {
    try {
      return await billRepository.deleteBill(id);
    } catch (error) {
      throw new CustomError({ message: 'Something went wrong when you tried to delete bill', status: error.status });
    }
  },
  getAllUserBills: async (id: string) => {
    const bills = await billRepository.getAll(id);
    if (!bills) {
      return [];
    }
    return bills;
  },
  update: async (id: string, data: any) => {
    const updatedBill = await billRepository.update(id, data);
    if (!updatedBill) {
      throw new CustomError({ message: 'Something went wrong when you tried to update bill', status: 409 });
    }
    return updatedBill;
  },
  create: async (id: string, data: any) => {
    const createdBill = await billRepository.create(id, data);
    if (!createdBill) {
      throw new CustomError({ message: 'Something went wrong when you tried to create bill', status: 401 });
    }
    return createdBill;
  },
};