import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { InvestorDocument, Announcement } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, TrendingUp, BarChart3, Bell, Shield, MessageSquare, Users, Calendar } from "lucide-react";
import { 
  getAllDocuments, 
  getDocumentsByType, 
  getFeaturedDocuments, 
  searchDocuments, 
  convertToInvestorDocument,
  getDocumentConfig
} from "@/lib/document-config";


export default function InvestorRelations() {
  const [activeTab, setActiveTab] = useState("all");

  // Get document configuration
  const config = getDocumentConfig();
  
  // Memoized document data from YAML config
  const allConfigDocs = useMemo(() => getAllDocuments(), []);
  
  // Filter docs by tab
  const filteredDocs = useMemo(() => {
    let docs = allConfigDocs;
    
    // Filter by tab
    if (activeTab !== "all") {
      docs = docs.filter(doc => doc.type === activeTab);
    }
    
    return docs;
  }, [allConfigDocs, activeTab]);

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


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900" data-testid="investor-title">
              Investor Relations
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto" data-testid="investor-subtitle">
              Financial reports, governance documents, and announcements
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tabbed Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-6 bg-white shadow-sm border">
              {[
                { value: "all", label: "All Documents", icon: FileText },
                { value: "ANNUAL_REPORT", label: "Annual Reports", icon: BarChart3 },
                { value: "QUARTERLY_RESULT", label: "Quarterly Results", icon: TrendingUp },
                { value: "ANNOUNCEMENT", label: "Announcements", icon: Bell },
                { value: "GOVERNANCE", label: "Governance", icon: Shield },
                { value: "INVESTOR_GRIEVANCES", label: "Investor Grievances", icon: MessageSquare }
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

            <TabsContent value={activeTab === "INVESTOR_GRIEVANCES" ? "INVESTOR_GRIEVANCES" : activeTab} className="space-y-6">
              {activeTab === "INVESTOR_GRIEVANCES" ? (
                <div className="space-y-8">
                  {/* Grievance Officer Information */}
                  <Card className="border-blue-200 bg-blue-50">
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-bold text-blue-900 mb-4" data-testid="grievance-officer-title">
                        Grievance Officer
                      </h2>
                      <div className="space-y-3">
                        <div>
                          <span className="font-semibold text-blue-800">Name:</span>
                          <span className="ml-2 text-gray-700">Hemant Agrawal</span>
                        </div>
                        <div>
                          <span className="font-semibold text-blue-800">Designation:</span>
                          <span className="ml-2 text-gray-700">Chief Grievance Officer</span>
                        </div>
                        <div>
                          <span className="font-semibold text-blue-800">Email:</span>
                          <span className="ml-2 text-gray-700">info@birlainternational.net</span>
                        </div>
                        <div>
                          <span className="font-semibold text-blue-800">Phone:</span>
                          <span className="ml-2 text-gray-700">+91 22 6789 1234</span>
                        </div>
                        <div>
                          <span className="font-semibold text-blue-800">Office Hours:</span>
                          <span className="ml-2 text-gray-700">Monday to Friday, 10:00 AM to 6:00 PM</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Investor Grievance Reports */}
                  <div className="space-y-8">
                    <h2 className="text-2xl font-bold text-gray-900 text-center">Investor Grievance Reports</h2>
                    
                    {/* FY 2024-25 */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Financial Year 2024-25</h3>
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                          { quarter: "Q4 2024-25", file: "/Investor Greviance/24-25/Birla capital_IG_31.03.2025.pdf", period: "Jan-Mar 2025", color: "blue" },
                          { quarter: "Q3 2024-25", file: "/Investor Greviance/24-25/Birla capital_IG_31.12.2024.pdf", period: "Oct-Dec 2024", color: "green" },
                          { quarter: "Q2 2024-25", file: "/Investor Greviance/24-25/Birla capital_IG_30.09.2024.pdf", period: "Jul-Sep 2024", color: "purple" },
                          { quarter: "Q1 2024-25", file: "/Investor Greviance/24-25/Birla Capital_IG_30.06.2024.pdf", period: "Apr-Jun 2024", color: "indigo" }
                        ].map((report, index) => {
                          const colorClasses = {
                            blue: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200", gradient: "from-blue-600 to-blue-700" },
                            green: { bg: "bg-green-50", text: "text-green-600", border: "border-green-200", gradient: "from-green-600 to-green-700" },
                            purple: { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-200", gradient: "from-purple-600 to-purple-700" },
                            indigo: { bg: "bg-indigo-50", text: "text-indigo-600", border: "border-indigo-200", gradient: "from-indigo-600 to-indigo-700" }
                          };
                          const colors = colorClasses[report.color as keyof typeof colorClasses];
                          
                          return (
                            <Card key={report.quarter} className={`border-2 ${colors.border} ${colors.bg}`} data-testid={`grievance-report-${index}`}>
                              <CardContent className="p-6 text-center">
                                <div className={`${colors.bg} ${colors.text} p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4`}>
                                  <Calendar className="h-8 w-8" />
                                </div>
                                <h4 className={`text-lg font-bold ${colors.text} mb-2`}>
                                  {report.quarter}
                                </h4>
                                <p className="text-gray-600 text-sm mb-4">{report.period}</p>
                                <div className="space-y-2">
                                  <Button 
                                    className={`w-full bg-gradient-to-r ${colors.gradient} text-white border-0`}
                                    size="sm"
                                    onClick={() => {
                                      const link = document.createElement('a');
                                      link.href = report.file;
                                      link.download = report.file.split('/').pop() || 'grievance-report.pdf';
                                      link.click();
                                    }}
                                    data-testid={`download-${report.quarter}`}
                                  >
                                    <Download className="mr-2 h-4 w-4" />
                                    Download
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="w-full hover:bg-gray-100"
                                    onClick={() => window.open(report.file, '_blank')}
                                    data-testid={`view-${report.quarter}`}
                                  >
                                    <FileText className="mr-2 h-4 w-4" />
                                    View PDF
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
                      <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Financial Year 2023-24</h3>
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                          { quarter: "Q4 2023-24", file: "/Investor Greviance/23-24/Reg 13(3) Birla Capital_IG_31.03.2024.pdf", period: "Jan-Mar 2024", color: "emerald" },
                          { quarter: "Q3 2023-24", file: "/Investor Greviance/23-24/Birla Capital IG_31.12.2023.pdf", period: "Oct-Dec 2023", color: "teal" },
                          { quarter: "Q2 2023-24", file: "/Investor Greviance/23-24/Birla Capital IG_30.09.2023.pdf", period: "Jul-Sep 2023", color: "cyan" },
                          { quarter: "Q1 2023-24", file: "/Investor Greviance/23-24/Birla Capital_IG_30.06.2023.pdf", period: "Apr-Jun 2023", color: "green" }
                        ].map((report, index) => {
                          const colorClasses = {
                            emerald: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-200", gradient: "from-emerald-600 to-emerald-700" },
                            teal: { bg: "bg-teal-50", text: "text-teal-600", border: "border-teal-200", gradient: "from-teal-600 to-teal-700" },
                            cyan: { bg: "bg-cyan-50", text: "text-cyan-600", border: "border-cyan-200", gradient: "from-cyan-600 to-cyan-700" },
                            green: { bg: "bg-green-50", text: "text-green-600", border: "border-green-200", gradient: "from-green-600 to-green-700" }
                          };
                          const colors = colorClasses[report.color as keyof typeof colorClasses];
                          
                          return (
                            <Card key={report.quarter} className={`border-2 ${colors.border} ${colors.bg}`} data-testid={`grievance-report-23-24-${index}`}>
                              <CardContent className="p-6 text-center">
                                <div className={`${colors.bg} ${colors.text} p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4`}>
                                  <Calendar className="h-8 w-8" />
                                </div>
                                <h4 className={`text-lg font-bold ${colors.text} mb-2`}>
                                  {report.quarter}
                                </h4>
                                <p className="text-gray-600 text-sm mb-4">{report.period}</p>
                                <div className="space-y-2">
                                  <Button 
                                    className={`w-full bg-gradient-to-r ${colors.gradient} text-white border-0`}
                                    size="sm"
                                    onClick={() => {
                                      const link = document.createElement('a');
                                      link.href = report.file;
                                      link.download = report.file.split('/').pop() || 'grievance-report.pdf';
                                      link.click();
                                    }}
                                    data-testid={`download-${report.quarter}`}
                                  >
                                    <Download className="mr-2 h-4 w-4" />
                                    Download
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="w-full hover:bg-gray-100"
                                    onClick={() => window.open(report.file, '_blank')}
                                    data-testid={`view-${report.quarter}`}
                                  >
                                    <FileText className="mr-2 h-4 w-4" />
                                    View PDF
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
              ) : (
                <div>
                  {/* Recent Announcements */}
                  {activeTab === "all" && (
                    <div className="mb-8">
                      <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Announcements</h2>
                      
                      {announcements.length === 0 ? (
                        <Card>
                          <CardContent className="p-8 text-center">
                            <Bell className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Announcements</h3>
                            <p className="text-gray-600">Stay tuned for important updates and announcements.</p>
                          </CardContent>
                        </Card>
                      ) : (
                        <div className="space-y-4">
                          {announcements.slice(0, 3).map((announcement, index) => (
                            <Card key={announcement.id} className="border-l-4 border-orange-500" data-testid={`announcement-${index}`}>
                              <CardContent className="p-4">
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
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2" data-testid={`announcement-title-${index}`}>
                                      {announcement.title}
                                    </h3>
                                    <p className="text-gray-700" data-testid={`announcement-description-${index}`}>
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
                  )}

                  {/* Annual Reports Section */}
                  {(activeTab === "all" || activeTab === "ANNUAL_REPORT") && (
                    <div className="space-y-8">
                      <h2 className="text-2xl font-bold text-gray-900 text-center">Annual Reports</h2>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[
                          { year: "2023-24", file: "/Annual Report/Annual Report_2023-24.pdf", color: "blue" },
                          { year: "2022-23", file: "/Annual Report/Annual Report 2022-23.pdf", color: "green" },
                          { year: "2021-22", file: "/Annual Report/Annual Reporrt_2021-22.pdf", color: "purple" },
                          { year: "2020-21", file: "/Annual Report/Annual Report 2020-21.pdf", color: "indigo" },
                          { year: "2019-20", file: "/Annual Report/Annual Report 2019-20.pdf", color: "teal" }
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
                            <Card key={report.year} className={`border-2 ${colors.border} ${colors.bg}`} data-testid={`annual-report-${index}`}>
                              <CardContent className="p-6 text-center">
                                <div className={`${colors.bg} ${colors.text} p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4`}>
                                  <BarChart3 className="h-8 w-8" />
                                </div>
                                <h3 className={`text-lg font-bold ${colors.text} mb-2`}>
                                  FY {report.year}
                                </h3>
                                <div className="text-sm font-semibold text-gray-700 mb-4">Annual Report</div>
                                <div className="space-y-2">
                                  <Button 
                                    className={`w-full bg-gradient-to-r ${colors.gradient} text-white border-0`}
                                    size="sm"
                                    onClick={() => {
                                      const link = document.createElement('a');
                                      link.href = report.file;
                                      link.download = report.file.split('/').pop() || `annual-report-${report.year}.pdf`;
                                      link.click();
                                    }}
                                    data-testid={`download-annual-${report.year}`}
                                  >
                                    <Download className="mr-2 h-4 w-4" />
                                    Download
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="w-full hover:bg-gray-100"
                                    onClick={() => window.open(report.file, '_blank')}
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
                  )}

                  {/* Annual Returns Section */}
                  {(activeTab === "all" || activeTab === "ANNUAL_REPORT") && (
                    <div className="space-y-8">
                      <h2 className="text-2xl font-bold text-gray-900 text-center">Annual Returns</h2>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[
                          { year: "2023-24", status: "Filed", date: "30/09/2024", color: "emerald", file: "/Annual Return/MGT-7_2023-24.pdf" },
                          { year: "2022-23", status: "Filed", date: "28/09/2023", color: "green", file: "/Annual Return/MGT-7_2022-23.pdf" },
                          { year: "2021-22", status: "Filed", date: "29/09/2022", color: "teal", file: "/Annual Return/MGT-7_2021-22.pdf" },
                          { year: "2020-21", status: "Filed", date: "30/09/2021", color: "cyan", file: "/Annual Return/MGT-7_2020-21.pdf" }
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
                            <Card key={item.year} className={`border-2 ${colors.border} ${colors.bg}`} data-testid={`annual-return-${index}`}>
                              <CardContent className="p-6 text-center">
                                <div className={`${colors.bg} ${colors.text} p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4`}>
                                  <TrendingUp className="h-8 w-8" />
                                </div>
                                <h3 className={`text-lg font-bold ${colors.text} mb-2`}>
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
                                    className={`w-full bg-gradient-to-r ${colors.gradient} text-white border-0`}
                                    size="sm"
                                    onClick={() => {
                                      const link = document.createElement('a');
                                      link.href = item.file;
                                      link.download = item.file.split('/').pop() || `MGT-7_${item.year}.pdf`;
                                      link.click();
                                    }}
                                    data-testid={`download-return-${item.year}`}
                                  >
                                    <Download className="mr-2 h-4 w-4" />
                                    Download
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="w-full hover:bg-gray-100"
                                    onClick={() => window.open(item.file, '_blank')}
                                    data-testid={`view-return-${item.year}`}
                                  >
                                    <FileText className="mr-2 h-4 w-4" />
                                    View MGT-7
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Shareholding Pattern Section */}
                  {(activeTab === "all" || activeTab === "GOVERNANCE") && (
                    <div className="space-y-12">
                      <h2 className="text-2xl font-bold text-gray-900 text-center">Shareholding Pattern</h2>
                      
                      {/* FY 2024-25 */}
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Financial Year 2024-25</h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                          {[
                            { quarter: "Q4 2024-25", file: "/config/data/Shareholding Pattern/24-25/Shareholding Pattern_31.03.2025.xlsx", period: "Jan-Mar 2025", color: "blue" },
                            { quarter: "Q3 2024-25", file: "/config/data/Shareholding Pattern/24-25/Shareholding Pattern_31.12.2024.xlsx", period: "Oct-Dec 2024", color: "green" },
                            { quarter: "Q2 2024-25", file: "/config/data/Shareholding Pattern/24-25/Shareholding Pattern_30.09.2024.xlsx", period: "Jul-Sep 2024", color: "purple" },
                            { quarter: "Q1 2024-25", file: "/config/data/Shareholding Pattern/24-25/Shareholding Pattern_30.06.2024.xlsx", period: "Apr-Jun 2024", color: "indigo" }
                          ].map((report, index) => {
                            const colorClasses = {
                              blue: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200", gradient: "from-blue-600 to-blue-700" },
                              green: { bg: "bg-green-50", text: "text-green-600", border: "border-green-200", gradient: "from-green-600 to-green-700" },
                              purple: { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-200", gradient: "from-purple-600 to-purple-700" },
                              indigo: { bg: "bg-indigo-50", text: "text-indigo-600", border: "border-indigo-200", gradient: "from-indigo-600 to-indigo-700" }
                            };
                            const colors = colorClasses[report.color as keyof typeof colorClasses];
                            
                            return (
                              <Card key={report.quarter} className={`border-2 ${colors.border} ${colors.bg}`} data-testid={`shareholding-pattern-${index}`}>
                                <CardContent className="p-6 text-center">
                                  <div className={`${colors.bg} ${colors.text} p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4`}>
                                    <Users className="h-8 w-8" />
                                  </div>
                                  <h3 className={`text-lg font-bold ${colors.text} mb-2`}>
                                    {report.quarter}
                                  </h3>
                                  <div className="text-sm font-semibold text-gray-700 mb-4">{report.period}</div>
                                  <div className="space-y-2">
                                    <Button 
                                      className={`w-full bg-gradient-to-r ${colors.gradient} text-white border-0`}
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
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Financial Year 2023-24</h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                          {[
                            { quarter: "Q4 2023-24", file: "/config/data/Shareholding Pattern/23-24/Shareholding Pattern_31.03.2024.xlsx", period: "Jan-Mar 2024", color: "emerald" },
                            { quarter: "Q3 2023-24", file: "/config/data/Shareholding Pattern/23-24/Shareholding Pattern_31.12.2023.xlsx", period: "Oct-Dec 2023", color: "teal" },
                            { quarter: "Q2 2023-24", file: "/config/data/Shareholding Pattern/23-24/Shareholding Pattern_30.09.2023.xlsx", period: "Jul-Sep 2023", color: "cyan" },
                            { quarter: "Q1 2023-24", file: "/config/data/Shareholding Pattern/23-24/Shareholding Pattern_30.06.2023.xlsm", period: "Apr-Jun 2023", color: "green" }
                          ].map((report, index) => {
                            const colorClasses = {
                              emerald: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-200", gradient: "from-emerald-600 to-emerald-700" },
                              teal: { bg: "bg-teal-50", text: "text-teal-600", border: "border-teal-200", gradient: "from-teal-600 to-teal-700" },
                              cyan: { bg: "bg-cyan-50", text: "text-cyan-600", border: "border-cyan-200", gradient: "from-cyan-600 to-cyan-700" },
                              green: { bg: "bg-green-50", text: "text-green-600", border: "border-green-200", gradient: "from-green-600 to-green-700" }
                            };
                            const colors = colorClasses[report.color as keyof typeof colorClasses];
                            
                            return (
                              <Card key={report.quarter} className={`border-2 ${colors.border} ${colors.bg}`} data-testid={`shareholding-pattern-23-24-${index}`}>
                                <CardContent className="p-6 text-center">
                                  <div className={`${colors.bg} ${colors.text} p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4`}>
                                    <Users className="h-8 w-8" />
                                  </div>
                                  <h3 className={`text-lg font-bold ${colors.text} mb-2`}>
                                    {report.quarter}
                                  </h3>
                                  <div className="text-sm font-semibold text-gray-700 mb-4">{report.period}</div>
                                  <div className="space-y-2">
                                    <Button 
                                      className={`w-full bg-gradient-to-r ${colors.gradient} text-white border-0`}
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
                    </div>
                  )}

                  {/* Quarterly Results Section */}
                  {(activeTab === "all" || activeTab === "QUARTERLY_RESULT") && (
                    <div className="space-y-12">
                      <h2 className="text-2xl font-bold text-gray-900 text-center">Quarterly Results</h2>
                      
                      {/* FY 2024-25 */}
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Financial Year 2024-25</h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                          {[
                            { quarter: "Q4 2024-25", file: "/quater/24-25/FR_31.03.2025.pdf", period: "Jan-Mar 2025", color: "blue" },
                            { quarter: "Q3 2024-25", file: "/quater/24-25/FR_31.12.2024.pdf", period: "Oct-Dec 2024", color: "green" },
                            { quarter: "Q2 2024-25", file: "/quater/24-25/FR_30.09.2024.pdf", period: "Jul-Sep 2024", color: "purple" },
                            { quarter: "Q1 2024-25", file: "/quater/24-25/FR_30.06.2024.pdf", period: "Apr-Jun 2024", color: "indigo" }
                          ].map((report, index) => {
                            const colorClasses = {
                              blue: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200", gradient: "from-blue-600 to-blue-700" },
                              green: { bg: "bg-green-50", text: "text-green-600", border: "border-green-200", gradient: "from-green-600 to-green-700" },
                              purple: { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-200", gradient: "from-purple-600 to-purple-700" },
                              indigo: { bg: "bg-indigo-50", text: "text-indigo-600", border: "border-indigo-200", gradient: "from-indigo-600 to-indigo-700" }
                            };
                            const colors = colorClasses[report.color as keyof typeof colorClasses];
                            
                            return (
                              <Card key={report.quarter} className={`border-2 ${colors.border} ${colors.bg}`} data-testid={`quarterly-result-${index}`}>
                                <CardContent className="p-6 text-center">
                                  <div className={`${colors.bg} ${colors.text} p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4`}>
                                    <TrendingUp className="h-8 w-8" />
                                  </div>
                                  <h3 className={`text-lg font-bold ${colors.text} mb-2`}>
                                    {report.quarter}
                                  </h3>
                                  <div className="text-sm font-semibold text-gray-700 mb-4">{report.period}</div>
                                  <div className="space-y-2">
                                    <Button 
                                      className={`w-full bg-gradient-to-r ${colors.gradient} text-white border-0`}
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
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Financial Year 2023-24</h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                          {[
                            { quarter: "Q4 2023-24", file: "/config/data/quater/23-24/FR_31.03.2024.pdf", period: "Jan-Mar 2024", color: "emerald" },
                            { quarter: "Q3 2023-24", file: "/config/data/quater/23-24/FR_31.12.2023.pdf", period: "Oct-Dec 2023", color: "teal" },
                            { quarter: "Q2 2023-24", file: "/config/data/quater/23-24/FR_30.09.2023.pdf", period: "Jul-Sep 2023", color: "cyan" },
                            { quarter: "Q1 2023-24", file: "/config/data/quater/23-24/FR_30.06.2023.pdf", period: "Apr-Jun 2023", color: "green" }
                          ].map((report, index) => {
                            const colorClasses = {
                              emerald: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-200", gradient: "from-emerald-600 to-emerald-700" },
                              teal: { bg: "bg-teal-50", text: "text-teal-600", border: "border-teal-200", gradient: "from-teal-600 to-teal-700" },
                              cyan: { bg: "bg-cyan-50", text: "text-cyan-600", border: "border-cyan-200", gradient: "from-cyan-600 to-cyan-700" },
                              green: { bg: "bg-green-50", text: "text-green-600", border: "border-green-200", gradient: "from-green-600 to-green-700" }
                            };
                            const colors = colorClasses[report.color as keyof typeof colorClasses];
                            
                            return (
                              <Card key={report.quarter} className={`border-2 ${colors.border} ${colors.bg}`} data-testid={`quarterly-result-23-24-${index}`}>
                                <CardContent className="p-6 text-center">
                                  <div className={`${colors.bg} ${colors.text} p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4`}>
                                    <TrendingUp className="h-8 w-8" />
                                  </div>
                                  <h3 className={`text-lg font-bold ${colors.text} mb-2`}>
                                    {report.quarter}
                                  </h3>
                                  <div className="text-sm font-semibold text-gray-700 mb-4">{report.period}</div>
                                  <div className="space-y-2">
                                    <Button 
                                      className={`w-full bg-gradient-to-r ${colors.gradient} text-white border-0`}
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
                    </div>
                  )}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}