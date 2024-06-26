import prisma from '@/lib/db';
import { Menu } from '@prisma/client';

/**
 * Retrieves all menu items from the database, ordered by item name in ascending order.
 *
 * @returns {Promise<Menu[]>} A promise that resolves to an array of Menu objects.
 */
async function getAllMenuItems(): Promise<Menu[]> {
  return await prisma.menu.findMany({ orderBy: { item: 'asc' } });
}

/**
 * Retrieves a menu item by its unique ID.
 *
 * @param {number} id - The unique ID of the menu item to retrieve.
 * @returns {Promise<Menu | null>} A promise that resolves to the Menu object if found, or null if not found.
 */
async function getMenuItemById(id: number): Promise<Menu | null> {
  return await prisma.menu.findUnique({ where: { id } });
}

/**
 * Retrieves multiple menu items by their IDs.
 *
 * @param {number[]} ids - An array of unique IDs of menu items to retrieve.
 * @returns {Promise<Menu[]>} A promise that resolves to an array of Menu objects.
 */
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
