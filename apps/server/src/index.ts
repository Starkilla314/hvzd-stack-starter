import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { zValidator } from "@hono/zod-validator";
import { ZProducts } from "@repo/shared";
import { ENV } from "./utils/env";

const app = new Hono();

// Enable CORS so frontend can call backend
app.use("/*", cors());

// Define routes
const routes = app
  .get("/api", (c) => c.text("Product Stock Manager API"))

  // Create Product Route
  .post("/api/products", zValidator("json", ZProducts), (c) => {
    const data = c.req.valid("json");

    // Mock database logic
    console.log("Creating product:", data.name);

    return c.json({
      success: true,
      message: `Product ${data.name} added with stock ${data.stock}`,
      product: data,
    });
  });

// Export the Type API
export type AppType = typeof routes;

const port = ENV.PORT;
console.log(`Starting in ${ENV.NODE_ENV} mode`);
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
