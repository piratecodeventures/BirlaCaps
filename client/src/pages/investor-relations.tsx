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

  const getDocumentTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      'ANNUAL_REPORT': 'Annual Report',
      'QUARTERLY_RESULT': 'Quarterly Result',
      'ANNOUNCEMENT': 'Announcement',
      'GOVERNANCE': 'Governance'
    };
    return types[type] || type;
  };

  const getTabIcon = (tab: string) => {
    const icons: Record<string, React.ComponentType<any>> = {
      'all': FileText,
      'ANNUAL_REPORT': BarChart3,
      'QUARTERLY_RESULT': TrendingUp,
      'ANNOUNCEMENT': Bell,
      'GOVERNANCE': Shield
    };
    return icons[tab] || FileText;
  };

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
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
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
          <div className="mt-16" id="announcements">
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

          {/* Comprehensive Sections as per document structure */}
          <div className="mt-16 space-y-16">
            {/* Annual Reports Section */}
            <div id="annual-reports" className="scroll-mt-8">
              <h2 className="text-3xl font-bold gradient-text mb-8 text-center">Annual Reports</h2>
              <Card className="glass-card">
                <CardContent className="p-8">
                  <p className="text-gray-600 text-center mb-6">
                    Comprehensive annual reports showcasing our financial performance, strategic initiatives, and business outlook for the last five years.
                  </p>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                    {["2023-24", "2022-23", "2021-22", "2020-21", "2019-20"].map((year, index) => (
                      <Card key={year} className="hover-lift transition-all duration-300">
                        <CardContent className="p-4">
                          <div className="text-center">
                            <FileText className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                            <h3 className="font-semibold text-gray-900 mb-2">FY {year}</h3>
                            <p className="text-xs text-gray-500 mb-3">Annual Report</p>
                            <Button variant="outline" size="sm" className="w-full">
                              <Download className="mr-2 h-3 w-3" />
                              Download
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Key Highlights</h4>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">₹45.2 Cr</div>
                        <div className="text-gray-600">Revenue (FY 2023-24)</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">12.5%</div>
                        <div className="text-gray-600">Net Profit Margin</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">18.3%</div>
                        <div className="text-gray-600">ROE</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Annual Returns Section */}
            <div id="annual-returns" className="scroll-mt-8">
              <h2 className="text-3xl font-bold gradient-text mb-8 text-center">Annual Returns</h2>
              <Card className="glass-card">
                <CardContent className="p-8">
                  <p className="text-gray-600 text-center mb-6">
                    Statutory annual return filings as required by regulatory authorities for the last five years.
                  </p>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                    {[
                      { year: "2023-24", status: "Filed", date: "30/09/2024" },
                      { year: "2022-23", status: "Filed", date: "28/09/2023" },
                      { year: "2021-22", status: "Filed", date: "29/09/2022" },
                      { year: "2020-21", status: "Filed", date: "30/09/2021" },
                      { year: "2019-20", status: "Filed", date: "25/09/2020" }
                    ].map((item, index) => (
                      <Card key={item.year} className="hover-lift transition-all duration-300">
                        <CardContent className="p-4">
                          <div className="text-center">
                            <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                            <h3 className="font-semibold text-gray-900 mb-1">MGT-7</h3>
                            <p className="text-sm text-gray-700 mb-1">FY {item.year}</p>
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 mb-2 text-xs">
                              {item.status}
                            </Badge>
                            <p className="text-xs text-gray-500 mb-3">Filed: {item.date}</p>
                            <Button variant="outline" size="sm" className="w-full">
                              <Download className="mr-2 h-3 w-3" />
                              Download
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-5 w-5 text-green-600" />
                      <h4 className="font-semibold text-gray-900">Compliance Status</h4>
                    </div>
                    <p className="text-sm text-gray-700">
                      All annual returns (Form MGT-7) have been filed within the statutory timeline as per Companies Act, 2013. 
                      These returns contain details of company's shareholding, board meetings, and key corporate actions.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Shareholding Pattern Section */}
            <div id="shareholding" className="scroll-mt-8">
              <h2 className="text-3xl font-bold gradient-text mb-8 text-center">Shareholding Pattern</h2>
              <Card className="glass-card">
                <CardContent className="p-8">
                  <p className="text-gray-600 text-center mb-6">
                    Detailed shareholding pattern showing distribution of shares among different categories of shareholders over the last five years.
                  </p>
                  
                  {/* Current Shareholding Overview */}
                  <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                    <h3 className="font-semibold text-xl mb-4 text-center">Current Shareholding Distribution (Q4 2023-24)</h3>
                    <div className="grid md:grid-cols-4 gap-4 text-center">
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="text-2xl font-bold text-blue-600">75.2%</div>
                        <div className="text-sm text-gray-600">Promoter & Promoter Group</div>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="text-2xl font-bold text-green-600">15.3%</div>
                        <div className="text-sm text-gray-600">Financial Institutions</div>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="text-2xl font-bold text-purple-600">6.8%</div>
                        <div className="text-sm text-gray-600">Non-Institutional</div>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="text-2xl font-bold text-orange-600">2.7%</div>
                        <div className="text-sm text-gray-600">Others</div>
                      </div>
                    </div>
                  </div>

                  {/* Quarterly Reports - Last 5 Years */}
                  <div className="space-y-6">
                    <h3 className="font-semibold text-lg text-center">Quarterly Shareholding Reports</h3>
                    
                    {/* FY 2023-24 */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-blue-600" />
                        Financial Year 2023-24
                      </h4>
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                        {["Q4 2023-24", "Q3 2023-24", "Q2 2023-24", "Q1 2023-24"].map((quarter) => (
                          <Button key={quarter} variant="outline" size="sm" className="justify-start">
                            <BarChart3 className="mr-2 h-4 w-4" />
                            {quarter}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* FY 2022-23 */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-green-600" />
                        Financial Year 2022-23
                      </h4>
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                        {["Q4 2022-23", "Q3 2022-23", "Q2 2022-23", "Q1 2022-23"].map((quarter) => (
                          <Button key={quarter} variant="outline" size="sm" className="justify-start">
                            <BarChart3 className="mr-2 h-4 w-4" />
                            {quarter}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* FY 2021-22 */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-purple-600" />
                        Financial Year 2021-22
                      </h4>
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                        {["Q4 2021-22", "Q3 2021-22", "Q2 2021-22", "Q1 2021-22"].map((quarter) => (
                          <Button key={quarter} variant="outline" size="sm" className="justify-start">
                            <BarChart3 className="mr-2 h-4 w-4" />
                            {quarter}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* FY 2020-21 */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-orange-600" />
                        Financial Year 2020-21
                      </h4>
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                        {["Q4 2020-21", "Q3 2020-21", "Q2 2020-21", "Q1 2020-21"].map((quarter) => (
                          <Button key={quarter} variant="outline" size="sm" className="justify-start">
                            <BarChart3 className="mr-2 h-4 w-4" />
                            {quarter}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* FY 2019-20 */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-red-600" />
                        Financial Year 2019-20
                      </h4>
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                        {["Q4 2019-20", "Q3 2019-20", "Q2 2019-20", "Q1 2019-20"].map((quarter) => (
                          <Button key={quarter} variant="outline" size="sm" className="justify-start">
                            <BarChart3 className="mr-2 h-4 w-4" />
                            {quarter}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-5 w-5 text-blue-600" />
                      <h4 className="font-semibold text-gray-900">Shareholder Information</h4>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                      <div>
                        <strong>Total Paid-up Equity:</strong> ₹10,00,00,000 (10 Crores)
                      </div>
                      <div>
                        <strong>Face Value per Share:</strong> ₹10
                      </div>
                      <div>
                        <strong>Total Number of Shares:</strong> 1,00,00,000
                      </div>
                      <div>
                        <strong>Listed on:</strong> BSE Limited
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quarterly Results Section */}
            <div id="quarterly-results" className="scroll-mt-8">
              <h2 className="text-3xl font-bold gradient-text mb-8 text-center">Quarterly Results</h2>
              <Card className="glass-card">
                <CardContent className="p-8">
                  <p className="text-gray-600 text-center mb-6">
                    Quarterly financial results and performance updates.
                  </p>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {["Q4 2023-24", "Q3 2023-24", "Q2 2023-24", "Q1 2023-24"].map((quarter) => (
                      <Button key={quarter} variant="outline" className="h-12">
                        <Star className="mr-2 h-4 w-4" />
                        {quarter}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Corporate Governance Reports Section */}
            <div id="governance-reports" className="scroll-mt-8">
              <h2 className="text-3xl font-bold gradient-text mb-8 text-center">Quarterly Corporate Governance Report</h2>
              <Card className="glass-card">
                <CardContent className="p-8">
                  <p className="text-gray-600 text-center mb-6">
                    Quarterly reports on corporate governance compliance and board activities.
                  </p>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {["Q4 2023-24", "Q3 2023-24", "Q2 2023-24"].map((quarter) => (
                      <Button key={quarter} variant="outline" className="h-12">
                        <Shield className="mr-2 h-4 w-4" />
                        {quarter} Governance Report
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Offer Documents Section */}
            <div id="offer-documents" className="scroll-mt-8">
              <h2 className="text-3xl font-bold gradient-text mb-8 text-center">Offer Documents</h2>
              <Card className="glass-card">
                <CardContent className="p-8">
                  <p className="text-gray-600 text-center mb-6">
                    Public offering documents, prospectuses, and related regulatory filings.
                  </p>
                  <div className="text-center">
                    <Button variant="outline" className="h-12">
                      <FileText className="mr-2 h-4 w-4" />
                      View Offer Documents
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
