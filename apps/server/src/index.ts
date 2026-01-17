import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { zValidator } from "@hono/zod-validator";
import { ZProducts } from "@repo/shared";
import { ENV } from "./utils/env";
import { HTTPException } from "hono/http-exception";
import errorHandler from "./middlewares/errorHandler";
import notFound from "./middlewares/notFound";
import { serveStatic } from "@hono/node-server/serve-static";

const app = new Hono();

app.onError(errorHandler);
app.use("/*", cors());

// Define routes
const routes = app
  .get("/api", (_c) => {
    throw new HTTPException(404, { message: "Api Route not found" });
  })

  // Create Product Route
  .post(
    "/api/products",
    zValidator("json", ZProducts, (result, _c) => {
      if (!result.success) {
        throw result.error;
      }
    }),
    (c) => {
      const data = c.req.valid("json");

      // Mock database logic
      console.log("Creating product:", data.name);

      return c.json({
        success: true,
        message: `Product ${data.name} added with stock ${data.stock}`,
        product: data,
      });
    },
  );

// Export the Type API
export type AppType = typeof routes;

// Serve static files
app.use("/*", serveStatic({ root: "./dist/public" }));
app.get("*", serveStatic({ path: "./dist/public/index.html" }));

// Custom 404 (Only if static files and API both fail)
app.notFound(notFound);

const port = ENV.PORT;
console.log(`Starting in ${ENV.NODE_ENV} mode`);
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
