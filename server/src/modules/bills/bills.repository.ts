import { Bill } from '../models';

export const billRepository = {
  getAll: async (id: string) => {
    return await Bill.find({
      where: {
        id: id,
      },
    });
  },
  update: async (id: string, data: any) => {
    return await Bill.updateOne({
      where: {
        id: id,
      },
      data: data,
    });
  },
  deleteBill: async (id: string) => {
    return await Bill.deleteOne({
      where: {
        id: id,
      },
    });
  },
  create: async (id: string, data: any) => {
    return await Bill.create({
      data: {
        ...data,
        id: id,
      },
    });
  },
};