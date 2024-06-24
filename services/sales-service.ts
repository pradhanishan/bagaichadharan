import prisma from '@/lib/db';

async function createSalesTransaction(
  data: {
    staffId: number;
    areaId: number;
    transactionNo: string;
    menuId: number;
    quantitySold: number;
    amountSold: number;
    tranDate: number;
  }[],
) {
  const createdSales = await prisma.sales.createManyAndReturn({
    data,
  });
  return createdSales;
}

async function getSalesTransactionbyId(transactionNo: string) {
  return await prisma.sales.findMany({ where: { transactionNo } });
}

async function getSalesDetailsByTransaction(transactionNo: string) {
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
}

async function getRecentTransactionsSummary({ take, skip }: { take: number; skip: number }) {
  const transactions: {
    tranDate: number;
    transactionNo: string;
    updatedAt: string;
    totalQuantitySold: number;
    totalAmountSold: number;
  }[] = await prisma.$queryRaw`
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

  return transactions.map((transaction) => ({
    tranDate: transaction.tranDate,
    transactionNo: transaction.transactionNo,
    updatedAt: transaction.updatedAt,
    totalQuantitySold: transaction.totalQuantitySold,
    totalAmountSold: transaction.totalAmountSold,
  }));
}
export { createSalesTransaction, getSalesTransactionbyId, getSalesDetailsByTransaction, getRecentTransactionsSummary };
