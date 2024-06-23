import prisma from '@/lib/db';

/**
 * Retrieves all products from the database.
 * @returns {Promise<{ id: number; name: string; }[]>} Array of products with their id and name.
 */
async function getAllProducts(): Promise<{ id: number; name: string }[]> {
  const products = await prisma.product.findMany({ orderBy: { name: 'asc' } });
  return products.map((product) => ({
    id: product.id,
    name: product.name,
  }));
}

export { getAllProducts };
