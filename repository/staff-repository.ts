import prisma from '@/lib/db';
import { createBaseRepository } from '@/repository/repository';
import { Staff } from '@prisma/client';

const entityName = 'staff';

interface IStaffRepository extends ReturnType<typeof createBaseRepository> {
  getAllServiceStaffs(): Promise<Staff[]>;
}

const staffRepository: IStaffRepository = {
  ...createBaseRepository<Staff>(entityName),
  getAllServiceStaffs: async function (): Promise<Staff[]> {
    return await prisma.staff.findMany({ where: { staffType: 'Service' }, orderBy: { name: 'asc' } });
  },
};

export default staffRepository;
