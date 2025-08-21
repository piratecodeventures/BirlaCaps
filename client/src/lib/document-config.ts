// Document configuration loader for YAML-based PDF management
import { InvestorDocument } from '@shared/schema';

interface DocumentConfig {
  id: string;
  title: string;
  type: 'ANNUAL_REPORT' | 'QUARTERLY_RESULT' | 'ANNOUNCEMENT' | 'GOVERNANCE';
  description: string;
  fiscal_year?: number;
  file_path: string;
  file_name: string;
  category: string;
  tags: string[];
  priority: 'HIGH' | 'NORMAL' | 'LOW';
  featured: boolean;
}

interface UISettings {
  theme: {
    primary_color: string;
    secondary_color: string;
    accent_color: string;
  };
  layout: {
    cards_per_row: number;
    show_featured_first: boolean;
    enable_search: boolean;
    enable_filters: boolean;
  };
  pdf_viewer: {
    enable_inline_preview: boolean;
    max_preview_pages: number;
    enable_download: boolean;
    enable_print: boolean;
    zoom_levels: number[];
  };
}

interface YAMLConfig {
  documents: {
    financial_reports: DocumentConfig[];
    announcements: DocumentConfig[];
    governance: DocumentConfig[];
  };
  ui_settings: UISettings;
  metadata: {
    last_updated: string;
    version: string;
    maintained_by: string;
  };
}

// Mock YAML data (in production, this would be loaded from the YAML file)
const documentConfig: YAMLConfig = {
  documents: {
    financial_reports: [
      {
        id: "annual_report_2024",
        title: "Annual Report 2024",
        type: "ANNUAL_REPORT",
        description: "Comprehensive annual report showcasing financial performance, governance, and strategic initiatives for fiscal year 2024",
        fiscal_year: 2024,
        file_path: "/attached_assets/NISHAKANT-SHUKLA_1755673329540.pdf",
        file_name: "Annual_Report_2024.pdf",
        category: "finance",
        tags: ["annual", "performance", "governance", "financial"],
        priority: "HIGH",
        featured: true
      },
      {
        id: "quarterly_q4_2024",
        title: "Q4 2024 Quarterly Results",
        type: "QUARTERLY_RESULT",
        description: "Fourth quarter financial results and business performance metrics",
        fiscal_year: 2024,
        file_path: "/attached_assets/Golu bhayai resume_1755673329540.pdf",
        file_name: "Q4_2024_Results.pdf",
        category: "finance",
        tags: ["quarterly", "results", "performance"],
        priority: "HIGH",
        featured: true
      }
    ],
    announcements: [
      {
        id: "board_meeting_2024",
        title: "Board Meeting Announcement - December 2024",
        type: "ANNOUNCEMENT",
        description: "Notice of upcoming board meeting and key agenda items for stakeholder review",
        file_path: "/attached_assets/Keywords and Identifiers_1755673329541.pdf",
        file_name: "Board_Meeting_Dec_2024.pdf",
        category: "governance",
        tags: ["board", "meeting", "governance"],
        priority: "NORMAL",
        featured: false
      }
    ],
    governance: [
      {
        id: "governance_policy_2024",
        title: "Corporate Governance Policy 2024",
        type: "GOVERNANCE",
        description: "Updated corporate governance framework and compliance guidelines",
        file_path: "/attached_assets/NISHAKANT-SHUKLA_1755673329540.pdf",
        file_name: "Governance_Policy_2024.pdf",
        category: "governance",
        tags: ["governance", "policy", "compliance"],
        priority: "HIGH",
        featured: true
      }
    ]
  },
  ui_settings: {
    theme: {
      primary_color: "#1e40af",
      secondary_color: "#f8fafc",
      accent_color: "#3b82f6"
    },
    layout: {
      cards_per_row: 3,
      show_featured_first: true,
      enable_search: true,
      enable_filters: true
    },
    pdf_viewer: {
      enable_inline_preview: true,
      max_preview_pages: 5,
      enable_download: true,
      enable_print: true,
      zoom_levels: [0.5, 0.75, 1.0, 1.25, 1.5, 2.0]
    }
  },
  metadata: {
    last_updated: "2024-12-20",
    version: "1.0",
    maintained_by: "Birla Capital and Financial Services Limited IT Team"
  }
};

export function getDocumentConfig(): YAMLConfig {
  return documentConfig;
}

export function getAllDocuments(): DocumentConfig[] {
  const config = getDocumentConfig();
  return [
    ...config.documents.financial_reports,
    ...config.documents.announcements,
    ...config.documents.governance
  ];
}

export function getDocumentsByType(type: string): DocumentConfig[] {
  const allDocs = getAllDocuments();
  return allDocs.filter(doc => doc.type === type);
}

export function getFeaturedDocuments(): DocumentConfig[] {
  const allDocs = getAllDocuments();
  return allDocs.filter(doc => doc.featured);
}

export function getDocumentsByCategory(category: string): DocumentConfig[] {
  const allDocs = getAllDocuments();
  return allDocs.filter(doc => doc.category === category);
}

export function searchDocuments(query: string): DocumentConfig[] {
  const allDocs = getAllDocuments();
  const searchTerm = query.toLowerCase();
  
  return allDocs.filter(doc => 
    doc.title.toLowerCase().includes(searchTerm) ||
    doc.description.toLowerCase().includes(searchTerm) ||
    doc.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
}

export function convertToInvestorDocument(config: DocumentConfig): InvestorDocument {
  return {
    id: config.id,
    title: config.title,
    type: config.type,
    description: config.description,
    fiscalYear: config.fiscal_year || null,
    fileUrl: config.file_path,
    fileName: config.file_name,
    fileSize: "1.2 MB", // Default size
    downloads: Math.floor(Math.random() * 1000) + 100, // Random downloads for demo
    version: 1,
    metadata: {
      category: config.category,
      tags: config.tags,
      priority: config.priority,
      featured: config.featured
    },
    createdAt: new Date(),
    updatedAt: new Date()
  };
}

export { type DocumentConfig, type YAMLConfig, type UISettings };