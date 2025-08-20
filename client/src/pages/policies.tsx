import { useQuery } from "@tanstack/react-query";
import { Policy } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, Shield, Users, Scale, AlertTriangle, Handshake, FileX } from "lucide-react";

export default function Policies() {
  const { data: policies = [], isLoading } = useQuery<Policy[]>({
    queryKey: ["/api/policies"]
  });

  const handleDownload = (policyId: string) => {
    window.open(`/api/policies/${policyId}/download`, '_blank');
  };

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

          {/* Comprehensive Policy Sections as per document structure */}
          <div className="space-y-16">
            {/* Code of Conduct Section */}
            <div id="conduct" className="scroll-mt-8">
              <h2 className="text-3xl font-bold gradient-text mb-8 text-center">Code of Conduct</h2>
              <Card className="glass-card hover-lift">
                <CardContent className="p-8">
                  <div className="flex items-center justify-center mb-6">
                    <FileX className="h-12 w-12 text-blue-600 mr-4" />
                    <div>
                      <h3 className="text-xl font-semibold">Corporate Code of Conduct</h3>
                      <p className="text-gray-600">Ethical guidelines for all employees and stakeholders</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6 text-center">
                    Our Code of Conduct establishes the fundamental ethical principles and behavioral standards expected from all employees, directors, and business partners.
                  </p>
                  <div className="text-center">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Download className="mr-2 h-4 w-4" />
                      Download Code of Conduct
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Code of Governance Section */}
            <div id="governance" className="scroll-mt-8">
              <h2 className="text-3xl font-bold gradient-text mb-8 text-center">Code of Governance</h2>
              <Card className="glass-card hover-lift">
                <CardContent className="p-8">
                  <div className="flex items-center justify-center mb-6">
                    <Scale className="h-12 w-12 text-green-600 mr-4" />
                    <div>
                      <h3 className="text-xl font-semibold">Corporate Governance Code</h3>
                      <p className="text-gray-600">Framework for effective corporate governance practices</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6 text-center">
                    Comprehensive governance framework ensuring transparency, accountability, and effective decision-making processes.
                  </p>
                  <div className="text-center">
                    <Button className="bg-green-600 hover:bg-green-700">
                      <Download className="mr-2 h-4 w-4" />
                      Download Governance Code
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Risk Management Policy Section */}
            <div id="risk-management" className="scroll-mt-8">
              <h2 className="text-3xl font-bold gradient-text mb-8 text-center">Risk Management Policy</h2>
              <Card className="glass-card hover-lift">
                <CardContent className="p-8">
                  <div className="flex items-center justify-center mb-6">
                    <Shield className="h-12 w-12 text-red-600 mr-4" />
                    <div>
                      <h3 className="text-xl font-semibold">Enterprise Risk Management</h3>
                      <p className="text-gray-600">Comprehensive risk assessment and mitigation strategies</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6 text-center">
                    Our risk management framework identifies, assesses, and mitigates operational, financial, and strategic risks.
                  </p>
                  <div className="text-center">
                    <Button className="bg-red-600 hover:bg-red-700">
                      <Download className="mr-2 h-4 w-4" />
                      Download Risk Management Policy
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Policy Related to Party Transaction Section */}
            <div id="party-transaction" className="scroll-mt-8">
              <h2 className="text-3xl font-bold gradient-text mb-8 text-center">Policy Related to Party Transaction</h2>
              <Card className="glass-card hover-lift">
                <CardContent className="p-8">
                  <div className="flex items-center justify-center mb-6">
                    <Handshake className="h-12 w-12 text-purple-600 mr-4" />
                    <div>
                      <h3 className="text-xl font-semibold">Related Party Transactions Policy</h3>
                      <p className="text-gray-600">Guidelines for managing related party transactions</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6 text-center">
                    Policy framework ensuring proper approval, disclosure, and monitoring of transactions with related parties.
                  </p>
                  <div className="text-center">
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <Download className="mr-2 h-4 w-4" />
                      Download Related Party Policy
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Nomination & Remuneration Policy Section */}
            <div id="nomination-remuneration" className="scroll-mt-8">
              <h2 className="text-3xl font-bold gradient-text mb-8 text-center">Nomination & Remuneration Policy</h2>
              <Card className="glass-card hover-lift">
                <CardContent className="p-8">
                  <div className="flex items-center justify-center mb-6">
                    <Users className="h-12 w-12 text-indigo-600 mr-4" />
                    <div>
                      <h3 className="text-xl font-semibold">Board Nomination & Remuneration</h3>
                      <p className="text-gray-600">Framework for board appointments and compensation</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6 text-center">
                    Policy governing the nomination, appointment, and remuneration of directors and key management personnel.
                  </p>
                  <div className="text-center">
                    <Button className="bg-indigo-600 hover:bg-indigo-700">
                      <Download className="mr-2 h-4 w-4" />
                      Download Nomination Policy
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Code for Prohibition of Insider Trading Section */}
            <div id="insider-trading" className="scroll-mt-8">
              <h2 className="text-3xl font-bold gradient-text mb-8 text-center">Code for Prohibition of Insider Trading</h2>
              <Card className="glass-card hover-lift">
                <CardContent className="p-8">
                  <div className="flex items-center justify-center mb-6">
                    <AlertTriangle className="h-12 w-12 text-orange-600 mr-4" />
                    <div>
                      <h3 className="text-xl font-semibold">Insider Trading Prevention</h3>
                      <p className="text-gray-600">Compliance framework preventing insider trading</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6 text-center">
                    Comprehensive code preventing misuse of unpublished price-sensitive information and insider trading violations.
                  </p>
                  <div className="text-center">
                    <Button className="bg-orange-600 hover:bg-orange-700">
                      <Download className="mr-2 h-4 w-4" />
                      Download Insider Trading Code
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Whistle Blower Policy Section */}
            <div id="whistle-blower" className="scroll-mt-8">
              <h2 className="text-3xl font-bold gradient-text mb-8 text-center">Whistle Blower Policy</h2>
              <Card className="glass-card hover-lift">
                <CardContent className="p-8">
                  <div className="flex items-center justify-center mb-6">
                    <FileText className="h-12 w-12 text-teal-600 mr-4" />
                    <div>
                      <h3 className="text-xl font-semibold">Whistleblower Protection</h3>
                      <p className="text-gray-600">Secure reporting mechanism for unethical practices</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6 text-center">
                    Secure mechanism for reporting unethical behavior with protection for whistleblowers.
                  </p>
                  <div className="text-center">
                    <Button className="bg-teal-600 hover:bg-teal-700">
                      <Download className="mr-2 h-4 w-4" />
                      Download Whistle Blower Policy
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Material Subsidiary Policy Section */}
            <div id="material-subsidiary" className="scroll-mt-8">
              <h2 className="text-3xl font-bold gradient-text mb-8 text-center">Material Subsidiary Policy</h2>
              <Card className="glass-card hover-lift">
                <CardContent className="p-8">
                  <div className="flex items-center justify-center mb-6">
                    <FileText className="h-12 w-12 text-cyan-600 mr-4" />
                    <div>
                      <h3 className="text-xl font-semibold">Subsidiary Governance</h3>
                      <p className="text-gray-600">Framework for managing material subsidiaries</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6 text-center">
                    Policy framework for governance and oversight of material subsidiaries and their operations.
                  </p>
                  <div className="text-center">
                    <Button className="bg-cyan-600 hover:bg-cyan-700">
                      <Download className="mr-2 h-4 w-4" />
                      Download Material Subsidiary Policy
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Archival Policy Section */}
            <div id="archival" className="scroll-mt-8">
              <h2 className="text-3xl font-bold gradient-text mb-8 text-center">Archival Policy</h2>
              <Card className="glass-card hover-lift">
                <CardContent className="p-8">
                  <div className="flex items-center justify-center mb-6">
                    <FileText className="h-12 w-12 text-gray-600 mr-4" />
                    <div>
                      <h3 className="text-xl font-semibold">Document Archival & Preservation</h3>
                      <p className="text-gray-600">Policy for document retention and archival</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6 text-center">
                    Comprehensive policy for document retention, archival, and destruction in compliance with regulatory requirements.
                  </p>
                  <div className="text-center">
                    <Button className="bg-gray-600 hover:bg-gray-700">
                      <Download className="mr-2 h-4 w-4" />
                      Download Archival Policy
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Independent Director Section */}
            <div id="independent-director" className="scroll-mt-8">
              <h2 className="text-3xl font-bold gradient-text mb-8 text-center">Independent Director</h2>
              <Card className="glass-card hover-lift">
                <CardContent className="p-8">
                  <div className="flex items-center justify-center mb-6">
                    <Users className="h-12 w-12 text-emerald-600 mr-4" />
                    <div>
                      <h3 className="text-xl font-semibold">Independent Director Framework</h3>
                      <p className="text-gray-600">Guidelines for independent director roles and responsibilities</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6 text-center">
                    Framework defining the roles, responsibilities, and independence criteria for independent directors on the board.
                  </p>
                  <div className="text-center">
                    <Button className="bg-emerald-600 hover:bg-emerald-700">
                      <Download className="mr-2 h-4 w-4" />
                      Download Independent Director Framework
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

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
            <div className="mt-16">
              <h2 className="text-3xl font-bold gradient-text mb-8 text-center">Additional Policy Documents</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children">
                {policies.map((policy, index) => {
                  const IconComponent = getPolicyIcon(policy.category);
                  return (
                    <Card key={policy.id} className="glass-card hover-lift shimmer-effect" data-testid={`policy-${index}`}>
                      <CardContent className="p-8">
                        <div className="flex items-center mb-6">
                          <IconComponent className="h-8 w-8 text-blue-600 mr-4 bounce-in heartbeat" style={{animationDelay: `${index * 0.1}s`}} data-testid={`policy-icon-${index}`} />
                          <h3 className="text-xl font-semibold gradient-text" data-testid={`policy-title-${index}`}>
                            {policy.title}
                          </h3>
                        </div>
                        
                        {policy.description && (
                          <p className="text-gray-600 leading-relaxed mb-6" data-testid={`policy-description-${index}`}>
                            {policy.description}
                          </p>
                        )}
                        
                        <div className="flex justify-between items-center mt-6">
                          <span className="text-gray-500 text-sm" data-testid={`policy-updated-${index}`}>
                            Updated: {new Date(policy.updatedAt!).toLocaleDateString()}
                          </span>
                          <Button 
                            size="sm"
                            onClick={() => handleDownload(policy.id)}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white btn-interactive hover-glow"
                            data-testid={`download-policy-${index}`}
                          >
                            <Download className="mr-2 h-4 w-4 heartbeat" />
                            Download
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
