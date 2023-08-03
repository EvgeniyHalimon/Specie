import { bill } from '../../shared/prismaClient';
import { IQueries } from '../../shared/types/types';

export const billRepository = {
  getAll: async (id: number) => {
    return await bill().findMany({
      where: {
        userID: id,
      },
    });
  },
  getAllAndPaginate: async (id: number, queries: IQueries) => {
    const billsData = await bill().findMany({
      skip: queries.skip,
      take: queries.take,
      where: {
        userID: id,
        comment: {
          contains: queries.search,
          mode: 'insensitive',
        },
        /* createdAt: {
          gte: new Date('2023-08-01T17:04:33.450Z').toISOString(),
          lte: new Date('2023-08-31T17:04:33.450Z').toISOString(),
        }, */
      },
      orderBy: {
        [`${queries.sortBy}`]: queries.sort,
      },
    });
    const pagesCount = await bill().count({
      where: {
        userID: id,
      },
    });
    return { data: billsData, totalPages: pagesCount / queries.take };
  },
  update: async (data: any) => {
    return await bill().update({
      where: {
        id: data.id,
      },
      data: data,
    });
  },
  deleteBills: async (id: number, billIds: number[]) => {
    return await bill().deleteMany({
      where: {
        id: {
          in: billIds,
        },
        userID: id,
      },
    });
  },
  create: async (id: number, data: any) => {
    return await bill().create({
      data: {
        ...data,
        userID: id,
      },
    });
  },
};