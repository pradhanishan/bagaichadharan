import prisma from '@/lib/db';
import { createBaseRepository } from '@/repository/repository';
import { TRecentTransactionsSummary, TTransactionDetailByTransaction } from '@/types/data-models';
import { Sales } from '@prisma/client';

const entityName = 'sales';

interface ISalesRepository extends ReturnType<typeof createBaseRepository> {
  getTransactionDetailsByTransaction(transactionNo: string): Promise<TTransactionDetailByTransaction[]>;
  getRecentTransactionsSummary({ take, skip }: { take: number; skip: number }): Promise<TRecentTransactionsSummary[]>;
  getSalesTransactionById(transactionNo: string): Promise<Sales[]>;
}

const salesRepository: ISalesRepository = {
  ...createBaseRepository<Sales>(entityName),
  async getTransactionDetailsByTransaction(transactionNo: string): Promise<TTransactionDetailByTransaction[]> {
    // Retrieve detailed sales information
    const salesDetails = await prisma.sales.findMany({
      where: { transactionNo },
      select: {
        id: true,
        tranDate: true,
        transactionNo: true,
        quantitySold: true,
        amountSold: true,
        discountAmount: true,
        updatedAt: true,
        createdAt: true,
        area: {
          select: {
            id: true,
            name: true,
          },
        },
        menu: {
          select: {
            id: true,
            item: true,
          },
        },
        staff: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return salesDetails.map((sale) => ({
      areaName: sale.area.name,
      tranDate: sale.tranDate,
      transactionNo: sale.transactionNo,
      salesId: sale.id,
      areaId: sale.area.id,
      staffId: sale.staff.id,
      menuItemId: sale.menu.id,
      quantitySold: sale.quantitySold,
      amountSold: sale.amountSold,
      discountAmount: sale.discountAmount,
      menuItem: sale.menu.item,
      staffName: sale.staff.name,
      createdAt: sale.createdAt,
      updatedAt: sale.updatedAt,
    }));
  },
  getRecentTransactionsSummary: async function ({
    take,
    skip,
  }: {
    take: number;
    skip: number;
  }): Promise<TRecentTransactionsSummary[]> {
    return await prisma.$queryRaw`
    SELECT 
      "tranDate",
      "transactionNo",
      MAX("updatedAt") as "updatedAt",
      SUM("quantitySold") as "totalQuantitySold",
      SUM("amountSold") as "totalAmountSold"
    FROM 
      public."Sales"
    GROUP BY 
      "tranDate", "transactionNo"
    ORDER BY 
      "tranDate" DESC
    LIMIT ${take}
    OFFSET ${skip}
  `;
  },
  getSalesTransactionById: async function (transactionNo: string): Promise<Sales[]> {
    return await prisma.sales.findMany({ where: { transactionNo } });
  },
};

export default salesRepository;
