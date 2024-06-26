// staff-service.ts
import staffRepository from '@/repository/staff-repository';
import type { Staff } from '@/types/data-models';

interface IStaffService {
  getAllStaffs(): Promise<Staff[]>;
  getAllServiceStaffs(): Promise<Staff[]>;
  getStaffById(id: number): Promise<Staff | null>;
}

const staffService: IStaffService = {
  async getAllStaffs(): Promise<Staff[]> {
    return (await staffRepository.getAll()) as Staff[];
  },

  async getAllServiceStaffs(): Promise<Staff[]> {
    return (await staffRepository.getAllServiceStaffs()) as Staff[];
  },

  async getStaffById(id: number): Promise<Staff | null> {
    return (await staffRepository.getById(id)) as Staff | null;
  },
};

export default staffService;
