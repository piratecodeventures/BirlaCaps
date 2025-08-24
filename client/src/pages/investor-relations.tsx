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

          {/* Navigation anchor points */}
          <div id="governance-reports" className="scroll-mt-20"></div>
          <div id="offer-documents" className="scroll-mt-20"></div>
          <div id="familiarization" className="scroll-mt-20"></div>
        </div>
      </section>
    </div>
  );
}