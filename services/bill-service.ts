import areaRepository from '@/repository/area-repository';
import menuRepository from '@/repository/menu-repository';
import salesRepository from '@/repository/sales-repository';
import staffRepository from '@/repository/staff-repository';
import type {
  Area,
  Menu,
  Staff,
  TRecentTransactionsSummary,
  TTransactionDetailByTransaction,
} from '@/types/data-models';

interface IBillService {
  getStaffsBillsAndMenuItems(): Promise<{ staffs: Staff[]; areas: Area[]; menuItems: Menu[] }>;
  getTransactionDetailsByTransaction(transactionNo: string): Promise<TTransactionDetailByTransaction[]>;
  getRecentTransactionsSummary({ take, skip }: { take: number; skip: number }): Promise<TRecentTransactionsSummary[]>;
  createSaleTransaction(
    data: {
      staffId: number;
      areaId: number;
      transactionNo: string;
      menuId: number;
      quantitySold: number;
      amountSold: number;
      tranDate: number;
    }[],
  ): Promise<void>;
}

const billService: IBillService = {
  async getStaffsBillsAndMenuItems(): Promise<{ staffs: Staff[]; areas: Area[]; menuItems: Menu[] }> {
    const staffs: Staff[] = (await staffRepository.getAll()) as Staff[];
    const areas: Area[] = (await areaRepository.getAll()) as Area[];
    const menuItems: Menu[] = (await menuRepository.getAll()) as Menu[];

    return { staffs, areas, menuItems };
  },
  getTransactionDetailsByTransaction: async function (
    transactionNo: string,
  ): Promise<TTransactionDetailByTransaction[]> {
    return await salesRepository.getTransactionDetailsByTransaction(transactionNo);
  },
  getRecentTransactionsSummary: async function ({
    take,
    skip,
  }: {
    take: number;
    skip: number;
  }): Promise<TRecentTransactionsSummary[]> {
    return await salesRepository.getRecentTransactionsSummary({ take, skip });
  },
  createSaleTransaction: async function (
    data: {
      staffId: number;
      areaId: number;
      transactionNo: string;
      menuId: number;
      quantitySold: number;
      amountSold: number;
      tranDate: number;
    }[],
  ): Promise<void> {
    await salesRepository.createMany(data);
  },
};

export { billService };
