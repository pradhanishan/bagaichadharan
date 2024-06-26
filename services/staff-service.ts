import prisma from '@/lib/db';
import { Staff } from '@prisma/client';

async function getAllStaffs(): Promise<Staff[]> {
  return await prisma.staff.findMany({ orderBy: { name: 'asc' } });
}

async function getAllServiceStaffs(): Promise<Staff[]> {
  return await prisma.staff.findMany({ where: { staffType: 'Service' }, orderBy: { name: 'asc' } });
}

async function getStaffById(id: number): Promise<Staff | null> {
  const staff = await prisma.staff.findUnique({ where: { id } });
  return staff;
}

export { getAllStaffs, getStaffById, getAllServiceStaffs };
