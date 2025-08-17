import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ChevronDown } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function Header() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location === path;

  const aboutLinks = [
    { href: "/about", label: "Company Overview", section: null },
    { href: "/about", label: "Mission & Vision", section: "mission" },
    { href: "/about", label: "Management Team", section: "management" },
    { href: "/about", label: "Board Committees", section: "committees" },
  ];

  const investorLinks = [
    { href: "/investor-relations", label: "Financial Reports", section: null },
    { href: "/investor-relations", label: "Announcements", section: "announcements" },
    { href: "/investor-relations", label: "Governance", section: "governance" },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0" data-testid="logo-link">
              <div className="bg-primary text-white px-4 py-2 rounded font-bold text-xl">
                BIRLA CAPS
              </div>
            </Link>
            <div className="ml-4 hidden lg:block">
              <p className="text-sm text-secondary">Aditya Birla Capital Limited</p>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <div className="flex space-x-8">
              <Link 
                href="/" 
                className={`font-medium transition-colors ${
                  isActive('/') ? 'text-primary' : 'text-gray-900 hover:text-primary'
                }`}
                data-testid="nav-home"
              >
                Home
              </Link>
              
              <DropdownMenu>
                <DropdownMenuTrigger className="text-gray-900 hover:text-primary transition-colors flex items-center" data-testid="nav-about-dropdown">
                  About Us <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {aboutLinks.map((link) => (
                    <DropdownMenuItem key={link.label} asChild>
                      <Link 
                        href={link.href} 
                        data-testid={`nav-${link.href}${link.section ? '#' + link.section : ''}`}
                        onClick={() => {
                          if (link.section) {
                            setTimeout(() => {
                              const element = document.getElementById(link.section!);
                              if (element) {
                                element.scrollIntoView({ behavior: 'smooth' });
                              }
                            }, 100);
                          }
                        }}
                      >
                        {link.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger className="text-gray-900 hover:text-primary transition-colors flex items-center" data-testid="nav-investor-dropdown">
                  Investor Relations <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {investorLinks.map((link) => (
                    <DropdownMenuItem key={link.label} asChild>
                      <Link 
                        href={link.href} 
                        data-testid={`nav-${link.href}${link.section ? '#' + link.section : ''}`}
                        onClick={() => {
                          if (link.section) {
                            setTimeout(() => {
                              const element = document.getElementById(link.section!);
                              if (element) {
                                element.scrollIntoView({ behavior: 'smooth' });
                              }
                            }, 100);
                          }
                        }}
                      >
                        {link.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Link 
                href="/board-directors" 
                className={`transition-colors ${
                  isActive('/board-directors') ? 'text-primary' : 'text-gray-900 hover:text-primary'
                }`}
                data-testid="nav-board-directors"
              >
                Board & Promoters
              </Link>
              
              <Link 
                href="/company-secretary" 
                className={`transition-colors ${
                  isActive('/company-secretary') ? 'text-primary' : 'text-gray-900 hover:text-primary'
                }`}
                data-testid="nav-company-secretary"
              >
                Company Secretary
              </Link>
              
              <Link 
                href="/grievances" 
                className={`transition-colors ${
                  isActive('/grievances') ? 'text-primary' : 'text-gray-900 hover:text-primary'
                }`}
                data-testid="nav-grievances"
              >
                Grievances
              </Link>
              
              <Link 
                href="/policies" 
                className={`transition-colors ${
                  isActive('/policies') ? 'text-primary' : 'text-gray-900 hover:text-primary'
                }`}
                data-testid="nav-policies"
              >
                Policies
              </Link>
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" data-testid="mobile-menu-button">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <nav className="flex flex-col space-y-4 mt-8">
                  <Link href="/" onClick={() => setIsMobileMenuOpen(false)} data-testid="mobile-nav-home">
                    Home
                  </Link>
                  <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} data-testid="mobile-nav-about">
                    About Us
                  </Link>
                  <Link href="/investor-relations" onClick={() => setIsMobileMenuOpen(false)} data-testid="mobile-nav-investor">
                    Investor Relations
                  </Link>
                  <Link href="/board-directors" onClick={() => setIsMobileMenuOpen(false)} data-testid="mobile-nav-board-directors">
                    Board & Promoters
                  </Link>
                  <Link href="/company-secretary" onClick={() => setIsMobileMenuOpen(false)} data-testid="mobile-nav-secretary">
                    Company Secretary
                  </Link>
                  <Link href="/grievances" onClick={() => setIsMobileMenuOpen(false)} data-testid="mobile-nav-grievances">
                    Grievances
                  </Link>
                  <Link href="/policies" onClick={() => setIsMobileMenuOpen(false)} data-testid="mobile-nav-policies">
                    Policies
                  </Link>
                  <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)} data-testid="mobile-nav-admin">
                    Admin
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* User Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="outline" asChild data-testid="button-admin">
              <Link href="/admin">Admin</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
