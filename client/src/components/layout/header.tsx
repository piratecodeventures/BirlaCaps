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
    <header className="bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0" data-testid="logo-link">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-bold text-2xl shadow-lg">
                BIRLA CAPS
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <div className="flex items-center space-x-6">
              <Link 
                href="/" 
                className={`font-medium transition-colors py-2 px-3 rounded-md ${
                  isActive('/') ? 'text-primary bg-blue-50' : 'text-gray-900 hover:text-primary hover:bg-blue-50'
                }`}
                data-testid="nav-home"
              >
                Home
              </Link>
              
              <DropdownMenu>
                <DropdownMenuTrigger className="text-gray-900 hover:text-primary hover:bg-blue-50 transition-colors flex items-center py-2 px-3 rounded-md whitespace-nowrap" data-testid="nav-about-dropdown">
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
                <DropdownMenuTrigger className="text-gray-900 hover:text-primary hover:bg-blue-50 transition-colors flex items-center py-2 px-3 rounded-md whitespace-nowrap" data-testid="nav-investor-dropdown">
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
                className={`font-medium transition-colors py-2 px-3 rounded-md ${
                  isActive('/board-directors') ? 'text-primary bg-blue-50' : 'text-gray-900 hover:text-primary hover:bg-blue-50'
                }`}
                data-testid="nav-board-directors"
              >
                Board & Promoters
              </Link>
              
              <Link 
                href="/company-secretary" 
                className={`font-medium transition-colors py-2 px-3 rounded-md ${
                  isActive('/company-secretary') ? 'text-primary bg-blue-50' : 'text-gray-900 hover:text-primary hover:bg-blue-50'
                }`}
                data-testid="nav-company-secretary"
              >
                Company Secretary
              </Link>
              
              <Link 
                href="/grievances" 
                className={`font-medium transition-colors py-2 px-3 rounded-md ${
                  isActive('/grievances') ? 'text-primary bg-blue-50' : 'text-gray-900 hover:text-primary hover:bg-blue-50'
                }`}
                data-testid="nav-grievances"
              >
                Grievances
              </Link>
              
              <Link 
                href="/policies" 
                className={`font-medium transition-colors py-2 px-3 rounded-md ${
                  isActive('/policies') ? 'text-primary bg-blue-50' : 'text-gray-900 hover:text-primary hover:bg-blue-50'
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
