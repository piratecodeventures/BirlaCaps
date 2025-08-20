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
          ) : policies.length === 0 ? (
            <Card className="glass-card hover-lift">
              <CardContent className="p-12 text-center">
                <FileText className="mx-auto h-16 w-16 text-blue-600 mb-6 bounce-in float-animation" />
                <p className="text-gray-600 text-lg" data-testid="no-policies">
                  No policies available at this time.
                </p>
              </CardContent>
            </Card>
          ) : (
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
          )}
        </div>
      </section>
    </div>
  );
}
