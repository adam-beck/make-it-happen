import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { drizzle } from "drizzle-orm/postgres-js";

import postgres from "postgres";
import * as schema from "./schema";

export const queryClient = postgres(
  "postgres://postgres:example@localhost:5432/postgres",
);

export const db = drizzle(queryClient, { schema });

export const luciaAdapter = new DrizzlePostgreSQLAdapter(
  db,
  schema.sessionTable,
  schema.userTable,
);
