import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { InvestorDocument, Announcement } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, TrendingUp, BarChart3, Bell, Shield, MessageSquare, Users, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import FileUpload from "@/components/ui/file-upload";
import { 
  getAllDocuments, 
  getDocumentsByType, 
  getFeaturedDocuments, 
  searchDocuments, 
  convertToInvestorDocument,
  getDocumentConfig
} from "@/lib/document-config";

const grievanceSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  grievanceType: z.string().optional(),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
});

type GrievanceFormData = z.infer<typeof grievanceSchema>;

export default function InvestorRelations() {
  const [activeTab, setActiveTab] = useState("all");
  const [files, setFiles] = useState<File[]>([]);
  const { toast } = useToast();

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

  // Grievance form
  const form = useForm<GrievanceFormData>({
    resolver: zodResolver(grievanceSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      grievanceType: "",
      subject: "",
      description: "",
    },
  });

  const submitGrievance = useMutation({
    mutationFn: async (data: GrievanceFormData) => {
      const formData = new FormData();
      
      Object.entries(data).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });
      
      files.forEach(file => {
        formData.append('attachments', file);
      });

      const response = await fetch('/api/grievances', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to submit grievance');
      }

      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Grievance Submitted Successfully",
        description: "Your grievance has been submitted and will be reviewed within 7 working days.",
      });
      form.reset();
      setFiles([]);
    },
    onError: (error) => {
      toast({
        title: "Submission Failed",
        description: "Failed to submit grievance. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: GrievanceFormData) => {
    submitGrievance.mutate(data);
  };

  const grievanceTypes = [
    "Dividend Related",
    "Share Transfer",
    "Annual Report",
    "Corporate Actions",
    "Others"
  ];

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

                  {/* Grievance Form */}
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Submit a Grievance</h2>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Full Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter your full name" {...field} data-testid="input-name" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email Address</FormLabel>
                                  <FormControl>
                                    <Input type="email" placeholder="Enter your email" {...field} data-testid="input-email" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Phone Number</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter your phone number" {...field} data-testid="input-phone" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="grievanceType"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Grievance Type</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger data-testid="select-grievance-type">
                                        <SelectValue placeholder="Select grievance type" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {grievanceTypes.map((type) => (
                                        <SelectItem key={type} value={type}>{type}</SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={form.control}
                            name="subject"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Subject</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter the subject of your grievance" {...field} data-testid="input-subject" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Describe your grievance in detail"
                                    className="min-h-[120px]"
                                    {...field}
                                    data-testid="textarea-description"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div>
                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                              Attachments (Optional)
                            </label>
                            <FileUpload
                              files={files}
                              setFiles={setFiles}
                              maxFiles={5}
                              acceptedTypes={['.pdf', '.doc', '.docx', '.jpg', '.png']}
                            />
                          </div>

                          <Button 
                            type="submit" 
                            className="w-full" 
                            disabled={submitGrievance.isPending}
                            data-testid="button-submit-grievance"
                          >
                            {submitGrievance.isPending ? "Submitting..." : "Submit Grievance"}
                          </Button>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>

                  {/* Investor Grievance Reports */}
                  <div className="space-y-8">
                    <h2 className="text-2xl font-bold text-gray-900 text-center">Investor Grievance Reports</h2>
                    
                    {/* FY 2024-25 */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Financial Year 2024-25</h3>
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                          { quarter: "Q4 2024-25", file: "/config/data/Investor Greviance/24-25/Birla capital_IG_31.03.2025.pdf", period: "Jan-Mar 2025" },
                          { quarter: "Q3 2024-25", file: "/config/data/Investor Greviance/24-25/Birla capital_IG_31.12.2024.pdf", period: "Oct-Dec 2024" },
                          { quarter: "Q2 2024-25", file: "/config/data/Investor Greviance/24-25/Birla capital_IG_30.09.2024.pdf", period: "Jul-Sep 2024" },
                          { quarter: "Q1 2024-25", file: "/config/data/Investor Greviance/24-25/Birla Capital_IG_30.06.2024.pdf", period: "Apr-Jun 2024" }
                        ].map((report, index) => (
                          <Card key={report.quarter} className="border border-gray-200" data-testid={`grievance-report-${index}`}>
                            <CardContent className="p-4">
                              <h4 className="font-semibold text-gray-900 mb-2">{report.quarter}</h4>
                              <p className="text-sm text-gray-600 mb-3">{report.period}</p>
                              <div className="space-y-2">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="w-full"
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
                                  className="w-full"
                                  onClick={() => window.open(report.file, '_blank')}
                                  data-testid={`view-${report.quarter}`}
                                >
                                  <FileText className="mr-2 h-4 w-4" />
                                  View PDF
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    {/* FY 2023-24 */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Financial Year 2023-24</h3>
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                          { quarter: "Q4 2023-24", file: "/config/data/Investor Greviance/23-24/Reg 13(3) Birla Capital_IG_31.03.2024.pdf", period: "Jan-Mar 2024" },
                          { quarter: "Q3 2023-24", file: "/config/data/Investor Greviance/23-24/Birla Capital IG_31.12.2023.pdf", period: "Oct-Dec 2023" },
                          { quarter: "Q2 2023-24", file: "/config/data/Investor Greviance/23-24/Birla Capital IG_30.09.2023.pdf", period: "Jul-Sep 2023" },
                          { quarter: "Q1 2023-24", file: "/config/data/Investor Greviance/23-24/Birla Capital_IG_30.06.2023.pdf", period: "Apr-Jun 2023" }
                        ].map((report, index) => (
                          <Card key={report.quarter} className="border border-gray-200" data-testid={`grievance-report-23-24-${index}`}>
                            <CardContent className="p-4">
                              <h4 className="font-semibold text-gray-900 mb-2">{report.quarter}</h4>
                              <p className="text-sm text-gray-600 mb-3">{report.period}</p>
                              <div className="space-y-2">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="w-full"
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
                                  className="w-full"
                                  onClick={() => window.open(report.file, '_blank')}
                                  data-testid={`view-${report.quarter}`}
                                >
                                  <FileText className="mr-2 h-4 w-4" />
                                  View PDF
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
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

                  {/* Documents List */}
                  {filteredDocs.length === 0 ? (
                    <Card>
                      <CardContent className="p-8 text-center">
                        <FileText className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Documents Found</h3>
                        <p className="text-gray-600">Documents will appear here when available.</p>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="space-y-4">
                      {filteredDocs.map((doc, index) => (
                        <Card key={doc.id} className="border border-gray-200" data-testid={`document-${index}`}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center">
                              <div className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-1">
                                  {doc.title}
                                </h3>
                                <p className="text-sm text-gray-600">{doc.type.replace('_', ' ')}</p>
                              </div>
                              <div className="flex gap-2">
                                <Button 
                                  variant="outline"
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
                                  onClick={() => window.open(doc.file_path, '_blank')}
                                  data-testid={`view-doc-${index}`}
                                >
                                  <FileText className="mr-2 h-4 w-4" />
                                  View
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}

                  {/* Simplified Annual Reports */}
                  {(activeTab === "all" || activeTab === "ANNUAL_REPORT") && (
                    <div className="space-y-4">
                      <h2 className="text-xl font-bold text-gray-900">Annual Reports</h2>
                      {[
                        { year: "2023-24", file: "/config/data/annual-reports/AR_2023-24.pdf" },
                        { year: "2022-23", file: "/config/data/annual-reports/AR_2022-23.pdf" },
                        { year: "2021-22", file: "/config/data/annual-reports/AR_2021-22.pdf" },
                        { year: "2020-21", file: "/config/data/annual-reports/AR_2020-21.pdf" },
                        { year: "2019-20", file: "/config/data/annual-reports/AR_2019-20.pdf" }
                      ].map((report, index) => (
                        <Card key={report.year} className="border border-gray-200" data-testid={`annual-report-${index}`}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center">
                              <div className="flex-1">
                                <h3 className="font-semibold text-gray-900">FY {report.year}</h3>
                                <p className="text-sm text-gray-600">Annual Report</p>
                              </div>
                              <div className="flex gap-2">
                                <Button 
                                  variant="outline"
                                  size="sm"
                                  data-testid={`download-annual-${report.year}`}
                                >
                                  <Download className="mr-2 h-4 w-4" />
                                  Download
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  data-testid={`view-annual-${report.year}`}
                                >
                                  <FileText className="mr-2 h-4 w-4" />
                                  View
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
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