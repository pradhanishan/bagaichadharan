import prisma from '@/lib/db';

/**
 * Retrieves all staffs from the database.
 * @returns {Promise<{ id: number; name: string; }[]>} Array of staffs with their id and name.
 */
async function getAllStaffs(): Promise<{ id: number; name: string }[]> {
  const staffs = await prisma.staff.findMany({ orderBy: { name: 'asc' } });
  return staffs.map((staff) => ({
    id: staff.id,
    name: staff.name,
  }));
}

export { getAllStaffs };
