import prisma from '@/lib/db';
import { Menu } from '@prisma/client';

async function getAllMenuItems(): Promise<{ id: number; item: string; price: number }[]> {
  const menuItems = await prisma.menu.findMany({ orderBy: { item: 'asc' } });
  return menuItems.map((item) => ({
    id: item.id,
    item: item.item,
    price: item.price,
  }));
}

async function getMenuItemById(id: number): Promise<{ id: number; item: string; price: number } | null> {
  const menuItem = await prisma.menu.findUnique({
    where: { id },
  });

  if (!menuItem) {
    return null; // Return null if no menu item found with the given ID
  }

  return {
    id: menuItem.id,
    item: menuItem.item,
    price: menuItem.price,
  };
}

async function getMenuItemsById(ids: number[]): Promise<Menu[]> {
  const menuItems = await prisma.menu.findMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  return menuItems;
}

export { getAllMenuItems, getMenuItemById, getMenuItemsById };
