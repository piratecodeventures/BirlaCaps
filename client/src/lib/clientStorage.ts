// Client-side storage service that replaces the backend
import { mockDocuments, mockAnnouncements, mockStats, mockGrievances } from './mockData';

// Types for our client-side data
interface StoredDocument {
  id: string;
  title: string;
  category: string;
  type: string;
  fileUrl: string;
  uploadDate: string;
  fileSize: string;
  downloads?: number;
  description?: string;
  fiscalYear?: number;
}

interface StoredAnnouncement {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  priority: string;
  isPublished?: boolean;
}

interface StoredGrievance {
  id: string;
  subject: string;
  description: string;
  status: string;
  createdAt: string;
  email: string;
  attachments?: any[];
}

interface StoredStats {
  totalDocuments: number;
  activeGrievances: number;
  monthlyDownloads: number;
  totalPolicies: number;
}

interface StoredPolicy {
  id: string;
  title: string;
  description?: string;
  category: string;
  fileUrl: string;
  fileName: string;
  effectiveDate: string;
  isActive: boolean;
}

interface StoredBoardDirector {
  id: string;
  name: string;
  designation: string;
  qualification?: string;
  experience?: string;
  expertise?: string;
  committees?: string;
  photoUrl?: string;
  sortOrder: number;
}

interface StoredPromoter {
  id: string;
  name: string;
  type: 'INDIVIDUAL' | 'CORPORATE';
  shareholding: string;
  designation?: string;
  relationship?: string;
  sortOrder: number;
}

// Storage keys
const STORAGE_KEYS = {
  DOCUMENTS: 'client_documents',
  ANNOUNCEMENTS: 'client_announcements', 
  GRIEVANCES: 'client_grievances',
  POLICIES: 'client_policies',
  BOARD_DIRECTORS: 'client_board_directors',
  PROMOTERS: 'client_promoters',
  STATS: 'client_stats'
};

// Initialize storage with mock data if empty
function initializeStorage() {
  if (!localStorage.getItem(STORAGE_KEYS.DOCUMENTS)) {
    localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(mockDocuments));
  }
  if (!localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENTS)) {
    localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(mockAnnouncements));
  }
  if (!localStorage.getItem(STORAGE_KEYS.GRIEVANCES)) {
    localStorage.setItem(STORAGE_KEYS.GRIEVANCES, JSON.stringify(mockGrievances));
  }
  if (!localStorage.getItem(STORAGE_KEYS.STATS)) {
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(mockStats));
  }
  
  // Initialize empty arrays for other data types
  if (!localStorage.getItem(STORAGE_KEYS.POLICIES)) {
    localStorage.setItem(STORAGE_KEYS.POLICIES, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.BOARD_DIRECTORS)) {
    localStorage.setItem(STORAGE_KEYS.BOARD_DIRECTORS, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.PROMOTERS)) {
    localStorage.setItem(STORAGE_KEYS.PROMOTERS, JSON.stringify([]));
  }
}

// Generic storage utilities
function getStorageData<T>(key: string): T[] {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error(`Error reading ${key} from storage:`, error);
    return [];
  }
}

