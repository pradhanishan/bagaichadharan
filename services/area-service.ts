import prisma from '@/lib/db';
import { Area } from '@prisma/client';

/**
 * Retrieves all areas from the database, ordered by name in ascending order.
 *
 * @returns {Promise<Area[]>} A promise that resolves to an array of Area objects.
 */
async function getAllAreas(): Promise<Area[]> {
  return await prisma.area.findMany({ orderBy: { name: 'asc' } });
}

/**
 * Retrieves an area by its unique ID.
 *
 * @param {number} id - The unique ID of the area to retrieve.
 * @returns {Promise<Area | null>} A promise that resolves to the Area object if found, or null if not found.
 */
async function getAreaById(id: number): Promise<Area | null> {
  return await prisma.area.findUnique({ where: { id } });
}

export { getAllAreas, getAreaById };
