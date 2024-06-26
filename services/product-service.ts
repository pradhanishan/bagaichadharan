// product-service.ts
import productRepository from '@/repository/product-repository';
import type { Product } from '@/types/data-models';

interface IProductService {
  getAllProducts(): Promise<Product[]>;
}

const productService: IProductService = {
  async getAllProducts(): Promise<Product[]> {
    return (await productRepository.getAll()) as Product[];
  },
};

export { productService };
