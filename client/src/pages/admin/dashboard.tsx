import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Grievance } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, AlertTriangle, Download, Users, BarChart3, Settings } from "lucide-react";

export default function AdminDashboard() {
  const { data: stats } = useQuery<{
    totalDocuments: number;
    activeGrievances: number;
    monthlyDownloads: number;
    totalPolicies: number;
  }>({
    queryKey: ["/api/admin/stats"],
    retry: false
  });

  const { data: grievances = [] } = useQuery<Grievance[]>({
    queryKey: ["/api/admin/grievances"],
    retry: false
  });

  const recentGrievances = grievances.slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900" data-testid="admin-title">
              Admin Dashboard
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600" data-testid="admin-welcome">Welcome, Admin</span>
            </div>
          </div>

          {/* Dashboard Stats */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Total Documents</p>
                      <p className="text-2xl font-bold text-gray-900" data-testid="stat-total-documents">
                        {stats.totalDocuments}
                      </p>
                    </div>
                    <FileText className="text-primary h-8 w-8" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Active Grievances</p>
                      <p className="text-2xl font-bold text-gray-900" data-testid="stat-active-grievances">
                        {stats.activeGrievances}
                      </p>
                    </div>
                    <AlertTriangle className="text-amber-500 h-8 w-8" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Total Downloads</p>
                      <p className="text-2xl font-bold text-gray-900" data-testid="stat-total-downloads">
                        {stats.monthlyDownloads.toLocaleString()}
                      </p>
                    </div>
                    <Download className="text-accent h-8 w-8" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Total Policies</p>
                      <p className="text-2xl font-bold text-gray-900" data-testid="stat-total-policies">
                        {stats.totalPolicies}
                      </p>
                    </div>
                    <Settings className="text-secondary h-8 w-8" />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Management Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview" data-testid="tab-overview">Overview</TabsTrigger>
              <TabsTrigger value="documents" data-testid="tab-documents">Documents</TabsTrigger>
              <TabsTrigger value="grievances" data-testid="tab-grievances">Grievances</TabsTrigger>
              <TabsTrigger value="policies" data-testid="tab-policies">Policies</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="mr-2 h-5 w-5" />
                      Document Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start" data-testid="button-upload-document">
                      Upload New Document
                    </Button>
                    <Button variant="outline" className="w-full justify-start" data-testid="button-manage-documents">
                      Manage Existing Documents
                    </Button>
                    <Button variant="outline" className="w-full justify-start" data-testid="button-view-analytics">
                      View Analytics
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <AlertTriangle className="mr-2 h-5 w-5" />
                      Recent Grievances
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentGrievances.length === 0 ? (
                      <p className="text-gray-600 text-center py-4" data-testid="no-recent-grievances">
                        No recent grievances
                      </p>
                    ) : (
                      recentGrievances.map((grievance, index) => (
                        <div key={grievance.id} className="border border-gray-200 rounded p-4" data-testid={`recent-grievance-${index}`}>
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium text-gray-900" data-testid={`grievance-subject-${index}`}>
                              {grievance.subject}
                            </h4>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              grievance.status === 'OPEN' ? 'bg-amber-100 text-amber-800' :
                              grievance.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' :
                              'bg-green-100 text-green-800'
                            }`} data-testid={`grievance-status-${index}`}>
                              {grievance.status}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mb-2" data-testid={`grievance-description-${index}`}>
                            {grievance.description.length > 100 
                              ? `${grievance.description.substring(0, 100)}...` 
                              : grievance.description}
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-500 text-xs" data-testid={`grievance-date-${index}`}>
                              {new Date(grievance.createdAt!).toLocaleDateString()}
                            </span>
                            <Button variant="ghost" size="sm" data-testid={`review-grievance-${index}`}>
                              Review
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <CardTitle>Document Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center py-8" data-testid="documents-placeholder">
                    Document management interface will be implemented here.
                    This will include upload, edit, delete, and organize documents.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="grievances">
              <Card>
                <CardHeader>
                  <CardTitle>Grievance Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center py-8" data-testid="grievances-placeholder">
                    Grievance management interface will be implemented here.
                    This will include viewing, updating status, and responding to grievances.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="policies">
              <Card>
                <CardHeader>
                  <CardTitle>Policy Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center py-8" data-testid="policies-placeholder">
                    Policy management interface will be implemented here.
                    This will include creating, updating, and managing policy documents.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
