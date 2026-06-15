import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Discovery questionnaire submissions from the /discovery page.
 * Each row stores one complete form submission.
 */
export const discoverySubmissions = mysqlTable("discovery_submissions", {
  id: int("id").autoincrement().primaryKey(),
  contactName: varchar("contactName", { length: 255 }),
  contactEmail: varchar("contactEmail", { length: 320 }),
  contactCompany: varchar("contactCompany", { length: 255 }),
  /** Full JSON-encoded answers array */
  answersJson: text("answersJson").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type DiscoverySubmission = typeof discoverySubmissions.$inferSelect;
export type InsertDiscoverySubmission = typeof discoverySubmissions.$inferInsert;
