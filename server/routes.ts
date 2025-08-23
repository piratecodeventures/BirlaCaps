import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertGrievanceSchema, insertDocumentSchema, insertPolicySchema, insertAnnouncementSchema, insertBoardDirectorSchema, insertPromoterSchema } from "@shared/schema";
import { z } from "zod";
import multer from "multer";
import path from "path";
import fs from "fs";
import { sampleAnnouncements, sampleDocuments, sampleCompanyInfo, sampleBoardDirectors } from "./seed-data";

// Configure multer for file uploads
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const upload = multer({
  dest: uploadDir,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /pdf|jpg|jpeg|png|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only PDF, JPG, PNG, DOC, DOCX files are allowed."));
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve uploaded files
  app.use('/uploads', (req, res, next) => {
    res.setHeader('Content-Disposition', 'attachment');
    next();
  });

  // Serve PDF files from config/data directory with production optimizations
  app.use('/config/data', (req, res, next) => {
    // Set appropriate headers for PDF files
    if (req.path.endsWith('.pdf')) {
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'inline'); // Display in browser instead of forcing download
      // Cache PDF files for 1 day in production
      if (process.env.NODE_ENV === 'production') {
        res.setHeader('Cache-Control', 'public, max-age=86400');
      }
    } else if (req.path.endsWith('.xlsx') || req.path.endsWith('.xls')) {
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment'); // Force download for Excel files
      // Cache Excel files for 1 hour in production
      if (process.env.NODE_ENV === 'production') {
        res.setHeader('Cache-Control', 'public, max-age=3600');
      }
    }
    
    // Security headers for static files
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    
    next();
  }, express.static(path.join(import.meta.dirname, '..', 'config', 'data'), {
    maxAge: process.env.NODE_ENV === 'production' ? '1d' : '0',
    etag: true,
    lastModified: true
  }));

  // Public routes
  
  // Get investor documents
  app.get('/api/documents', async (req, res) => {
    try {
      const { type, fiscalYear } = req.query;
      const filters: any = {};
      
      if (type && typeof type === 'string') filters.type = type;
      if (fiscalYear) filters.fiscalYear = parseInt(fiscalYear as string);
      
      const documents = await storage.getInvestorDocuments(filters);
      res.json(documents);
    } catch (error) {
      console.error("Error fetching documents:", error);
      res.status(500).json({ message: "Failed to fetch documents" });
    }
  });

  // Search documents
  app.get('/api/documents/search', async (req, res) => {
    try {
      const { q } = req.query;
      if (!q || typeof q !== 'string') {
        return res.status(400).json({ message: "Search query is required" });
      }
      
      const documents = await storage.searchDocuments(q);
      res.json(documents);
    } catch (error) {
      console.error("Error searching documents:", error);
      res.status(500).json({ message: "Failed to search documents" });
    }
  });

  // Download document
  app.get('/api/documents/:id/download', async (req, res) => {
    try {
      const { id } = req.params;
      const document = await storage.getInvestorDocument(id);
      
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }
      
      // Increment download count
      await storage.incrementDocumentDownloads(id);
      
      // Serve file
      res.download(document.fileUrl, document.fileName);
    } catch (error) {
      console.error("Error downloading document:", error);
      res.status(500).json({ message: "Failed to download document" });
    }
  });

  // Get policies
  app.get('/api/policies', async (req, res) => {
    try {
      const policies = await storage.getPolicies();
      res.json(policies);
    } catch (error) {
      console.error("Error fetching policies:", error);
      res.status(500).json({ message: "Failed to fetch policies" });
    }
  });

  // Download policy
  app.get('/api/policies/:id/download', async (req, res) => {
    try {
      const { id } = req.params;
      const policy = await storage.getPolicy(id);
      
      if (!policy) {
        return res.status(404).json({ message: "Policy not found" });
      }
      
      res.download(policy.fileUrl, policy.fileName);
    } catch (error) {
      console.error("Error downloading policy:", error);
      res.status(500).json({ message: "Failed to download policy" });
    }
  });

  // Get announcements
  app.get('/api/announcements', async (req, res) => {
    try {
      const announcements = await storage.getAnnouncements(true);
      res.json(announcements);
    } catch (error) {
      console.error("Error fetching announcements:", error);
      res.status(500).json({ message: "Failed to fetch announcements" });
    }
  });

  // Submit grievance
  app.post('/api/grievances', upload.array('attachments', 5), async (req, res) => {
    try {
      const grievanceData = insertGrievanceSchema.parse(req.body);
      
      // Handle file attachments
      const files = req.files as Express.Multer.File[];
      const attachments = files?.map(file => ({
        filename: file.originalname,
        path: file.path,
        size: file.size,
        mimetype: file.mimetype
      })) || [];

      const grievance = await storage.createGrievance({
        ...grievanceData,
        attachments
      });

      res.status(201).json(grievance);
    } catch (error) {
      console.error("Error creating grievance:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to submit grievance" });
    }
  });

  // Get company info
  app.get('/api/company-info', async (req, res) => {
    try {
      const { section } = req.query;
      const info = await storage.getCompanyInfo(section as string);
      res.json(info);
    } catch (error) {
      console.error("Error fetching company info:", error);
      res.status(500).json({ message: "Failed to fetch company info" });
    }
  });

  // Admin routes (protected - simplified for MVP)
  
  // Get dashboard stats
  app.get('/api/admin/stats', async (req, res) => {
    try {
      const stats = await storage.getDashboardStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      res.status(500).json({ message: "Failed to fetch dashboard stats" });
    }
  });

  // Get all grievances (admin)
  app.get('/api/admin/grievances', async (req, res) => {
    try {
      const { status } = req.query;
      const grievances = await storage.getGrievances(status as string);
      res.json(grievances);
    } catch (error) {
      console.error("Error fetching grievances:", error);
      res.status(500).json({ message: "Failed to fetch grievances" });
    }
  });

  // Update grievance status (admin)
  app.patch('/api/admin/grievances/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      const grievance = await storage.updateGrievance(id, updates);
      res.json(grievance);
    } catch (error) {
      console.error("Error updating grievance:", error);
      res.status(500).json({ message: "Failed to update grievance" });
    }
  });

  // Create document (admin)
  app.post('/api/admin/documents', upload.single('file'), async (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ message: "File is required" });
      }

      const documentData = insertDocumentSchema.parse({
        ...req.body,
        fileUrl: file.path,
        fileName: file.originalname,
        fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`
      });

      const document = await storage.createInvestorDocument(documentData);
      res.status(201).json(document);
    } catch (error) {
      console.error("Error creating document:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create document" });
    }
  });

  // Create policy (admin)
  app.post('/api/admin/policies', upload.single('file'), async (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ message: "File is required" });
      }

      const policyData = insertPolicySchema.parse({
        ...req.body,
        fileUrl: file.path,
        fileName: file.originalname,
        effectiveDate: new Date(req.body.effectiveDate)
      });

      const policy = await storage.createPolicy(policyData);
      res.status(201).json(policy);
    } catch (error) {
      console.error("Error creating policy:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create policy" });
    }
  });

  // Create announcement (admin)
  app.post('/api/admin/announcements', async (req, res) => {
    try {
      const announcementData = insertAnnouncementSchema.parse(req.body);
      const announcement = await storage.createAnnouncement(announcementData);
      res.status(201).json(announcement);
    } catch (error) {
      console.error("Error creating announcement:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create announcement" });
    }
  });

  // Board of Directors routes
  app.get('/api/board-directors', async (req, res) => {
    try {
      const directors = await storage.getBoardDirectors();
      res.json(directors);
    } catch (error) {
      console.error("Error fetching board directors:", error);
      res.status(500).json({ message: "Failed to fetch board directors" });
    }
  });

  app.post('/api/admin/board-directors', async (req, res) => {
    try {
      const directorData = insertBoardDirectorSchema.parse(req.body);
      const director = await storage.createBoardDirector(directorData);
      res.status(201).json(director);
    } catch (error) {
      console.error("Error creating board director:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create board director" });
    }
  });

  app.patch('/api/admin/board-directors/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      const director = await storage.updateBoardDirector(id, updates);
      res.json(director);
    } catch (error) {
      console.error("Error updating board director:", error);
      res.status(500).json({ message: "Failed to update board director" });
    }
  });

  app.delete('/api/admin/board-directors/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteBoardDirector(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting board director:", error);
      res.status(500).json({ message: "Failed to delete board director" });
    }
  });

  // Promoters routes
  app.get('/api/promoters', async (req, res) => {
    try {
      const promoters = await storage.getPromoters();
      res.json(promoters);
    } catch (error) {
      console.error("Error fetching promoters:", error);
      res.status(500).json({ message: "Failed to fetch promoters" });
    }
  });

  app.post('/api/admin/promoters', async (req, res) => {
    try {
      const promoterData = insertPromoterSchema.parse(req.body);
      const promoter = await storage.createPromoter(promoterData);
      res.status(201).json(promoter);
    } catch (error) {
      console.error("Error creating promoter:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create promoter" });
    }
  });

  app.patch('/api/admin/promoters/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      const promoter = await storage.updatePromoter(id, updates);
      res.json(promoter);
    } catch (error) {
      console.error("Error updating promoter:", error);
      res.status(500).json({ message: "Failed to update promoter" });
    }
  });

  app.delete('/api/admin/promoters/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deletePromoter(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting promoter:", error);
      res.status(500).json({ message: "Failed to delete promoter" });
    }
  });

  // Seed database with sample data
  app.post('/api/admin/seed', async (req, res) => {
    try {
      console.log("Starting database seeding...");
      
      // Create sample announcements
      for (const announcement of sampleAnnouncements) {
        try {
          await storage.createAnnouncement(announcement);
        } catch (error) {
          console.log("Announcement already exists or error:", error);
        }
      }

      // Create sample documents
      for (const document of sampleDocuments) {
        try {
          await storage.createInvestorDocument(document);
        } catch (error) {
          console.log("Document already exists or error:", error);
        }
      }

      // Create sample board directors
      for (const director of sampleBoardDirectors) {
        try {
          await storage.createBoardDirector(director);
        } catch (error) {
          console.log("Director already exists or error:", error);
        }
      }

      console.log("Database seeding completed successfully!");
      res.json({ 
        message: "Database seeded successfully with sample data",
        counts: {
          announcements: sampleAnnouncements.length,
          documents: sampleDocuments.length,
          directors: sampleBoardDirectors.length
        }
      });
    } catch (error) {
      console.error("Error seeding database:", error);
      res.status(500).json({ message: "Failed to seed database", error: error instanceof Error ? error.message : String(error) });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
