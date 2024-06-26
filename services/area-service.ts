import prisma from '@/lib/db';
import areaRepository from '@/repository/area-repository';
import type { Area } from '@/types/data-models';

async function getAllAreas(): Promise<Area[]> {
  return (await areaRepository.getAll()) as Area[];
}

async function getAreaById(id: number): Promise<Area | null> {
  return (await areaRepository.getById(id)) as Area | null;
}

export { getAllAreas, getAreaById };
