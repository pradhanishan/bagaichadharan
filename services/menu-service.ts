// menu-service.ts
import menuRepository from '@/repository/menu-repository';
import type { Menu } from '@/types/data-models';

interface IMenuService {
  getAllMenuItems(): Promise<Menu[]>;
  getMenuItemById(id: number): Promise<Menu | null>;
  getMenuItemsById(ids: number[]): Promise<Menu[]>;
}

const menuService: IMenuService = {
  async getAllMenuItems(): Promise<Menu[]> {
    return (await menuRepository.getAll()) as Menu[];
  },

  async getMenuItemById(id: number): Promise<Menu | null> {
    return (await menuRepository.getById(id)) as Menu | null;
  },

  async getMenuItemsById(ids: number[]): Promise<Menu[]> {
    return (await menuRepository.getByIds(ids)) as Menu[];
  },
};

export default menuService;
