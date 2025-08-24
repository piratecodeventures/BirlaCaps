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

  // Static policy documents data
  const staticPolicies = [
    {
      id: 'conduct',
      title: 'Code of Conduct',
      description: 'Ethical guidelines for all employees and stakeholders',
      filePath: '/config/data/policies/code-of-conduct.pdf',
      icon: FileX,
      color: 'blue-600',
      section: 'conduct'
    },
    {
      id: 'governance',
      title: 'Code of Governance', 
      description: 'Framework for effective corporate governance practices',
      filePath: '/config/data/policies/code-of-governance.pdf',
      icon: Scale,
      color: 'green-600',
      section: 'governance'
    },
    {
      id: 'risk-management',
      title: 'Risk Management Policy',
      description: 'Comprehensive risk assessment and mitigation strategies',
      filePath: '/config/data/policies/risk-management-policy.pdf',
      icon: Shield,
      color: 'red-600',
      section: 'risk-management'
    },
    {
      id: 'party-transaction',
      title: 'Policy Related to Party Transaction',
      description: 'Guidelines for managing related party transactions',
      filePath: '/config/data/policies/related-party-transactions.pdf',
      icon: Handshake,
      color: 'purple-600',
      section: 'party-transaction'
    },
    {
      id: 'nomination-remuneration',
      title: 'Nomination & Remuneration Policy',
      description: 'Framework for board appointments and compensation',
      filePath: '/config/data/policies/nomination-remuneration-policy.pdf',
      icon: Users,
      color: 'indigo-600',
      section: 'nomination-remuneration'
    },
    {
      id: 'insider-trading',
      title: 'Code for Prohibition of Insider Trading',
      description: 'Compliance framework preventing insider trading',
      filePath: '/config/data/policies/insider-trading-code.pdf',
      icon: AlertTriangle,
      color: 'orange-600',
      section: 'insider-trading'
    },
    {
      id: 'whistle-blower',
      title: 'Whistle Blower Policy',
      description: 'Secure reporting mechanism for unethical practices',
      filePath: '/config/data/policies/whistleblower-policy.pdf',
      icon: FileText,
      color: 'teal-600',
      section: 'whistle-blower'
    },
    {
      id: 'material-subsidiary',
      title: 'Material Subsidiary Policy',
      description: 'Framework for managing material subsidiaries',
      filePath: '/config/data/policies/material-subsidiary-policy.pdf',
      icon: FileText,
      color: 'cyan-600',
      section: 'material-subsidiary'
    },
    {
      id: 'archival',
      title: 'Archival Policy',
      description: 'Policy for document retention and archival',
      filePath: '/config/data/policies/archival-policy.pdf',
      icon: FileText,
      color: 'gray-600',
      section: 'archival'
    },
    {
      id: 'independent-director',
      title: 'Independent Director',
      description: 'Guidelines for independent director roles and responsibilities',
      filePath: '/config/data/policies/independent-director-framework.pdf',
      icon: Users,
      color: 'emerald-600',
      section: 'independent-director'
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
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {staticPolicies.map((policy, index) => {
                const IconComponent = policy.icon;
                return (
                  <PDFViewer
                    key={policy.id}
                    title={policy.title}
                    fileName={`${policy.title.toLowerCase().replace(/ /g, '-')}.pdf`}
                    filePath={policy.filePath}
                    fileSize="850 KB"
                    description={policy.description}
                    type="GOVERNANCE"
                    downloads={Math.floor(Math.random() * 500) + 100}
                    className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    showPreview={false}
                  />
                );
              })}
            </div>

            {/* Additional Information */}
            <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
              <div className="text-center mb-4">
                <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="text-xl font-semibold text-gray-900">Compliance & Governance</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
                <div>
                  <h4 className="font-semibold mb-2">Policy Updates</h4>
                  <p>All policies are reviewed annually and updated as per regulatory requirements and best practices.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Compliance Training</h4>
                  <p>Regular training programs are conducted to ensure understanding and implementation of these policies.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Board Oversight</h4>
                  <p>All policies are approved by the Board and regularly monitored by respective board committees.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Stakeholder Access</h4>
                  <p>Key policies are made available to stakeholders to ensure transparency in our governance practices.</p>
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
                  return (
                    <PDFViewer
                      key={policy.id}
                      title={policy.title}
                      fileName={`${policy.title.toLowerCase().replace(/ /g, '-')}.pdf`}
                      filePath={`/config/data/policies/${policy.id}.pdf`}
                      fileSize="750 KB"
                      description={policy.description || 'Corporate policy document'}
                      type="GOVERNANCE"
                      downloads={Math.floor(Math.random() * 300) + 50}
                      className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                      showPreview={false}
                    />
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
