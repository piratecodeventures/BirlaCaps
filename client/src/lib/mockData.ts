// Mock data for standalone client operation - preserves all existing content

export const mockDocuments = [
  // Annual Reports (matching actual file names and paths)
  { id: "ar-2023-24", title: "Annual Report FY 2023-24", category: "ANNUAL_REPORT", type: "ANNUAL_REPORT", fileUrl: "/data/Annual Report/Annual Report_2023-24.pdf", uploadDate: "2024-03-31", fileSize: "4.2 MB" },
  { id: "ar-2022-23", title: "Annual Report FY 2022-23", category: "ANNUAL_REPORT", type: "ANNUAL_REPORT", fileUrl: "/data/Annual Report/Annual Report 2022-23.pdf", uploadDate: "2023-03-31", fileSize: "3.8 MB" },
  { id: "ar-2021-22", title: "Annual Report FY 2021-22", category: "ANNUAL_REPORT", type: "ANNUAL_REPORT", fileUrl: "/data/Annual Report/Annual Reporrt_2021-22.pdf", uploadDate: "2022-03-31", fileSize: "3.5 MB" },
  { id: "ar-2020-21", title: "Annual Report FY 2020-21", category: "ANNUAL_REPORT", type: "ANNUAL_REPORT", fileUrl: "/data/Annual Report/Annual Report 2020-21.pdf", uploadDate: "2021-03-31", fileSize: "3.2 MB" },
  { id: "ar-2019-20", title: "Annual Report FY 2019-20", category: "ANNUAL_REPORT", type: "ANNUAL_REPORT", fileUrl: "/data/Annual Report/Annual Report 2019-20.pdf", uploadDate: "2020-03-31", fileSize: "3.0 MB" },

  // Quarterly Results (matching actual file names)
  { id: "qr-q4-2024", title: "Q4 FY 2024-25 Results", category: "QUARTERLY_RESULT", type: "QUARTERLY_RESULT", fileUrl: "/data/quater/24-25/FR_31.03.2025.pdf", uploadDate: "2025-03-31", fileSize: "1.8 MB" },
  { id: "qr-q3-2024", title: "Q3 FY 2024-25 Results", category: "QUARTERLY_RESULT", type: "QUARTERLY_RESULT", fileUrl: "/data/quater/24-25/FR_31.12.2024.pdf", uploadDate: "2024-12-31", fileSize: "1.7 MB" },
  { id: "qr-q2-2024", title: "Q2 FY 2024-25 Results", category: "QUARTERLY_RESULT", type: "QUARTERLY_RESULT", fileUrl: "/data/quater/24-25/FR_30.09.2024.pdf", uploadDate: "2024-09-30", fileSize: "1.6 MB" },
  { id: "qr-q1-2024", title: "Q1 FY 2024-25 Results", category: "QUARTERLY_RESULT", type: "QUARTERLY_RESULT", fileUrl: "/data/quater/24-25/FR_30.06.2024.pdf", uploadDate: "2024-06-30", fileSize: "1.5 MB" },

  // Previous Year Quarterly Results
  { id: "qr-q4-2023", title: "Q4 FY 2023-24 Results", category: "QUARTERLY_RESULT", type: "QUARTERLY_RESULT", fileUrl: "/data/quater/23-24/FR_31.03.2024.pdf", uploadDate: "2024-03-31", fileSize: "1.4 MB" },
  { id: "qr-q3-2023", title: "Q3 FY 2023-24 Results", category: "QUARTERLY_RESULT", type: "QUARTERLY_RESULT", fileUrl: "/data/quater/23-24/FR_31.12.2023.pdf", uploadDate: "2023-12-31", fileSize: "1.3 MB" },

  // Investor Grievance Reports FY 2024-25 (matching actual file names)
  { id: "ig-q4-2024-25", title: "Investor Grievance Report Q4 2024-25", category: "INVESTOR_GRIEVANCES", type: "INVESTOR_GRIEVANCES", fileUrl: "/data/Investor Greviance/24-25/Birla capital_IG_31.03.2025.pdf", uploadDate: "2025-03-31", fileSize: "890 KB" },
  { id: "ig-q3-2024-25", title: "Investor Grievance Report Q3 2024-25", category: "INVESTOR_GRIEVANCES", type: "INVESTOR_GRIEVANCES", fileUrl: "/data/Investor Greviance/24-25/Birla capital_IG_31.12.2024.pdf", uploadDate: "2024-12-31", fileSize: "850 KB" },
  { id: "ig-q2-2024-25", title: "Investor Grievance Report Q2 2024-25", category: "INVESTOR_GRIEVANCES", type: "INVESTOR_GRIEVANCES", fileUrl: "/data/Investor Greviance/24-25/Birla capital_IG_30.09.2024.pdf", uploadDate: "2024-09-30", fileSize: "820 KB" },
  { id: "ig-q1-2024-25", title: "Investor Grievance Report Q1 2024-25", category: "INVESTOR_GRIEVANCES", type: "INVESTOR_GRIEVANCES", fileUrl: "/data/Investor Greviance/24-25/Birla Capital_IG_30.06.2024.pdf", uploadDate: "2024-06-30", fileSize: "800 KB" },

  // Investor Grievance Reports FY 2023-24
  { id: "ig-q4-2023-24", title: "Investor Grievance Report Q4 2023-24", category: "INVESTOR_GRIEVANCES", type: "INVESTOR_GRIEVANCES", fileUrl: "/data/Investor Greviance/23-24/Reg 13(3) Birla Capital_IG_31.03.2024.pdf", uploadDate: "2024-03-31", fileSize: "780 KB" },
  { id: "ig-q3-2023-24", title: "Investor Grievance Report Q3 2023-24", category: "INVESTOR_GRIEVANCES", type: "INVESTOR_GRIEVANCES", fileUrl: "/data/Investor Greviance/23-24/Birla Capital IG_31.12.2023.pdf", uploadDate: "2023-12-31", fileSize: "760 KB" },
  { id: "ig-q2-2023-24", title: "Investor Grievance Report Q2 2023-24", category: "INVESTOR_GRIEVANCES", type: "INVESTOR_GRIEVANCES", fileUrl: "/data/Investor Greviance/23-24/Birla Capital IG_30.09.2023.pdf", uploadDate: "2023-09-30", fileSize: "740 KB" },
  { id: "ig-q1-2023-24", title: "Investor Grievance Report Q1 2023-24", category: "INVESTOR_GRIEVANCES", type: "INVESTOR_GRIEVANCES", fileUrl: "/data/Investor Greviance/23-24/Birla Capital_IG_30.06.2023.pdf", uploadDate: "2023-06-30", fileSize: "720 KB" },

  // Policy Documents (matching actual policy files)
  { id: "policy-01", title: "Terms of Appointment of Independent Auditor", category: "POLICY", type: "POLICY", fileUrl: "/data/Policy/1_Terms of Appointment of Independent Auditor.pdf", uploadDate: "2024-01-15", fileSize: "850 KB" },
  { id: "policy-02", title: "Familiarization Programme of Independent Director", category: "POLICY", type: "POLICY", fileUrl: "/data/Policy/2_Familiarization Programme of Independent Director.pdf", uploadDate: "2024-01-15", fileSize: "920 KB" },
  { id: "policy-03", title: "Risk Management Policy", category: "POLICY", type: "POLICY", fileUrl: "/data/Policy/3_Risk Management Policy.pdf", uploadDate: "2024-01-15", fileSize: "1.2 MB" },
  { id: "policy-04", title: "Archival Policy", category: "POLICY", type: "POLICY", fileUrl: "/data/Policy/4_Archival Policy.pdf", uploadDate: "2024-01-10", fileSize: "650 KB" },
  { id: "policy-05", title: "Nomination and Remuneration Policy", category: "POLICY", type: "POLICY", fileUrl: "/data/Policy/5_Nomination and Remuneration Policy.pdf", uploadDate: "2024-01-10", fileSize: "980 KB" },
  { id: "policy-06", title: "Whistle Blower Policy", category: "POLICY", type: "POLICY", fileUrl: "/data/Policy/6_Whistle Blower Policy.pdf", uploadDate: "2023-12-20", fileSize: "880 KB" },
  { id: "policy-07", title: "Policy for determining material subsidiary", category: "POLICY", type: "POLICY", fileUrl: "/data/Policy/7_Policy for determining material subsidiary.pdf", uploadDate: "2023-12-15", fileSize: "720 KB" },
  { id: "policy-08", title: "Related Party Policy", category: "POLICY", type: "POLICY", fileUrl: "/data/Policy/8_Related Party Policy.pdf", uploadDate: "2023-12-15", fileSize: "950 KB" },
  { id: "policy-09", title: "Code of Conduct for Insider Trading Policy", category: "POLICY", type: "POLICY", fileUrl: "/data/Policy/9_Code of Conduct for Insider Trading Policy.pdf", uploadDate: "2023-12-10", fileSize: "1.1 MB" },
  { id: "policy-10", title: "Policy for determining materiality of event", category: "POLICY", type: "POLICY", fileUrl: "/data/Policy/10_Policy for determining materiality of event.pdf", uploadDate: "2023-12-10", fileSize: "680 KB" },
  { id: "policy-11", title: "Code of Conduct for unpublished price sensitive information", category: "POLICY", type: "POLICY", fileUrl: "/data/Policy/11_Code of Conduct for unpublished price sensitive information.pdf", uploadDate: "2023-12-05", fileSize: "890 KB" },
  { id: "policy-12", title: "Code of Conduct", category: "POLICY", type: "POLICY", fileUrl: "/data/Policy/12_Code of Conduct.pdf", uploadDate: "2023-12-05", fileSize: "750 KB" }
];

