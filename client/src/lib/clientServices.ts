// Client-side API service replacements
import { clientStorage } from './clientStorage';

// Replace all the server API calls with client-side functions
export const clientServices = {
  // Document services
  async getDocuments(filters?: { type?: string; fiscalYear?: number }) {
    return await clientStorage.getInvestorDocuments(filters);
  },

  async getDocument(id: string) {
    return await clientStorage.getInvestorDocument(id);
  },

  async searchDocuments(query: string) {
    return await clientStorage.searchDocuments(query);
  },

  async downloadDocument(id: string) {
    await clientStorage.incrementDocumentDownloads(id);
    const document = await clientStorage.getInvestorDocument(id);
    
    if (document) {
      // For client-side, we'll just open the file URL
      if (document.fileUrl.startsWith('http') || document.fileUrl.startsWith('/')) {
        window.open(document.fileUrl, '_blank');
      } else {
        console.log(`Download requested for: ${document.title} (${document.fileUrl})`);
      }
    }
  },

  // Announcement services  
  async getAnnouncements(published?: boolean) {
    return await clientStorage.getAnnouncements(published);
  },

  async createAnnouncement(announcement: any) {
    return await clientStorage.createAnnouncement(announcement);
  },

  // Grievance services
  async getGrievances(status?: string) {
    return await clientStorage.getGrievances(status);
  },

  async createGrievance(grievanceData: any) {
    // Simulate form data processing
    const grievance = {
      subject: grievanceData.subject,
      description: grievanceData.description,
      email: grievanceData.email,
      status: 'OPEN',
      attachments: grievanceData.attachments || []
    };
    
    return await clientStorage.createGrievance(grievance);
  },

  async updateGrievance(id: string, updates: any) {
    return await clientStorage.updateGrievance(id, updates);
  },

  // Policy services
  async getPolicies() {
    return await clientStorage.getPolicies();
  },

  // Board Director services
  async getBoardDirectors() {
    return await clientStorage.getBoardDirectors();
  },

  // Promoter services
  async getPromoters() {
    return await clientStorage.getPromoters();
  },

  // Admin services
  async getAdminStats() {
    return await clientStorage.getDashboardStats();
  },

  async getAdminGrievances() {
    return await clientStorage.getGrievances();
  },

  // Company info services
  async getCompanyInfo(section?: string) {
    return await clientStorage.getCompanyInfo(section);
  }
};