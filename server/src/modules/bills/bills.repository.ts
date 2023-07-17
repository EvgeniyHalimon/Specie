import { bill } from '../../shared/prismaClient';

export const billRepository = {
  getAll: async (id: number) => {
    return await bill().findMany({
      where: {
        id: id,
      },
    });
  },
  update: async (id: number, data: any) => {
    return await bill().update({
      where: {
        id: id,
      },
      data: data,
    });
  },
  deleteBill: async (id: number) => {
    return await bill().delete({
      where: {
        id: id,
      },
    });
  },
  create: async (id: number, data: any) => {
    return await bill().create({
      data: {
        ...data,
        id: id,
      },
    }); 
  }, 
};