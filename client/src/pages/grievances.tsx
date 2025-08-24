import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import FileUpload from "@/components/ui/file-upload";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Download, FileText, Calendar } from "lucide-react";
import PDFViewer from "@/components/pdf/pdf-viewer";

const grievanceSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  grievanceType: z.string().optional(),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
});

type GrievanceFormData = z.infer<typeof grievanceSchema>;

export default function Grievances() {
  const [files, setFiles] = useState<File[]>([]);
  const { toast } = useToast();

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
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 gradient-text slide-in-top" data-testid="grievances-title">
              Investor Grievances
            </h1>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed fade-in-up" data-testid="grievances-subtitle">
              Submit your grievances and concerns. We are committed to addressing all issues promptly and transparently.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Grievance Officer Information */}
          <Card className="mb-8 border-blue-200 bg-blue-50">
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
          <div className="mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold gradient-text mb-8 text-center">Investor Grievance Reports</h2>
            <p className="text-xl text-gray-600 text-center mb-12 max-w-4xl mx-auto leading-relaxed">
              Quarterly reports on investor grievances received, processed, and resolved as per regulatory requirements.
            </p>
            
            <div className="space-y-12 stagger-children">
              {/* FY 2024-25 */}
              <div>
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg">
                    <Calendar className="h-6 w-6" />
                    <h3 className="text-xl font-bold">Financial Year 2024-25</h3>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
                  {[
                    { quarter: "Q4 2024-25", file: "Birla capital_IG_31.03.2025.pdf", period: "Jan-Mar 2025", icon: Calendar, color: "blue" },
                    { quarter: "Q3 2024-25", file: "Birla capital_IG_31.12.2024.pdf", period: "Oct-Dec 2024", icon: Calendar, color: "green" },
                    { quarter: "Q2 2024-25", file: "Birla capital_IG_30.09.2024.pdf", period: "Jul-Sep 2024", icon: Calendar, color: "purple" },
                    { quarter: "Q1 2024-25", file: "Birla Capital_IG_30.06.2024.pdf", period: "Apr-Jun 2024", icon: Calendar, color: "indigo" }
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
                          <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                            {report.period}
                          </p>
                          <div className="space-y-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className={`w-full bg-gradient-to-r ${colors.gradient} text-white border-0 hover:shadow-lg hover-glow btn-interactive`}
                              onClick={() => {
                                const link = document.createElement('a');
                                link.href = `/config/data/Investor Greviance/24-25/${report.file}`;
                                link.download = report.file;
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
                              onClick={() => window.open(`/config/data/Investor Greviance/24-25/${report.file}`, '_blank')}
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
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-full shadow-lg">
                    <Calendar className="h-6 w-6" />
                    <h3 className="text-xl font-bold">Financial Year 2023-24</h3>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
                  {[
                    { quarter: "Q4 2023-24", file: "Reg 13(3) Birla Capital_IG_31.03.2024.pdf", period: "Jan-Mar 2024", icon: Calendar, color: "emerald" },
                    { quarter: "Q3 2023-24", file: "Birla Capital IG_31.12.2023.pdf", period: "Oct-Dec 2023", icon: Calendar, color: "teal" },
                    { quarter: "Q2 2023-24", file: "Birla Capital IG_30.09.2023.pdf", period: "Jul-Sep 2023", icon: Calendar, color: "cyan" },
                    { quarter: "Q1 2023-24", file: "Birla Capital_IG_30.06.2023.pdf", period: "Apr-Jun 2023", icon: Calendar, color: "green" }
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
                          <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                            {report.period}
                          </p>
                          <div className="space-y-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className={`w-full bg-gradient-to-r ${colors.gradient} text-white border-0 hover:shadow-lg hover-glow btn-interactive`}
                              onClick={() => {
                                const link = document.createElement('a');
                                link.href = `/config/data/Investor Greviance/23-24/${report.file}`;
                                link.download = report.file;
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
                              onClick={() => window.open(`/config/data/Investor Greviance/23-24/${report.file}`, '_blank')}
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

              {/* FY 2022-23 */}
              <div>
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-violet-600 text-white px-6 py-3 rounded-full shadow-lg">
                    <Calendar className="h-6 w-6" />
                    <h3 className="text-xl font-bold">Financial Year 2022-23</h3>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
                  {[
                    { quarter: "Q4 2022-23", file: "Birla Capital IG_31.03.2023.pdf", period: "Jan-Mar 2023", icon: Calendar, color: "purple" },
                    { quarter: "Q3 2022-23", file: "Birla Capital  IG_31.12.2022.pdf", period: "Oct-Dec 2022", icon: Calendar, color: "violet" },
                    { quarter: "Q2 2022-23", file: "Birla Capital IG_30.09.2022.pdf", period: "Jul-Sep 2022", icon: Calendar, color: "fuchsia" },
                    { quarter: "Q1 2022-23", file: "Birla Capital IG_30.06.2022.pdf", period: "Apr-Jun 2022", icon: Calendar, color: "pink" }
                  ].map((report, index) => {
                    const colorClasses = {
                      purple: { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-200", gradient: "from-purple-600 to-purple-700" },
                      violet: { bg: "bg-violet-50", text: "text-violet-600", border: "border-violet-200", gradient: "from-violet-600 to-violet-700" },
                      fuchsia: { bg: "bg-fuchsia-50", text: "text-fuchsia-600", border: "border-fuchsia-200", gradient: "from-fuchsia-600 to-fuchsia-700" },
                      pink: { bg: "bg-pink-50", text: "text-pink-600", border: "border-pink-200", gradient: "from-pink-600 to-pink-700" }
                    };
                    const colors = colorClasses[report.color as keyof typeof colorClasses];
                    const IconComponent = report.icon;
                    
                    return (
                      <Card key={report.quarter} className={`group glass-card hover-lift shimmer-effect border-2 ${colors.border} ${colors.bg} modern-card`} data-testid={`grievance-report-22-23-${index}`}>
                        <CardContent className="p-6 text-center">
                          <div className={`${colors.bg} ${colors.text} p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4 float-animation hover-glow`}>
                            <IconComponent className="h-8 w-8 hover-rotate" />
                          </div>
                          <h4 className={`text-lg font-bold ${colors.text} mb-2 gradient-text-blue group-hover:scale-105 transition-transform duration-300`}>
                            {report.quarter}
                          </h4>
                          <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                            {report.period}
                          </p>
                          <div className="space-y-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className={`w-full bg-gradient-to-r ${colors.gradient} text-white border-0 hover:shadow-lg hover-glow btn-interactive`}
                              onClick={() => {
                                const link = document.createElement('a');
                                link.href = `/config/data/Investor Greviance/23-22/${report.file}`;
                                link.download = report.file;
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
                              onClick={() => window.open(`/config/data/Investor Greviance/23-22/${report.file}`, '_blank')}
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

              {/* FY 2021-22 */}
              <div>
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white px-6 py-3 rounded-full shadow-lg">
                    <Calendar className="h-6 w-6" />
                    <h3 className="text-xl font-bold">Financial Year 2021-22</h3>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
                  {[
                    { quarter: "Q4 2021-22", file: "Birla Capital IG_31.03.2022.pdf", period: "Jan-Mar 2022", icon: Calendar, color: "orange" },
                    { quarter: "Q3 2021-22", file: "Birla capital_IG_31.12.21.pdf", period: "Oct-Dec 2021", icon: Calendar, color: "amber" },
                    { quarter: "Q1 2021-22", file: "Birla Capital IG_30.06.2021.pdf", period: "Apr-Jun 2021", icon: Calendar, color: "yellow" }
                  ].map((report, index) => {
                    const colorClasses = {
                      orange: { bg: "bg-orange-50", text: "text-orange-600", border: "border-orange-200", gradient: "from-orange-600 to-orange-700" },
                      amber: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-200", gradient: "from-amber-600 to-amber-700" },
                      yellow: { bg: "bg-yellow-50", text: "text-yellow-600", border: "border-yellow-200", gradient: "from-yellow-600 to-yellow-700" }
                    };
                    const colors = colorClasses[report.color as keyof typeof colorClasses];
                    const IconComponent = report.icon;
                    
                    return (
                      <Card key={report.quarter} className={`group glass-card hover-lift shimmer-effect border-2 ${colors.border} ${colors.bg} modern-card`} data-testid={`grievance-report-21-22-${index}`}>
                        <CardContent className="p-6 text-center">
                          <div className={`${colors.bg} ${colors.text} p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4 float-animation hover-glow`}>
                            <IconComponent className="h-8 w-8 hover-rotate" />
                          </div>
                          <h4 className={`text-lg font-bold ${colors.text} mb-2 gradient-text-blue group-hover:scale-105 transition-transform duration-300`}>
                            {report.quarter}
                          </h4>
                          <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                            {report.period}
                          </p>
                          <div className="space-y-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className={`w-full bg-gradient-to-r ${colors.gradient} text-white border-0 hover:shadow-lg hover-glow btn-interactive`}
                              onClick={() => {
                                const link = document.createElement('a');
                                link.href = `/config/data/Investor Greviance/21-22/${report.file}`;
                                link.download = report.file;
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
                              onClick={() => window.open(`/config/data/Investor Greviance/21-22/${report.file}`, '_blank')}
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

              {/* FY 2020-21 */}
              <div>
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-rose-600 text-white px-6 py-3 rounded-full shadow-lg">
                    <Calendar className="h-6 w-6" />
                    <h3 className="text-xl font-bold">Financial Year 2020-21</h3>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
                  {[
                    { quarter: "Q4 2020-21", file: "Birla Capital IGR_31.03.2021.pdf", period: "Jan-Mar 2021", icon: Calendar, color: "red" },
                    { quarter: "Q3 2020-21", file: "Birla Cap IGR_31.12.2020.pdf", period: "Oct-Dec 2020", icon: Calendar, color: "rose" },
                    { quarter: "Q2 2020-21", file: "Birla Capital IGR_30.09.2020.pdf", period: "Jul-Sep 2020", icon: Calendar, color: "pink" },
                    { quarter: "Q1 2020-21", file: "IGR Birla Capital_30.06.2020.pdf", period: "Apr-Jun 2020", icon: Calendar, color: "fuchsia" }
                  ].map((report, index) => {
                    const colorClasses = {
                      red: { bg: "bg-red-50", text: "text-red-600", border: "border-red-200", gradient: "from-red-600 to-red-700" },
                      rose: { bg: "bg-rose-50", text: "text-rose-600", border: "border-rose-200", gradient: "from-rose-600 to-rose-700" },
                      pink: { bg: "bg-pink-50", text: "text-pink-600", border: "border-pink-200", gradient: "from-pink-600 to-pink-700" },
                      fuchsia: { bg: "bg-fuchsia-50", text: "text-fuchsia-600", border: "border-fuchsia-200", gradient: "from-fuchsia-600 to-fuchsia-700" }
                    };
                    const colors = colorClasses[report.color as keyof typeof colorClasses];
                    const IconComponent = report.icon;
                    
                    return (
                      <Card key={report.quarter} className={`group glass-card hover-lift shimmer-effect border-2 ${colors.border} ${colors.bg} modern-card`} data-testid={`grievance-report-20-21-${index}`}>
                        <CardContent className="p-6 text-center">
                          <div className={`${colors.bg} ${colors.text} p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4 float-animation hover-glow`}>
                            <IconComponent className="h-8 w-8 hover-rotate" />
                          </div>
                          <h4 className={`text-lg font-bold ${colors.text} mb-2 gradient-text-blue group-hover:scale-105 transition-transform duration-300`}>
                            {report.quarter}
                          </h4>
                          <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                            {report.period}
                          </p>
                          <div className="space-y-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className={`w-full bg-gradient-to-r ${colors.gradient} text-white border-0 hover:shadow-lg hover-glow btn-interactive`}
                              onClick={() => {
                                const link = document.createElement('a');
                                link.href = `/config/data/Investor Greviance/20-21/${report.file}`;
                                link.download = report.file;
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
                              onClick={() => window.open(`/config/data/Investor Greviance/20-21/${report.file}`, '_blank')}
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

            {/* Summary Information */}
            <div className="mt-16 p-8 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 rounded-xl shadow-lg border border-blue-200">
              <div className="text-center mb-6">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4 float-animation hover-glow">
                  <FileText className="h-8 w-8" />
                </div>
                <h4 className="text-2xl font-bold gradient-text mb-2">Investor Grievance Resolution</h4>
                <p className="text-gray-600">Our commitment to transparent and efficient grievance handling</p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover-lift">
                  <div className="text-3xl font-bold text-blue-600 mb-2">48hrs</div>
                  <div className="text-sm font-semibold text-gray-900 mb-1">Response Time</div>
                  <div className="text-xs text-gray-600">All grievances acknowledged within 48 hours and resolved within 7 working days</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover-lift">
                  <div className="text-3xl font-bold text-green-600 mb-2">BSE</div>
                  <div className="text-sm font-semibold text-gray-900 mb-1">Quarterly Reporting</div>
                  <div className="text-xs text-gray-600">Reports filed with BSE and available to stakeholders for transparency</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover-lift">
                  <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
                  <div className="text-sm font-semibold text-gray-900 mb-1">Resolution Rate</div>
                  <div className="text-xs text-gray-600">All grievances received have been successfully resolved or appropriately addressed</div>
                </div>
              </div>
            </div>
          </div>


        </div>
      </section>
    </div>
  );
}
