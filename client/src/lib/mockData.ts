// Mock data for standalone client operation
export const mockDocuments = [
  {
    id: "1",
    title: "Annual Report 2024",
    category: "Annual Reports",
    fileUrl: "#",
    uploadDate: "2024-03-15",
    fileSize: "2.5 MB"
  },
  {
    id: "2", 
    title: "Q4 Financial Results",
    category: "Financial Results",
    fileUrl: "#",
    uploadDate: "2024-02-28",
    fileSize: "1.8 MB"
  },
  {
    id: "3",
    title: "Board Meeting Minutes",
    category: "Meeting Minutes", 
    fileUrl: "#",
    uploadDate: "2024-01-20",
    fileSize: "890 KB"
  }
];

export const mockAnnouncements = [
  {
    id: "1",
    title: "Board Meeting Scheduled for Q1 2025",
    content: "The Board of Directors meeting has been scheduled for March 25, 2025",
    date: "2024-12-15",
    category: "Board Meetings"
  },
  {
    id: "2", 
    title: "Annual Shareholder Meeting Notice",
    content: "Annual General Meeting scheduled for April 15, 2025",
    date: "2024-12-10",
    category: "Shareholder Meetings"
  }
];

export const mockStats = {
  totalDocuments: 25,
  activeGrievances: 3,
  monthlyDownloads: 456,
  totalPolicies: 12
};

export const mockGrievances = [
  {
    id: "1",
    subject: "Service Issue",
    description: "Unable to access online portal",
    status: "Open",
    createdAt: "2024-12-20",
    email: "user@example.com"
  },
  {
    id: "2",
    subject: "Account Query", 
    description: "Question about account statement",
    status: "In Progress",
    createdAt: "2024-12-18",
    email: "customer@example.com"
  }
];