import Hero from "@/components/sections/hero";
import Stats from "@/components/sections/stats";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Announcement } from "@shared/schema";
import { 
  TrendingUp, 
  Shield, 
  Users, 
  Globe, 
  ArrowRight, 
  Star,
  BarChart3,
  Bell,
  Award,
  Target,
  Heart,
  Zap
} from "lucide-react";

export default function Home() {
  const { data: announcements = [] } = useQuery<Announcement[]>({
    queryKey: ["/api/announcements"]
  });

  const features = [
    {
      icon: Shield,
      title: "Corporate Governance",
      description: "Transparent and accountable business practices with strong governance framework",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      icon: TrendingUp,
      title: "Financial Excellence",
      description: "Consistent growth and strong financial performance across all business segments",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      icon: Target,
      title: "Strategic Vision",
      description: "Long-term strategic planning focused on sustainable growth and innovation",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    },
    {
      icon: Heart,
      title: "Stakeholder Value",
      description: "Creating value for all stakeholders through customer-centric solutions",
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200"
    }
  ];

  const services = [
    {
      icon: Users,
      title: "Personal Banking",
      description: "Comprehensive banking solutions for individual customers",
      features: ["Savings Accounts", "Personal Loans", "Credit Cards", "Investment Advisory"]
    },
    {
      icon: Globe,
      title: "Corporate Banking",
      description: "Tailored financial services for businesses of all sizes",
      features: ["Trade Finance", "Working Capital", "Treasury Solutions", "Cash Management"]
    },
    {
      icon: BarChart3,
      title: "Investment Services",
      description: "Professional investment management and wealth advisory",
      features: ["Portfolio Management", "Wealth Planning", "Market Research", "Risk Assessment"]
    }
  ];

  return (
    <div className="min-h-screen">
      <Hero />
      <Stats />
      
      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4" data-testid="features-title">
              Why Choose Birla Caps
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-testid="features-subtitle">
              Leading the financial services sector with innovation, trust, and excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 stagger-children">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card 
                  key={index} 
                  className={`text-center modern-card hover-lift shimmer-effect border-2 ${feature.borderColor} ${feature.bgColor}`} 
                  data-testid={`feature-${index}`}
                >
                  <CardContent className="pt-6">
                    <div className={`mb-4 ${feature.bgColor} ${feature.color} p-3 rounded-full w-16 h-16 mx-auto flex items-center justify-center float-animation hover-glow`} data-testid={`feature-icon-${index}`}>
                      <IconComponent className="h-8 w-8 hover-rotate" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 gradient-text-blue" data-testid={`feature-title-${index}`}>
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed" data-testid={`feature-description-${index}`}>
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4" data-testid="services-title">
              Our Financial Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-testid="services-subtitle">
              Comprehensive financial solutions tailored to meet your personal and business needs
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 stagger-children">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card key={index} className="group glass-card hover-lift shimmer-effect border-0 shadow-xl" data-testid={`service-${index}`}>
                  <CardHeader className="text-center pb-4">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full w-20 h-20 mx-auto flex items-center justify-center mb-4 gradient-shift heartbeat hover-glow">
                      <IconComponent className="h-10 w-10 hover-rotate" />
                    </div>
                    <CardTitle className="text-xl font-bold gradient-text group-hover:scale-105 transition-transform duration-300" data-testid={`service-title-${index}`}>
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-700 mb-6 leading-relaxed fade-in-up" data-testid={`service-description-${index}`}>
                      {service.description}
                    </p>
                    <div className="space-y-3">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center justify-center gap-2 text-sm text-gray-700 hover:text-blue-600 transition-colors duration-300 hover-lift">
                          <Star className="h-4 w-4 text-yellow-500 bounce-in" style={{animationDelay: `${featureIndex * 0.1}s`}} />
                          <span className="hover:scale-105 transition-transform duration-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recent Announcements */}
      {announcements.length > 0 && (
        <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Bell className="h-8 w-8 text-orange-500" />
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900" data-testid="announcements-title">
                  Latest Announcements
                </h2>
              </div>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Stay informed with our latest updates and important notices
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12 stagger-children">
              {announcements.slice(0, 4).map((announcement, index) => (
                <Card key={announcement.id} className="border-l-4 border-orange-500 glass-card hover-lift shimmer-effect" data-testid={`announcement-${index}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <Badge variant="secondary" className="bg-gradient-to-r from-orange-500 to-red-500 text-white hover-glow pulse-effect">
                        Important
                      </Badge>
                      <div className="text-sm text-gray-500 fade-in-right" data-testid={`announcement-date-${index}`}>
                        {new Date(announcement.createdAt!).toLocaleDateString()}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 leading-tight gradient-text-blue hover:scale-105 transition-transform duration-300" data-testid={`announcement-title-${index}`}>
                      {announcement.title}
                    </h3>
                    <p className="text-gray-700 mb-4 leading-relaxed fade-in-up" data-testid={`announcement-description-${index}`}>
                      {announcement.description}
                    </p>
                    <Button variant="outline" size="sm" className="group btn-interactive hover-glow">
                      Read More
                      <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-2 transition-transform duration-300 bounce-in" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg" data-testid="button-view-all-announcements">
                <Link href="/investor-relations#announcements">
                  View All Announcements
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Award className="h-10 w-10 text-yellow-400" />
              <h2 className="text-4xl lg:text-5xl font-bold" data-testid="cta-title">
                Ready to Transform Your Financial Future?
              </h2>
            </div>
            <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed" data-testid="cta-description">
              Join thousands of satisfied customers who trust Birla Caps for their financial journey. 
              Experience excellence in banking, investment, and wealth management services.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center stagger-children">
              <Button 
                size="lg" 
                className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold btn-interactive hover-glow bounce-in" 
                asChild 
                data-testid="button-learn-more"
              >
                <Link href="/about">
                  <Zap className="h-5 w-5 mr-2 rotate-slow" />
                  Discover Our Story
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg font-semibold btn-interactive hover-glow bounce-in" 
                asChild 
                data-testid="button-contact-us"
              >
                <Link href="/grievances">
                  <Users className="h-5 w-5 mr-2 heartbeat" />
                  Get Started Today
                </Link>
              </Button>
            </div>
            
            {/* Trust indicators */}
            <div className="mt-16 pt-8 border-t border-white/20">
              <p className="text-sm text-blue-200 mb-6">Trusted by leading organizations and individuals</p>
              <div className="flex items-center justify-center gap-8 text-white/60">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  <span className="text-sm">Secure & Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  <span className="text-sm">Award Winning</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span className="text-sm">Customer Focused</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