export const mockAnnouncements = [
  {
    id: "1",
    title: "Board Meeting Scheduled for Q1 2025",
    description: "The Board of Directors meeting has been scheduled for March 25, 2025 to discuss Q4 FY 2024-25 results and future strategy",
    createdAt: "2024-12-15",
    priority: "HIGH"
  },
  {
    id: "2", 
    title: "Annual General Meeting Notice",
    description: "The Annual General Meeting of shareholders is scheduled for April 15, 2025 at 11:00 AM at the registered office",
    createdAt: "2024-12-10",
    priority: "HIGH"
  },
  {
    id: "3",
    title: "Dividend Declaration for FY 2024",
    description: "The Board has approved a dividend of ₹5 per share for the financial year 2023-24, payable to eligible shareholders",
    createdAt: "2024-11-28",
    priority: "NORMAL"
  },
  {
    id: "4",
    title: "New Branch Opening in Mumbai",
    description: "We are pleased to announce the opening of our new branch at Bandra-Kurla Complex, Mumbai",
    createdAt: "2024-11-15",
    priority: "NORMAL"
  },
  {
    id: "5",
    title: "Quarterly Results Release",
    description: "Q2 FY 2024-25 financial results have been released and are available in the investor relations section",
    createdAt: "2024-10-30",
    priority: "NORMAL"
  }
];

