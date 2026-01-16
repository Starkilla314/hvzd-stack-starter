# 🔥 H.V.Z.D Stack Monorepo (Hono + Vite + Zod + Drizzle)

### The ultimate type-safe boilerplate for fullstack applications. Shared schemas, instant RPC, and blazing-fast development.

Created by [Karots](https://github.com/Adhnan23)

---

## 📑 Table of Contents

* [Features](https://www.google.com/search?q=%23-features)
* [Architecture](https://www.google.com/search?q=%23-architecture)
* [The Magic: Hono RPC](https://www.google.com/search?q=%23-the-magic-hono-rpc)
* [Project Structure](https://www.google.com/search?q=%23-project-structure)
* [Getting Started](https://www.google.com/search?q=%23-getting-started)
* [Database Management](https://www.google.com/search?q=%23-database-management)
* [Environment Configuration](https://www.google.com/search?q=%23-environment-configuration)
* [Deployment](https://www.google.com/search?q=%23-deployment)
* [License](https://www.google.com/search?q=%23-license)

---

## ✨ Features

* **🛡️ End-to-End Type Safety:** Share Zod schemas between Backend and Frontend. Change a column in Drizzle, and your React forms break instantly in development.
* **🚀 Hono RPC:** Forget Axios/Fetch manual typing. Get full IntelliSense for your API routes in the frontend.
* **📦 Shared Package:** A dedicated `packages/shared` for your Drizzle schemas, Zod validators, and common TypeScript types.
* **⚡ Modern Tooling:** Powered by **pnpm workspaces**, **Vite 6** (with Rolldown), and **Turso (LibSQL)**.
* **🎨 Tailwind 4:** Integrated with the latest `@tailwindcss/vite` for maximum styling performance.

---

## 🏗️ Architecture

This monorepo uses **pnpm workspaces** to link three distinct parts:

1. **`apps/server`**: Hono API running on Node/Bun.
2. **`apps/client`**: Vite + React SPA.
3. **`packages/shared`**: The "Source of Truth" for your data layer.

---

## 🪄 The Magic: Hono RPC

With this template, you don't guess API paths. You use the `AppType` to get auto-completion for every route.

```ts
// apps/client/src/App.tsx
import { hc } from 'hono/client';
import type { AppType } from '@server/index';

const client = hc<AppType>('/');

// ✅ Fully typed request and response!
const res = await client.api.products.$post({
  json: { name: "Gaming Mouse", stock: 50 }
});

```

---

## 📂 Project Structure

```text
.
├── apps/
│   ├── client/         # Vite + React (Frontend)
│   └── server/         # Hono + Turso (Backend)
├── packages/
│   └── shared/         # Drizzle Schemas & Zod Types
├── pnpm-workspace.yaml # Workspace definition
└── package.json        # Global scripts & pnpm overrides

```

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
pnpm install

```

### 2. Set up environment

Create `.env` files in both `apps/client` and `apps/server`.

**Server `.env`:**

```env
PORT=3000
TURSO_DATABASE_URL=libsql://...
TURSO_AUTH_TOKEN=your_token

```

### 3. Initialize Database

```bash
pnpm db:push

```

### 4. Run development server

```bash
pnpm dev

```

> This runs both Hono (Port 3000) and Vite (Port 5173) in parallel.

---

## 🗄️ Database Management

| Script | Action |
| --- | --- |
| `pnpm db:gen` | Generate SQL migrations from shared schemas |
| `pnpm db:push` | Push schema changes directly to Turso |
| `pnpm db:studio` | Launch Drizzle Studio GUI |

---

## 🛡️ Environment Configuration

The backend uses a strictly typed `ENV` object. If you miss a variable, the server won't start.

**Location:** `apps/server/src/utils/env.ts`

```ts
const envSchema = z.object({
  TURSO_DATABASE_URL: z.string().url(),
  TURSO_AUTH_TOKEN: z.string(),
  PORT: z.string().default("3000")
});

```

---

## 🚀 Deployment

This template is designed to be served as a **single unit**:

1. Vite builds the frontend into `apps/server/dist/public`.
2. Hono serves the API on `/api/*` and the static React files on `/*`.

```bash
pnpm build
pnpm start

```

---

## 👨‍💻 Author

**Karots**

* Portfolio: [karots.lk](https://karots.lk)
* GitHub: [@Adhnan23](https://github.com/Adhnan23)

> Loved this setup? Give it a ⭐ and save yourself 2 hours next time!