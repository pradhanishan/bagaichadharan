import staffRepository from '@/repository/staff-repository';
import type { Staff } from '@/types/data-models';

async function getAllStaffs(): Promise<Staff[]> {
  return (await staffRepository.getAll()) as Staff[];
}

async function getAllServiceStaffs(): Promise<Staff[]> {
  return (await staffRepository.getAllServiceStaffs()) as Staff[];
}

async function getStaffById(id: number): Promise<Staff | null> {
  return (await staffRepository.getById(id)) as Staff | null;
}

export { getAllStaffs, getStaffById, getAllServiceStaffs };