export const mockStats = {
  totalDocuments: 24,
  activeGrievances: 5,
  monthlyDownloads: 1247,
  totalPolicies: 18
};

export const mockGrievances = [
  {
    id: "1",
    subject: "Unable to access investor portal",
    description: "I am having trouble logging into the investor portal despite multiple attempts. The system shows an error message.",
    status: "OPEN",
    createdAt: "2024-12-20",
    email: "investor@example.com"
  },
  {
    id: "2",
    subject: "Dividend payment delay inquiry", 
    description: "My dividend payment for the last quarter seems to be delayed. Could you please provide an update on the status?",
    status: "IN_PROGRESS",
    createdAt: "2024-12-18",
    email: "shareholder@example.com"
  },
  {
    id: "3",
    subject: "Annual report download issue",
    description: "The annual report PDF is not downloading properly from the investor relations page. Getting a corrupted file.",
    status: "OPEN",
    createdAt: "2024-12-15",
    email: "download.issue@example.com"
  },
  {
    id: "4",
    subject: "Share certificate issuance",
    description: "Requesting physical share certificate issuance for my holdings. Please guide me through the process.",
    status: "RESOLVED",
    createdAt: "2024-12-12",
    email: "certificate@example.com"
  },
  {
    id: "5",
    subject: "Contact information update",
    description: "Need to update my registered contact information and bank details for future communications.",
    status: "IN_PROGRESS",
    createdAt: "2024-12-10",
    email: "update.info@example.com"
  }
];