import prisma from '@/lib/db';
import menuRepository from '@/repository/menu-repository';
import type { Menu } from '@/types/data-models';

async function getAllMenuItems(): Promise<Menu[]> {
  return (await menuRepository.getAll()) as Menu[];
}

async function getMenuItemById(id: number): Promise<Menu | null> {
  return (await menuRepository.getById(id)) as Menu | null;
}

async function getMenuItemsById(ids: number[]): Promise<Menu[]> {
  return (await menuRepository.getByIds(ids)) as Menu[];
}

export { getAllMenuItems, getMenuItemById, getMenuItemsById };
