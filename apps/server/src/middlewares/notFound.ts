import type { NotFoundHandler } from "hono";
import respond from "../utils/respond";

const notFound: NotFoundHandler = (c) => {
  return c.json(
    respond(false, "Not Found", null, {
      path: c.req.path,
      method: c.req.method,
    }),
    404,
  );
};

export default notFound;
