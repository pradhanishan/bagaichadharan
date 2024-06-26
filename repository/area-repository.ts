import { createBaseRepository } from '@/repository/repository';
import { Area } from '@prisma/client';

const entityName = 'area';

interface IAreaRepository extends ReturnType<typeof createBaseRepository> {}

const areaRepository: IAreaRepository = {
  ...createBaseRepository<Area>(entityName),
};

export default areaRepository;
