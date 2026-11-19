import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const globalDb = globalThis as typeof globalThis & { guestbookDb?: PrismaClient };

export function getDb() {
  if (!globalDb.guestbookDb) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error("DATABASE_URL is not configured");
    }
    globalDb.guestbookDb = new PrismaClient({
      adapter: new PrismaPg({ connectionString, max: 3, connectionTimeoutMillis: 5000 }),
    });
  }
  return globalDb.guestbookDb;
}
