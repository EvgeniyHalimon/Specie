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
        createdAt: {
          gte: new Date(`${queries.gteDate}T00:00:00.450Z`).toISOString(),
          lte: new Date(`${queries.lteDate}T23:59:59.450Z`).toISOString(),
        },
      },
      orderBy: {
        [`${queries.sortBy}`]: queries.sort,
      },
    });
    const pagesCount = await bill().count({
      where: {
        userID: id,
        comment: {
          contains: queries.search,
          mode: 'insensitive',
        },
        createdAt: {
          gte: new Date(`${queries.gteDate}T00:00:00.450Z`).toISOString(),
          lte: new Date(`${queries.lteDate}T23:59:59.450Z`).toISOString(),
        },
      },
    });
    return { data: billsData, totalPages: Math.ceil(pagesCount / queries.take) };
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