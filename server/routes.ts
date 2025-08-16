import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertGrievanceSchema, insertDocumentSchema, insertPolicySchema, insertAnnouncementSchema } from "@shared/schema";
import { z } from "zod";
import multer from "multer";
import path from "path";
import fs from "fs";

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

  const httpServer = createServer(app);
  return httpServer;
}
