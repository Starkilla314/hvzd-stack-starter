import { drizzle } from "drizzle-orm/libsql";
import { ENV } from "../utils/env";

const db = drizzle({
  connection: {
    url: ENV.TURSO_DATABASE_URL,
    authToken: ENV.TURSO_AUTH_TOKEN!,
  },
});

export default db;
