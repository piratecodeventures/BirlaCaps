import Hero from "@/components/sections/hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Announcement } from "@shared/schema";
import {
  Shield,
  Award,
  Zap,
} from "lucide-react";

export default function Home() {
  const { data: announcements = [] } = useQuery<Announcement[]>({
    queryKey: ["/api/announcements"],
  });



  return (
    <div className="min-h-screen">
      <Hero />



      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Award className="h-10 w-10 text-yellow-400" />
              <h2
                className="text-4xl lg:text-5xl font-bold"
                data-testid="cta-title"
              >
                Ready to Transform Your Financial Future?
              </h2>
            </div>
            <p
              className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed"
              data-testid="cta-description"
            >
              Join thousands of satisfied customers who trust Birla Capital and
              Financial Services Limited for their financial journey. Experience
              excellence in banking, investment, and wealth management services.
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
                className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold btn-interactive hover-glow bounce-in"
                asChild
                data-testid="button-contact-us"
              >
                <Link href="/grievances">
                  <Shield className="h-5 w-5 mr-2 heartbeat" />
                  Get Started Today
                </Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-16 pt-8 border-t border-white/20">
              <p className="text-sm text-blue-200 mb-6">
                Trusted by leading organizations and individuals
              </p>
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
                  <Shield className="h-5 w-5" />
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
