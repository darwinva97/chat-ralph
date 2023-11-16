import { PrismaClient } from "@prisma/client";
import { NODE_ENV } from "./config"


const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (NODE_ENV !== "production") globalForPrisma.prisma = db;
