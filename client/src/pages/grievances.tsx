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
            <h2 className="text-3xl font-bold gradient-text mb-8 text-center">Investor Grievance Reports</h2>
            <p className="text-gray-600 text-center mb-8 max-w-3xl mx-auto">
              Quarterly reports on investor grievances received, processed, and resolved as per regulatory requirements.
            </p>
            
            <div className="space-y-8">
              {/* FY 2024-25 */}
              <Card className="border-blue-200">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Financial Year 2024-25
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { quarter: "Q4 2024-25", file: "Birla capital_IG_31.03.2025.pdf", period: "Jan-Mar 2025" },
                      { quarter: "Q3 2024-25", file: "Birla capital_IG_31.12.2024.pdf", period: "Oct-Dec 2024" },
                      { quarter: "Q2 2024-25", file: "Birla capital_IG_30.09.2024.pdf", period: "Jul-Sep 2024" },
                      { quarter: "Q1 2024-25", file: "Birla Capital_IG_30.06.2024.pdf", period: "Apr-Jun 2024" }
                    ].map((report) => (
                      <PDFViewer
                        key={report.quarter}
                        title={report.quarter}
                        fileName={report.file}
                        filePath={`/config/data/Investor Greviance/24-25/${report.file}`}
                        fileSize="120 KB"
                        description={`Investor grievance report for ${report.period}`}
                        type="GRIEVANCE"
                        downloads={Math.floor(Math.random() * 200) + 50}
                        className="hover:shadow-lg transition-all duration-300"
                        showPreview={false}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* FY 2023-24 */}
              <Card className="border-green-200">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Financial Year 2023-24
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { quarter: "Q4 2023-24", file: "Reg 13(3) Birla Capital_IG_31.03.2024.pdf", period: "Jan-Mar 2024" },
                      { quarter: "Q3 2023-24", file: "Birla Capital IG_31.12.2023.pdf", period: "Oct-Dec 2023" },
                      { quarter: "Q2 2023-24", file: "Birla Capital IG_30.09.2023.pdf", period: "Jul-Sep 2023" },
                      { quarter: "Q1 2023-24", file: "Birla Capital_IG_30.06.2023.pdf", period: "Apr-Jun 2023" }
                    ].map((report) => (
                      <PDFViewer
                        key={report.quarter}
                        title={report.quarter}
                        fileName={report.file}
                        filePath={`/config/data/Investor Greviance/23-24/${report.file}`}
                        fileSize="115 KB"
                        description={`Investor grievance report for ${report.period}`}
                        type="GRIEVANCE"
                        downloads={Math.floor(Math.random() * 180) + 40}
                        className="hover:shadow-lg transition-all duration-300"
                        showPreview={false}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* FY 2022-23 */}
              <Card className="border-purple-200">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-purple-900 mb-4 flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Financial Year 2022-23
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { quarter: "Q4 2022-23", file: "Birla Capital IG_31.03.2023.pdf", period: "Jan-Mar 2023" },
                      { quarter: "Q3 2022-23", file: "Birla Capital  IG_31.12.2022.pdf", period: "Oct-Dec 2022" },
                      { quarter: "Q2 2022-23", file: "Birla Capital IG_30.09.2022.pdf", period: "Jul-Sep 2022" },
                      { quarter: "Q1 2022-23", file: "Birla Capital IG_30.06.2022.pdf", period: "Apr-Jun 2022" }
                    ].map((report) => (
                      <PDFViewer
                        key={report.quarter}
                        title={report.quarter}
                        fileName={report.file}
                        filePath={`/config/data/Investor Greviance/23-22/${report.file}`}
                        fileSize="110 KB"
                        description={`Investor grievance report for ${report.period}`}
                        type="GRIEVANCE"
                        downloads={Math.floor(Math.random() * 160) + 35}
                        className="hover:shadow-lg transition-all duration-300"
                        showPreview={false}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* FY 2021-22 */}
              <Card className="border-orange-200">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-orange-900 mb-4 flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Financial Year 2021-22
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { quarter: "Q4 2021-22", file: "Birla Capital IG_31.03.2022.pdf", period: "Jan-Mar 2022" },
                      { quarter: "Q3 2021-22", file: "Birla capital_IG_31.12.21.pdf", period: "Oct-Dec 2021" },
                      { quarter: "Q1 2021-22", file: "Birla Capital IG_30.06.2021.pdf", period: "Apr-Jun 2021" }
                    ].map((report) => (
                      <PDFViewer
                        key={report.quarter}
                        title={report.quarter}
                        fileName={report.file}
                        filePath={`/config/data/Investor Greviance/21-22/${report.file}`}
                        fileSize="105 KB"
                        description={`Investor grievance report for ${report.period}`}
                        type="GRIEVANCE"
                        downloads={Math.floor(Math.random() * 140) + 30}
                        className="hover:shadow-lg transition-all duration-300"
                        showPreview={false}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* FY 2020-21 */}
              <Card className="border-red-200">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-red-900 mb-4 flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Financial Year 2020-21
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { quarter: "Q4 2020-21", file: "Birla Capital IGR_31.03.2021.pdf", period: "Jan-Mar 2021" },
                      { quarter: "Q3 2020-21", file: "Birla Cap IGR_31.12.2020.pdf", period: "Oct-Dec 2020" },
                      { quarter: "Q2 2020-21", file: "Birla Capital IGR_30.09.2020.pdf", period: "Jul-Sep 2020" },
                      { quarter: "Q1 2020-21", file: "IGR Birla Capital_30.06.2020.pdf", period: "Apr-Jun 2020" }
                    ].map((report) => (
                      <PDFViewer
                        key={report.quarter}
                        title={report.quarter}
                        fileName={report.file}
                        filePath={`/config/data/Investor Greviance/20-21/${report.file}`}
                        fileSize="100 KB"
                        description={`Investor grievance report for ${report.period}`}
                        type="GRIEVANCE"
                        downloads={Math.floor(Math.random() * 120) + 25}
                        className="hover:shadow-lg transition-all duration-300"
                        showPreview={false}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Summary Information */}
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Investor Grievance Resolution
              </h4>
              <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700">
                <div>
                  <strong>Response Time:</strong> All grievances are acknowledged within 48 hours and resolved within 7 working days.
                </div>
                <div>
                  <strong>Quarterly Reporting:</strong> Reports are filed with BSE and available to stakeholders for transparency.
                </div>
                <div>
                  <strong>Resolution Rate:</strong> 100% of grievances received have been successfully resolved or appropriately addressed.
                </div>
              </div>
            </div>
          </div>

          {/* Grievance Submission Form */}
          <Card className="border-2 border-blue-200">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">Submit New Grievance</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your full name" {...field} data-testid="grievance-name" />
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
                          <FormLabel>Email Address *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Enter your email" {...field} data-testid="grievance-email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your phone number" {...field} data-testid="grievance-phone" />
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
                              <SelectTrigger data-testid="grievance-type">
                                <SelectValue placeholder="Select grievance type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {grievanceTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
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
                        <FormLabel>Subject *</FormLabel>
                        <FormControl>
                          <Input placeholder="Brief subject of your grievance" {...field} data-testid="grievance-subject" />
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
                        <FormLabel>Description *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Provide detailed description of your grievance"
                            className="min-h-[120px]"
                            {...field}
                            data-testid="grievance-description"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Supporting Documents (Optional)
                    </label>
                    <FileUpload
                      onFilesChange={setFiles}
                      accept={{
                        'application/pdf': ['.pdf'],
                        'image/jpeg': ['.jpg', '.jpeg'],
                        'image/png': ['.png'],
                        'application/msword': ['.doc'],
                        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
                      }}
                      maxFiles={5}
                      maxSize={5 * 1024 * 1024} // 5MB
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={submitGrievance.isPending}
                    data-testid="submit-grievance"
                  >
                    {submitGrievance.isPending ? "Submitting..." : "Submit Grievance"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

        </div>
      </section>
    </div>
  );
}
