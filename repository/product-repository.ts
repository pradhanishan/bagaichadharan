import { createBaseRepository } from '@/repository/repository';
import { Product } from '@prisma/client';

const entityName = 'product';

interface IProductRepository extends ReturnType<typeof createBaseRepository> {}

const productRepository: IProductRepository = {
  ...createBaseRepository<Product>(entityName),
};

export default productRepository;
