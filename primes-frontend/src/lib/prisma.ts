import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const poolConfig = {
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: '9@wUA%8PQnrpb-',
  database: 'rail_db',
  connectionLimit: 20
};

const globalForPrisma = global as unknown as { prisma_v3: PrismaClient };

export const prisma =
  globalForPrisma.prisma_v3 ||
  new PrismaClient({
    // @ts-ignore
    adapter: new PrismaMariaDb(poolConfig)
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma_v3 = prisma;
