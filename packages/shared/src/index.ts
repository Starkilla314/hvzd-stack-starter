import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { z } from "zod";

export const Products = sqliteTable("products", {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  stock: integer().notNull(),
});

export const ZProducts = createSelectSchema(Products);
export type TProducts = z.infer<typeof ZProducts>;

export const ZProductsInsert = createInsertSchema(Products);
export type TProductsInsert = z.infer<typeof ZProductsInsert>;

export const ZProductsUpdate = createUpdateSchema(Products);
export type TProductsUpdate = z.infer<typeof ZProductsUpdate>;
