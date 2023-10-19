import { PrismaClient } from "@prisma/client";

// const globalForPrisma = global as unknown as { prisma: PrismaClient };

// export const prisma =
//   globalForPrisma.prisma ||
//   new PrismaClient({
//     log: ["query"],
//   });

// if (import.meta.env.DEV) globalForPrisma.prisma = prisma;

// eslint-disable-next-line @typescript-eslint/no-namespace
// declare namespace globalThis {
//   let prismaClient: PrismaClient | undefined;
// }

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}




export const prisma =
  global.prisma ||
  new PrismaClient({
    log:
      import.meta.env.DEV ? ["query", "error", "warn"] : ["error"],
  });

if (import.meta.env.DEV) {
  globalThis.prisma || (globalThis.prisma = new PrismaClient());
}
