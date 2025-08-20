import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { TrendingUp, Shield, Zap, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white py-16 sm:py-20 gradient-shift particle-bg mobile-section">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 float-animation"></div>
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 float-animation" style={{animationDelay: '2s'}}></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 float-animation" style={{animationDelay: '4s'}}></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4 stagger-children">
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight gradient-text typewriter hero-title" data-testid="hero-title">
                Building India's Financial Future
              </h1>
              <p className="text-lg sm:text-xl text-blue-100 leading-relaxed fade-in-left mobile-text-lg" data-testid="hero-description">
                Aditya Birla Capital Limited is a leading financial services company offering comprehensive solutions in loans, investments, insurance, and payments across India.
              </p>
            </div>
            
            {/* Feature highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 py-4 sm:py-6 fade-in-up mobile-card-grid">
              <div className="text-center glass-card p-3 sm:p-4 hover-lift">
                <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 text-green-400 bounce-in" />
                <p className="text-xs sm:text-sm text-blue-200 mobile-text-base">Growth Focused</p>
              </div>
              <div className="text-center glass-card p-3 sm:p-4 hover-lift">
                <Shield className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 text-blue-400 bounce-in" style={{animationDelay: '0.2s'}} />
                <p className="text-xs sm:text-sm text-blue-200 mobile-text-base">Secure & Trusted</p>
              </div>
              <div className="text-center glass-card p-3 sm:p-4 hover-lift">
                <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 text-purple-400 bounce-in" style={{animationDelay: '0.4s'}} />
                <p className="text-xs sm:text-sm text-blue-200 mobile-text-base">Innovation Driven</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 stagger-children">
              <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100 btn-interactive hover-glow py-3 px-6 text-sm sm:text-base" asChild data-testid="button-explore-services">
                <Link href="/about">
                  <Zap className="h-4 w-4 sm:h-5 sm:w-5 mr-2 rotate-slow" />
                  Explore Our Services
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-900 btn-interactive hover-glow py-3 px-6 text-sm sm:text-base" asChild data-testid="button-investor-relations">
                <Link href="/investor-relations">
                  <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 mr-2 heartbeat" />
                  Investor Relations
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="hidden lg:block relative">
            <div className="relative z-10 transform hover:scale-105 transition-transform duration-500">
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Modern corporate building representing financial strength" 
                className="rounded-2xl shadow-2xl hover-lift shimmer-effect glass-card"
                data-testid="hero-image"
              />
            </div>
            {/* Floating elements around the image */}
            <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg float-animation opacity-80"></div>
            <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full shadow-lg float-animation opacity-80" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-1/2 -left-8 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full shadow-lg float-animation opacity-80" style={{animationDelay: '3s'}}></div>
          </div>
        </div>
      </div>
    </section>
  );
}
