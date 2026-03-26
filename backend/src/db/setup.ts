import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@src/db/schema.js";

const db = drizzle(process.env.DATABASE_URL!, {
  schema,
});

export default db;
