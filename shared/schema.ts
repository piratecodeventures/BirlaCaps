import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, uuid, jsonb, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  username: varchar("username", { length: 50 }).notNull().unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  role: varchar("role", { length: 20 }).notNull().default("user"), // 'admin', 'user'
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Investor documents table
export const investorDocuments = pgTable("investor_documents", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  title: varchar("title", { length: 255 }).notNull(),
  type: varchar("type", { length: 50 }).notNull(), // 'ANNUAL_REPORT', 'QUARTERLY_RESULT', 'ANNOUNCEMENT', 'GOVERNANCE'
  description: text("description"),
  fiscalYear: integer("fiscal_year"),
  fileUrl: varchar("file_url", { length: 512 }).notNull(),
  fileName: varchar("file_name", { length: 255 }).notNull(),
  fileSize: varchar("file_size", { length: 50 }),
  downloads: integer("downloads").default(0),
  version: integer("version").default(1),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Grievances table
export const grievances = pgTable("grievances", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  grievanceType: varchar("grievance_type", { length: 50 }),
  subject: varchar("subject", { length: 200 }).notNull(),
  description: text("description").notNull(),
  attachments: jsonb("attachments"), // Array of file paths
  status: varchar("status", { length: 20 }).default("OPEN"), // 'OPEN', 'IN_PROGRESS', 'RESOLVED', 'ESCALATED'
  assignedTo: uuid("assigned_to").references(() => users.id),
  resolutionDeadline: timestamp("resolution_deadline"),
  resolution: text("resolution"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Policies table
export const policies = pgTable("policies", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  category: varchar("category", { length: 50 }).notNull(),
  fileUrl: varchar("file_url", { length: 512 }).notNull(),
  fileName: varchar("file_name", { length: 255 }).notNull(),
  effectiveDate: timestamp("effective_date").notNull(),
  version: integer("version").default(1),
  changeHistory: jsonb("change_history"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Announcements table
export const announcements = pgTable("announcements", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  content: text("content"),
  priority: varchar("priority", { length: 20 }).default("NORMAL"), // 'HIGH', 'NORMAL', 'LOW'
  isPublished: boolean("is_published").default(false),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Company information table
export const companyInfo = pgTable("company_info", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  section: varchar("section", { length: 50 }).notNull().unique(), // 'MISSION', 'VISION', 'COMPANY_SECRETARY'
  title: varchar("title", { length: 255 }),
  content: text("content").notNull(),
  metadata: jsonb("metadata"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertDocumentSchema = createInsertSchema(investorDocuments).omit({
  id: true,
  downloads: true,
  createdAt: true,
  updatedAt: true,
});

export const insertGrievanceSchema = createInsertSchema(grievances).omit({
  id: true,
  status: true,
  assignedTo: true,
  resolutionDeadline: true,
  resolution: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPolicySchema = createInsertSchema(policies).omit({
  id: true,
  version: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
});

export const insertAnnouncementSchema = createInsertSchema(announcements).omit({
  id: true,
  isPublished: true,
  publishedAt: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCompanyInfoSchema = createInsertSchema(companyInfo).omit({
  id: true,
  updatedAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type InvestorDocument = typeof investorDocuments.$inferSelect;
export type InsertInvestorDocument = z.infer<typeof insertDocumentSchema>;

export type Grievance = typeof grievances.$inferSelect;
export type InsertGrievance = z.infer<typeof insertGrievanceSchema>;

export type Policy = typeof policies.$inferSelect;
export type InsertPolicy = z.infer<typeof insertPolicySchema>;

export type Announcement = typeof announcements.$inferSelect;
export type InsertAnnouncement = z.infer<typeof insertAnnouncementSchema>;

export type CompanyInfo = typeof companyInfo.$inferSelect;
export type InsertCompanyInfo = z.infer<typeof insertCompanyInfoSchema>;
