import { useQuery } from "@tanstack/react-query";
import { Policy } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";

export default function Policies() {
  const { data: policies = [], isLoading } = useQuery<Policy[]>({
    queryKey: ["/api/policies"]
  });

  const handleDownload = (policyId: string) => {
    window.open(`/api/policies/${policyId}/download`, '_blank');
  };

  const getPolicyIcon = (category: string) => {
    const icons: Record<string, string> = {
      'CODE_OF_CONDUCT': 'fas fa-file-contract',
      'RISK_MANAGEMENT': 'fas fa-shield-alt',
      'RELATED_PARTY': 'fas fa-handshake',
      'NOMINATION_REMUNERATION': 'fas fa-users',
      'INSIDER_TRADING': 'fas fa-ban',
      'WHISTLE_BLOWER': 'fas fa-whistle',
      'GOVERNANCE': 'fas fa-balance-scale'
    };
    return icons[category] || 'fas fa-file-alt';
  };

  return (
    <div className="min-h-screen">
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4" data-testid="policies-title">
              Codes and Policies
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-testid="policies-subtitle">
              Corporate governance policies and compliance frameworks
            </p>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-6 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : policies.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600" data-testid="no-policies">
                  No policies available at this time.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {policies.map((policy, index) => (
                <Card key={policy.id} className="hover:shadow-md transition-shadow" data-testid={`policy-${index}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <i className={`${getPolicyIcon(policy.category)} text-primary text-2xl mr-3`} data-testid={`policy-icon-${index}`}></i>
                      <h3 className="text-lg font-semibold text-gray-900" data-testid={`policy-title-${index}`}>
                        {policy.title}
                      </h3>
                    </div>
                    
                    {policy.description && (
                      <p className="text-gray-600 text-sm mb-4" data-testid={`policy-description-${index}`}>
                        {policy.description}
                      </p>
                    )}
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 text-xs" data-testid={`policy-updated-${index}`}>
                        Updated: {new Date(policy.updatedAt!).toLocaleDateString()}
                      </span>
                      <Button 
                        size="sm"
                        onClick={() => handleDownload(policy.id)}
                        className="flex items-center"
                        data-testid={`download-policy-${index}`}
                      >
                        Download <Download className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
