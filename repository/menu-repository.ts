import { createBaseRepository } from '@/repository/repository';
import { Menu } from '@prisma/client';

const entityName = 'menu';

interface IMenuRepository extends ReturnType<typeof createBaseRepository> {}

const menuRepository: IMenuRepository = {
  ...createBaseRepository<Menu>(entityName),
};

export default menuRepository;
