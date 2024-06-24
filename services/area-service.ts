import prisma from '@/lib/db';

/**
 * Retrieves all dining areas from the database.
 * @returns {Promise<{ id: number; name: string; }[]>} Array of dining areas with their id and name.
 */
async function getAllAreas(): Promise<{ id: number; name: string }[]> {
  const areas = await prisma.area.findMany({ orderBy: { name: 'asc' } });
  return areas.map((area) => ({
    id: area.id,
    name: area.name,
  }));
}

async function getAreaById(id: number) {
  const area = await prisma.area.findUnique({ where: { id } });
  return area;
}

export { getAllAreas, getAreaById };
