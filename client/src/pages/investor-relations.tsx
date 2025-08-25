import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { InvestorDocument, Announcement } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  FileText,
  TrendingUp,
  BarChart3,
  Bell,
  Shield,
  MessageSquare,
  Users,
  Calendar,
} from "lucide-react";
import {
  getAllDocuments,
  getDocumentsByType,
  getFeaturedDocuments,
  searchDocuments,
  convertToInvestorDocument,
  getDocumentConfig,
} from "@/lib/document-config";

export default function InvestorRelations() {
  const [activeTab, setActiveTab] = useState("all");

  // Get document configuration
  const config = getDocumentConfig();

  // Memoized document data from YAML config
  const allConfigDocs = useMemo(() => getAllDocuments(), []);

  // Comprehensive color classes used throughout the component
  const getColorClasses = () => ({
    blue: {
      bg: "bg-blue-50",
      text: "text-blue-600",
      border: "border-blue-200",
      gradient: "from-blue-600 to-blue-700",
    },
    green: {
      bg: "bg-green-50",
      text: "text-green-600",
      border: "border-green-200",
      gradient: "from-green-600 to-green-700",
    },
    purple: {
      bg: "bg-purple-50",
      text: "text-purple-600",
      border: "border-purple-200",
      gradient: "from-purple-600 to-purple-700",
    },
    indigo: {
      bg: "bg-indigo-50",
      text: "text-indigo-600",
      border: "border-indigo-200",
      gradient: "from-indigo-600 to-indigo-700",
    },
    emerald: {
      bg: "bg-emerald-50",
      text: "text-emerald-600",
      border: "border-emerald-200",
      gradient: "from-emerald-600 to-emerald-700",
    },
    teal: {
      bg: "bg-teal-50",
      text: "text-teal-600",
      border: "border-teal-200",
      gradient: "from-teal-600 to-teal-700",
    },
    cyan: {
      bg: "bg-cyan-50",
      text: "text-cyan-600",
      border: "border-cyan-200",
      gradient: "from-cyan-600 to-cyan-700",
    },
    violet: {
      bg: "bg-violet-50",
      text: "text-violet-600",
      border: "border-violet-200",
      gradient: "from-violet-600 to-violet-700",
    },
    pink: {
      bg: "bg-pink-50",
      text: "text-pink-600",
      border: "border-pink-200",
      gradient: "from-pink-600 to-pink-700",
    },
    rose: {
      bg: "bg-rose-50",
      text: "text-rose-600",
      border: "border-rose-200",
      gradient: "from-rose-600 to-rose-700",
    },
    orange: {
      bg: "bg-orange-50",
      text: "text-orange-600",
      border: "border-orange-200",
      gradient: "from-orange-600 to-orange-700",
    },
    amber: {
      bg: "bg-amber-50",
      text: "text-amber-600",
      border: "border-amber-200",
      gradient: "from-amber-600 to-amber-700",
    },
    yellow: {
      bg: "bg-yellow-50",
      text: "text-yellow-600",
      border: "border-yellow-200",
      gradient: "from-yellow-600 to-yellow-700",
    },
    lime: {
      bg: "bg-lime-50",
      text: "text-lime-600",
      border: "border-lime-200",
      gradient: "from-lime-600 to-lime-700",
    },
  });

  // Filter docs by tab
  const filteredDocs = useMemo(() => {
    let docs = allConfigDocs;

    // Filter by tab
    if (activeTab !== "all") {
      docs = docs.filter((doc) => doc.type === activeTab);
    }

    return docs;
  }, [allConfigDocs, activeTab]);

  // Fallback to API data
  const { data: apiDocuments = [], isLoading } = useQuery<InvestorDocument[]>({
    queryKey: ["/api/documents"],
    queryFn: async () => {
      const response = await fetch("/api/documents");
      if (!response.ok) throw new Error("Failed to fetch documents");
      return response.json();
    },
  });

  const { data: announcements = [] } = useQuery<Announcement[]>({
    queryKey: ["/api/announcements"],
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1
              className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900"
              data-testid="investor-title"
            >
              Investor Relations
            </h1>
            <p
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              data-testid="investor-subtitle"
            >
              Financial reports, governance documents, and announcements
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tabbed Content */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="grid w-full grid-cols-6 bg-white shadow-sm border">
              {[
                { value: "all", label: "All Documents", icon: FileText },
                {
                  value: "ANNUAL_REPORT",
                  label: "Annual Reports",
                  icon: BarChart3,
                },
                {
                  value: "QUARTERLY_RESULT",
                  label: "Quarterly Results",
                  icon: TrendingUp,
                },
                { value: "ANNOUNCEMENT", label: "Announcements", icon: Bell },
                { value: "GOVERNANCE", label: "Governance", icon: Shield },
                {
                  value: "INVESTOR_GRIEVANCES",
                  label: "Investor Grievances",
                  icon: MessageSquare,
                },
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

            <TabsContent
              value={
                activeTab === "INVESTOR_GRIEVANCES"
                  ? "INVESTOR_GRIEVANCES"
                  : activeTab
              }
              className="space-y-6"
            >
              {activeTab === "INVESTOR_GRIEVANCES" ? (
                <div className="space-y-8">
                  {/* Grievance Officer Information */}
                  <Card className="border-blue-200 bg-blue-50">
                    <CardContent className="p-6">
                      <h2
                        className="text-2xl font-bold text-blue-900 mb-4"
                        data-testid="grievance-officer-title"
                      >
                        Grievance Officer
                      </h2>
                      <div className="space-y-3">
                        <div>
                          <span className="font-semibold text-blue-800">
                            Name:
                          </span>
                          <span className="ml-2 text-gray-700">
                            Hemant Agrawal
                          </span>
                        </div>
                        <div>
                          <span className="font-semibold text-blue-800">
                            Designation:
                          </span>
                          <span className="ml-2 text-gray-700">
                            Chief Grievance Officer
                          </span>
                        </div>
                        <div>
                          <span className="font-semibold text-blue-800">
                            Email:
                          </span>
                          <span className="ml-2 text-gray-700">
                            info@birlainternational.net
                          </span>
                        </div>
                        <div>
                          <span className="font-semibold text-blue-800">
                            Phone:
                          </span>
                          <span className="ml-2 text-gray-700">
                            +91 22 6789 1234
                          </span>
                        </div>
                        <div>
                          <span className="font-semibold text-blue-800">
                            Office Hours:
                          </span>
                          <span className="ml-2 text-gray-700">
                            Monday to Friday, 10:00 AM to 6:00 PM
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Investor Grievance Reports */}
                  <div className="space-y-8">
                    <h2 className="text-2xl font-bold text-gray-900 text-center">
                      Investor Grievance Reports
                    </h2>

                    {/* FY 2024-25 */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                        Financial Year 2024-25
                      </h3>
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                          {
                            quarter: "Q4 2024-25",
                            file: "/config/data/Investor Greviance/24-25/Birla capital_IG_31.03.2025.pdf",
                            period: "Jan-Mar 2025",
                            color: "blue",
                          },
                          {
                            quarter: "Q3 2024-25",
                            file: "/config/data/Investor Greviance/24-25/Birla capital_IG_31.12.2024.pdf",
                            period: "Oct-Dec 2024",
                            color: "green",
                          },
                          {
                            quarter: "Q2 2024-25",
                            file: "/config/data/Investor Greviance/24-25/Birla capital_IG_30.09.2024.pdf",
                            period: "Jul-Sep 2024",
                            color: "purple",
                          },
                          {
                            quarter: "Q1 2024-25",
                            file: "/config/data/Investor Greviance/24-25/Birla Capital_IG_30.06.2024.pdf",
                            period: "Apr-Jun 2024",
                            color: "indigo",
                          },
                        ].map((report, index) => {
                          const colorClasses = getColorClasses();
                          const colors =
                            colorClasses[
                              report.color as keyof typeof colorClasses
                            ];

                          return (
                            <Card
                              key={report.quarter}
                              className={`border-2 ${colors.border} ${colors.bg}`}
                              data-testid={`grievance-report-${index}`}
                            >
                              <CardContent className="p-6 text-center">
                                <div
                                  className={`${colors.bg} ${colors.text} p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4`}
                                >
                                  <Calendar className="h-8 w-8" />
                                </div>
                                <h4
                                  className={`text-lg font-bold ${colors.text} mb-2`}
                                >
                                  {report.quarter}
                                </h4>
                                <p className="text-gray-600 text-sm mb-4">
                                  {report.period}
                                </p>
                                <div className="space-y-2">
                                  <Button
                                    className={`w-full bg-gradient-to-r ${colors.gradient} text-white border-0`}
                                    size="sm"
                                    onClick={() => {
                                      const link = document.createElement("a");
                                      link.href = encodeURI(report.file);
                                      link.download =
                                        report.file.split("/").pop() ||
                                        "grievance-report.pdf";
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
                                    onClick={() =>
                                      window.open(
                                        encodeURI(report.file),
                                        "_blank",
                                      )
                                    }
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
                      <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                        Financial Year 2023-24
                      </h3>
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                          {
                            quarter: "Q4 2023-24",
                            file: "/config/data/Investor Greviance/23-24/Reg 13(3) Birla Capital_IG_31.03.2024.pdf",
                            period: "Jan-Mar 2024",
                            color: "emerald",
                          },
                          {
                            quarter: "Q3 2023-24",
                            file: "/config/data/Investor Greviance/23-24/Birla Capital IG_31.12.2023.pdf",
                            period: "Oct-Dec 2023",
                            color: "teal",
                          },
                          {
                            quarter: "Q2 2023-24",
                            file: "/config/data/Investor Greviance/23-24/Birla Capital IG_30.09.2023.pdf",
                            period: "Jul-Sep 2023",
                            color: "cyan",
                          },
                          {
                            quarter: "Q1 2023-24",
                            file: "/config/data/Investor Greviance/23-24/Birla Capital_IG_30.06.2023.pdf",
                            period: "Apr-Jun 2023",
                            color: "green",
                          },
                        ].map((report, index) => {
                          const colorClasses = getColorClasses();
                          const colors =
                            colorClasses[
                              report.color as keyof typeof colorClasses
                            ];

                          return (
                            <Card
                              key={report.quarter}
                              className={`border-2 ${colors.border} ${colors.bg}`}
                              data-testid={`grievance-report-23-24-${index}`}
                            >
                              <CardContent className="p-6 text-center">
                                <div
                                  className={`${colors.bg} ${colors.text} p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4`}
                                >
                                  <Calendar className="h-8 w-8" />
                                </div>
                                <h4
                                  className={`text-lg font-bold ${colors.text} mb-2`}
                                >
                                  {report.quarter}
                                </h4>
                                <p className="text-gray-600 text-sm mb-4">
                                  {report.period}
                                </p>
                                <div className="space-y-2">
                                  <Button
                                    className={`w-full bg-gradient-to-r ${colors.gradient} text-white border-0`}
                                    size="sm"
                                    onClick={() => {
                                      const link = document.createElement("a");
                                      link.href = encodeURI(report.file);
                                      link.download =
                                        report.file.split("/").pop() ||
                                        "grievance-report.pdf";
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
                                    onClick={() =>
                                      window.open(
                                        encodeURI(report.file),
                                        "_blank",
                                      )
                                    }
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
                  {/* Annual Reports Section */}
                  {(activeTab === "all" || activeTab === "ANNUAL_REPORT") && (
                    <div className="space-y-8">
                      <h2 className="text-2xl font-bold text-gray-900 text-center">
                        Annual Reports
                      </h2>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[
                          {
                            year: "2023-24",
                            file: "/config/data/Annual Report/Annual Report_2023-24.pdf",
                            color: "blue",
                          },
                          {
                            year: "2022-23",
                            file: "/config/data/Annual Report/Annual Report 2022-23.pdf",
                            color: "green",
                          },
                          {
                            year: "2021-22",
                            file: "/config/data/Annual Report/Annual Reporrt_2021-22.pdf",
                            color: "purple",
                          },
                          {
                            year: "2020-21",
                            file: "/config/data/Annual Report/Annual Report 2020-21.pdf",
                            color: "indigo",
                          },
                          {
                            year: "2019-20",
                            file: "/config/data/Annual Report/Annual Report 2019-20.pdf",
                            color: "teal",
                          },
                        ].map((report, index) => {
                          const colorClasses = getColorClasses();
                          const colors =
                            colorClasses[
                              report.color as keyof typeof colorClasses
                            ];

                          return (
                            <Card
                              key={report.year}
                              className={`border-2 ${colors.border} ${colors.bg}`}
                              data-testid={`annual-report-${index}`}
                            >
                              <CardContent className="p-6 text-center">
                                <div
                                  className={`${colors.bg} ${colors.text} p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4`}
                                >
                                  <BarChart3 className="h-8 w-8" />
                                </div>
                                <h3
                                  className={`text-lg font-bold ${colors.text} mb-2`}
                                >
                                  FY {report.year}
                                </h3>
                                <div className="text-sm font-semibold text-gray-700 mb-4">
                                  Annual Report
                                </div>
                                <div className="space-y-2">
                                  <Button
                                    className={`w-full bg-gradient-to-r ${colors.gradient} text-white border-0`}
                                    size="sm"
                                    onClick={() => {
                                      const link = document.createElement("a");
                                      link.href = encodeURI(report.file);
                                      link.download =
                                        report.file.split("/").pop() ||
                                        `annual-report-${report.year}.pdf`;
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
                                    onClick={() =>
                                      window.open(
                                        encodeURI(report.file),
                                        "_blank",
                                      )
                                    }
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
                      <h2 className="text-2xl font-bold text-gray-900 text-center">
                        Annual Returns
                      </h2>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[
                          {
                            year: "2023-24",
                            status: "Filed",
                            date: "30/09/2024",
                            color: "emerald",
                            file: "/Annual Return/MGT-7_2023-24.pdf",
                          },
                          {
                            year: "2022-23",
                            status: "Filed",
                            date: "28/09/2023",
                            color: "green",
                            file: "/Annual Return/MGT-7_2022-23.pdf",
                          },
                          {
                            year: "2021-22",
                            status: "Filed",
                            date: "29/09/2022",
                            color: "teal",
                            file: "/Annual Return/MGT-7_2021-22.pdf",
                          },
                          {
                            year: "2020-21",
                            status: "Filed",
                            date: "30/09/2021",
                            color: "cyan",
                            file: "/Annual Return/MGT-7_2020-21.pdf",
                          },
                        ].map((item, index) => {
                          const colorClasses = getColorClasses();
                          const colors =
                            colorClasses[
                              item.color as keyof typeof colorClasses
                            ];

                          return (
                            <Card
                              key={item.year}
                              className={`border-2 ${colors.border} ${colors.bg}`}
                              data-testid={`annual-return-${index}`}
                            >
                              <CardContent className="p-6 text-center">
                                <div
                                  className={`${colors.bg} ${colors.text} p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4`}
                                >
                                  <TrendingUp className="h-8 w-8" />
                                </div>
                                <h3
                                  className={`text-lg font-bold ${colors.text} mb-2`}
                                >
                                  MGT-7
                                </h3>
                                <div className="space-y-1 mb-3">
                                  <div className="text-sm font-semibold text-gray-700">
                                    FY {item.year}
                                  </div>
                                  <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">
                                    ✓ {item.status}
                                  </Badge>
                                  <div className="text-xs text-gray-500">
                                    Filed: {item.date}
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <Button
                                    className={`w-full bg-gradient-to-r ${colors.gradient} text-white border-0`}
                                    size="sm"
                                    onClick={() => {
                                      const link = document.createElement("a");
                                      link.href = encodeURI(item.file);
                                      link.download =
                                        item.file.split("/").pop() ||
                                        `MGT-7_${item.year}.pdf`;
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
                                    onClick={() =>
                                      window.open(
                                        encodeURI(item.file),
                                        "_blank",
                                      )
                                    }
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
                      <h2 className="text-2xl font-bold text-gray-900 text-center">
                        Shareholding Pattern
                      </h2>

                      {/* FY 2024-25 */}
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                          Financial Year 2024-25
                        </h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                          {[
                            {
                              quarter: "Q4 2024-25",
                              file: "/config/data/Shareholding Pattern/24-25/Shareholding Pattern_31.03.2025.xlsx",
                              period: "Jan-Mar 2025",
                              color: "blue",
                            },
                            {
                              quarter: "Q3 2024-25",
                              file: "/config/data/Shareholding Pattern/24-25/Shareholding Pattern_31.12.2024.xlsx",
                              period: "Oct-Dec 2024",
                              color: "green",
                            },
                            {
                              quarter: "Q2 2024-25",
                              file: "/config/data/Shareholding Pattern/24-25/Shareholding Pattern_30.09.2024.xlsx",
                              period: "Jul-Sep 2024",
                              color: "purple",
                            },
                            {
                              quarter: "Q1 2024-25",
                              file: "/config/data/Shareholding Pattern/24-25/Shareholding Pattern_30.06.2024.xlsx",
                              period: "Apr-Jun 2024",
                              color: "indigo",
                            },
                          ].map((report, index) => {
                            const colorClasses = getColorClasses();
                            const colors =
                              colorClasses[
                                report.color as keyof typeof colorClasses
                              ];

                            return (
                              <Card
                                key={report.quarter}
                                className={`border-2 ${colors.border} ${colors.bg}`}
                                data-testid={`shareholding-pattern-24-25-${index}`}
                              >
                                <CardContent className="p-6 text-center">
                                  <div
                                    className={`${colors.bg} ${colors.text} p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4`}
                                  >
                                    <Users className="h-8 w-8" />
                                  </div>
                                  <h3
                                    className={`text-lg font-bold ${colors.text} mb-2`}
                                  >
                                    {report.quarter}
                                  </h3>
                                  <div className="text-sm font-semibold text-gray-700 mb-4">
                                    {report.period}
                                  </div>
                                  <div className="space-y-2">
                                    <Button
                                      className={`w-full bg-gradient-to-r ${colors.gradient} text-white border-0`}
                                      size="sm"
                                      onClick={() => {
                                        const link =
                                          document.createElement("a");
                                        link.href = encodeURI(report.file);
                                        link.download =
                                          report.file.split("/").pop() ||
                                          "shareholding-pattern.xlsx";
                                        link.click();
                                      }}
                                      data-testid={`download-shareholding-24-25-${report.quarter}`}
                                    >
                                      <Download className="mr-2 h-4 w-4" />
                                      Download
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="w-full hover:bg-gray-100"
                                      onClick={() =>
                                        window.open(
                                          encodeURI(report.file),
                                          "_blank",
                                        )
                                      }
                                      data-testid={`view-shareholding-24-25-${report.quarter}`}
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
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                          Financial Year 2023-24
                        </h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                          {[
                            {
                              quarter: "Q4 2023-24",
                              file: "/config/data/Shareholding Pattern/23-24/Shareholding Pattern_31.03.2024.xlsx",
                              period: "Jan-Mar 2024",
                              color: "emerald",
                            },
                            {
                              quarter: "Q3 2023-24",
                              file: "/config/data/Shareholding Pattern/23-24/Shareholding Pattern_31.12.2023.xlsx",
                              period: "Oct-Dec 2023",
                              color: "teal",
                            },
                            {
                              quarter: "Q2 2023-24",
                              file: "/config/data/Shareholding Pattern/23-24/Shareholding Pattern_30.09.2023.xlsx",
                              period: "Jul-Sep 2023",
                              color: "cyan",
                            },
                            {
                              quarter: "Q1 2023-24",
                              file: "/config/data/Shareholding Pattern/23-24/Shareholding Pattern_30.06.2023.xlsm",
                              period: "Apr-Jun 2023",
                              color: "green",
                            },
                          ].map((report, index) => {
                            const colorClasses = getColorClasses();
                            const colors =
                              colorClasses[
                                report.color as keyof typeof colorClasses
                              ];

                            return (
                              <Card
                                key={report.quarter}
                                className={`border-2 ${colors.border} ${colors.bg}`}
                                data-testid={`shareholding-pattern-23-24-${index}`}
                              >
                                <CardContent className="p-6 text-center">
                                  <div
                                    className={`${colors.bg} ${colors.text} p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4`}
                                  >
                                    <Users className="h-8 w-8" />
                                  </div>
                                  <h3
                                    className={`text-lg font-bold ${colors.text} mb-2`}
                                  >
                                    {report.quarter}
                                  </h3>
                                  <div className="text-sm font-semibold text-gray-700 mb-4">
                                    {report.period}
                                  </div>
                                  <div className="space-y-2">
                                    <Button
                                      className={`w-full bg-gradient-to-r ${colors.gradient} text-white border-0`}
                                      size="sm"
                                      onClick={() => {
                                        const link =
                                          document.createElement("a");
                                        link.href = encodeURI(report.file);
                                        link.download =
                                          report.file.split("/").pop() ||
                                          "shareholding-pattern.xlsx";
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
                                      onClick={() =>
                                        window.open(
                                          encodeURI(report.file),
                                          "_blank",
                                        )
                                      }
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
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                          Financial Year 2022-23
                        </h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                          {[
                            {
                              quarter: "Q4 2022-23",
                              file: "/config/data/Shareholding Pattern/22-23/Shareholding Pattern_31.03.2023.xlsm",
                              period: "Jan-Mar 2023",
                              color: "violet",
                            },
                            {
                              quarter: "Q3 2022-23",
                              file: "/config/data/Shareholding Pattern/22-23/Shareholding Pattern_31.12.2022.xlsx",
                              period: "Oct-Dec 2022",
                              color: "pink",
                            },
                            {
                              quarter: "Q2 2022-23",
                              file: "/config/data/Shareholding Pattern/22-23/Shareholding Pattern_30.09.2022.xlsx",
                              period: "Jul-Sep 2022",
                              color: "rose",
                            },
                            {
                              quarter: "Q1 2022-23",
                              file: "/config/data/Shareholding Pattern/22-23/Shareholding Pattern_30.06.2022.xlsm",
                              period: "Apr-Jun 2022",
                              color: "orange",
                            },
                          ].map((report, index) => {
                            const colorClasses = getColorClasses();
                            const colors =
                              colorClasses[
                                report.color as keyof typeof colorClasses
                              ];

                            return (
                              <Card
                                key={report.quarter}
                                className={`border-2 ${colors.border} ${colors.bg}`}
                                data-testid={`shareholding-pattern-22-23-${index}`}
                              >
                                <CardContent className="p-6 text-center">
                                  <div
                                    className={`${colors.bg} ${colors.text} p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4`}
                                  >
                                    <Users className="h-8 w-8" />
                                  </div>
                                  <h3
                                    className={`text-lg font-bold ${colors.text} mb-2`}
                                  >
                                    {report.quarter}
                                  </h3>
                                  <div className="text-sm font-semibold text-gray-700 mb-4">
                                    {report.period}
                                  </div>
                                  <div className="space-y-2">
                                    <Button
                                      className={`w-full bg-gradient-to-r ${colors.gradient} text-white border-0`}
                                      size="sm"
                                      onClick={() => {
                                        const link =
                                          document.createElement("a");
                                        link.href = encodeURI(report.file);
                                        link.download =
                                          report.file.split("/").pop() ||
                                          "shareholding-pattern.xlsx";
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
                                      onClick={() =>
                                        window.open(
                                          encodeURI(report.file),
                                          "_blank",
                                        )
                                      }
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
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                          Financial Year 2021-22
                        </h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                          {[
                            {
                              quarter: "Q4 2021-22",
                              file: "/config/data/Shareholding Pattern/21-22/Shareholding Pattern_31.03.2022.xlsx",
                              period: "Jan-Mar 2022",
                              color: "amber",
                            },
                            {
                              quarter: "Q3 2021-22",
                              file: "/config/data/Shareholding Pattern/21-22/Shareholding pattern_31.12.2021.xlsx",
                              period: "Oct-Dec 2021",
                              color: "yellow",
                            },
                            {
                              quarter: "Q2 2021-22",
                              file: "/config/data/Shareholding Pattern/21-22/Shareholding pattern_30.09.2021.xlsx",
                              period: "Jul-Sep 2021",
                              color: "lime",
                            },
                            {
                              quarter: "Q1 2021-22",
                              file: "/config/data/Shareholding Pattern/21-22/Shareholding pattern_30.06.2021.xls",
                              period: "Apr-Jun 2021",
                              color: "emerald",
                            },
                          ].map((report, index) => {
                            const colorClasses = getColorClasses();
                            const colors =
                              colorClasses[
                                report.color as keyof typeof colorClasses
                              ];

                            return (
                              <Card
                                key={report.quarter}
                                className={`border-2 ${colors.border} ${colors.bg}`}
                                data-testid={`shareholding-pattern-21-22-${index}`}
                              >
                                <CardContent className="p-6 text-center">
                                  <div
                                    className={`${colors.bg} ${colors.text} p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4`}
                                  >
                                    <Users className="h-8 w-8" />
                                  </div>
                                  <h3
                                    className={`text-lg font-bold ${colors.text} mb-2`}
                                  >
                                    {report.quarter}
                                  </h3>
                                  <div className="text-sm font-semibold text-gray-700 mb-4">
                                    {report.period}
                                  </div>
                                  <div className="space-y-2">
                                    <Button
                                      className={`w-full bg-gradient-to-r ${colors.gradient} text-white border-0`}
                                      size="sm"
                                      onClick={() => {
                                        const link =
                                          document.createElement("a");
                                        link.href = encodeURI(report.file);
                                        link.download =
                                          report.file.split("/").pop() ||
                                          "shareholding-pattern.xlsx";
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
                                      onClick={() =>
                                        window.open(
                                          encodeURI(report.file),
                                          "_blank",
                                        )
                                      }
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
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                          Financial Year 2020-21
                        </h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                          {[
                            {
                              quarter: "Q4 2020-21",
                              file: "/config/data/Shareholding Pattern/20-21/Shareholding Pattern_31.03.2021.xls",
                              period: "Jan-Mar 2021",
                              color: "sky",
                            },
                            {
                              quarter: "Q3 2020-21",
                              file: "/config/data/Shareholding Pattern/20-21/Shareholding Pattern_31.12.2020.xls",
                              period: "Oct-Dec 2020",
                              color: "blue",
                            },
                            {
                              quarter: "Q2 2020-21",
                              file: "/config/data/Shareholding Pattern/20-21/Shareholding Pattern_30.09.2020.xlsx",
                              period: "Jul-Sep 2020",
                              color: "indigo",
                            },
                            {
                              quarter: "Q1 2020-21",
                              file: "/config/data/Shareholding Pattern/20-21/Shareholding Pattern__30.06.2020.xlsx",
                              period: "Apr-Jun 2020",
                              color: "slate",
                            },
                          ].map((report, index) => {
                            const colorClasses = {
                              sky: {
                                bg: "bg-sky-50",
                                text: "text-sky-600",
                                border: "border-sky-200",
                                gradient: "from-sky-600 to-sky-700",
                              },
                              blue: {
                                bg: "bg-blue-50",
                                text: "text-blue-600",
                                border: "border-blue-200",
                                gradient: "from-blue-600 to-blue-700",
                              },
                              indigo: {
                                bg: "bg-indigo-50",
                                text: "text-indigo-600",
                                border: "border-indigo-200",
                                gradient: "from-indigo-600 to-indigo-700",
                              },
                              slate: {
                                bg: "bg-slate-50",
                                text: "text-slate-600",
                                border: "border-slate-200",
                                gradient: "from-slate-600 to-slate-700",
                              },
                            };
                            const colors =
                              colorClasses[
                                report.color as keyof typeof colorClasses
                              ];

                            return (
                              <Card
                                key={report.quarter}
                                className={`border-2 ${colors.border} ${colors.bg}`}
                                data-testid={`shareholding-pattern-20-21-${index}`}
                              >
                                <CardContent className="p-6 text-center">
                                  <div
                                    className={`${colors.bg} ${colors.text} p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4`}
                                  >
                                    <Users className="h-8 w-8" />
                                  </div>
                                  <h3
                                    className={`text-lg font-bold ${colors.text} mb-2`}
                                  >
                                    {report.quarter}
                                  </h3>
                                  <div className="text-sm font-semibold text-gray-700 mb-4">
                                    {report.period}
                                  </div>
                                  <div className="space-y-2">
                                    <Button
                                      className={`w-full bg-gradient-to-r ${colors.gradient} text-white border-0`}
                                      size="sm"
                                      onClick={() => {
                                        const link =
                                          document.createElement("a");
                                        link.href = encodeURI(report.file);
                                        link.download =
                                          report.file.split("/").pop() ||
                                          "shareholding-pattern.xlsx";
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
                                      onClick={() =>
                                        window.open(
                                          encodeURI(report.file),
                                          "_blank",
                                        )
                                      }
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
                  )}

                  {/* Quarterly Results Section */}
                  {(activeTab === "all" ||
                    activeTab === "QUARTERLY_RESULT") && (
                    <div className="space-y-12">
                      <h2 className="text-2xl font-bold text-gray-900 text-center">
                        Quarterly Results
                      </h2>

                      {/* FY 2024-25 */}
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                          Financial Year 2024-25
                        </h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                          {[
                            {
                              quarter: "Q4 2024-25",
                              file: "/config/data/quater/24-25/FR_31.03.2025.pdf",
                              period: "Jan-Mar 2025",
                              color: "blue",
                            },
                            {
                              quarter: "Q3 2024-25",
                              file: "/config/data/quater/24-25/FR_31.12.2024.pdf",
                              period: "Oct-Dec 2024",
                              color: "green",
                            },
                            {
                              quarter: "Q2 2024-25",
                              file: "/config/data/quater/24-25/FR_30.09.2024.pdf",
                              period: "Jul-Sep 2024",
                              color: "purple",
                            },
                            {
                              quarter: "Q1 2024-25",
                              file: "/config/data/quater/24-25/FR_30.06.2024.pdf",
                              period: "Apr-Jun 2024",
                              color: "indigo",
                            },
                          ].map((report, index) => {
                            const colorClasses = getColorClasses();
                            const colors =
                              colorClasses[
                                report.color as keyof typeof colorClasses
                              ];

                            return (
                              <Card
                                key={report.quarter}
                                className={`border-2 ${colors.border} ${colors.bg}`}
                                data-testid={`quarterly-result-${index}`}
                              >
                                <CardContent className="p-6 text-center">
                                  <div
                                    className={`${colors.bg} ${colors.text} p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4`}
                                  >
                                    <TrendingUp className="h-8 w-8" />
                                  </div>
                                  <h3
                                    className={`text-lg font-bold ${colors.text} mb-2`}
                                  >
                                    {report.quarter}
                                  </h3>
                                  <div className="text-sm font-semibold text-gray-700 mb-4">
                                    {report.period}
                                  </div>
                                  <div className="space-y-2">
                                    <Button
                                      className={`w-full bg-gradient-to-r ${colors.gradient} text-white border-0`}
                                      size="sm"
                                      onClick={() => {
                                        const link =
                                          document.createElement("a");
                                        link.href = encodeURI(report.file);
                                        link.download =
                                          report.file.split("/").pop() ||
                                          "quarterly-result.pdf";
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
                                      onClick={() =>
                                        window.open(
                                          encodeURI(report.file),
                                          "_blank",
                                        )
                                      }
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
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                          Financial Year 2023-24
                        </h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                          {[
                            {
                              quarter: "Q4 2023-24",
                              file: "/config/data/quater/23-24/FR_31.03.2024.pdf",
                              period: "Jan-Mar 2024",
                              color: "emerald",
                            },
                            {
                              quarter: "Q3 2023-24",
                              file: "/config/data/quater/23-24/FR_31.12.2023.pdf",
                              period: "Oct-Dec 2023",
                              color: "teal",
                            },
                            {
                              quarter: "Q2 2023-24",
                              file: "/config/data/quater/23-24/FR_30.09.2023.pdf",
                              period: "Jul-Sep 2023",
                              color: "cyan",
                            },
                            {
                              quarter: "Q1 2023-24",
                              file: "/config/data/quater/23-24/FR_30.06.2023.pdf",
                              period: "Apr-Jun 2023",
                              color: "green",
                            },
                          ].map((report, index) => {
                            const colorClasses = getColorClasses();
                            const colors =
                              colorClasses[
                                report.color as keyof typeof colorClasses
                              ];

                            return (
                              <Card
                                key={report.quarter}
                                className={`border-2 ${colors.border} ${colors.bg}`}
                                data-testid={`quarterly-result-23-24-${index}`}
                              >
                                <CardContent className="p-6 text-center">
                                  <div
                                    className={`${colors.bg} ${colors.text} p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4`}
                                  >
                                    <TrendingUp className="h-8 w-8" />
                                  </div>
                                  <h3
                                    className={`text-lg font-bold ${colors.text} mb-2`}
                                  >
                                    {report.quarter}
                                  </h3>
                                  <div className="text-sm font-semibold text-gray-700 mb-4">
                                    {report.period}
                                  </div>
                                  <div className="space-y-2">
                                    <Button
                                      className={`w-full bg-gradient-to-r ${colors.gradient} text-white border-0`}
                                      size="sm"
                                      onClick={() => {
                                        const link =
                                          document.createElement("a");
                                        link.href = encodeURI(report.file);
                                        link.download =
                                          report.file.split("/").pop() ||
                                          "quarterly-result.pdf";
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
                                      onClick={() =>
                                        window.open(
                                          encodeURI(report.file),
                                          "_blank",
                                        )
                                      }
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
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                          Financial Year 2022-23
                        </h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                          {[
                            {
                              quarter: "Q4 2022-23",
                              file: "/config/data/quater/22-23/Financial result_31.03.2023.pdf",
                              period: "Jan-Mar 2023",
                              color: "emerald",
                            },
                            {
                              quarter: "Q3 2022-23",
                              file: "/config/data/quater/22-23/Financial result_31.12.2022.pdf",
                              period: "Oct-Dec 2022",
                              color: "teal",
                            },
                            {
                              quarter: "Q2 2022-23",
                              file: "/config/data/quater/22-23/Financial result 30.09.2022.pdf",
                              period: "Jul-Sep 2022",
                              color: "cyan",
                            },
                            {
                              quarter: "Q1 2022-23",
                              file: "/config/data/quater/22-23/Financial result _30.06.2022.pdf",
                              period: "Apr-Jun 2022",
                              color: "green",
                            },
                          ].map((report, index) => {
                            const colorClasses = getColorClasses();
                            const colors =
                              colorClasses[
                                report.color as keyof typeof colorClasses
                              ];

                            return (
                              <Card
                                key={report.quarter}
                                className={`border-2 ${colors.border} ${colors.bg}`}
                                data-testid={`quarterly-result-22-23-${index}`}
                              >
                                <CardContent className="p-6 text-center">
                                  <div
                                    className={`${colors.bg} ${colors.text} p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4`}
                                  >
                                    <TrendingUp className="h-8 w-8" />
                                  </div>
                                  <h3
                                    className={`text-lg font-bold ${colors.text} mb-2`}
                                  >
                                    {report.quarter}
                                  </h3>
                                  <div className="text-sm font-semibold text-gray-700 mb-4">
                                    {report.period}
                                  </div>
                                  <div className="space-y-2">
                                    <Button
                                      className={`w-full bg-gradient-to-r ${colors.gradient} text-white border-0`}
                                      size="sm"
                                      onClick={() => {
                                        const link =
                                          document.createElement("a");
                                        link.href = encodeURI(report.file);
                                        link.download =
                                          report.file.split("/").pop() ||
                                          "quarterly-result.pdf";
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
                                      onClick={() =>
                                        window.open(
                                          encodeURI(report.file),
                                          "_blank",
                                        )
                                      }
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
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                          Financial Year 2021-22
                        </h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                          {[
                            {
                              quarter: "Q4 2021-22",
                              file: "/config/data/quater/21-22/Financial result _31.03.2022.pdf",
                              period: "Jan-Mar 2022",
                              color: "emerald",
                            },
                            {
                              quarter: "Q3 2021-22",
                              file: "/config/data/quater/21-22/Financial result_30.06.2021.pdf",
                              period: "Jul-Sep 2021",
                              color: "teal",
                            },
                          ].map((report, index) => {
                            const colorClasses = getColorClasses();
                            const colors =
                              colorClasses[
                                report.color as keyof typeof colorClasses
                              ];

                            return (
                              <Card
                                key={report.quarter}
                                className={`border-2 ${colors.border} ${colors.bg}`}
                                data-testid={`quarterly-result-21-22-${index}`}
                              >
                                <CardContent className="p-6 text-center">
                                  <div
                                    className={`${colors.bg} ${colors.text} p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4`}
                                  >
                                    <TrendingUp className="h-8 w-8" />
                                  </div>
                                  <h3
                                    className={`text-lg font-bold ${colors.text} mb-2`}
                                  >
                                    {report.quarter}
                                  </h3>
                                  <div className="text-sm font-semibold text-gray-700 mb-4">
                                    {report.period}
                                  </div>
                                  <div className="space-y-2">
                                    <Button
                                      className={`w-full bg-gradient-to-r ${colors.gradient} text-white border-0`}
                                      size="sm"
                                      onClick={() => {
                                        const link =
                                          document.createElement("a");
                                        link.href = encodeURI(report.file);
                                        link.download =
                                          report.file.split("/").pop() ||
                                          "quarterly-result.pdf";
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
                                      onClick={() =>
                                        window.open(
                                          encodeURI(report.file),
                                          "_blank",
                                        )
                                      }
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

                      {/* FY 2021-22 */}
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                          Financial Year 2021-22
                        </h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                          {[
                            {
                              quarter: "Q4 2021-22",
                              file: "/config/data/quater/20-21/FR_31.03.2021.pdf",
                              period: "Jan-Mar 2022",
                              color: "emerald",
                            },
                            {
                              quarter: "Q3 2021-22",
                              file: "/config/data/quater/20-21/FR_31.12.2020.PDF",
                              period: "Oct-Dec 2021",
                              color: "teal",
                            },
                            {
                              quarter: "Q2 2021-22",
                              file: "/config/data/quater/20-21/FR_30.09.2020.pdf",
                              period: "Jul-Sep 2021",
                              color: "purple",
                            },
                            {
                              quarter: "Q1 2021-22",
                              file: "/config/data/quater/20-21/FR_30.06.2020.pdf",
                              period: "Apr-Jun 2021",
                              color: "indigo",
                            },
                          ].map((report, index) => {
                            const colorClasses = getColorClasses();
                            const colors =
                              colorClasses[
                                report.color as keyof typeof colorClasses
                              ];

                            return (
                              <Card
                                key={report.quarter}
                                className={`border-2 ${colors.border} ${colors.bg}`}
                                data-testid={`quarterly-result-20-21-${index}`}
                              >
                                <CardContent className="p-6 text-center">
                                  <div
                                    className={`${colors.bg} ${colors.text} p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4`}
                                  >
                                    <TrendingUp className="h-8 w-8" />
                                  </div>
                                  <h3
                                    className={`text-lg font-bold ${colors.text} mb-2`}
                                  >
                                    {report.quarter}
                                  </h3>
                                  <div className="text-sm font-semibold text-gray-700 mb-4">
                                    {report.period}
                                  </div>
                                  <div className="space-y-2">
                                    <Button
                                      className={`w-full bg-gradient-to-r ${colors.gradient} text-white border-0`}
                                      size="sm"
                                      onClick={() => {
                                        const link =
                                          document.createElement("a");
                                        link.href = encodeURI(report.file);
                                        link.download =
                                          report.file.split("/").pop() ||
                                          "quarterly-result.pdf";
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
                                      onClick={() =>
                                        window.open(
                                          encodeURI(report.file),
                                          "_blank",
                                        )
                                      }
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
                  )}

                  {/* Corporate Governance Section */}
                  {(activeTab === "all" || activeTab === "GOVERNANCE") && (
                    <div className="space-y-12">
                      <h2 className="text-2xl font-bold text-gray-900 text-center">
                        Corporate Governance
                      </h2>

                      {/* FY 2024-25 */}
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                          Financial Year 2024-25
                        </h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                          {[
                            {
                              quarter: "Q4 2024-25",
                              file: "/Corporate Governance/24-25/CG_31.03.2025.pdf",
                              period: "Jan-Mar 2025",
                              color: "blue",
                            },
                            {
                              quarter: "Q3 2024-25",
                              file: "/Corporate Governance/24-25/CG_31.12.2024.pdf",
                              period: "Oct-Dec 2024",
                              color: "green",
                            },
                            {
                              quarter: "Q2 2024-25",
                              file: "/Corporate Governance/24-25/CG_30.09.2024.pdf",
                              period: "Jul-Sep 2024",
                              color: "purple",
                            },
                            {
                              quarter: "Q1 2024-25",
                              file: "/Corporate Governance/24-25/CG_30.06.2024.pdf",
                              period: "Apr-Jun 2024",
                              color: "indigo",
                            },
                          ].map((report, index) => {
                            const colorClasses = getColorClasses();
                            const colors =
                              colorClasses[
                                report.color as keyof typeof colorClasses
                              ];

                            return (
                              <Card
                                key={report.quarter}
                                className={`border-2 ${colors.border} ${colors.bg}`}
                                data-testid={`corporate-governance-24-25-${index}`}
                              >
                                <CardContent className="p-6 text-center">
                                  <div
                                    className={`${colors.bg} ${colors.text} p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4`}
                                  >
                                    <Shield className="h-8 w-8" />
                                  </div>
                                  <h4
                                    className={`text-lg font-bold ${colors.text} mb-2`}
                                  >
                                    {report.quarter}
                                  </h4>
                                  <p className="text-gray-600 text-sm mb-4">
                                    {report.period}
                                  </p>
                                  <div className="space-y-2">
                                    <Button
                                      className={`w-full bg-gradient-to-r ${colors.gradient} text-white border-0`}
                                      size="sm"
                                      onClick={() => {
                                        const link =
                                          document.createElement("a");
                                        link.href = encodeURI(report.file);
                                        link.download =
                                          report.file.split("/").pop() ||
                                          "corporate-governance.pdf";
                                        link.click();
                                      }}
                                      data-testid={`download-cg-24-25-${report.quarter}`}
                                    >
                                      <Download className="mr-2 h-4 w-4" />
                                      Download
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="w-full hover:bg-gray-100"
                                      onClick={() =>
                                        window.open(
                                          encodeURI(report.file),
                                          "_blank",
                                        )
                                      }
                                      data-testid={`view-cg-24-25-${report.quarter}`}
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
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                          Financial Year 2023-24
                        </h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                          {[
                            {
                              quarter: "Q4 2023-24",
                              file: "/Corporate Governance/23-24/CG_31.03.2024.pdf",
                              period: "Jan-Mar 2024",
                              color: "emerald",
                            },
                            {
                              quarter: "Q3 2023-24",
                              file: "/Corporate Governance/23-24/CG_31.12.2023.pdf",
                              period: "Oct-Dec 2023",
                              color: "teal",
                            },
                            {
                              quarter: "Q2 2023-24",
                              file: "/Corporate Governance/23-24/CG_30.09.2023.pdf",
                              period: "Jul-Sep 2023",
                              color: "cyan",
                            },
                            {
                              quarter: "Q1 2023-24",
                              file: "/Corporate Governance/23-24/CG_30.06.2023.pdf",
                              period: "Apr-Jun 2023",
                              color: "green",
                            },
                          ].map((report, index) => {
                            const colorClasses = getColorClasses();
                            const colors =
                              colorClasses[
                                report.color as keyof typeof colorClasses
                              ];

                            return (
                              <Card
                                key={report.quarter}
                                className={`border-2 ${colors.border} ${colors.bg}`}
                                data-testid={`corporate-governance-23-24-${index}`}
                              >
                                <CardContent className="p-6 text-center">
                                  <div
                                    className={`${colors.bg} ${colors.text} p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4`}
                                  >
                                    <Shield className="h-8 w-8" />
                                  </div>
                                  <h4
                                    className={`text-lg font-bold ${colors.text} mb-2`}
                                  >
                                    {report.quarter}
                                  </h4>
                                  <p className="text-gray-600 text-sm mb-4">
                                    {report.period}
                                  </p>
                                  <div className="space-y-2">
                                    <Button
                                      className={`w-full bg-gradient-to-r ${colors.gradient} text-white border-0`}
                                      size="sm"
                                      onClick={() => {
                                        const link =
                                          document.createElement("a");
                                        link.href = encodeURI(report.file);
                                        link.download =
                                          report.file.split("/").pop() ||
                                          "corporate-governance.pdf";
                                        link.click();
                                      }}
                                      data-testid={`download-cg-23-24-${report.quarter}`}
                                    >
                                      <Download className="mr-2 h-4 w-4" />
                                      Download
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="w-full hover:bg-gray-100"
                                      onClick={() =>
                                        window.open(
                                          encodeURI(report.file),
                                          "_blank",
                                        )
                                      }
                                      data-testid={`view-cg-23-24-${report.quarter}`}
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
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                          Financial Year 2022-23
                        </h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                          {[
                            {
                              quarter: "Q4 2022-23",
                              file: "/Corporate Governance/22-23/CG_31.03.2023.pdf",
                              period: "Jan-Mar 2023",
                              color: "violet",
                            },
                            {
                              quarter: "Q3 2022-23",
                              file: "/Corporate Governance/22-23/CG_31.12.2022.pdf",
                              period: "Oct-Dec 2022",
                              color: "pink",
                            },
                            {
                              quarter: "Q2 2022-23",
                              file: "/Corporate Governance/22-23/CG_30.09.2022.pdf",
                              period: "Jul-Sep 2022",
                              color: "rose",
                            },
                            {
                              quarter: "Q1 2022-23",
                              file: "/Corporate Governance/22-23/CG_30.06.2022.pdf",
                              period: "Apr-Jun 2022",
                              color: "orange",
                            },
                          ].map((report, index) => {
                            const colorClasses = getColorClasses();
                            const colors =
                              colorClasses[
                                report.color as keyof typeof colorClasses
                              ];

                            return (
                              <Card
                                key={report.quarter}
                                className={`border-2 ${colors.border} ${colors.bg}`}
                                data-testid={`corporate-governance-22-23-${index}`}
                              >
                                <CardContent className="p-6 text-center">
                                  <div
                                    className={`${colors.bg} ${colors.text} p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4`}
                                  >
                                    <Shield className="h-8 w-8" />
                                  </div>
                                  <h4
                                    className={`text-lg font-bold ${colors.text} mb-2`}
                                  >
                                    {report.quarter}
                                  </h4>
                                  <p className="text-gray-600 text-sm mb-4">
                                    {report.period}
                                  </p>
                                  <div className="space-y-2">
                                    <Button
                                      className={`w-full bg-gradient-to-r ${colors.gradient} text-white border-0`}
                                      size="sm"
                                      onClick={() => {
                                        const link =
                                          document.createElement("a");
                                        link.href = encodeURI(report.file);
                                        link.download =
                                          report.file.split("/").pop() ||
                                          "corporate-governance.pdf";
                                        link.click();
                                      }}
                                      data-testid={`download-cg-22-23-${report.quarter}`}
                                    >
                                      <Download className="mr-2 h-4 w-4" />
                                      Download
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="w-full hover:bg-gray-100"
                                      onClick={() =>
                                        window.open(
                                          encodeURI(report.file),
                                          "_blank",
                                        )
                                      }
                                      data-testid={`view-cg-22-23-${report.quarter}`}
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
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                          Financial Year 2021-22
                        </h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                          {[
                            {
                              quarter: "Q4 2021-22",
                              file: "/Corporate Governance/21-22/CG_31.03.2022.pdf",
                              period: "Jan-Mar 2022",
                              color: "amber",
                            },
                            {
                              quarter: "Q2 2021-22",
                              file: "/Corporate Governance/21-22/CG_30.09.2021.PDF",
                              period: "Jul-Sep 2021",
                              color: "lime",
                            },
                            {
                              quarter: "Q1 2021-22",
                              file: "/Corporate Governance/21-22/CG_30.06.2021.PDF",
                              period: "Apr-Jun 2021",
                              color: "emerald",
                            },
                          ].map((report, index) => {
                            const colorClasses = getColorClasses();
                            const colors =
                              colorClasses[
                                report.color as keyof typeof colorClasses
                              ];

                            return (
                              <Card
                                key={report.quarter}
                                className={`border-2 ${colors.border} ${colors.bg}`}
                                data-testid={`corporate-governance-21-22-${index}`}
                              >
                                <CardContent className="p-6 text-center">
                                  <div
                                    className={`${colors.bg} ${colors.text} p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4`}
                                  >
                                    <Shield className="h-8 w-8" />
                                  </div>
                                  <h4
                                    className={`text-lg font-bold ${colors.text} mb-2`}
                                  >
                                    {report.quarter}
                                  </h4>
                                  <p className="text-gray-600 text-sm mb-4">
                                    {report.period}
                                  </p>
                                  <div className="space-y-2">
                                    <Button
                                      className={`w-full bg-gradient-to-r ${colors.gradient} text-white border-0`}
                                      size="sm"
                                      onClick={() => {
                                        const link =
                                          document.createElement("a");
                                        link.href = encodeURI(report.file);
                                        link.download =
                                          report.file.split("/").pop() ||
                                          "corporate-governance.pdf";
                                        link.click();
                                      }}
                                      data-testid={`download-cg-21-22-${report.quarter}`}
                                    >
                                      <Download className="mr-2 h-4 w-4" />
                                      Download
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="w-full hover:bg-gray-100"
                                      onClick={() =>
                                        window.open(
                                          encodeURI(report.file),
                                          "_blank",
                                        )
                                      }
                                      data-testid={`view-cg-21-22-${report.quarter}`}
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
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                          Financial Year 2020-21
                        </h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                          {[
                            {
                              quarter: "Q3 2020-21",
                              file: "/Corporate Governance/20-21/CG_31.12.2020.PDF",
                              period: "Oct-Dec 2020",
                              color: "teal",
                            },
                            {
                              quarter: "Q1 2020-21",
                              file: "/Corporate Governance/20-21/CG_30.06.2020.pdf",
                              period: "Apr-Jun 2020",
                              color: "indigo",
                            },
                          ].map((report, index) => {
                            const colorClasses = getColorClasses();
                            const colors =
                              colorClasses[
                                report.color as keyof typeof colorClasses
                              ];

                            return (
                              <Card
                                key={report.quarter}
                                className={`border-2 ${colors.border} ${colors.bg}`}
                                data-testid={`corporate-governance-20-21-${index}`}
                              >
                                <CardContent className="p-6 text-center">
                                  <div
                                    className={`${colors.bg} ${colors.text} p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4`}
                                  >
                                    <Shield className="h-8 w-8" />
                                  </div>
                                  <h4
                                    className={`text-lg font-bold ${colors.text} mb-2`}
                                  >
                                    {report.quarter}
                                  </h4>
                                  <p className="text-gray-600 text-sm mb-4">
                                    {report.period}
                                  </p>
                                  <div className="space-y-2">
                                    <Button
                                      className={`w-full bg-gradient-to-r ${colors.gradient} text-white border-0`}
                                      size="sm"
                                      onClick={() => {
                                        const link =
                                          document.createElement("a");
                                        link.href = encodeURI(report.file);
                                        link.download =
                                          report.file.split("/").pop() ||
                                          "corporate-governance.pdf";
                                        link.click();
                                      }}
                                      data-testid={`download-cg-20-21-${report.quarter}`}
                                    >
                                      <Download className="mr-2 h-4 w-4" />
                                      Download
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="w-full hover:bg-gray-100"
                                      onClick={() =>
                                        window.open(
                                          encodeURI(report.file),
                                          "_blank",
                                        )
                                      }
                                      data-testid={`view-cg-20-21-${report.quarter}`}
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
