// types.ts
import {
  Area as PrismaArea,
  Menu as PrismaMenu,
  Product as PrismaProduct,
  Sales as PrismaSales,
  Staff as PrismaStaff,
} from '@prisma/client';

export type Area = PrismaArea;
export type Menu = PrismaMenu;
export type Staff = PrismaStaff;
export type Sales = PrismaSales;
export type Product = PrismaProduct;

// Define any additional types or interfaces you may need based on your business logic

export type TTransactionDetailByTransaction = {
  areaName: string;
  tranDate: number;
  transactionNo: string;
  salesId: string;
  areaId: number;
  staffId: number;
  menuItemId: number;
  quantitySold: number;
  amountSold: number;
  discountAmount: number;
  menuItem: string;
  staffName: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TRecentTransactionsSummary = {
  tranDate: number;
  transactionNo: string;
  updatedAt: string;
  totalQuantitySold: number;
  totalAmountSold: number;
};
