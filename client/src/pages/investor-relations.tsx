import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { InvestorDocument, Announcement } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Download, Calendar, FileText } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

export default function InvestorRelations() {
  const [searchQuery, setSearchQuery] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [fiscalYear, setFiscalYear] = useState("");

  const { data: documents = [], isLoading } = useQuery<InvestorDocument[]>({
    queryKey: ["/api/documents", { type: documentType, fiscalYear }],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (documentType && documentType !== 'ALL') params.append('type', documentType);
      if (fiscalYear && fiscalYear !== 'ALL') params.append('fiscalYear', fiscalYear);
      
      const response = await fetch(`/api/documents?${params}`);
      if (!response.ok) throw new Error('Failed to fetch documents');
      return response.json();
    }
  });

  const { data: announcements = [] } = useQuery<Announcement[]>({
    queryKey: ["/api/announcements"]
  });

  const { data: searchResults = [] } = useQuery<InvestorDocument[]>({
    queryKey: ["/api/documents/search", { q: searchQuery }],
    enabled: searchQuery.length > 2,
    queryFn: async () => {
      const response = await fetch(`/api/documents/search?q=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) throw new Error('Failed to search documents');
      return response.json();
    }
  });

  const handleDownload = async (documentId: string) => {
    try {
      window.open(`/api/documents/${documentId}/download`, '_blank');
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const displayDocuments = searchQuery.length > 2 ? searchResults : documents;

  const getDocumentTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      'ANNUAL_REPORT': 'Annual Report',
      'QUARTERLY_RESULT': 'Quarterly Result',
      'ANNOUNCEMENT': 'Announcement',
      'GOVERNANCE': 'Governance'
    };
    return types[type] || type;
  };

  const getDocumentTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'ANNUAL_REPORT': 'bg-primary/10 text-primary',
      'QUARTERLY_RESULT': 'bg-accent/10 text-accent',
      'ANNOUNCEMENT': 'bg-blue-100 text-blue-800',
      'GOVERNANCE': 'bg-gray-100 text-gray-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen">
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4" data-testid="investor-title">
              Investor Relations
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-testid="investor-subtitle">
              Access comprehensive financial information, reports, and governance documents
            </p>
          </div>

          {/* Search and Filter Bar */}
          <Card className="mb-12">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type="text"
                      placeholder="Search documents..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                      data-testid="search-input"
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <Select value={documentType} onValueChange={setDocumentType}>
                    <SelectTrigger className="w-48" data-testid="type-filter">
                      <SelectValue placeholder="All Document Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL">All Document Types</SelectItem>
                      <SelectItem value="ANNUAL_REPORT">Annual Reports</SelectItem>
                      <SelectItem value="QUARTERLY_RESULT">Quarterly Results</SelectItem>
                      <SelectItem value="ANNOUNCEMENT">Announcements</SelectItem>
                      <SelectItem value="GOVERNANCE">Governance Reports</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={fiscalYear} onValueChange={setFiscalYear}>
                    <SelectTrigger className="w-32" data-testid="year-filter">
                      <SelectValue placeholder="All Years" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL">All Years</SelectItem>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                      <SelectItem value="2022">2022</SelectItem>
                      <SelectItem value="2021">2021</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Documents Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6" data-testid="documents-title">
              {searchQuery.length > 2 ? `Search Results for "${searchQuery}"` : 'Financial Documents'}
            </h2>
            
            {isLoading ? (
              <div className="grid md:grid-cols-2 gap-6">
                {[...Array(4)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="h-6 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : displayDocuments.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-600" data-testid="no-documents">
                    {searchQuery.length > 2 ? 'No documents found matching your search.' : 'No documents available.'}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {displayDocuments.map((document, index) => (
                  <Card key={document.id} className="hover:shadow-md transition-shadow" data-testid={`document-${index}`}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-1" data-testid={`document-title-${index}`}>
                            {document.title}
                          </h3>
                          {document.description && (
                            <p className="text-gray-600 text-sm mb-2" data-testid={`document-description-${index}`}>
                              {document.description}
                            </p>
                          )}
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDocumentTypeColor(document.type)}`} data-testid={`document-type-${index}`}>
                          {getDocumentTypeLabel(document.type)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center text-gray-500 text-sm space-x-4">
                          <div className="flex items-center" data-testid={`document-date-${index}`}>
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(document.createdAt!).toLocaleDateString()}
                          </div>
                          {document.fileSize && (
                            <div className="flex items-center" data-testid={`document-size-${index}`}>
                              <FileText className="h-4 w-4 mr-1" />
                              {document.fileSize}
                            </div>
                          )}
                        </div>
                        <Button 
                          onClick={() => handleDownload(document.id)}
                          className="flex items-center"
                          data-testid={`download-button-${index}`}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Recent Announcements */}
          <div id="announcements">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6" data-testid="announcements-title">
              Recent Announcements
            </h2>
            {announcements.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-gray-600" data-testid="no-announcements">
                    No announcements available at this time.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {announcements.slice(0, 5).map((announcement, index) => (
                  <Card key={announcement.id} className="border-l-4 border-primary" data-testid={`announcement-${index}`}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-2" data-testid={`announcement-title-${index}`}>
                            {announcement.title}
                          </h3>
                          <p className="text-gray-600" data-testid={`announcement-description-${index}`}>
                            {announcement.description}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-gray-500 text-sm" data-testid={`announcement-date-${index}`}>
                            {new Date(announcement.createdAt!).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
