import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "example",
    database: "postgres",
  },
});
