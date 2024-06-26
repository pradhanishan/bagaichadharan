import prisma from '@/lib/db';
import { Prisma, PrismaClient } from '@prisma/client';

// Define a base repository interface with generic type T
interface BaseRepository<T> {
  getAll(): Promise<T[]>;
  getById(id: number): Promise<T | null>;
  getByIds(ids: number[]): Promise<T[]>;
  create(data: Partial<T>): Promise<T>;
  update(id: number, data: Partial<T>): Promise<T | null>;
  delete(id: number): Promise<T | null>;
}

// Get all keys of PrismaClient to use as entity names
type EntityNames = keyof PrismaClient;

// Function to create a repository instance for a given entity
export function createBaseRepository<T>(entityName: EntityNames): BaseRepository<T> {
  return {
    async getAll(): Promise<T[]> {
      const entities = await (prisma[entityName] as any).findMany();
      return entities as T[];
    },
    async getById(id: number): Promise<T | null> {
      const entity = await (prisma[entityName] as any).findUnique({
        where: { id },
      });
      return entity as T | null;
    },
    async getByIds(ids: number[]): Promise<T[]> {
      const entities = await (prisma[entityName] as any).findMany({
        where: {
          id: {
            in: ids,
          },
        },
      });
      return entities as T[];
    },
    async create(data: Partial<T>): Promise<T> {
      const createdEntity = await (prisma[entityName] as any).create({
        data,
      });
      return createdEntity as T;
    },
    async update(id: number, data: Partial<T>): Promise<T | null> {
      const updatedEntity = await (prisma[entityName] as any).update({
        where: { id },
        data,
      });
      return updatedEntity as T | null;
    },
    async delete(id: number): Promise<T | null> {
      const deletedEntity = await (prisma[entityName] as any).delete({
        where: { id },
      });
      return deletedEntity as T | null;
    },
  };
}
