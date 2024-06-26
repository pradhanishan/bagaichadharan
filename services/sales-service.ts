// sales-service.ts
import salesRepository from '@/repository/sales-repository';
import type { TTransactionDetailByTransaction } from '@/types/data-models';

interface ISalesService {
  getSalesTransactionById(transactionNo: string): Promise<TTransactionDetailByTransaction[]>;
}

const salesService: ISalesService = {
  async getSalesTransactionById(transactionNo: string): Promise<TTransactionDetailByTransaction[]> {
    return await salesRepository.getTransactionDetailsByTransaction(transactionNo);
  },
};

export { salesService };
