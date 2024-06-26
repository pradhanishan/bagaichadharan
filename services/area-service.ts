// area-service.ts
import areaRepository from '@/repository/area-repository';
import type { Area } from '@/types/data-models';

interface IAreaService {
  getAllAreas(): Promise<Area[]>;
  getAreaById(id: number): Promise<Area | null>;
}

const areaService: IAreaService = {
  async getAllAreas(): Promise<Area[]> {
    return (await areaRepository.getAll()) as Area[];
  },

  async getAreaById(id: number): Promise<Area | null> {
    return (await areaRepository.getById(id)) as Area | null;
  },
};

export { areaService };
