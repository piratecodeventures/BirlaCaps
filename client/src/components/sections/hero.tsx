import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Hero() {
  return (
    <section className="corporate-gradient text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight" data-testid="hero-title">
              Building India's Financial Future
            </h1>
            <p className="text-xl mb-8 text-blue-100 leading-relaxed" data-testid="hero-description">
              Aditya Birla Capital Limited is a leading financial services company offering comprehensive solutions in loans, investments, insurance, and payments across India.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100" asChild data-testid="button-explore-services">
                <Link href="/about">Explore Our Services</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary" asChild data-testid="button-investor-relations">
                <Link href="/investor-relations">Investor Relations</Link>
              </Button>
            </div>
          </div>
          <div className="hidden lg:block">
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Modern corporate building representing financial strength" 
              className="rounded-lg shadow-2xl"
              data-testid="hero-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
