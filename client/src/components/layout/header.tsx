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
    { href: "/about", label: "Company Details", section: "company" },
    { href: "/about", label: "Mission & Vision", section: "mission" },
    { href: "/about", label: "Management", section: "management" },
    { href: "/about", label: "Promoter", section: "promoter" },
    { href: "/about", label: "Compliance Officer", section: "compliance" },
    { href: "/about", label: "Committees", section: "committees" },
  ];

  const investorLinks = [
    { href: "/investor-relations", label: "Announcements", section: "announcements" },
    { href: "/investor-relations", label: "Annual Report", section: "annual-reports" },
    { href: "/investor-relations", label: "Annual Return", section: "annual-returns" },
    { href: "/investor-relations", label: "Shareholding Pattern", section: "shareholding" },
    { href: "/investor-relations", label: "Quarterly Result", section: "quarterly-results" },
    { href: "/investor-relations", label: "Quarterly Corporate Governance Report", section: "governance-reports" },
    { href: "/investor-relations", label: "Offer Documents", section: "offer-documents" },
    { href: "/investor-relations", label: "Familiarizations Programme", section: "familiarization" },
  ];

  const policiesLinks = [
    { href: "/policies", label: "Code of Conduct", section: "conduct" },
    { href: "/policies", label: "Code of Governance", section: "governance" },
    { href: "/policies", label: "Risk Management Policy", section: "risk-management" },
    { href: "/policies", label: "Policy Related to Party Transaction", section: "party-transaction" },
    { href: "/policies", label: "Nomination & Remuneration Policy", section: "nomination-remuneration" },
    { href: "/policies", label: "Code for Prohibition of Insider Trading", section: "insider-trading" },
    { href: "/policies", label: "Whistle Blower Policy", section: "whistle-blower" },
    { href: "/policies", label: "Material Subsidiary Policy", section: "material-subsidiary" },
    { href: "/policies", label: "Archival Policy", section: "archival" },
    { href: "/policies", label: "Independent Director", section: "independent-director" },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center min-w-0 flex-shrink-0">
            <Link href="/" className="flex-shrink-0" data-testid="logo-link">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 sm:px-4 lg:px-6 py-2 lg:py-3 rounded-lg font-bold text-lg sm:text-xl lg:text-2xl shadow-lg whitespace-nowrap">
                BIRLA CAPS
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:block flex-1 mx-4">
            <div className="flex items-center justify-center space-x-2 xl:space-x-6">
              <DropdownMenu>
                <DropdownMenuTrigger className="text-gray-900 hover:text-primary hover:bg-blue-50 transition-colors flex items-center py-2 px-2 xl:px-3 rounded-md whitespace-nowrap text-sm xl:text-base" data-testid="nav-about-dropdown">
                  About Us <ChevronDown className="ml-1 h-3 w-3 xl:h-4 xl:w-4" />
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
                <DropdownMenuTrigger className="text-gray-900 hover:text-primary hover:bg-blue-50 transition-colors flex items-center py-2 px-2 xl:px-3 rounded-md whitespace-nowrap text-sm xl:text-base" data-testid="nav-investor-dropdown">
                  Investor Relations <ChevronDown className="ml-1 h-3 w-3 xl:h-4 xl:w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="max-h-96 overflow-y-auto">
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
                href="/company-secretary" 
                className={`font-medium transition-colors py-2 px-2 xl:px-3 rounded-md whitespace-nowrap text-sm xl:text-base ${
                  isActive('/company-secretary') ? 'text-primary bg-blue-50' : 'text-gray-900 hover:text-primary hover:bg-blue-50'
                }`}
                data-testid="nav-company-secretary"
              >
                Company Secretary
              </Link>

              <Link 
                href="/grievances" 
                className={`font-medium transition-colors py-2 px-2 xl:px-3 rounded-md whitespace-nowrap text-sm xl:text-base ${
                  isActive('/grievances') ? 'text-primary bg-blue-50' : 'text-gray-900 hover:text-primary hover:bg-blue-50'
                }`}
                data-testid="nav-grievances"
              >
                Investor Grievances
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger className="text-gray-900 hover:text-primary hover:bg-blue-50 transition-colors flex items-center py-2 px-2 xl:px-3 rounded-md whitespace-nowrap text-sm xl:text-base" data-testid="nav-policies-dropdown">
                  Code and Policies <ChevronDown className="ml-1 h-3 w-3 xl:h-4 xl:w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="max-h-96 overflow-y-auto">
                  {policiesLinks.map((link) => (
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


            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="lg:hidden flex-shrink-0">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" data-testid="mobile-menu-button" className="h-9 w-9">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[320px]">
                <div className="mt-6">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-bold text-lg mb-6">
                    BIRLA CAPS
                  </div>
                  <nav className="flex flex-col space-y-1">
                    <Link 
                      href="/about" 
                      onClick={() => setIsMobileMenuOpen(false)} 
                      data-testid="mobile-nav-about"
                      className="text-gray-900 hover:text-primary hover:bg-blue-50 px-3 py-3 rounded-md transition-colors font-medium"
                    >
                      About Us
                    </Link>
                    <Link 
                      href="/investor-relations" 
                      onClick={() => setIsMobileMenuOpen(false)} 
                      data-testid="mobile-nav-investor"
                      className="text-gray-900 hover:text-primary hover:bg-blue-50 px-3 py-3 rounded-md transition-colors font-medium"
                    >
                      Investor Relations
                    </Link>
                    <Link 
                      href="/company-secretary" 
                      onClick={() => setIsMobileMenuOpen(false)} 
                      data-testid="mobile-nav-secretary"
                      className="text-gray-900 hover:text-primary hover:bg-blue-50 px-3 py-3 rounded-md transition-colors font-medium"
                    >
                      Company Secretary
                    </Link>
                    <Link 
                      href="/grievances" 
                      onClick={() => setIsMobileMenuOpen(false)} 
                      data-testid="mobile-nav-grievances"
                      className="text-gray-900 hover:text-primary hover:bg-blue-50 px-3 py-3 rounded-md transition-colors font-medium"
                    >
                      Investor Grievances
                    </Link>
                    <Link 
                      href="/policies" 
                      onClick={() => setIsMobileMenuOpen(false)} 
                      data-testid="mobile-nav-policies"
                      className="text-gray-900 hover:text-primary hover:bg-blue-50 px-3 py-3 rounded-md transition-colors font-medium"
                    >
                      Code and Policies
                    </Link>
                    <Link 
                      href="/admin" 
                      onClick={() => setIsMobileMenuOpen(false)} 
                      data-testid="mobile-nav-admin"
                      className="text-gray-900 hover:text-primary hover:bg-blue-50 px-3 py-3 rounded-md transition-colors font-medium border-t border-gray-200 mt-4 pt-4 hidden"
                    >
                      Admin
                    </Link>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* User Actions */}
          <div className="hidden lg:flex items-center space-x-2 flex-shrink-0">
            <Button variant="outline" size="sm" asChild data-testid="button-admin" className="text-sm hidden">
              <Link href="/admin">Admin</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
