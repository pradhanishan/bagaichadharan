import prisma from '@/lib/db';
import productRepository from '@/repository/product-repository';
import type { Product } from '@/types/data-models';

async function getAllProducts(): Promise<Product[]> {
  return (await productRepository.getAll()) as Product[];
}

export { getAllProducts };
