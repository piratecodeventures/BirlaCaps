// Sample data for demonstrating the application functionality
import { InsertAnnouncement, InsertInvestorDocument, InsertCompanyInfo, InsertBoardDirector } from "@shared/schema";

export const sampleAnnouncements: InsertAnnouncement[] = [
  {
    title: "Q4 FY2024 Financial Results Declared",
    description: "Birla Caps announces strong financial performance for Q4 FY2024 with revenue growth of 15% YoY and improved profitability metrics.",
    content: "Our company continues to demonstrate robust financial health with consistent growth across all business segments. Key highlights include increased market share, enhanced operational efficiency, and strong customer acquisition.",
    priority: "HIGH"
  },
  {
    title: "Board Meeting Scheduled for January 2025",
    description: "Notice of Board Meeting to be held on January 15, 2025, to discuss strategic initiatives and approve annual budget.",
    content: "The meeting will cover important agenda items including business expansion plans, governance updates, and stakeholder value creation strategies.",
    priority: "NORMAL"
  },
  {
    title: "New Digital Banking Platform Launch",
    description: "Exciting announcement of our new digital banking platform offering enhanced customer experience and innovative financial solutions.",
    content: "The platform features advanced security, intuitive interface, and comprehensive financial management tools designed for modern banking needs.",
    priority: "HIGH"
  },
  {
    title: "Sustainability Initiative Progress Update",
    description: "Progress report on our environmental sustainability initiatives and commitment to green finance practices.",
    content: "We are proud to share our achievements in sustainable finance, carbon footprint reduction, and community development programs.",
    priority: "NORMAL"
  }
];

export const sampleDocuments: InsertInvestorDocument[] = [
  {
    title: "Annual Report 2024",
    type: "ANNUAL_REPORT",
    description: "Comprehensive annual report showcasing our financial performance, strategic initiatives, and governance framework for FY2024.",
    fiscalYear: 2024,
    fileUrl: "/attached_assets/NISHAKANT-SHUKLA_1755673329540.pdf",
    fileName: "Annual_Report_2024.pdf",
    fileSize: "2.5 MB",
    version: 1,
    metadata: {
      category: "financial",
      tags: ["annual", "financial", "performance", "governance"],
      featured: true
    }
  },
  {
    title: "Q4 2024 Quarterly Results",
    type: "QUARTERLY_RESULT",
    description: "Detailed quarterly financial results and business performance analysis for Q4 FY2024.",
    fiscalYear: 2024,
    fileUrl: "/attached_assets/Golu bhayai resume_1755673329540.pdf",
    fileName: "Q4_2024_Results.pdf",
    fileSize: "1.8 MB",
    version: 1,
    metadata: {
      category: "financial",
      tags: ["quarterly", "results", "financial"],
      featured: true
    }
  },
  {
    title: "Corporate Governance Framework 2024",
    type: "GOVERNANCE",
    description: "Updated corporate governance policies, procedures, and compliance framework ensuring transparency and accountability.",
    fileUrl: "/attached_assets/Keywords and Identifiers_1755673329541.pdf",
    fileName: "Governance_Framework_2024.pdf",
    fileSize: "1.2 MB",
    version: 1,
    metadata: {
      category: "governance",
      tags: ["governance", "compliance", "policies"],
      featured: false
    }
  }
];

export const sampleCompanyInfo: InsertCompanyInfo[] = [
  {
    section: "MISSION",
    title: "Our Mission",
    content: "To provide innovative and comprehensive financial solutions that empower individuals and businesses to achieve their financial goals while maintaining the highest standards of integrity, transparency, and customer service.",
    metadata: {
      lastUpdated: new Date().toISOString(),
      approvedBy: "Board of Directors"
    }
  },
  {
    section: "VISION",
    title: "Our Vision",
    content: "To be the leading financial services company in India, recognized for excellence in customer service, innovation in financial products, and commitment to sustainable growth that benefits all stakeholders.",
    metadata: {
      lastUpdated: new Date().toISOString(),
      approvedBy: "Board of Directors"
    }
  },
  {
    section: "COMPANY_SECRETARY",
    title: "Company Secretary Information",
    content: "The Company Secretary plays a crucial role in ensuring corporate governance compliance, maintaining statutory records, and facilitating effective communication between the board, management, and stakeholders.",
    metadata: {
      contactEmail: "companysecretary@birlacaps.com",
      officeAddress: "Birla Caps Corporate Office, Mumbai - 400001"
    }
  }
];

export const sampleBoardDirectors: InsertBoardDirector[] = [
  {
    name: "Minal",
    address: "Mumbai, Maharashtra - 400001",
    designation: "Chairman & Managing Director",
    din: "DIN00123001",
    experience: "Over 20 years of experience in financial services, corporate governance, and strategic leadership. Extensive expertise in business development, regulatory compliance, and stakeholder management.",
    sortOrder: 1
  },
  {
    name: "Abhijit",
    address: "Delhi, New Delhi - 110001",
    designation: "Executive Director",
    din: "DIN00123002",
    experience: "15 years of operational excellence in financial services with focus on technology integration, risk management, and customer experience enhancement. Expert in digital transformation and process optimization.",
    sortOrder: 2
  },
  {
    name: "Satyanarayan",
    address: "Bangalore, Karnataka - 560001",
    designation: "Independent Director",
    din: "DIN00123003",
    experience: "Distinguished career spanning 18 years in corporate governance, financial analysis, and regulatory frameworks. Former senior executive with deep expertise in financial regulations and policy development.",
    sortOrder: 3
  }
];