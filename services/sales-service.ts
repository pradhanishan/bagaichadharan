import prisma from '@/lib/db';
import salesRepository from '@/repository/sales-repository';

async function getSalesTransactionbyId(transactionNo: string) {
  return await salesRepository.getSalesTransactionById(transactionNo);
}

export { getSalesTransactionbyId };
