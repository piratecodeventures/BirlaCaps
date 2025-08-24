import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { InvestorDocument, Announcement } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, Download, Calendar, FileText, TrendingUp, BarChart3, Bell, Shield, Star, Filter, Users } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import PDFViewer from "@/components/pdf/pdf-viewer";
import { 
  getAllDocuments, 
  getDocumentsByType, 
  getFeaturedDocuments, 
  searchDocuments, 
  convertToInvestorDocument,
  getDocumentConfig
} from "@/lib/document-config";

export default function InvestorRelations() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  // Get document configuration
  const config = getDocumentConfig();
  
  // Memoized document data from YAML config
  const allConfigDocs = useMemo(() => getAllDocuments(), []);
  const featuredDocs = useMemo(() => getFeaturedDocuments(), []);
  
  // Search functionality
  const filteredDocs = useMemo(() => {
    let docs = allConfigDocs;
    
    // Filter by search query
    if (searchQuery.length > 2) {
      docs = searchDocuments(searchQuery);
    }
    
    // Filter by tab
    if (activeTab !== "all") {
      docs = docs.filter(doc => doc.type === activeTab);
    }
    
    // Filter featured
    if (showFeaturedOnly) {
      docs = docs.filter(doc => doc.featured);
    }
    
    return docs;
  }, [allConfigDocs, searchQuery, activeTab, showFeaturedOnly]);

  // Fallback to API data
  const { data: apiDocuments = [], isLoading } = useQuery<InvestorDocument[]>({
    queryKey: ["/api/documents"],
    queryFn: async () => {
      const response = await fetch('/api/documents');
      if (!response.ok) throw new Error('Failed to fetch documents');
      return response.json();
    }
  });

  const { data: announcements = [] } = useQuery<Announcement[]>({
    queryKey: ["/api/announcements"]
  });

  // Stats for the hero section
  const stats = [
    {
      icon: BarChart3,
      label: "Total Documents",
      value: allConfigDocs.length.toString(),
      color: "text-blue-600"
    },
    {
      icon: TrendingUp,
      label: "Financial Reports",
      value: getDocumentsByType("ANNUAL_REPORT").length + getDocumentsByType("QUARTERLY_RESULT").length,
      color: "text-green-600"
    },
    {
      icon: Bell,
      label: "Announcements",
      value: getDocumentsByType("ANNOUNCEMENT").length.toString(),
      color: "text-orange-600"
    },
    {
      icon: Shield,
      label: "Governance Docs",
      value: getDocumentsByType("GOVERNANCE").length.toString(),
      color: "text-purple-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white gradient-shift particle-bg">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -left-4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-15 float-animation"></div>
          <div className="absolute -top-4 -right-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-15 float-animation" style={{animationDelay: '3s'}}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 gradient-text slide-in-top" data-testid="investor-title">
              Investor Relations
            </h1>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto mb-8 leading-relaxed fade-in-up" data-testid="investor-subtitle">
              Comprehensive financial transparency through interactive reports, governance documents, and real-time announcements
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16 stagger-children">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index} className="glass-card text-white hover-lift shimmer-effect" data-testid={`stat-${index}`}>
                  <CardContent className="p-6 text-center">
                    <IconComponent className={`h-10 w-10 mx-auto mb-3 text-white bounce-in heartbeat`} style={{animationDelay: `${index * 0.2}s`}} />
                    <div className="text-3xl font-bold text-white mb-2 gradient-text">{stat.value}</div>
                    <div className="text-sm text-blue-200">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search and Filters */}
          <Card className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4 items-center">
                <div className="flex-1 w-full">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      type="text"
                      placeholder="Search documents, reports, and announcements..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 h-12 text-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      data-testid="search-input"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant={showFeaturedOnly ? "default" : "outline"}
                    onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
                    className="flex items-center gap-2"
                    data-testid="featured-filter"
                  >
                    <Star className="h-4 w-4" />
                    Featured
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    data-testid="filter-btn"
                  >
                    <Filter className="h-4 w-4" />
                    Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Featured Documents */}
          {!showFeaturedOnly && searchQuery.length <= 2 && featuredDocs.length > 0 && (
            <div className="mb-12">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-600 to-amber-600 text-white px-6 py-3 rounded-full shadow-lg">
                  <Star className="h-6 w-6" />
                  <h2 className="text-2xl font-bold">Featured Documents</h2>
                </div>
              </div>
              <p className="text-xl text-gray-600 text-center mb-12 max-w-4xl mx-auto leading-relaxed">
                Highlighted documents for quick access to our most important financial reports and regulatory filings.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 stagger-children">
                {featuredDocs.slice(0, 4).map((doc, index) => {
                  const colors = [
                    { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200", gradient: "from-blue-600 to-blue-700" },
                    { bg: "bg-green-50", text: "text-green-600", border: "border-green-200", gradient: "from-green-600 to-green-700" },
                    { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-200", gradient: "from-purple-600 to-purple-700" },
                    { bg: "bg-orange-50", text: "text-orange-600", border: "border-orange-200", gradient: "from-orange-600 to-orange-700" }
                  ];
                  const colorScheme = colors[index % colors.length];
                  
                  return (
                    <Card key={doc.id} className={`group glass-card hover-lift shimmer-effect border-2 ${colorScheme.border} ${colorScheme.bg} modern-card`} data-testid={`featured-doc-${index}`}>
                      <CardContent className="p-6 text-center">
                        <div className={`${colorScheme.bg} ${colorScheme.text} p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4 float-animation hover-glow`}>
                          <FileText className="h-8 w-8 hover-rotate" />
                        </div>
                        <h3 className={`text-lg font-bold ${colorScheme.text} mb-2 gradient-text-blue group-hover:scale-105 transition-transform duration-300`}>
                          {doc.title}
                        </h3>
                        <div className="space-y-1 mb-4">
                          <div className="text-sm font-semibold text-gray-700">{doc.type}</div>
                          <div className="text-xs text-blue-600 font-medium">1.2 MB • Featured</div>
                        </div>
                        <div className="space-y-2">
                          <Button 
                            className={`w-full bg-gradient-to-r ${colorScheme.gradient} text-white border-0 hover:shadow-lg hover-glow btn-interactive`}
                            size="sm"
                            onClick={() => {
                              const link = document.createElement('a');
                              link.href = doc.file_path;
                              link.download = doc.file_name;
                              link.click();
                            }}
                            data-testid={`download-featured-${index}`}
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="w-full hover:bg-gray-100"
                            onClick={() => window.open(doc.file_path, '_blank')}
                            data-testid={`view-featured-${index}`}
                          >
                            <FileText className="mr-2 h-4 w-4" />
                            View Document
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tabbed Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6 mb-16">
            <TabsList className="grid w-full grid-cols-5 bg-white shadow-sm border">
              {[
                { value: "all", label: "All Documents", icon: FileText },
                { value: "ANNUAL_REPORT", label: "Annual Reports", icon: BarChart3 },
                { value: "QUARTERLY_RESULT", label: "Quarterly Results", icon: TrendingUp },
                { value: "ANNOUNCEMENT", label: "Announcements", icon: Bell },
                { value: "GOVERNANCE", label: "Governance", icon: Shield }
              ].map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="flex items-center gap-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
                    data-testid={`tab-${tab.value}`}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            <TabsContent value={activeTab} className="space-y-6">
              {filteredDocs.length === 0 ? (
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-12 text-center">
                    <FileText className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Documents Found</h3>
                    <p className="text-gray-600">
                      {searchQuery.length > 2 
                        ? "Try adjusting your search terms or filters." 
                        : "Documents will appear here when available."}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 stagger-children">
                  {filteredDocs.map((doc, index) => {
                    const getColorByType = (type: string) => {
                      const typeColors: Record<string, any> = {
                        'ANNUAL_REPORT': { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200", gradient: "from-blue-600 to-blue-700", icon: BarChart3 },
                        'QUARTERLY_RESULT': { bg: "bg-orange-50", text: "text-orange-600", border: "border-orange-200", gradient: "from-orange-600 to-orange-700", icon: TrendingUp },
                        'ANNOUNCEMENT': { bg: "bg-yellow-50", text: "text-yellow-600", border: "border-yellow-200", gradient: "from-yellow-600 to-yellow-700", icon: Bell },
                        'GOVERNANCE': { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-200", gradient: "from-purple-600 to-purple-700", icon: Shield },
                        'POLICY': { bg: "bg-green-50", text: "text-green-600", border: "border-green-200", gradient: "from-green-600 to-green-700", icon: FileText },
                        'SHAREHOLDING': { bg: "bg-pink-50", text: "text-pink-600", border: "border-pink-200", gradient: "from-pink-600 to-pink-700", icon: Users },
                        'INVESTOR_GRIEVANCE': { bg: "bg-red-50", text: "text-red-600", border: "border-red-200", gradient: "from-red-600 to-red-700", icon: AlertTriangle }
                      };
                      return typeColors[type] || { bg: "bg-gray-50", text: "text-gray-600", border: "border-gray-200", gradient: "from-gray-600 to-gray-700", icon: FileText };
                    };
                    
                    const colorScheme = getColorByType(doc.type);
                    const IconComponent = colorScheme.icon;
                    
                    return (
                      <Card key={doc.id} className={`group glass-card hover-lift shimmer-effect border-2 ${colorScheme.border} ${colorScheme.bg} modern-card`} data-testid={`document-${index}`}>
                        <CardContent className="p-6 text-center">
                          <div className={`${colorScheme.bg} ${colorScheme.text} p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4 float-animation hover-glow`}>
                            <IconComponent className="h-8 w-8 hover-rotate" />
                          </div>
                          <h3 className={`text-lg font-bold ${colorScheme.text} mb-2 gradient-text-blue group-hover:scale-105 transition-transform duration-300`}>
                            {doc.title}
                          </h3>
                          <div className="space-y-1 mb-4">
                            <div className="text-sm font-semibold text-gray-700">{doc.type.replace('_', ' ')}</div>
                            <div className="text-xs text-blue-600 font-medium">1.2 MB • {Math.floor(Math.random() * 1000) + 100} downloads</div>
                          </div>
                          <div className="space-y-2">
                            <Button 
                              className={`w-full bg-gradient-to-r ${colorScheme.gradient} text-white border-0 hover:shadow-lg hover-glow btn-interactive`}
                              size="sm"
                              onClick={() => {
                                const link = document.createElement('a');
                                link.href = doc.file_path;
                                link.download = doc.file_name;
                                link.click();
                              }}
                              data-testid={`download-doc-${index}`}
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="w-full hover:bg-gray-100"
                              onClick={() => window.open(doc.file_path, '_blank')}
                              data-testid={`view-doc-${index}`}
                            >
                              <FileText className="mr-2 h-4 w-4" />
                              View Document
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* Recent Announcements */}
          <div className="mt-16 mb-16" id="announcements">
            <div className="flex items-center gap-2 mb-8">
              <Bell className="h-6 w-6 text-orange-500" />
              <h2 className="text-2xl font-bold text-gray-900">Recent Announcements</h2>
            </div>
            
            {announcements.length === 0 ? (
              <Card className="border-0 shadow-lg">
                <CardContent className="p-12 text-center">
                  <Bell className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Announcements</h3>
                  <p className="text-gray-600">Stay tuned for important updates and announcements.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {announcements.slice(0, 3).map((announcement, index) => (
                  <Card key={announcement.id} className="border-l-4 border-orange-500 shadow-lg hover:shadow-xl transition-shadow" data-testid={`announcement-${index}`}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                              {announcement.priority || 'NORMAL'}
                            </Badge>
                            <span className="text-sm text-gray-500">
                              {new Date(announcement.createdAt!).toLocaleDateString()}
                            </span>
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-3" data-testid={`announcement-title-${index}`}>
                            {announcement.title}
                          </h3>
                          <p className="text-gray-700 leading-relaxed" data-testid={`announcement-description-${index}`}>
                            {announcement.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
          {/* Annual Reports Section */}
          <div id="annual-reports" className="scroll-mt-8 mb-16">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg">
                <BarChart3 className="h-6 w-6" />
                <h2 className="text-2xl font-bold">Annual Reports</h2>
              </div>
            </div>
            <p className="text-xl text-gray-600 text-center mb-12 max-w-4xl mx-auto leading-relaxed">
              Comprehensive annual reports showcasing our financial performance, strategic initiatives, and business outlook for the last five years.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 stagger-children mb-12">
              {[
                { year: "2023-24", revenue: "₹45.2 Cr", growth: "+12.5%", color: "blue" },
                { year: "2022-23", revenue: "₹40.1 Cr", growth: "+8.3%", color: "green" },
                { year: "2021-22", revenue: "₹37.0 Cr", growth: "+15.2%", color: "purple" },
                { year: "2020-21", revenue: "₹32.1 Cr", growth: "+6.8%", color: "indigo" },
                { year: "2019-20", revenue: "₹30.0 Cr", growth: "+5.5%", color: "teal" }
              ].map((report, index) => {
                const colorClasses = {
                  blue: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200", gradient: "from-blue-600 to-blue-700" },
                  green: { bg: "bg-green-50", text: "text-green-600", border: "border-green-200", gradient: "from-green-600 to-green-700" },
                  purple: { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-200", gradient: "from-purple-600 to-purple-700" },
                  indigo: { bg: "bg-indigo-50", text: "text-indigo-600", border: "border-indigo-200", gradient: "from-indigo-600 to-indigo-700" },
                  teal: { bg: "bg-teal-50", text: "text-teal-600", border: "border-teal-200", gradient: "from-teal-600 to-teal-700" }
                };
                const colors = colorClasses[report.color as keyof typeof colorClasses];
                
                return (
                  <Card key={report.year} className={`group glass-card hover-lift shimmer-effect border-2 ${colors.border} ${colors.bg} modern-card`} data-testid={`annual-report-${index}`}>
                    <CardContent className="p-6 text-center">
                      <div className={`${colors.bg} ${colors.text} p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4 float-animation hover-glow`}>
                        <BarChart3 className="h-8 w-8 hover-rotate" />
                      </div>
                      <h3 className={`text-lg font-bold ${colors.text} mb-2 gradient-text-blue group-hover:scale-105 transition-transform duration-300`}>
                        FY {report.year}
                      </h3>
                      <div className="space-y-1 mb-4">
                        <div className="text-sm font-semibold text-gray-700">{report.revenue}</div>
                        <div className="text-xs text-green-600 font-medium">{report.growth} Growth</div>
                      </div>
                      <div className="space-y-2">
                        <Button 
                          className={`w-full bg-gradient-to-r ${colors.gradient} text-white border-0 hover:shadow-lg hover-glow btn-interactive`}
                          size="sm"
                          data-testid={`download-annual-${report.year}`}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="w-full hover:bg-gray-100"
                          data-testid={`view-annual-${report.year}`}
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          View Report
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Annual Returns Section */}
          <div id="annual-returns" className="scroll-mt-8 mb-16">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-full shadow-lg">
                <TrendingUp className="h-6 w-6" />
                <h2 className="text-2xl font-bold">Annual Returns</h2>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 stagger-children">
              {[
                { year: "2023-24", status: "Filed", date: "30/09/2024", color: "emerald" },
                { year: "2022-23", status: "Filed", date: "28/09/2023", color: "green" },
                { year: "2021-22", status: "Filed", date: "29/09/2022", color: "teal" },
                { year: "2020-21", status: "Filed", date: "30/09/2021", color: "cyan" },
                { year: "2019-20", status: "Filed", date: "25/09/2020", color: "blue" }
              ].map((item, index) => {
                const colorClasses = {
                  emerald: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-200", gradient: "from-emerald-600 to-emerald-700" },
                  green: { bg: "bg-green-50", text: "text-green-600", border: "border-green-200", gradient: "from-green-600 to-green-700" },
                  teal: { bg: "bg-teal-50", text: "text-teal-600", border: "border-teal-200", gradient: "from-teal-600 to-teal-700" },
                  cyan: { bg: "bg-cyan-50", text: "text-cyan-600", border: "border-cyan-200", gradient: "from-cyan-600 to-cyan-700" },
                  blue: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200", gradient: "from-blue-600 to-blue-700" }
                };
                const colors = colorClasses[item.color as keyof typeof colorClasses];
                
                return (
                  <Card key={item.year} className={`group glass-card hover-lift shimmer-effect border-2 ${colors.border} ${colors.bg} modern-card`} data-testid={`annual-return-${index}`}>
                    <CardContent className="p-6 text-center">
                      <div className={`${colors.bg} ${colors.text} p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4 float-animation hover-glow`}>
                        <TrendingUp className="h-8 w-8 hover-rotate" />
                      </div>
                      <h3 className={`text-lg font-bold ${colors.text} mb-2 gradient-text-blue group-hover:scale-105 transition-transform duration-300`}>
                        MGT-7
                      </h3>
                      <div className="space-y-1 mb-3">
                        <div className="text-sm font-semibold text-gray-700">FY {item.year}</div>
                        <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">
                          ✓ {item.status}
                        </Badge>
                        <div className="text-xs text-gray-500">Filed: {item.date}</div>
                      </div>
                      <div className="space-y-2">
                        <Button 
                          className={`w-full bg-gradient-to-r ${colors.gradient} text-white border-0 hover:shadow-lg hover-glow btn-interactive`}
                          size="sm"
                          data-testid={`download-return-${item.year}`}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Shareholding Pattern Section */}
          <div id="shareholding" className="scroll-mt-8 mb-16">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full shadow-lg">
                <Users className="h-6 w-6" />
                <h2 className="text-2xl font-bold">Shareholding Pattern</h2>
              </div>
            </div>
            <p className="text-xl text-gray-600 text-center mb-12 max-w-4xl mx-auto leading-relaxed">
              Quarterly shareholding patterns showcasing the distribution of shares among different categories of shareholders as per regulatory requirements.
            </p>
            
            <div className="space-y-12 stagger-children">
              {/* FY 2024-25 */}
              <div>
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg">
                    <Users className="h-6 w-6" />
                    <h3 className="text-xl font-bold">Financial Year 2024-25</h3>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 stagger-children">
                  {[
                    { quarter: "Q4 2024-25", file: "/config/data/Shareholding Pattern/24-25/Shareholding Pattern_31.03.2025.xlsx", period: "Jan-Mar 2025", promoter: "75.2%", institutions: "15.3%", color: "blue" },
                    { quarter: "Q3 2024-25", file: "/config/data/Shareholding Pattern/24-25/Shareholding Pattern_31.12.2024.xlsx", period: "Oct-Dec 2024", promoter: "74.8%", institutions: "15.7%", color: "green" },
                    { quarter: "Q2 2024-25", file: "/config/data/Shareholding Pattern/24-25/Shareholding Pattern_30.09.2024.xlsx", period: "Jul-Sep 2024", promoter: "75.1%", institutions: "15.4%", color: "purple" },
                    { quarter: "Q1 2024-25", file: "/config/data/Shareholding Pattern/24-25/Shareholding Pattern_30.06.2024.xlsx", period: "Apr-Jun 2024", promoter: "74.9%", institutions: "15.6%", color: "indigo" }
                  ].map((report, index) => {
                    const colorClasses = {
                      blue: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200", gradient: "from-blue-600 to-blue-700" },
                      green: { bg: "bg-green-50", text: "text-green-600", border: "border-green-200", gradient: "from-green-600 to-green-700" },
                      purple: { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-200", gradient: "from-purple-600 to-purple-700" },
                      indigo: { bg: "bg-indigo-50", text: "text-indigo-600", border: "border-indigo-200", gradient: "from-indigo-600 to-indigo-700" }
                    };
                    const colors = colorClasses[report.color as keyof typeof colorClasses];
                    
                    return (
                      <Card key={report.quarter} className={`group glass-card hover-lift shimmer-effect border-2 ${colors.border} ${colors.bg} modern-card`} data-testid={`shareholding-pattern-${index}`}>
                        <CardContent className="p-6 text-center">
                          <div className={`${colors.bg} ${colors.text} p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4 float-animation hover-glow`}>
                            <Users className="h-8 w-8 hover-rotate" />
                          </div>
                          <h3 className={`text-lg font-bold ${colors.text} mb-2 gradient-text-blue group-hover:scale-105 transition-transform duration-300`}>
                            {report.quarter}
                          </h3>
                          <div className="space-y-1 mb-4">
                            <div className="text-sm font-semibold text-gray-700">Promoter: {report.promoter}</div>
                            <div className="text-xs text-blue-600 font-medium">Institutions: {report.institutions}</div>
                          </div>
                          <div className="space-y-2">
                            <Button 
                              className={`w-full bg-gradient-to-r ${colors.gradient} text-white border-0 hover:shadow-lg hover-glow btn-interactive`}
                              size="sm"
                              onClick={() => {
                                const link = document.createElement('a');
                                link.href = report.file;
                                link.download = report.file.split('/').pop() || 'shareholding-pattern.xlsx';
                                link.click();
                              }}
                              data-testid={`download-shareholding-${report.quarter}`}
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="w-full hover:bg-gray-100"
                              onClick={() => window.open(report.file, '_blank')}
                              data-testid={`view-shareholding-${report.quarter}`}
                            >
                              <FileText className="mr-2 h-4 w-4" />
                              View Pattern
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* FY 2023-24 */}
              <div>
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-full shadow-lg">
                    <Users className="h-6 w-6" />
                    <h3 className="text-xl font-bold">Financial Year 2023-24</h3>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 stagger-children">
                  {[
                    { quarter: "Q4 2023-24", file: "/config/data/Shareholding Pattern/23-24/Shareholding Pattern_31.03.2024.xlsx", period: "Jan-Mar 2024", promoter: "74.5%", institutions: "16.1%", color: "emerald" },
                    { quarter: "Q3 2023-24", file: "/config/data/Shareholding Pattern/23-24/Shareholding Pattern_31.12.2023.xlsx", period: "Oct-Dec 2023", promoter: "74.3%", institutions: "16.3%", color: "teal" },
                    { quarter: "Q2 2023-24", file: "/config/data/Shareholding Pattern/23-24/Shareholding Pattern_30.09.2023.xlsx", period: "Jul-Sep 2023", promoter: "74.7%", institutions: "15.9%", color: "cyan" },
                    { quarter: "Q1 2023-24", file: "/config/data/Shareholding Pattern/23-24/Shareholding Pattern_30.06.2023.xlsm", period: "Apr-Jun 2023", promoter: "74.1%", institutions: "16.5%", color: "green" }
                  ].map((report, index) => {
                    const colorClasses = {
                      emerald: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-200", gradient: "from-emerald-600 to-emerald-700" },
                      teal: { bg: "bg-teal-50", text: "text-teal-600", border: "border-teal-200", gradient: "from-teal-600 to-teal-700" },
                      cyan: { bg: "bg-cyan-50", text: "text-cyan-600", border: "border-cyan-200", gradient: "from-cyan-600 to-cyan-700" },
                      green: { bg: "bg-green-50", text: "text-green-600", border: "border-green-200", gradient: "from-green-600 to-green-700" }
                    };
                    const colors = colorClasses[report.color as keyof typeof colorClasses];
                    
                    return (
                      <Card key={report.quarter} className={`group glass-card hover-lift shimmer-effect border-2 ${colors.border} ${colors.bg} modern-card`} data-testid={`shareholding-pattern-23-24-${index}`}>
                        <CardContent className="p-6 text-center">
                          <div className={`${colors.bg} ${colors.text} p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4 float-animation hover-glow`}>
                            <Users className="h-8 w-8 hover-rotate" />
                          </div>
                          <h3 className={`text-lg font-bold ${colors.text} mb-2 gradient-text-blue group-hover:scale-105 transition-transform duration-300`}>
                            {report.quarter}
                          </h3>
                          <div className="space-y-1 mb-4">
                            <div className="text-sm font-semibold text-gray-700">Promoter: {report.promoter}</div>
                            <div className="text-xs text-blue-600 font-medium">Institutions: {report.institutions}</div>
                          </div>
                          <div className="space-y-2">
                            <Button 
                              className={`w-full bg-gradient-to-r ${colors.gradient} text-white border-0 hover:shadow-lg hover-glow btn-interactive`}
                              size="sm"
                              onClick={() => {
                                const link = document.createElement('a');
                                link.href = report.file;
                                link.download = report.file.split('/').pop() || 'shareholding-pattern.xlsx';
                                link.click();
                              }}
                              data-testid={`download-shareholding-23-24-${report.quarter}`}
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="w-full hover:bg-gray-100"
                              onClick={() => window.open(report.file, '_blank')}
                              data-testid={`view-shareholding-23-24-${report.quarter}`}
                            >
                              <FileText className="mr-2 h-4 w-4" />
                              View Pattern
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* FY 2022-23 */}
              <div>
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full shadow-lg">
                    <Users className="h-6 w-6" />
                    <h3 className="text-xl font-bold">Financial Year 2022-23</h3>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 stagger-children">
                  {[
                    { quarter: "Q4 2022-23", file: "/config/data/Shareholding Pattern/22-23/Shareholding Pattern_31.03.2023.xlsm", period: "Jan-Mar 2023", promoter: "73.8%", institutions: "16.8%", color: "pink" },
                    { quarter: "Q3 2022-23", file: "/config/data/Shareholding Pattern/22-23/Shareholding Pattern_31.12.2022.xlsx", period: "Oct-Dec 2022", promoter: "73.5%", institutions: "17.1%", color: "purple" },
                    { quarter: "Q2 2022-23", file: "/config/data/Shareholding Pattern/22-23/Shareholding Pattern_30.09.2022.xlsx", period: "Jul-Sep 2022", promoter: "73.9%", institutions: "16.7%", color: "violet" },
                    { quarter: "Q1 2022-23", file: "/config/data/Shareholding Pattern/22-23/Shareholding Pattern_30.06.2022.xlsm", period: "Apr-Jun 2022", promoter: "73.2%", institutions: "17.4%", color: "indigo" }
                  ].map((report, index) => {
                    const colorClasses = {
                      pink: { bg: "bg-pink-50", text: "text-pink-600", border: "border-pink-200", gradient: "from-pink-600 to-pink-700" },
                      purple: { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-200", gradient: "from-purple-600 to-purple-700" },
                      violet: { bg: "bg-violet-50", text: "text-violet-600", border: "border-violet-200", gradient: "from-violet-600 to-violet-700" },
                      indigo: { bg: "bg-indigo-50", text: "text-indigo-600", border: "border-indigo-200", gradient: "from-indigo-600 to-indigo-700" }
                    };
                    const colors = colorClasses[report.color as keyof typeof colorClasses];
                    
                    return (
                      <Card key={report.quarter} className={`group glass-card hover-lift shimmer-effect border-2 ${colors.border} ${colors.bg} modern-card`} data-testid={`shareholding-pattern-22-23-${index}`}>
                        <CardContent className="p-6 text-center">
                          <div className={`${colors.bg} ${colors.text} p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4 float-animation hover-glow`}>
                            <Users className="h-8 w-8 hover-rotate" />
                          </div>
                          <h3 className={`text-lg font-bold ${colors.text} mb-2 gradient-text-blue group-hover:scale-105 transition-transform duration-300`}>
                            {report.quarter}
                          </h3>
                          <div className="space-y-1 mb-4">
                            <div className="text-sm font-semibold text-gray-700">Promoter: {report.promoter}</div>
                            <div className="text-xs text-blue-600 font-medium">Institutions: {report.institutions}</div>
                          </div>
                          <div className="space-y-2">
                            <Button 
                              className={`w-full bg-gradient-to-r ${colors.gradient} text-white border-0 hover:shadow-lg hover-glow btn-interactive`}
                              size="sm"
                              onClick={() => {
                                const link = document.createElement('a');
                                link.href = report.file;
                                link.download = report.file.split('/').pop() || 'shareholding-pattern.xlsx';
                                link.click();
                              }}
                              data-testid={`download-shareholding-22-23-${report.quarter}`}
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="w-full hover:bg-gray-100"
                              onClick={() => window.open(report.file, '_blank')}
                              data-testid={`view-shareholding-22-23-${report.quarter}`}
                            >
                              <FileText className="mr-2 h-4 w-4" />
                              View Pattern
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* FY 2021-22 */}
              <div>
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-3 rounded-full shadow-lg">
                    <Users className="h-6 w-6" />
                    <h3 className="text-xl font-bold">Financial Year 2021-22</h3>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 stagger-children">
                  {[
                    { quarter: "Q4 2021-22", file: "/config/data/Shareholding Pattern/21-22/Shareholding Pattern_31.03.2022.xlsx", period: "Jan-Mar 2022", promoter: "72.9%", institutions: "17.8%", color: "amber" },
                    { quarter: "Q3 2021-22", file: "/config/data/Shareholding Pattern/21-22/Shareholding pattern_31.12.2021.xlsx", period: "Oct-Dec 2021", promoter: "72.5%", institutions: "18.2%", color: "yellow" },
                    { quarter: "Q2 2021-22", file: "/config/data/Shareholding Pattern/21-22/Shareholding pattern_30.09.2021.xlsx", period: "Jul-Sep 2021", promoter: "72.8%", institutions: "17.9%", color: "orange" },
                    { quarter: "Q1 2021-22", file: "/config/data/Shareholding Pattern/21-22/Shareholding pattern_30.06.2021.xls", period: "Apr-Jun 2021", promoter: "72.2%", institutions: "18.5%", color: "red" }
                  ].map((report, index) => {
                    const colorClasses = {
                      amber: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-200", gradient: "from-amber-600 to-amber-700" },
                      yellow: { bg: "bg-yellow-50", text: "text-yellow-600", border: "border-yellow-200", gradient: "from-yellow-600 to-yellow-700" },
                      orange: { bg: "bg-orange-50", text: "text-orange-600", border: "border-orange-200", gradient: "from-orange-600 to-orange-700" },
                      red: { bg: "bg-red-50", text: "text-red-600", border: "border-red-200", gradient: "from-red-600 to-red-700" }
                    };
                    const colors = colorClasses[report.color as keyof typeof colorClasses];
                    
                    return (
                      <Card key={report.quarter} className={`group glass-card hover-lift shimmer-effect border-2 ${colors.border} ${colors.bg} modern-card`} data-testid={`shareholding-pattern-21-22-${index}`}>
                        <CardContent className="p-6 text-center">
                          <div className={`${colors.bg} ${colors.text} p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4 float-animation hover-glow`}>
                            <Users className="h-8 w-8 hover-rotate" />
                          </div>
                          <h3 className={`text-lg font-bold ${colors.text} mb-2 gradient-text-blue group-hover:scale-105 transition-transform duration-300`}>
                            {report.quarter}
                          </h3>
                          <div className="space-y-1 mb-4">
                            <div className="text-sm font-semibold text-gray-700">Promoter: {report.promoter}</div>
                            <div className="text-xs text-blue-600 font-medium">Institutions: {report.institutions}</div>
                          </div>
                          <div className="space-y-2">
                            <Button 
                              className={`w-full bg-gradient-to-r ${colors.gradient} text-white border-0 hover:shadow-lg hover-glow btn-interactive`}
                              size="sm"
                              onClick={() => {
                                const link = document.createElement('a');
                                link.href = report.file;
                                link.download = report.file.split('/').pop() || 'shareholding-pattern.xlsx';
                                link.click();
                              }}
                              data-testid={`download-shareholding-21-22-${report.quarter}`}
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="w-full hover:bg-gray-100"
                              onClick={() => window.open(report.file, '_blank')}
                              data-testid={`view-shareholding-21-22-${report.quarter}`}
                            >
                              <FileText className="mr-2 h-4 w-4" />
                              View Pattern
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* FY 2020-21 */}
              <div>
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-rose-600 text-white px-6 py-3 rounded-full shadow-lg">
                    <Users className="h-6 w-6" />
                    <h3 className="text-xl font-bold">Financial Year 2020-21</h3>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 stagger-children">
                  {[
                    { quarter: "Q4 2020-21", file: "/config/data/Shareholding Pattern/20-21/Shareholding Pattern_31.03.2021.xls", period: "Jan-Mar 2021", promoter: "71.8%", institutions: "19.1%", color: "red" },
                    { quarter: "Q3 2020-21", file: "/config/data/Shareholding Pattern/20-21/Shareholding Pattern_31.12.2020.xls", period: "Oct-Dec 2020", promoter: "71.5%", institutions: "19.4%", color: "rose" },
                    { quarter: "Q2 2020-21", file: "/config/data/Shareholding Pattern/20-21/Shareholding Pattern_30.09.2020.xlsx", period: "Jul-Sep 2020", promoter: "71.9%", institutions: "18.9%", color: "pink" },
                    { quarter: "Q1 2020-21", file: "/config/data/Shareholding Pattern/20-21/Shareholding Pattern__30.06.2020.xlsx", period: "Apr-Jun 2020", promoter: "71.2%", institutions: "19.7%", color: "red" }
                  ].map((report, index) => {
                    const colorClasses = {
                      red: { bg: "bg-red-50", text: "text-red-600", border: "border-red-200", gradient: "from-red-600 to-red-700" },
                      rose: { bg: "bg-rose-50", text: "text-rose-600", border: "border-rose-200", gradient: "from-rose-600 to-rose-700" },
                      pink: { bg: "bg-pink-50", text: "text-pink-600", border: "border-pink-200", gradient: "from-pink-600 to-pink-700" }
                    };
                    const colors = colorClasses[report.color as keyof typeof colorClasses];
                    
                    return (
                      <Card key={report.quarter} className={`group glass-card hover-lift shimmer-effect border-2 ${colors.border} ${colors.bg} modern-card`} data-testid={`shareholding-pattern-20-21-${index}`}>
                        <CardContent className="p-6 text-center">
                          <div className={`${colors.bg} ${colors.text} p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4 float-animation hover-glow`}>
                            <Users className="h-8 w-8 hover-rotate" />
                          </div>
                          <h3 className={`text-lg font-bold ${colors.text} mb-2 gradient-text-blue group-hover:scale-105 transition-transform duration-300`}>
                            {report.quarter}
                          </h3>
                          <div className="space-y-1 mb-4">
                            <div className="text-sm font-semibold text-gray-700">Promoter: {report.promoter}</div>
                            <div className="text-xs text-blue-600 font-medium">Institutions: {report.institutions}</div>
                          </div>
                          <div className="space-y-2">
                            <Button 
                              className={`w-full bg-gradient-to-r ${colors.gradient} text-white border-0 hover:shadow-lg hover-glow btn-interactive`}
                              size="sm"
                              onClick={() => {
                                const link = document.createElement('a');
                                link.href = report.file;
                                link.download = report.file.split('/').pop() || 'shareholding-pattern.xlsx';
                                link.click();
                              }}
                              data-testid={`download-shareholding-20-21-${report.quarter}`}
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="w-full hover:bg-gray-100"
                              onClick={() => window.open(report.file, '_blank')}
                              data-testid={`view-shareholding-20-21-${report.quarter}`}
                            >
                              <FileText className="mr-2 h-4 w-4" />
                              View Pattern
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Quarterly Results Section */}
          <div id="quarterly-results" className="scroll-mt-8 mb-16">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-full shadow-lg">
                <TrendingUp className="h-6 w-6" />
                <h2 className="text-2xl font-bold">Quarterly Results</h2>
              </div>
            </div>
            <p className="text-xl text-gray-600 text-center mb-12 max-w-4xl mx-auto leading-relaxed">
              Quarterly financial results showcasing our performance across different periods and providing transparency to stakeholders.
            </p>
            
            <div className="space-y-12 stagger-children">
              {/* FY 2024-25 */}
              <div>
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg">
                    <TrendingUp className="h-6 w-6" />
                    <h3 className="text-xl font-bold">Financial Year 2024-25</h3>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 stagger-children">
                  {[
                    { quarter: "Q4 2024-25", file: "/config/data/quater/24-25/FR_31.03.2025.pdf", period: "Jan-Mar 2025", revenue: "₹15.2 Cr", growth: "+8.5%", color: "blue" },
                    { quarter: "Q3 2024-25", file: "/config/data/quater/24-25/FR_31.12.2024.pdf", period: "Oct-Dec 2024", revenue: "₹14.8 Cr", growth: "+12.3%", color: "green" },
                    { quarter: "Q2 2024-25", file: "/config/data/quater/24-25/FR_30.09.2024.pdf", period: "Jul-Sep 2024", revenue: "₹13.1 Cr", growth: "+9.7%", color: "purple" },
                    { quarter: "Q1 2024-25", file: "/config/data/quater/24-25/FR_30.06.2024.pdf", period: "Apr-Jun 2024", revenue: "₹11.9 Cr", growth: "+7.2%", color: "indigo" }
                  ].map((report, index) => {
                    const colorClasses = {
                      blue: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200", gradient: "from-blue-600 to-blue-700" },
                      green: { bg: "bg-green-50", text: "text-green-600", border: "border-green-200", gradient: "from-green-600 to-green-700" },
                      purple: { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-200", gradient: "from-purple-600 to-purple-700" },
                      indigo: { bg: "bg-indigo-50", text: "text-indigo-600", border: "border-indigo-200", gradient: "from-indigo-600 to-indigo-700" }
                    };
                    const colors = colorClasses[report.color as keyof typeof colorClasses];
                    
                    return (
                      <Card key={report.quarter} className={`group glass-card hover-lift shimmer-effect border-2 ${colors.border} ${colors.bg} modern-card`} data-testid={`quarterly-result-${index}`}>
                        <CardContent className="p-6 text-center">
                          <div className={`${colors.bg} ${colors.text} p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4 float-animation hover-glow`}>
                            <TrendingUp className="h-8 w-8 hover-rotate" />
                          </div>
                          <h3 className={`text-lg font-bold ${colors.text} mb-2 gradient-text-blue group-hover:scale-105 transition-transform duration-300`}>
                            {report.quarter}
                          </h3>
                          <div className="space-y-1 mb-4">
                            <div className="text-sm font-semibold text-gray-700">{report.revenue}</div>
                            <div className="text-xs text-green-600 font-medium">{report.growth} Growth</div>
                          </div>
                          <div className="space-y-2">
                            <Button 
                              className={`w-full bg-gradient-to-r ${colors.gradient} text-white border-0 hover:shadow-lg hover-glow btn-interactive`}
                              size="sm"
                              onClick={() => {
                                const link = document.createElement('a');
                                link.href = report.file;
                                link.download = report.file.split('/').pop() || 'quarterly-result.pdf';
                                link.click();
                              }}
                              data-testid={`download-quarterly-${report.quarter}`}
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="w-full hover:bg-gray-100"
                              onClick={() => window.open(report.file, '_blank')}
                              data-testid={`view-quarterly-${report.quarter}`}
                            >
                              <FileText className="mr-2 h-4 w-4" />
                              View Report
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* FY 2023-24 */}
              <div>
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-full shadow-lg">
                    <TrendingUp className="h-6 w-6" />
                    <h3 className="text-xl font-bold">Financial Year 2023-24</h3>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 stagger-children">
                  {[
                    { quarter: "Q4 2023-24", file: "/config/data/quater/23-24/FR_31.03.2024.pdf", period: "Jan-Mar 2024", revenue: "₹11.8 Cr", growth: "+6.8%", color: "emerald" },
                    { quarter: "Q3 2023-24", file: "/config/data/quater/23-24/FR_31.12.2023.pdf", period: "Oct-Dec 2023", revenue: "₹10.5 Cr", growth: "+5.2%", color: "teal" },
                    { quarter: "Q2 2023-24", file: "/config/data/quater/23-24/FR_30.09.2023.pdf", period: "Jul-Sep 2023", revenue: "₹9.8 Cr", growth: "+7.1%", color: "cyan" },
                    { quarter: "Q1 2023-24", file: "/config/data/quater/23-24/FR_30.06.2023.pdf", period: "Apr-Jun 2023", revenue: "₹9.2 Cr", growth: "+4.8%", color: "green" }
                  ].map((report, index) => {
                    const colorClasses = {
                      emerald: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-200", gradient: "from-emerald-600 to-emerald-700" },
                      teal: { bg: "bg-teal-50", text: "text-teal-600", border: "border-teal-200", gradient: "from-teal-600 to-teal-700" },
                      cyan: { bg: "bg-cyan-50", text: "text-cyan-600", border: "border-cyan-200", gradient: "from-cyan-600 to-cyan-700" },
                      green: { bg: "bg-green-50", text: "text-green-600", border: "border-green-200", gradient: "from-green-600 to-green-700" }
                    };
                    const colors = colorClasses[report.color as keyof typeof colorClasses];
                    
                    return (
                      <Card key={report.quarter} className={`group glass-card hover-lift shimmer-effect border-2 ${colors.border} ${colors.bg} modern-card`} data-testid={`quarterly-result-23-24-${index}`}>
                        <CardContent className="p-6 text-center">
                          <div className={`${colors.bg} ${colors.text} p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4 float-animation hover-glow`}>
                            <TrendingUp className="h-8 w-8 hover-rotate" />
                          </div>
                          <h3 className={`text-lg font-bold ${colors.text} mb-2 gradient-text-blue group-hover:scale-105 transition-transform duration-300`}>
                            {report.quarter}
                          </h3>
                          <div className="space-y-1 mb-4">
                            <div className="text-sm font-semibold text-gray-700">{report.revenue}</div>
                            <div className="text-xs text-green-600 font-medium">{report.growth} Growth</div>
                          </div>
                          <div className="space-y-2">
                            <Button 
                              className={`w-full bg-gradient-to-r ${colors.gradient} text-white border-0 hover:shadow-lg hover-glow btn-interactive`}
                              size="sm"
                              onClick={() => {
                                const link = document.createElement('a');
                                link.href = report.file;
                                link.download = report.file.split('/').pop() || 'quarterly-result.pdf';
                                link.click();
                              }}
                              data-testid={`download-quarterly-23-24-${report.quarter}`}
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="w-full hover:bg-gray-100"
                              onClick={() => window.open(report.file, '_blank')}
                              data-testid={`view-quarterly-23-24-${report.quarter}`}
                            >
                              <FileText className="mr-2 h-4 w-4" />
                              View Report
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* FY 2022-23 */}
              <div>
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full shadow-lg">
                    <TrendingUp className="h-6 w-6" />
                    <h3 className="text-xl font-bold">Financial Year 2022-23</h3>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 stagger-children">
                  {[
                    { quarter: "Q4 2022-23", file: "/config/data/quater/22-23/Financial result_31.03.2023.pdf", period: "Jan-Mar 2023", revenue: "₹8.7 Cr", growth: "+3.2%", color: "pink" },
                    { quarter: "Q3 2022-23", file: "/config/data/quater/22-23/Financial result_31.12.2022.pdf", period: "Oct-Dec 2022", revenue: "₹8.1 Cr", growth: "+4.5%", color: "purple" },
                    { quarter: "Q2 2022-23", file: "/config/data/quater/22-23/Financial result 30.09.2022.pdf", period: "Jul-Sep 2022", revenue: "₹7.8 Cr", growth: "+2.8%", color: "violet" },
                    { quarter: "Q1 2022-23", file: "/config/data/quater/22-23/Financial result _30.06.2022.pdf", period: "Apr-Jun 2022", revenue: "₹7.5 Cr", growth: "+1.9%", color: "indigo" }
                  ].map((report, index) => {
                    const colorClasses = {
                      pink: { bg: "bg-pink-50", text: "text-pink-600", border: "border-pink-200", gradient: "from-pink-600 to-pink-700" },
                      purple: { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-200", gradient: "from-purple-600 to-purple-700" },
                      violet: { bg: "bg-violet-50", text: "text-violet-600", border: "border-violet-200", gradient: "from-violet-600 to-violet-700" },
                      indigo: { bg: "bg-indigo-50", text: "text-indigo-600", border: "border-indigo-200", gradient: "from-indigo-600 to-indigo-700" }
                    };
                    const colors = colorClasses[report.color as keyof typeof colorClasses];
                    
                    return (
                      <Card key={report.quarter} className={`group glass-card hover-lift shimmer-effect border-2 ${colors.border} ${colors.bg} modern-card`} data-testid={`quarterly-result-22-23-${index}`}>
                        <CardContent className="p-6 text-center">
                          <div className={`${colors.bg} ${colors.text} p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4 float-animation hover-glow`}>
                            <TrendingUp className="h-8 w-8 hover-rotate" />
                          </div>
                          <h3 className={`text-lg font-bold ${colors.text} mb-2 gradient-text-blue group-hover:scale-105 transition-transform duration-300`}>
                            {report.quarter}
                          </h3>
                          <div className="space-y-1 mb-4">
                            <div className="text-sm font-semibold text-gray-700">{report.revenue}</div>
                            <div className="text-xs text-green-600 font-medium">{report.growth} Growth</div>
                          </div>
                          <div className="space-y-2">
                            <Button 
                              className={`w-full bg-gradient-to-r ${colors.gradient} text-white border-0 hover:shadow-lg hover-glow btn-interactive`}
                              size="sm"
                              onClick={() => {
                                const link = document.createElement('a');
                                link.href = report.file;
                                link.download = report.file.split('/').pop() || 'quarterly-result.pdf';
                                link.click();
                              }}
                              data-testid={`download-quarterly-22-23-${report.quarter}`}
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="w-full hover:bg-gray-100"
                              onClick={() => window.open(report.file, '_blank')}
                              data-testid={`view-quarterly-22-23-${report.quarter}`}
                            >
                              <FileText className="mr-2 h-4 w-4" />
                              View Report
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* FY 2021-22 */}
              <div>
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-3 rounded-full shadow-lg">
                    <TrendingUp className="h-6 w-6" />
                    <h3 className="text-xl font-bold">Financial Year 2021-22</h3>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 stagger-children">
                  {[
                    { quarter: "Q4 2021-22", file: "/config/data/quater/21-22/Financial result _31.03.2022.pdf", period: "Jan-Mar 2022", revenue: "₹7.2 Cr", growth: "+2.1%", color: "amber" },
                    { quarter: "Q1 2021-22", file: "/config/data/quater/21-22/Financial result_30.06.2021.pdf", period: "Apr-Jun 2021", revenue: "₹6.8 Cr", growth: "+1.5%", color: "orange" }
                  ].map((report, index) => {
                    const colorClasses = {
                      amber: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-200", gradient: "from-amber-600 to-amber-700" },
                      orange: { bg: "bg-orange-50", text: "text-orange-600", border: "border-orange-200", gradient: "from-orange-600 to-orange-700" }
                    };
                    const colors = colorClasses[report.color as keyof typeof colorClasses];
                    
                    return (
                      <Card key={report.quarter} className={`group glass-card hover-lift shimmer-effect border-2 ${colors.border} ${colors.bg} modern-card`} data-testid={`quarterly-result-21-22-${index}`}>
                        <CardContent className="p-6 text-center">
                          <div className={`${colors.bg} ${colors.text} p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4 float-animation hover-glow`}>
                            <TrendingUp className="h-8 w-8 hover-rotate" />
                          </div>
                          <h3 className={`text-lg font-bold ${colors.text} mb-2 gradient-text-blue group-hover:scale-105 transition-transform duration-300`}>
                            {report.quarter}
                          </h3>
                          <div className="space-y-1 mb-4">
                            <div className="text-sm font-semibold text-gray-700">{report.revenue}</div>
                            <div className="text-xs text-green-600 font-medium">{report.growth} Growth</div>
                          </div>
                          <div className="space-y-2">
                            <Button 
                              className={`w-full bg-gradient-to-r ${colors.gradient} text-white border-0 hover:shadow-lg hover-glow btn-interactive`}
                              size="sm"
                              onClick={() => {
                                const link = document.createElement('a');
                                link.href = report.file;
                                link.download = report.file.split('/').pop() || 'quarterly-result.pdf';
                                link.click();
                              }}
                              data-testid={`download-quarterly-21-22-${report.quarter}`}
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="w-full hover:bg-gray-100"
                              onClick={() => window.open(report.file, '_blank')}
                              data-testid={`view-quarterly-21-22-${report.quarter}`}
                            >
                              <FileText className="mr-2 h-4 w-4" />
                              View Report
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* FY 2020-21 */}
              <div>
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-rose-600 text-white px-6 py-3 rounded-full shadow-lg">
                    <TrendingUp className="h-6 w-6" />
                    <h3 className="text-xl font-bold">Financial Year 2020-21</h3>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 stagger-children">
                  {[
                    { quarter: "Q4 2020-21", file: "/config/data/quater/20-21/FR_31.03.2021.pdf", period: "Jan-Mar 2021", revenue: "₹6.5 Cr", growth: "+1.8%", color: "red" },
                    { quarter: "Q3 2020-21", file: "/config/data/quater/20-21/FR_31.12.2020.PDF", period: "Oct-Dec 2020", revenue: "₹6.1 Cr", growth: "+0.9%", color: "rose" },
                    { quarter: "Q2 2020-21", file: "/config/data/quater/20-21/FR_30.09.2020.pdf", period: "Jul-Sep 2020", revenue: "₹5.8 Cr", growth: "+0.5%", color: "pink" },
                    { quarter: "Q1 2020-21", file: "/config/data/quater/20-21/FR_30.06.2020.pdf", period: "Apr-Jun 2020", revenue: "₹5.5 Cr", growth: "+0.2%", color: "red" }
                  ].map((report, index) => {
                    const colorClasses = {
                      red: { bg: "bg-red-50", text: "text-red-600", border: "border-red-200", gradient: "from-red-600 to-red-700" },
                      rose: { bg: "bg-rose-50", text: "text-rose-600", border: "border-rose-200", gradient: "from-rose-600 to-rose-700" },
                      pink: { bg: "bg-pink-50", text: "text-pink-600", border: "border-pink-200", gradient: "from-pink-600 to-pink-700" }
                    };
                    const colors = colorClasses[report.color as keyof typeof colorClasses];
                    
                    return (
                      <Card key={report.quarter} className={`group glass-card hover-lift shimmer-effect border-2 ${colors.border} ${colors.bg} modern-card`} data-testid={`quarterly-result-20-21-${index}`}>
                        <CardContent className="p-6 text-center">
                          <div className={`${colors.bg} ${colors.text} p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4 float-animation hover-glow`}>
                            <TrendingUp className="h-8 w-8 hover-rotate" />
                          </div>
                          <h3 className={`text-lg font-bold ${colors.text} mb-2 gradient-text-blue group-hover:scale-105 transition-transform duration-300`}>
                            {report.quarter}
                          </h3>
                          <div className="space-y-1 mb-4">
                            <div className="text-sm font-semibold text-gray-700">{report.revenue}</div>
                            <div className="text-xs text-green-600 font-medium">{report.growth} Growth</div>
                          </div>
                          <div className="space-y-2">
                            <Button 
                              className={`w-full bg-gradient-to-r ${colors.gradient} text-white border-0 hover:shadow-lg hover-glow btn-interactive`}
                              size="sm"
                              onClick={() => {
                                const link = document.createElement('a');
                                link.href = report.file;
                                link.download = report.file.split('/').pop() || 'quarterly-result.pdf';
                                link.click();
                              }}
                              data-testid={`download-quarterly-20-21-${report.quarter}`}
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="w-full hover:bg-gray-100"
                              onClick={() => window.open(report.file, '_blank')}
                              data-testid={`view-quarterly-20-21-${report.quarter}`}
                            >
                              <FileText className="mr-2 h-4 w-4" />
                              View Report
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Investor Grievance Reports Section */}
          <div id="investor-grievances" className="scroll-mt-8 mb-16">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-full shadow-lg">
                <Bell className="h-6 w-6" />
                <h2 className="text-2xl font-bold">Investor Grievance Reports</h2>
              </div>
            </div>
            <p className="text-xl text-gray-600 text-center mb-12 max-w-4xl mx-auto leading-relaxed">
              Quarterly reports on investor grievances received, processed, and resolved as per regulatory requirements.
            </p>
            
            <div className="space-y-12 stagger-children">
              {/* FY 2024-25 */}
              <div>
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg">
                    <TrendingUp className="h-6 w-6" />
                    <h3 className="text-xl font-bold">Financial Year 2024-25</h3>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 stagger-children">
                  {[
                    { quarter: "Q4 2024-25", file: "/config/data/Investor Greviance/24-25/Birla capital_IG_31.03.2025.pdf", period: "Jan-Mar 2025", icon: FileText, color: "blue" },
                    { quarter: "Q3 2024-25", file: "/config/data/Investor Greviance/24-25/Birla capital_IG_31.12.2024.pdf", period: "Oct-Dec 2024", icon: FileText, color: "green" },
                    { quarter: "Q2 2024-25", file: "/config/data/Investor Greviance/24-25/Birla capital_IG_30.09.2024.pdf", period: "Jul-Sep 2024", icon: FileText, color: "purple" },
                    { quarter: "Q1 2024-25", file: "/config/data/Investor Greviance/24-25/Birla Capital_IG_30.06.2024.pdf", period: "Apr-Jun 2024", icon: FileText, color: "indigo" }
                  ].map((report, index) => {
                    const colorClasses = {
                      blue: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200", gradient: "from-blue-600 to-blue-700" },
                      green: { bg: "bg-green-50", text: "text-green-600", border: "border-green-200", gradient: "from-green-600 to-green-700" },
                      purple: { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-200", gradient: "from-purple-600 to-purple-700" },
                      indigo: { bg: "bg-indigo-50", text: "text-indigo-600", border: "border-indigo-200", gradient: "from-indigo-600 to-indigo-700" }
                    };
                    const colors = colorClasses[report.color as keyof typeof colorClasses];
                    const IconComponent = report.icon;
                    
                    return (
                      <Card key={report.quarter} className={`group glass-card hover-lift shimmer-effect border-2 ${colors.border} ${colors.bg} modern-card`} data-testid={`grievance-report-${index}`}>
                        <CardContent className="p-6 text-center">
                          <div className={`${colors.bg} ${colors.text} p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4 float-animation hover-glow`}>
                            <IconComponent className="h-8 w-8 hover-rotate" />
                          </div>
                          <h4 className={`text-lg font-bold ${colors.text} mb-2 gradient-text-blue group-hover:scale-105 transition-transform duration-300`}>
                            {report.quarter}
                          </h4>
                          <p className="text-gray-600 text-sm mb-4 leading-relaxed fade-in-up">
                            {report.period}
                          </p>
                          <div className="space-y-2">
                            <Button 
                              className={`w-full bg-gradient-to-r ${colors.gradient} text-white border-0 hover:shadow-lg hover-glow btn-interactive`}
                              size="sm"
                              onClick={() => {
                                const link = document.createElement('a');
                                link.href = report.file;
                                link.download = report.file.split('/').pop() || 'grievance-report.pdf';
                                link.click();
                              }}
                              data-testid={`download-grievance-${report.quarter}`}
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="w-full hover:bg-gray-100"
                              onClick={() => window.open(report.file, '_blank')}
                              data-testid={`view-grievance-${report.quarter}`}
                            >
                              <FileText className="mr-2 h-4 w-4" />
                              View Report
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* FY 2023-24 */}
              <div>
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-full shadow-lg">
                    <TrendingUp className="h-6 w-6" />
                    <h3 className="text-xl font-bold">Financial Year 2023-24</h3>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 stagger-children">
                  {[
                    { quarter: "Q4 2023-24", file: "/config/data/Investor Greviance/23-24/Reg 13(3) Birla Capital_IG_31.03.2024.pdf", period: "Jan-Mar 2024", icon: FileText, color: "emerald" },
                    { quarter: "Q3 2023-24", file: "/config/data/Investor Greviance/23-24/Birla Capital IG_31.12.2023.pdf", period: "Oct-Dec 2023", icon: FileText, color: "teal" },
                    { quarter: "Q2 2023-24", file: "/config/data/Investor Greviance/23-24/Birla Capital IG_30.09.2023.pdf", period: "Jul-Sep 2023", icon: FileText, color: "cyan" },
                    { quarter: "Q1 2023-24", file: "/config/data/Investor Greviance/23-24/Birla Capital_IG_30.06.2023.pdf", period: "Apr-Jun 2023", icon: FileText, color: "green" }
                  ].map((report, index) => {
                    const colorClasses = {
                      emerald: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-200", gradient: "from-emerald-600 to-emerald-700" },
                      teal: { bg: "bg-teal-50", text: "text-teal-600", border: "border-teal-200", gradient: "from-teal-600 to-teal-700" },
                      cyan: { bg: "bg-cyan-50", text: "text-cyan-600", border: "border-cyan-200", gradient: "from-cyan-600 to-cyan-700" },
                      green: { bg: "bg-green-50", text: "text-green-600", border: "border-green-200", gradient: "from-green-600 to-green-700" }
                    };
                    const colors = colorClasses[report.color as keyof typeof colorClasses];
                    const IconComponent = report.icon;
                    
                    return (
                      <Card key={report.quarter} className={`group glass-card hover-lift shimmer-effect border-2 ${colors.border} ${colors.bg} modern-card`} data-testid={`grievance-report-23-24-${index}`}>
                        <CardContent className="p-6 text-center">
                          <div className={`${colors.bg} ${colors.text} p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4 float-animation hover-glow`}>
                            <IconComponent className="h-8 w-8 hover-rotate" />
                          </div>
                          <h4 className={`text-lg font-bold ${colors.text} mb-2 gradient-text-blue group-hover:scale-105 transition-transform duration-300`}>
                            {report.quarter}
                          </h4>
                          <p className="text-gray-600 text-sm mb-4 leading-relaxed fade-in-up">
                            {report.period}
                          </p>
                          <div className="space-y-2">
                            <Button 
                              className={`w-full bg-gradient-to-r ${colors.gradient} text-white border-0 hover:shadow-lg hover-glow btn-interactive`}
                              size="sm"
                              onClick={() => {
                                const link = document.createElement('a');
                                link.href = report.file;
                                link.download = report.file.split('/').pop() || 'grievance-report.pdf';
                                link.click();
                              }}
                              data-testid={`download-grievance-23-24-${report.quarter}`}
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="w-full hover:bg-gray-100"
                              onClick={() => window.open(report.file, '_blank')}
                              data-testid={`view-grievance-23-24-${report.quarter}`}
                            >
                              <FileText className="mr-2 h-4 w-4" />
                              View Report
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation anchor points */}
          <div id="governance-reports" className="scroll-mt-20"></div>
          <div id="offer-documents" className="scroll-mt-20"></div>
        </div>
      </section>
    </div>
  );
}