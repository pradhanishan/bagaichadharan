import { createBaseRepository } from '@/repository/repository';
import { Staff } from '@prisma/client';

const entityName = 'staff';

interface IStaffRepository extends ReturnType<typeof createBaseRepository> {}

const staffRepository: IStaffRepository = {
  ...createBaseRepository<Staff>(entityName),
};

export default staffRepository;
