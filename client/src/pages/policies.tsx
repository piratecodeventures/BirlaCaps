import { useQuery } from "@tanstack/react-query";
import { Policy } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, Shield, Users, Scale, AlertTriangle, Handshake, FileX, Eye } from "lucide-react";
import PDFViewer from "@/components/pdf/pdf-viewer";

export default function Policies() {
  const { data: policies = [], isLoading } = useQuery<Policy[]>({
    queryKey: ["/api/policies"]
  });

  const handleDownload = (filePath: string) => {
    const link = document.createElement('a');
    link.href = filePath;
    link.download = filePath.split('/').pop() || 'policy.pdf';
    link.click();
  };

  const handleViewPDF = (filePath: string) => {
    window.open(filePath, '_blank', 'width=1000,height=800,scrollbars=yes,resizable=yes');
  };

  // Static policy documents data - matching actual files in config/data/Policy/
  const staticPolicies = [
    {
      id: 'code-of-conduct',
      title: 'Code of Conduct',
      description: 'Ethical guidelines for all employees and stakeholders',
      filePath: '/config/data/Policy/12_Code of Conduct.pdf',
      icon: FileX,
      color: 'blue-600',
      section: 'conduct'
    },
    {
      id: 'insider-trading-upsi',
      title: 'Code of Conduct for UPSI',
      description: 'Code of conduct for handling unpublished price sensitive information',
      filePath: '/config/data/Policy/11_Code of Conduct for unpublished price sensitive information.pdf',
      icon: Scale,
      color: 'green-600',
      section: 'governance'
    },
    {
      id: 'risk-management',
      title: 'Risk Management Policy',
      description: 'Comprehensive risk assessment and mitigation strategies',
      filePath: '/config/data/Policy/3_Risk Management Policy.pdf',
      icon: Shield,
      color: 'red-600',
      section: 'risk-management'
    },
    {
      id: 'related-party',
      title: 'Related Party Policy',
      description: 'Guidelines for managing related party transactions',
      filePath: '/config/data/Policy/8_Related Party Policy.pdf',
      icon: Handshake,
      color: 'purple-600',
      section: 'party-transaction'
    },
    {
      id: 'nomination-remuneration',
      title: 'Nomination & Remuneration Policy',
      description: 'Framework for board appointments and compensation',
      filePath: '/config/data/Policy/5_Nomination and Remuneration Policy.pdf',
      icon: Users,
      color: 'indigo-600',
      section: 'nomination-remuneration'
    },
    {
      id: 'insider-trading',
      title: 'Code of Conduct for Insider Trading',
      description: 'Compliance framework preventing insider trading',
      filePath: '/config/data/Policy/9_Code of Conduct for Insider Trading Policy.pdf',
      icon: AlertTriangle,
      color: 'orange-600',
      section: 'insider-trading'
    },
    {
      id: 'whistle-blower',
      title: 'Whistle Blower Policy',
      description: 'Secure reporting mechanism for unethical practices',
      filePath: '/config/data/Policy/6_Whistle Blower Policy.pdf',
      icon: FileText,
      color: 'teal-600',
      section: 'whistle-blower'
    },
    {
      id: 'material-subsidiary',
      title: 'Material Subsidiary Policy',
      description: 'Framework for managing material subsidiaries',
      filePath: '/config/data/Policy/7_Policy for determining material subsidiary.pdf',
      icon: FileText,
      color: 'cyan-600',
      section: 'material-subsidiary'
    },
    {
      id: 'archival',
      title: 'Archival Policy',
      description: 'Policy for document retention and archival',
      filePath: '/config/data/Policy/4_Archival Policy.pdf',
      icon: FileText,
      color: 'gray-600',
      section: 'archival'
    },
    {
      id: 'independent-director',
      title: 'Familiarisation Programme',
      description: 'Director familiarization programme for independent directors',
      filePath: '/config/data/Policy/2_Familiarization Programme of Independent Director.pdf',
      icon: Users,
      color: 'emerald-600',
      section: 'independent-director'
    },
    {
      id: 'auditor-terms',
      title: 'Terms of Appointment of Independent Auditor',
      description: 'Terms and conditions for independent auditor appointment',
      filePath: '/config/data/Policy/1_Terms of Appointment of Independent Auditor.pdf',
      icon: FileText,
      color: 'pink-600',
      section: 'auditor'
    },
    {
      id: 'materiality-events',
      title: 'Policy for Determining Materiality of Events',
      description: 'Framework for determining materiality of events and information',
      filePath: '/config/data/Policy/10_Policy for determining materiality of event.pdf',
      icon: Scale,
      color: 'violet-600',
      section: 'materiality'
    }
  ];

  const getPolicyIcon = (category: string) => {
    const icons: Record<string, any> = {
      'CODE_OF_CONDUCT': FileX,
      'RISK_MANAGEMENT': Shield,
      'RELATED_PARTY': Handshake,
      'NOMINATION_REMUNERATION': Users,
      'INSIDER_TRADING': AlertTriangle,
      'WHISTLE_BLOWER': FileText,
      'GOVERNANCE': Scale
    };
    return icons[category] || FileText;
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
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 gradient-text slide-in-top" data-testid="policies-title">
              Codes and Policies
            </h1>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed fade-in-up" data-testid="policies-subtitle">
              Corporate governance policies and compliance frameworks that guide our ethical business practices
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* All Corporate Policies and Codes */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold gradient-text mb-8 text-center">Corporate Policies & Compliance Documents</h2>
            <p className="text-gray-600 text-center mb-12 max-w-4xl mx-auto">
              Comprehensive collection of corporate governance policies, compliance frameworks, and codes that guide our ethical business practices and regulatory compliance.
            </p>
            
            {/* Code of Conduct Section */}
            <div id="conduct" className="mb-12">
              <h3 className="text-2xl font-semibold text-blue-900 mb-6 text-center">Code of Conduct</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {staticPolicies.filter(policy => policy.section === 'conduct').map((policy, index) => {
                  const IconComponent = policy.icon;
                  const colors = { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200", gradient: "from-blue-600 to-blue-700" };
                  
                  return (
                    <Card 
                      key={policy.id} 
                      className={`group glass-card hover-lift shimmer-effect border-2 ${colors.border} ${colors.bg} modern-card`}
                      data-testid={`policy-conduct-${index}`}
                    >
                      <CardContent className="p-6 text-center">
                        <div className={`${colors.bg} ${colors.text} p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4 float-animation hover-glow`}>
                          <IconComponent className="h-8 w-8 hover-rotate" />
                        </div>
                        <h3 className={`text-lg font-bold ${colors.text} mb-3 gradient-text-blue group-hover:scale-105 transition-transform duration-300`}>
                          {policy.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-6 leading-relaxed fade-in-up">
                          {policy.description}
                        </p>
                        <div className="space-y-3">
                          <Button 
                            className={`w-full bg-gradient-to-r ${colors.gradient} text-white border-0 hover:shadow-lg hover-glow btn-interactive`}
                            onClick={() => {
                              const link = document.createElement('a');
                              link.href = policy.filePath;
                              link.download = policy.filePath.split('/').pop() || 'policy.pdf';
                              link.click();
                            }}
                            data-testid={`download-policy-${policy.id}`}
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Download PDF
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full hover:bg-gray-100"
                            onClick={() => window.open(policy.filePath, '_blank')}
                            data-testid={`view-policy-${policy.id}`}
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

            {/* Governance Section */}
            <div id="governance" className="mb-12">
              <h3 className="text-2xl font-semibold text-green-900 mb-6 text-center">Governance Policies</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {staticPolicies.filter(policy => policy.section === 'governance').map((policy, index) => {
                  const IconComponent = policy.icon;
                  const colors = { bg: "bg-green-50", text: "text-green-600", border: "border-green-200", gradient: "from-green-600 to-green-700" };
                  
                  return (
                    <Card 
                      key={policy.id} 
                      className={`group glass-card hover-lift shimmer-effect border-2 ${colors.border} ${colors.bg} modern-card`}
                      data-testid={`policy-governance-${index}`}
                    >
                      <CardContent className="p-6 text-center">
                        <div className={`${colors.bg} ${colors.text} p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4 float-animation hover-glow`}>
                          <IconComponent className="h-8 w-8 hover-rotate" />
                        </div>
                        <h3 className={`text-lg font-bold ${colors.text} mb-3 gradient-text-blue group-hover:scale-105 transition-transform duration-300`}>
                          {policy.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-6 leading-relaxed fade-in-up">
                          {policy.description}
                        </p>
                        <div className="space-y-3">
                          <Button 
                            className={`w-full bg-gradient-to-r ${colors.gradient} text-white border-0 hover:shadow-lg hover-glow btn-interactive`}
                            onClick={() => {
                              const link = document.createElement('a');
                              link.href = policy.filePath;
                              link.download = policy.filePath.split('/').pop() || 'policy.pdf';
                              link.click();
                            }}
                            data-testid={`download-policy-${policy.id}`}
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Download PDF
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full hover:bg-gray-100"
                            onClick={() => window.open(policy.filePath, '_blank')}
                            data-testid={`view-policy-${policy.id}`}
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

            {/* Risk Management Section */}
            <div id="risk-management" className="mb-12">
              <h3 className="text-2xl font-semibold text-red-900 mb-6 text-center">Risk Management</h3>
              <div className="grid md:grid-cols-1 gap-6">
                {staticPolicies.filter(policy => policy.section === 'risk-management').map((policy, index) => {
                  const IconComponent = policy.icon;
                  const colors = { bg: "bg-red-50", text: "text-red-600", border: "border-red-200", gradient: "from-red-600 to-red-700" };
                  
                  return (
                    <Card 
                      key={policy.id} 
                      className={`group glass-card hover-lift shimmer-effect border-2 ${colors.border} ${colors.bg} modern-card`}
                      data-testid={`policy-risk-${index}`}
                    >
                      <CardContent className="p-6 text-center">
                        <div className={`${colors.bg} ${colors.text} p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4 float-animation hover-glow`}>
                          <IconComponent className="h-8 w-8 hover-rotate" />
                        </div>
                        <h3 className={`text-lg font-bold ${colors.text} mb-3 gradient-text-blue group-hover:scale-105 transition-transform duration-300`}>
                          {policy.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-6 leading-relaxed fade-in-up">
                          {policy.description}
                        </p>
                        <div className="space-y-3">
                          <Button 
                            className={`w-full bg-gradient-to-r ${colors.gradient} text-white border-0 hover:shadow-lg hover-glow btn-interactive`}
                            onClick={() => {
                              const link = document.createElement('a');
                              link.href = policy.filePath;
                              link.download = policy.filePath.split('/').pop() || 'policy.pdf';
                              link.click();
                            }}
                            data-testid={`download-policy-${policy.id}`}
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Download PDF
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full hover:bg-gray-100"
                            onClick={() => window.open(policy.filePath, '_blank')}
                            data-testid={`view-policy-${policy.id}`}
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

            {/* Party Transaction Section */}
            <div id="party-transaction" className="mb-12">
              <h3 className="text-2xl font-semibold text-purple-900 mb-6 text-center">Related Party Transactions</h3>
              <div className="grid md:grid-cols-1 gap-6">
                {staticPolicies.filter(policy => policy.section === 'party-transaction').map((policy, index) => {
                  const IconComponent = policy.icon;
                  const colors = { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-200", gradient: "from-purple-600 to-purple-700" };
                  
                  return (
                    <Card 
                      key={policy.id} 
                      className={`group glass-card hover-lift shimmer-effect border-2 ${colors.border} ${colors.bg} modern-card`}
                      data-testid={`policy-party-${index}`}
                    >
                      <CardContent className="p-6 text-center">
                        <div className={`${colors.bg} ${colors.text} p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4 float-animation hover-glow`}>
                          <IconComponent className="h-8 w-8 hover-rotate" />
                        </div>
                        <h3 className={`text-lg font-bold ${colors.text} mb-3 gradient-text-blue group-hover:scale-105 transition-transform duration-300`}>
                          {policy.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-6 leading-relaxed fade-in-up">
                          {policy.description}
                        </p>
                        <div className="space-y-3">
                          <Button 
                            className={`w-full bg-gradient-to-r ${colors.gradient} text-white border-0 hover:shadow-lg hover-glow btn-interactive`}
                            onClick={() => {
                              const link = document.createElement('a');
                              link.href = policy.filePath;
                              link.download = policy.filePath.split('/').pop() || 'policy.pdf';
                              link.click();
                            }}
                            data-testid={`download-policy-${policy.id}`}
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Download PDF
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full hover:bg-gray-100"
                            onClick={() => window.open(policy.filePath, '_blank')}
                            data-testid={`view-policy-${policy.id}`}
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

            {/* Nomination & Remuneration Section */}
            <div id="nomination-remuneration" className="mb-12">
              <h3 className="text-2xl font-semibold text-indigo-900 mb-6 text-center">Nomination & Remuneration</h3>
              <div className="grid md:grid-cols-1 gap-6">
                {staticPolicies.filter(policy => policy.section === 'nomination-remuneration').map((policy, index) => {
                  const IconComponent = policy.icon;
                  const colors = { bg: "bg-indigo-50", text: "text-indigo-600", border: "border-indigo-200", gradient: "from-indigo-600 to-indigo-700" };
                  
                  return (
                    <Card 
                      key={policy.id} 
                      className={`group glass-card hover-lift shimmer-effect border-2 ${colors.border} ${colors.bg} modern-card`}
                      data-testid={`policy-nomination-${index}`}
                    >
                      <CardContent className="p-6 text-center">
                        <div className={`${colors.bg} ${colors.text} p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4 float-animation hover-glow`}>
                          <IconComponent className="h-8 w-8 hover-rotate" />
                        </div>
                        <h3 className={`text-lg font-bold ${colors.text} mb-3 gradient-text-blue group-hover:scale-105 transition-transform duration-300`}>
                          {policy.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-6 leading-relaxed fade-in-up">
                          {policy.description}
                        </p>
                        <div className="space-y-3">
                          <Button 
                            className={`w-full bg-gradient-to-r ${colors.gradient} text-white border-0 hover:shadow-lg hover-glow btn-interactive`}
                            onClick={() => {
                              const link = document.createElement('a');
                              link.href = policy.filePath;
                              link.download = policy.filePath.split('/').pop() || 'policy.pdf';
                              link.click();
                            }}
                            data-testid={`download-policy-${policy.id}`}
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Download PDF
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full hover:bg-gray-100"
                            onClick={() => window.open(policy.filePath, '_blank')}
                            data-testid={`view-policy-${policy.id}`}
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

            {/* All Other Policies */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children">
              {staticPolicies.filter(policy => !['conduct', 'governance', 'risk-management', 'party-transaction', 'nomination-remuneration'].includes(policy.section)).map((policy, index) => {
                const IconComponent = policy.icon;
                const colorClasses = {
                  'blue-600': { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200", gradient: "from-blue-600 to-blue-700" },
                  'green-600': { bg: "bg-green-50", text: "text-green-600", border: "border-green-200", gradient: "from-green-600 to-green-700" },
                  'red-600': { bg: "bg-red-50", text: "text-red-600", border: "border-red-200", gradient: "from-red-600 to-red-700" },
                  'purple-600': { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-200", gradient: "from-purple-600 to-purple-700" },
                  'indigo-600': { bg: "bg-indigo-50", text: "text-indigo-600", border: "border-indigo-200", gradient: "from-indigo-600 to-indigo-700" },
                  'orange-600': { bg: "bg-orange-50", text: "text-orange-600", border: "border-orange-200", gradient: "from-orange-600 to-orange-700" },
                  'teal-600': { bg: "bg-teal-50", text: "text-teal-600", border: "border-teal-200", gradient: "from-teal-600 to-teal-700" },
                  'cyan-600': { bg: "bg-cyan-50", text: "text-cyan-600", border: "border-cyan-200", gradient: "from-cyan-600 to-cyan-700" },
                  'gray-600': { bg: "bg-gray-50", text: "text-gray-600", border: "border-gray-200", gradient: "from-gray-600 to-gray-700" },
                  'emerald-600': { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-200", gradient: "from-emerald-600 to-emerald-700" },
                  'pink-600': { bg: "bg-pink-50", text: "text-pink-600", border: "border-pink-200", gradient: "from-pink-600 to-pink-700" },
                  'violet-600': { bg: "bg-violet-50", text: "text-violet-600", border: "border-violet-200", gradient: "from-violet-600 to-violet-700" }
                };
                const colors = colorClasses[policy.color as keyof typeof colorClasses];
                
                return (
                  <Card 
                    key={policy.id} 
                    className={`group glass-card hover-lift shimmer-effect border-2 ${colors.border} ${colors.bg} modern-card`}
                    data-testid={`policy-${index}`}
                  >
                    <CardContent className="p-6 text-center">
                      <div className={`${colors.bg} ${colors.text} p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4 float-animation hover-glow`}>
                        <IconComponent className="h-8 w-8 hover-rotate" />
                      </div>
                      <h3 className={`text-lg font-bold ${colors.text} mb-3 gradient-text-blue group-hover:scale-105 transition-transform duration-300`}>
                        {policy.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-6 leading-relaxed fade-in-up">
                        {policy.description}
                      </p>
                      <div className="space-y-3">
                        <Button 
                          className={`w-full bg-gradient-to-r ${colors.gradient} text-white border-0 hover:shadow-lg hover-glow btn-interactive`}
                          onClick={() => {
                            const link = document.createElement('a');
                            link.href = policy.filePath;
                            link.download = policy.filePath.split('/').pop() || 'policy.pdf';
                            link.click();
                          }}
                          data-testid={`download-policy-${policy.id}`}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download PDF
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full hover:bg-gray-100"
                          onClick={() => window.open(policy.filePath, '_blank')}
                          data-testid={`view-policy-${policy.id}`}
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

            {/* Hidden Navigation Anchors for remaining policy sections */}
            <div id="insider-trading" className="scroll-mt-20"></div>
            <div id="whistle-blower" className="scroll-mt-20"></div>
            <div id="material-subsidiary" className="scroll-mt-20"></div>
            <div id="archival" className="scroll-mt-20"></div>
            <div id="independent-director" className="scroll-mt-20"></div>

            {/* Additional Information */}
            <div className="mt-16 p-8 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 rounded-xl shadow-lg border border-blue-200">
              <div className="text-center mb-8">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4 float-animation hover-glow">
                  <Shield className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold gradient-text mb-2">Compliance & Governance</h3>
                <p className="text-gray-600">Ensuring transparency and accountability in all our practices</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover-lift">
                  <div className="bg-blue-100 text-blue-600 p-3 rounded-full w-12 h-12 mx-auto flex items-center justify-center mb-3">
                    <FileText className="h-6 w-6" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Policy Updates</h4>
                  <p className="text-xs text-gray-600">All policies are reviewed annually and updated as per regulatory requirements and best practices.</p>
                </div>
                <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover-lift">
                  <div className="bg-green-100 text-green-600 p-3 rounded-full w-12 h-12 mx-auto flex items-center justify-center mb-3">
                    <Users className="h-6 w-6" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Compliance Training</h4>
                  <p className="text-xs text-gray-600">Regular training programs are conducted to ensure understanding and implementation of these policies.</p>
                </div>
                <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover-lift">
                  <div className="bg-purple-100 text-purple-600 p-3 rounded-full w-12 h-12 mx-auto flex items-center justify-center mb-3">
                    <Shield className="h-6 w-6" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Board Oversight</h4>
                  <p className="text-xs text-gray-600">All policies are approved by the Board and regularly monitored by respective board committees.</p>
                </div>
                <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover-lift">
                  <div className="bg-orange-100 text-orange-600 p-3 rounded-full w-12 h-12 mx-auto flex items-center justify-center mb-3">
                    <Eye className="h-6 w-6" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Stakeholder Access</h4>
                  <p className="text-xs text-gray-600">Key policies are made available to stakeholders to ensure transparency in our governance practices.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic API Policies */}
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="glass-card animate-pulse">
                  <CardContent className="p-8">
                    <div className="h-6 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : policies.length > 0 ? (
            <div>
              <h2 className="text-3xl font-bold gradient-text mb-8 text-center">Additional Policy Documents</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children">
                {policies.map((policy, index) => {
                  const IconComponent = getPolicyIcon(policy.category);
                  const colors = { bg: "bg-gray-50", text: "text-gray-600", border: "border-gray-200", gradient: "from-gray-600 to-gray-700" };
                  
                  return (
                    <Card 
                      key={policy.id} 
                      className={`group glass-card hover-lift shimmer-effect border-2 ${colors.border} ${colors.bg} modern-card`}
                      data-testid={`dynamic-policy-${index}`}
                    >
                      <CardContent className="p-6 text-center">
                        <div className={`${colors.bg} ${colors.text} p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4 float-animation hover-glow`}>
                          <IconComponent className="h-8 w-8 hover-rotate" />
                        </div>
                        <h3 className={`text-lg font-bold ${colors.text} mb-3 gradient-text-blue group-hover:scale-105 transition-transform duration-300`}>
                          {policy.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-6 leading-relaxed fade-in-up">
                          {policy.description || 'Corporate policy document'}
                        </p>
                        <div className="space-y-3">
                          <Button 
                            className={`w-full bg-gradient-to-r ${colors.gradient} text-white border-0 hover:shadow-lg hover-glow btn-interactive`}
                            onClick={() => {
                              const link = document.createElement('a');
                              link.href = `/config/data/policies/${policy.id}.pdf`;
                              link.download = `${policy.title.toLowerCase().replace(/ /g, '-')}.pdf`;
                              link.click();
                            }}
                            data-testid={`download-dynamic-policy-${policy.id}`}
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Download PDF
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full hover:bg-gray-100"
                            onClick={() => window.open(`/config/data/policies/${policy.id}.pdf`, '_blank')}
                            data-testid={`view-dynamic-policy-${policy.id}`}
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
          ) : null}
        </div>
      </section>
    </div>
  );
}
