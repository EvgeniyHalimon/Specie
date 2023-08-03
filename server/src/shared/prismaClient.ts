import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const user = () => {
  return prisma.user;
};

export const category = () => {
  return prisma.category;
};

export const subcategory = () => {
  return prisma.subcategory;
};

export const bill = () => {
  return prisma.bill;
};