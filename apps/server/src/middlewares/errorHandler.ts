import { DrizzleError } from "drizzle-orm/errors";
import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import type { ContentfulStatusCode } from "hono/utils/http-status";
import { ENV } from "../utils/env";
import respond from "../utils/respond";
import z, { ZodError } from "zod";

const errorHandler = (err: Error | HTTPException, c: Context) => {
  if (err instanceof ZodError) {
    const simpleErrors = z.flattenError(err).fieldErrors;

    if (ENV.NODE_ENV === "development") console.log("[ValidationError]", err);

    return c.json(respond(false, "Validation Failed", null, simpleErrors), 422);
  }

  if (err instanceof HTTPException) {
    if (ENV.NODE_ENV === "development" && err.status >= 500) {
      console.log("[HTTPException]", err);
    }

    return c.json(
      respond(false, err.message, null, null),
      err.status as ContentfulStatusCode,
    );
  }

  if (
    err instanceof DrizzleError ||
    (err as any).name === "DrizzleQueryError"
  ) {
    const cause = (err.cause as { message?: string; code?: number }) || {};
    const dbMsg = cause.message || (err as any).message || "";
    const isUnique =
      dbMsg.includes("UNIQUE constraint failed") ||
      dbMsg.includes("duplicate key value");

    if (ENV.NODE_ENV === "development") {
      console.log("[DrizzleError]", {
        name: err.name,
        message: err.message,
        code: cause.code,
        detail: dbMsg,
      });
    }

    const errorData =
      ENV.NODE_ENV === "development"
        ? {
            drizzleName: err.name,
            message: err.message,
            code: cause.code ?? null,
            detail: dbMsg,
          }
        : null;

    const message =
      ENV.NODE_ENV === "development"
        ? "Database Error"
        : "Internal Server Error";

    return c.json(
      respond(false, message, null, errorData),
      isUnique ? 409 : 500,
    );
  }
  if (ENV.NODE_ENV === "development") {
    console.log("[UnknownError]", err);
  }

  const fallbackData =
    ENV.NODE_ENV === "development"
      ? { message: err.message, stack: err.stack }
      : null;

  return c.json(
    respond(false, "Internal Server Error", null, fallbackData),
    500,
  );
};

export default errorHandler;
