import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Users, Building2, Phone, Mail, MapPin, Calendar, Building } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { BoardDirector, Promoter } from "@shared/schema";

function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

interface DirectorCardProps {
  director: BoardDirector;
}

function DirectorCard({ director }: DirectorCardProps) {
  return (
    <Card className="glass-card hover-lift shimmer-effect" data-testid={`card-director-${director.id}`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl font-semibold text-gray-900 gradient-text" data-testid={`text-director-name-${director.id}`}>
              {director.name}
            </CardTitle>
            <CardDescription className="text-lg font-medium text-blue-600 mt-1" data-testid={`text-director-designation-${director.id}`}>
              {director.designation}
            </CardDescription>
          </div>
          <Badge variant="outline" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none hover-glow" data-testid={`badge-director-din-${director.id}`}>
            DIN: {director.din}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3 fade-in-up">
          <MapPin className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0 bounce-in" />
          <p className="text-gray-700 text-sm leading-relaxed" data-testid={`text-director-address-${director.id}`}>
            {director.address}
          </p>
        </div>
        <div className="flex items-start gap-3 fade-in-up">
          <Users className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0 bounce-in" style={{animationDelay: '0.2s'}} />
          <p className="text-gray-700 text-sm" data-testid={`text-director-experience-${director.id}`}>
            {director.experience}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

interface PromotersSectionProps {
  promoters: Promoter[];
}

function PromotersSection({ promoters }: PromotersSectionProps) {
  const individuals = promoters.filter(p => p.category === 'Individual');
  const companies = promoters.filter(p => p.category === 'Company');

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
          <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          Individual Promoters
        </h3>
        <div className="grid gap-3">
          {individuals.map((promoter) => (
            <Card key={promoter.id} className="bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800" data-testid={`card-individual-promoter-${promoter.id}`}>
              <CardContent className="p-4">
                <p className="font-medium text-gray-900 dark:text-gray-100" data-testid={`text-individual-promoter-name-${promoter.id}`}>
                  {promoter.name}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
          <Building2 className="h-6 w-6 text-green-600 dark:text-green-400" />
          Company Promoters
        </h3>
        <div className="grid gap-3">
          {companies.map((promoter) => (
            <Card key={promoter.id} className="bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800" data-testid={`card-company-promoter-${promoter.id}`}>
              <CardContent className="p-4">
                <p className="font-medium text-gray-900 dark:text-gray-100" data-testid={`text-company-promoter-name-${promoter.id}`}>
                  {promoter.name}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function BoardDirectors() {
  const { data: directors, isLoading: directorsLoading } = useQuery<BoardDirector[]>({
    queryKey: ['/api/board-directors'],
  });

  const { data: promoters, isLoading: promotersLoading } = useQuery<Promoter[]>({
    queryKey: ['/api/promoters'],
  });

  if (directorsLoading || promotersLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <Skeleton className="h-10 w-3/4 mx-auto mb-4" />
            <Skeleton className="h-6 w-1/2 mx-auto" />
          </div>
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

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
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 gradient-text slide-in-top" data-testid="text-page-title">
              Board of Directors & Promoters
            </h1>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed fade-in-up" data-testid="text-page-description">
              Meet our experienced leadership team and company promoters who guide our strategic direction and ensure strong corporate governance
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Company Information */}
        <div className="mb-16 fade-in-up">
          <Card className="glass-card hover-lift shimmer-effect">
            <CardHeader>
              <CardTitle className="text-2xl font-bold gradient-text flex items-center gap-2" data-testid="text-company-info-title">
                <Building className="h-7 w-7 text-blue-600 bounce-in" />
                Birla Capital and Financial Services Limited
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4 stagger-children">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none font-mono text-sm hover-glow" data-testid="text-company-cin">
                    CIN: L51900MH1985PLC036156
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-blue-600 bounce-in" />
                  <span className="text-sm text-gray-600" data-testid="text-company-incorporation">
                    Incorporated: 07/05/1985
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-2 fade-in-up">
                <MapPin className="h-4 w-4 text-purple-600 mt-1 flex-shrink-0 bounce-in" />
                <p className="text-sm text-gray-600" data-testid="text-company-address">
                  5th Floor, 159, Industry House Churchgate Reclamation, Mumbai City, Mumbai: 400020
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Board of Directors */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold gradient-text mb-12 text-center fade-in-up" data-testid="text-directors-section-title">
            Board of Directors
          </h2>
          <div className="grid gap-8 lg:grid-cols-1 xl:grid-cols-2 stagger-children">
            {directors?.map((director) => (
              <DirectorCard key={director.id} director={director} />
            ))}
          </div>
        </div>

        {/* Promoters */}
        <div className="fade-in-up">
          <h2 className="text-3xl font-bold gradient-text mb-12 text-center" data-testid="text-promoters-section-title">
            Promoters of Our Company
          </h2>
          {promoters && <PromotersSection promoters={promoters} />}
        </div>
      </div>
    </div>
  );
}