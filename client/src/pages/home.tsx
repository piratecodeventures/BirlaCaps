import Hero from "@/components/sections/hero";
import Stats from "@/components/sections/stats";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Announcement } from "@shared/schema";

export default function Home() {
  const { data: announcements = [] } = useQuery<Announcement[]>({
    queryKey: ["/api/announcements"]
  });

  const features = [
    {
      icon: "💼",
      title: "Corporate Governance",
      description: "Transparent and accountable business practices with strong governance framework"
    },
    {
      icon: "📊",
      title: "Financial Excellence",
      description: "Consistent growth and strong financial performance across all business segments"
    },
    {
      icon: "🎯",
      title: "Strategic Vision",
      description: "Long-term strategic planning focused on sustainable growth and innovation"
    },
    {
      icon: "🤝",
      title: "Stakeholder Value",
      description: "Creating value for all stakeholders through customer-centric solutions"
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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center" data-testid={`feature-${index}`}>
                <CardContent className="pt-6">
                  <div className="text-4xl mb-4" data-testid={`feature-icon-${index}`}>{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2" data-testid={`feature-title-${index}`}>
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm" data-testid={`feature-description-${index}`}>
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Announcements */}
      {announcements.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4" data-testid="announcements-title">
                Latest Announcements
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {announcements.slice(0, 4).map((announcement, index) => (
                <Card key={announcement.id} className="border-l-4 border-primary" data-testid={`announcement-${index}`}>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2" data-testid={`announcement-title-${index}`}>
                      {announcement.title}
                    </h3>
                    <p className="text-gray-600 mb-4" data-testid={`announcement-description-${index}`}>
                      {announcement.description}
                    </p>
                    <div className="text-sm text-gray-500" data-testid={`announcement-date-${index}`}>
                      {new Date(announcement.createdAt!).toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button asChild data-testid="button-view-all-announcements">
                <Link href="/investor-relations#announcements">View All Announcements</Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 corporate-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4" data-testid="cta-title">
            Ready to Explore Our Services?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto" data-testid="cta-description">
            Discover comprehensive financial solutions designed to meet your personal and business needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100" asChild data-testid="button-learn-more">
              <Link href="/about">Learn More About Us</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary" asChild data-testid="button-contact-us">
              <Link href="/grievances">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
