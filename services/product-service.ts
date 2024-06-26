import prisma from '@/lib/db';
import { Product } from '@prisma/client';

/**
 * Retrieves all products from the database, ordered by product name in ascending order.
 *
 * @returns {Promise<Product[]>} A promise that resolves to an array of Product objects.
 */
async function getAllProducts(): Promise<Product[]> {
  return await prisma.product.findMany({ orderBy: { name: 'asc' } });
}

export { getAllProducts };
