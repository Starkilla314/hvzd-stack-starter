import { useState } from "react";
import { hc } from "hono/client";
// Import the TYPE only from the server
import type { AppType } from "../../../server/src/index.ts";

// Initialize Hono RPC Client
const client = hc<AppType>("/");

const Home = () => {
  const [status, setStatus] = useState<string>("");

  const handleAddProduct = async () => {
    // 1. Make the request
    const res = await client.api.products.$post({
      json: {
        id: 1,
        name: "Keyboard",
        stock: 10,
      },
    });

    // 2. Handle response
    if (res.ok) {
      const data = await res.json();
      setStatus(data.message);
    } else {
      // If validation fails (e.g., negative stock)
      setStatus("Failed to add product");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Product Stock Manager</h1>
      <button onClick={handleAddProduct}>Add Test Product</button>

      {status && <p style={{ marginTop: "1rem" }}>Result: {status}</p>}
    </div>
  );
};

export default Home;