function setStorageData<T>(key: string, data: T[]): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error writing ${key} to storage:`, error);
  }
}

// Client Storage Service Class
export class ClientStorageService {
  constructor() {
    initializeStorage();
  }

  // Document operations
  async getInvestorDocuments(filters?: { type?: string; fiscalYear?: number }): Promise<StoredDocument[]> {
    let documents = getStorageData<StoredDocument>(STORAGE_KEYS.DOCUMENTS);
    
    if (filters) {
      if (filters.type && filters.type !== 'all') {
        documents = documents.filter(doc => doc.type === filters.type);
      }
      if (filters.fiscalYear) {
        documents = documents.filter(doc => doc.fiscalYear === filters.fiscalYear);
      }
    }
    
    return documents.sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime());
  }

  async getInvestorDocument(id: string): Promise<StoredDocument | undefined> {
    const documents = getStorageData<StoredDocument>(STORAGE_KEYS.DOCUMENTS);
    return documents.find(doc => doc.id === id);
  }

  async searchDocuments(query: string): Promise<StoredDocument[]> {
    const documents = getStorageData<StoredDocument>(STORAGE_KEYS.DOCUMENTS);
    const lowercaseQuery = query.toLowerCase();
    
    return documents.filter(doc => 
      doc.title.toLowerCase().includes(lowercaseQuery) ||
      (doc.description && doc.description.toLowerCase().includes(lowercaseQuery))
    );
  }

  async incrementDocumentDownloads(id: string): Promise<void> {
    const documents = getStorageData<StoredDocument>(STORAGE_KEYS.DOCUMENTS);
    const docIndex = documents.findIndex(doc => doc.id === id);
    
    if (docIndex !== -1) {
      documents[docIndex].downloads = (documents[docIndex].downloads || 0) + 1;
      setStorageData(STORAGE_KEYS.DOCUMENTS, documents);
    }
  }

  // Announcement operations
  async getAnnouncements(published?: boolean): Promise<StoredAnnouncement[]> {
    let announcements = getStorageData<StoredAnnouncement>(STORAGE_KEYS.ANNOUNCEMENTS);
    
    if (published !== undefined) {
      announcements = announcements.filter(ann => ann.isPublished !== false);
    }
    
    return announcements.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async createAnnouncement(announcement: Omit<StoredAnnouncement, 'id'>): Promise<StoredAnnouncement> {
    const announcements = getStorageData<StoredAnnouncement>(STORAGE_KEYS.ANNOUNCEMENTS);
    const newAnnouncement: StoredAnnouncement = {
      ...announcement,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    
    announcements.push(newAnnouncement);
    setStorageData(STORAGE_KEYS.ANNOUNCEMENTS, announcements);
    return newAnnouncement;
  }

  // Grievance operations
  async getGrievances(status?: string): Promise<StoredGrievance[]> {
    let grievances = getStorageData<StoredGrievance>(STORAGE_KEYS.GRIEVANCES);
    
    if (status) {
      grievances = grievances.filter(g => g.status === status);
    }
    
    return grievances.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async createGrievance(grievance: Omit<StoredGrievance, 'id' | 'createdAt'>): Promise<StoredGrievance> {
    const grievances = getStorageData<StoredGrievance>(STORAGE_KEYS.GRIEVANCES);
    const newGrievance: StoredGrievance = {
      ...grievance,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'OPEN'
    };
    
    grievances.push(newGrievance);
    setStorageData(STORAGE_KEYS.GRIEVANCES, grievances);
    
    // Update stats
    this.updateStats();
    
    return newGrievance;
  }

  async updateGrievance(id: string, updates: Partial<StoredGrievance>): Promise<StoredGrievance | null> {
    const grievances = getStorageData<StoredGrievance>(STORAGE_KEYS.GRIEVANCES);
    const grievanceIndex = grievances.findIndex(g => g.id === id);
    
    if (grievanceIndex !== -1) {
      grievances[grievanceIndex] = { ...grievances[grievanceIndex], ...updates };
      setStorageData(STORAGE_KEYS.GRIEVANCES, grievances);
      this.updateStats();
      return grievances[grievanceIndex];
    }
    
    return null;
  }

  // Policy operations
  async getPolicies(): Promise<StoredPolicy[]> {
    const policies = getStorageData<StoredPolicy>(STORAGE_KEYS.POLICIES);
    return policies.filter(p => p.isActive);
  }

  // Board Director operations
  async getBoardDirectors(): Promise<StoredBoardDirector[]> {
    const directors = getStorageData<StoredBoardDirector>(STORAGE_KEYS.BOARD_DIRECTORS);
    return directors.sort((a, b) => a.sortOrder - b.sortOrder);
  }

  // Promoter operations
  async getPromoters(): Promise<StoredPromoter[]> {
    const promoters = getStorageData<StoredPromoter>(STORAGE_KEYS.PROMOTERS);
    return promoters.sort((a, b) => a.sortOrder - b.sortOrder);
  }

  // Dashboard stats
  async getDashboardStats(): Promise<StoredStats> {
    const stats = getStorageData<StoredStats>(STORAGE_KEYS.STATS);
    return stats[0] || mockStats;
  }

  // Helper method to update stats
  private updateStats(): void {
    const documents = getStorageData<StoredDocument>(STORAGE_KEYS.DOCUMENTS);
    const grievances = getStorageData<StoredGrievance>(STORAGE_KEYS.GRIEVANCES);
    const policies = getStorageData<StoredPolicy>(STORAGE_KEYS.POLICIES);
    
    const activeGrievances = grievances.filter(g => g.status === 'OPEN' || g.status === 'IN_PROGRESS').length;
    const totalDownloads = documents.reduce((sum, doc) => sum + (doc.downloads || 0), 0);
    const activePolicies = policies.filter(p => p.isActive).length;
    
    const newStats: StoredStats = {
      totalDocuments: documents.length,
      activeGrievances,
      monthlyDownloads: totalDownloads,
      totalPolicies: activePolicies
    };
    
    setStorageData(STORAGE_KEYS.STATS, [newStats]);
  }

  // Company info operations (returns static data)
  async getCompanyInfo(section?: string): Promise<any[]> {
    // Return static company info since this doesn't change often
    return [];
  }
}

// Create singleton instance
export const clientStorage = new ClientStorageService();