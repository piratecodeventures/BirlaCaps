import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// SQLite Tables for local development
export const users = sqliteTable("users", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  username: text("username", { length: 50 }).notNull().unique(),
  email: text("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  role: text("role", { length: 20 }).notNull().default("user"),
  createdAt: text("created_at").$defaultFn(() => new Date().toISOString()),
  updatedAt: text("updated_at").$defaultFn(() => new Date().toISOString()),
});

export const investorDocuments = sqliteTable("investor_documents", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  title: text("title", { length: 255 }).notNull(),
  type: text("type", { length: 50 }).notNull(),
  description: text("description"),
  fiscalYear: integer("fiscal_year"),
  fileUrl: text("file_url", { length: 512 }).notNull(),
  fileName: text("file_name", { length: 255 }).notNull(),
  fileSize: text("file_size", { length: 50 }),
  downloads: integer("downloads").default(0),
  version: integer("version").default(1),
  metadata: text("metadata", { mode: 'json' }),
  createdAt: text("created_at").$defaultFn(() => new Date().toISOString()),
  updatedAt: text("updated_at").$defaultFn(() => new Date().toISOString()),
});

export const grievances = sqliteTable("grievances", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name", { length: 100 }).notNull(),
  email: text("email", { length: 255 }).notNull(),
  phone: text("phone", { length: 20 }).notNull(),
  grievanceType: text("grievance_type", { length: 50 }),
  subject: text("subject", { length: 200 }).notNull(),
  description: text("description").notNull(),
  attachments: text("attachments", { mode: 'json' }),
  status: text("status", { length: 20 }).default("OPEN"),
  assignedTo: text("assigned_to"),
  resolutionDeadline: text("resolution_deadline"),
  resolution: text("resolution"),
  createdAt: text("created_at").$defaultFn(() => new Date().toISOString()),
  updatedAt: text("updated_at").$defaultFn(() => new Date().toISOString()),
});

export const policies = sqliteTable("policies", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  title: text("title", { length: 255 }).notNull(),
  description: text("description"),
  category: text("category", { length: 50 }).notNull(),
  fileUrl: text("file_url", { length: 512 }).notNull(),
  fileName: text("file_name", { length: 255 }).notNull(),
  effectiveDate: text("effective_date").notNull(),
  version: integer("version").default(1),
  changeHistory: text("change_history", { mode: 'json' }),
  isActive: integer("is_active", { mode: 'boolean' }).default(true),
  createdAt: text("created_at").$defaultFn(() => new Date().toISOString()),
  updatedAt: text("updated_at").$defaultFn(() => new Date().toISOString()),
});

export const announcements = sqliteTable("announcements", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  title: text("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  content: text("content"),
  priority: text("priority", { length: 20 }).default("NORMAL"),
  isPublished: integer("is_published", { mode: 'boolean' }).default(false),
  publishedAt: text("published_at"),
  createdAt: text("created_at").$defaultFn(() => new Date().toISOString()),
  updatedAt: text("updated_at").$defaultFn(() => new Date().toISOString()),
});

export const companyInfo = sqliteTable("company_info", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  section: text("section", { length: 50 }).notNull().unique(),
  title: text("title", { length: 255 }),
  content: text("content").notNull(),
  metadata: text("metadata", { mode: 'json' }),
  updatedAt: text("updated_at").$defaultFn(() => new Date().toISOString()),
});

export const boardDirectors = sqliteTable("board_directors", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name", { length: 255 }).notNull(),
  address: text("address").notNull(),
  designation: text("designation", { length: 100 }).notNull(),
  din: text("din", { length: 20 }).notNull().unique(),
  experience: text("experience").notNull(),
  sortOrder: integer("sort_order").default(0),
  createdAt: text("created_at").$defaultFn(() => new Date().toISOString()),
  updatedAt: text("updated_at").$defaultFn(() => new Date().toISOString()),
});

export const promoters = sqliteTable("promoters", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name", { length: 255 }).notNull(),
  category: text("category", { length: 50 }).notNull(),
  sortOrder: integer("sort_order").default(0),
  createdAt: text("created_at").$defaultFn(() => new Date().toISOString()),
  updatedAt: text("updated_at").$defaultFn(() => new Date().toISOString()),
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

export const insertBoardDirectorSchema = createInsertSchema(boardDirectors).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPromoterSchema = createInsertSchema(promoters).omit({
  id: true,
  createdAt: true,
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

export type BoardDirector = typeof boardDirectors.$inferSelect;
export type InsertBoardDirector = z.infer<typeof insertBoardDirectorSchema>;

export type Promoter = typeof promoters.$inferSelect;
export type InsertPromoter = z.infer<typeof insertPromoterSchema>;