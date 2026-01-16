import { z } from "zod";

const envSchema = z.object({
  PORT: z
    .string()
    .default("3000")
    .transform((v) => parseInt(v, 10)),
  TURSO_DATABASE_URL: z.url({
    message: "TURSO_DATABASE_URL must be a valid URL (libsql://...)",
  }),
  TURSO_AUTH_TOKEN: z.string().min(1, {
    message: "TURSO_AUTH_TOKEN is required",
  }),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

export const ENV = envSchema.parse(process.env);
export type Env = z.infer<typeof envSchema>;
