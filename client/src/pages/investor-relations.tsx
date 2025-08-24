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
              <div className="flex items-center gap-2 mb-6">
                <Star className="h-6 w-6 text-yellow-500" />
                <h2 className="text-2xl font-bold text-gray-900">Featured Documents</h2>
              </div>
              <div className="grid lg:grid-cols-2 gap-6">
                {featuredDocs.slice(0, 2).map((doc, index) => (
                  <PDFViewer
                    key={doc.id}
                    title={doc.title}
                    fileName={doc.file_name}
                    filePath={doc.file_path}
                    fileSize="1.2 MB"
                    description={doc.description}
                    type={doc.type}
                    downloads={Math.floor(Math.random() * 1000) + 100}
                    className="border-2 border-blue-200 shadow-lg"
                    showPreview={true}
                  />
                ))}
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
                <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredDocs.map((doc, index) => (
                    <PDFViewer
                      key={doc.id}
                      title={doc.title}
                      fileName={doc.file_name}
                      filePath={doc.file_path}
                      fileSize="1.2 MB"
                      description={doc.description}
                      type={doc.type}
                      downloads={Math.floor(Math.random() * 1000) + 100}
                      className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                      showPreview={config.ui_settings.pdf_viewer.enable_inline_preview}
                    />
                  ))}
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
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 stagger-children mb-12">
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
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 stagger-children">
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
            
            <div className="p-8 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 rounded-xl shadow-lg border border-purple-200">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover-lift">
                  <div className="text-3xl font-bold text-blue-600 mb-2">75.2%</div>
                  <div className="text-sm font-semibold text-gray-900">Promoter & Promoter Group</div>
                </div>
                <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover-lift">
                  <div className="text-3xl font-bold text-green-600 mb-2">15.3%</div>
                  <div className="text-sm font-semibold text-gray-900">Financial Institutions</div>
                </div>
                <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover-lift">
                  <div className="text-3xl font-bold text-purple-600 mb-2">6.8%</div>
                  <div className="text-sm font-semibold text-gray-900">Non-Institutional</div>
                </div>
                <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover-lift">
                  <div className="text-3xl font-bold text-orange-600 mb-2">2.7%</div>
                  <div className="text-sm font-semibold text-gray-900">Others</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quarterly Results Section */}
          <div id="quarterly-results" className="scroll-mt-8 mb-16">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-full shadow-lg">
                <Star className="h-6 w-6" />
                <h2 className="text-2xl font-bold">Quarterly Results</h2>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
              {["Q4 2023-24", "Q3 2023-24", "Q2 2023-24", "Q1 2023-24"].map((quarter, index) => (
                <Card key={quarter} className="group glass-card hover-lift shimmer-effect border-2 border-orange-200 bg-orange-50 modern-card">
                  <CardContent className="p-6 text-center">
                    <div className="bg-orange-50 text-orange-600 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4 float-animation hover-glow">
                      <Star className="h-8 w-8 hover-rotate" />
                    </div>
                    <h3 className="text-lg font-bold text-orange-600 mb-3 gradient-text-blue group-hover:scale-105 transition-transform duration-300">
                      {quarter}
                    </h3>
                    <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white border-0 hover:shadow-lg hover-glow btn-interactive" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </CardContent>
                </Card>
              ))}
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
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
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
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
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