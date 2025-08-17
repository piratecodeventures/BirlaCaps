import {
  users,
  investorDocuments,
  grievances,
  policies,
  announcements,
  companyInfo,
  boardDirectors,
  promoters,
  type User,
  type InsertUser,
  type InvestorDocument,
  type InsertInvestorDocument,
  type Grievance,
  type InsertGrievance,
  type Policy,
  type InsertPolicy,
  type Announcement,
  type InsertAnnouncement,
  type CompanyInfo,
  type InsertCompanyInfo,
  type BoardDirector,
  type InsertBoardDirector,
  type Promoter,
  type InsertPromoter,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, or, ilike, sql } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Document operations
  getInvestorDocuments(filters?: { type?: string; fiscalYear?: number }): Promise<InvestorDocument[]>;
  getInvestorDocument(id: string): Promise<InvestorDocument | undefined>;
  createInvestorDocument(document: InsertInvestorDocument): Promise<InvestorDocument>;
  updateInvestorDocument(id: string, document: Partial<InvestorDocument>): Promise<InvestorDocument>;
  deleteInvestorDocument(id: string): Promise<void>;
  incrementDocumentDownloads(id: string): Promise<void>;
  searchDocuments(query: string): Promise<InvestorDocument[]>;
  
  // Grievance operations
  getGrievances(status?: string): Promise<Grievance[]>;
  getGrievance(id: string): Promise<Grievance | undefined>;
  createGrievance(grievance: InsertGrievance): Promise<Grievance>;
  updateGrievance(id: string, grievance: Partial<Grievance>): Promise<Grievance>;
  
  // Policy operations
  getPolicies(): Promise<Policy[]>;
  getPolicy(id: string): Promise<Policy | undefined>;
  createPolicy(policy: InsertPolicy): Promise<Policy>;
  updatePolicy(id: string, policy: Partial<Policy>): Promise<Policy>;
  deletePolicy(id: string): Promise<void>;
  
  // Announcement operations
  getAnnouncements(published?: boolean): Promise<Announcement[]>;
  getAnnouncement(id: string): Promise<Announcement | undefined>;
  createAnnouncement(announcement: InsertAnnouncement): Promise<Announcement>;
  updateAnnouncement(id: string, announcement: Partial<Announcement>): Promise<Announcement>;
  deleteAnnouncement(id: string): Promise<void>;
  
  // Company info operations
  getCompanyInfo(section?: string): Promise<CompanyInfo[]>;
  updateCompanyInfo(section: string, info: InsertCompanyInfo): Promise<CompanyInfo>;
  
  // Board of Directors operations
  getBoardDirectors(): Promise<BoardDirector[]>;
  getBoardDirector(id: string): Promise<BoardDirector | undefined>;
  createBoardDirector(director: InsertBoardDirector): Promise<BoardDirector>;
  updateBoardDirector(id: string, director: Partial<BoardDirector>): Promise<BoardDirector>;
  deleteBoardDirector(id: string): Promise<void>;
  
  // Promoters operations
  getPromoters(): Promise<Promoter[]>;
  getPromoter(id: string): Promise<Promoter | undefined>;
  createPromoter(promoter: InsertPromoter): Promise<Promoter>;
  updatePromoter(id: string, promoter: Partial<Promoter>): Promise<Promoter>;
  deletePromoter(id: string): Promise<void>;
  
  // Dashboard stats
  getDashboardStats(): Promise<{
    totalDocuments: number;
    activeGrievances: number;
    monthlyDownloads: number;
    totalPolicies: number;
  }>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Document operations
  async getInvestorDocuments(filters?: { type?: string; fiscalYear?: number }): Promise<InvestorDocument[]> {
    let query = db.select().from(investorDocuments);
    
    if (filters) {
      const conditions = [];
      if (filters.type) {
        conditions.push(eq(investorDocuments.type, filters.type));
      }
      if (filters.fiscalYear) {
        conditions.push(eq(investorDocuments.fiscalYear, filters.fiscalYear));
      }
      if (conditions.length > 0) {
        query = query.where(and(...conditions)) as any;
      }
    }
    
    return await query.orderBy(desc(investorDocuments.createdAt));
  }

  async getInvestorDocument(id: string): Promise<InvestorDocument | undefined> {
    const [document] = await db.select().from(investorDocuments).where(eq(investorDocuments.id, id));
    return document;
  }

  async createInvestorDocument(document: InsertInvestorDocument): Promise<InvestorDocument> {
    const [newDoc] = await db
      .insert(investorDocuments)
      .values(document)
      .returning();
    return newDoc;
  }

  async updateInvestorDocument(id: string, document: Partial<InvestorDocument>): Promise<InvestorDocument> {
    const [updated] = await db
      .update(investorDocuments)
      .set({ ...document, updatedAt: new Date() })
      .where(eq(investorDocuments.id, id))
      .returning();
    return updated;
  }

  async deleteInvestorDocument(id: string): Promise<void> {
    await db.delete(investorDocuments).where(eq(investorDocuments.id, id));
  }

  async incrementDocumentDownloads(id: string): Promise<void> {
    await db
      .update(investorDocuments)
      .set({
        downloads: sql`${investorDocuments.downloads} + 1`,
        updatedAt: new Date()
      })
      .where(eq(investorDocuments.id, id));
  }

  async searchDocuments(query: string): Promise<InvestorDocument[]> {
    return await db
      .select()
      .from(investorDocuments)
      .where(
        or(
          ilike(investorDocuments.title, `%${query}%`),
          ilike(investorDocuments.description, `%${query}%`)
        )
      )
      .orderBy(desc(investorDocuments.createdAt));
  }

  // Grievance operations
  async getGrievances(status?: string): Promise<Grievance[]> {
    let query = db.select().from(grievances);
    
    if (status) {
      query = query.where(eq(grievances.status, status)) as any;
    }
    
    return await query.orderBy(desc(grievances.createdAt));
  }

  async getGrievance(id: string): Promise<Grievance | undefined> {
    const [grievance] = await db.select().from(grievances).where(eq(grievances.id, id));
    return grievance;
  }

  async createGrievance(grievance: InsertGrievance): Promise<Grievance> {
    const [newGrievance] = await db
      .insert(grievances)
      .values(grievance)
      .returning();
    return newGrievance;
  }

  async updateGrievance(id: string, grievance: Partial<Grievance>): Promise<Grievance> {
    const [updated] = await db
      .update(grievances)
      .set({ ...grievance, updatedAt: new Date() })
      .where(eq(grievances.id, id))
      .returning();
    return updated;
  }

  // Policy operations
  async getPolicies(): Promise<Policy[]> {
    return await db
      .select()
      .from(policies)
      .where(eq(policies.isActive, true))
      .orderBy(desc(policies.updatedAt));
  }

  async getPolicy(id: string): Promise<Policy | undefined> {
    const [policy] = await db.select().from(policies).where(eq(policies.id, id));
    return policy;
  }

  async createPolicy(policy: InsertPolicy): Promise<Policy> {
    const [newPolicy] = await db
      .insert(policies)
      .values(policy)
      .returning();
    return newPolicy;
  }

  async updatePolicy(id: string, policy: Partial<Policy>): Promise<Policy> {
    const [updated] = await db
      .update(policies)
      .set({ ...policy, updatedAt: new Date() })
      .where(eq(policies.id, id))
      .returning();
    return updated;
  }

  async deletePolicy(id: string): Promise<void> {
    await db
      .update(policies)
      .set({ isActive: false, updatedAt: new Date() })
      .where(eq(policies.id, id));
  }

  // Announcement operations
  async getAnnouncements(published?: boolean): Promise<Announcement[]> {
    let query = db.select().from(announcements);
    
    if (published !== undefined) {
      query = query.where(eq(announcements.isPublished, published)) as any;
    }
    
    return await query.orderBy(desc(announcements.createdAt));
  }

  async getAnnouncement(id: string): Promise<Announcement | undefined> {
    const [announcement] = await db.select().from(announcements).where(eq(announcements.id, id));
    return announcement;
  }

  async createAnnouncement(announcement: InsertAnnouncement): Promise<Announcement> {
    const [newAnnouncement] = await db
      .insert(announcements)
      .values(announcement)
      .returning();
    return newAnnouncement;
  }

  async updateAnnouncement(id: string, announcement: Partial<Announcement>): Promise<Announcement> {
    const [updated] = await db
      .update(announcements)
      .set({ ...announcement, updatedAt: new Date() })
      .where(eq(announcements.id, id))
      .returning();
    return updated;
  }

  async deleteAnnouncement(id: string): Promise<void> {
    await db.delete(announcements).where(eq(announcements.id, id));
  }

  // Company info operations
  async getCompanyInfo(section?: string): Promise<CompanyInfo[]> {
    let query = db.select().from(companyInfo);
    
    if (section) {
      query = query.where(eq(companyInfo.section, section)) as any;
    }
    
    return await query;
  }

  async updateCompanyInfo(section: string, info: InsertCompanyInfo): Promise<CompanyInfo> {
    const [updated] = await db
      .insert(companyInfo)
      .values({ ...info, section })
      .onConflictDoUpdate({
        target: companyInfo.section,
        set: { ...info, updatedAt: new Date() }
      })
      .returning();
    return updated;
  }

  // Board of Directors operations
  async getBoardDirectors(): Promise<BoardDirector[]> {
    return await db
      .select()
      .from(boardDirectors)
      .orderBy(boardDirectors.sortOrder, boardDirectors.name);
  }

  async getBoardDirector(id: string): Promise<BoardDirector | undefined> {
    const [director] = await db.select().from(boardDirectors).where(eq(boardDirectors.id, id));
    return director;
  }

  async createBoardDirector(director: InsertBoardDirector): Promise<BoardDirector> {
    const [newDirector] = await db
      .insert(boardDirectors)
      .values(director)
      .returning();
    return newDirector;
  }

  async updateBoardDirector(id: string, director: Partial<BoardDirector>): Promise<BoardDirector> {
    const [updated] = await db
      .update(boardDirectors)
      .set({ ...director, updatedAt: new Date() })
      .where(eq(boardDirectors.id, id))
      .returning();
    return updated;
  }

  async deleteBoardDirector(id: string): Promise<void> {
    await db.delete(boardDirectors).where(eq(boardDirectors.id, id));
  }

  // Promoters operations
  async getPromoters(): Promise<Promoter[]> {
    return await db
      .select()
      .from(promoters)
      .orderBy(promoters.sortOrder, promoters.name);
  }

  async getPromoter(id: string): Promise<Promoter | undefined> {
    const [promoter] = await db.select().from(promoters).where(eq(promoters.id, id));
    return promoter;
  }

  async createPromoter(promoter: InsertPromoter): Promise<Promoter> {
    const [newPromoter] = await db
      .insert(promoters)
      .values(promoter)
      .returning();
    return newPromoter;
  }

  async updatePromoter(id: string, promoter: Partial<Promoter>): Promise<Promoter> {
    const [updated] = await db
      .update(promoters)
      .set({ ...promoter, updatedAt: new Date() })
      .where(eq(promoters.id, id))
      .returning();
    return updated;
  }

  async deletePromoter(id: string): Promise<void> {
    await db.delete(promoters).where(eq(promoters.id, id));
  }

  // Dashboard stats
  async getDashboardStats(): Promise<{
    totalDocuments: number;
    activeGrievances: number;
    monthlyDownloads: number;
    totalPolicies: number;
  }> {
    const [documentsCount] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(investorDocuments);

    const [grievancesCount] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(grievances)
      .where(eq(grievances.status, 'OPEN'));

    const [downloadsSum] = await db
      .select({ sum: sql<number>`coalesce(sum(${investorDocuments.downloads}), 0)::int` })
      .from(investorDocuments);

    const [policiesCount] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(policies)
      .where(eq(policies.isActive, true));

    return {
      totalDocuments: documentsCount.count,
      activeGrievances: grievancesCount.count,
      monthlyDownloads: downloadsSum.sum,
      totalPolicies: policiesCount.count,
    };
  }
}

export const storage = new DatabaseStorage();
