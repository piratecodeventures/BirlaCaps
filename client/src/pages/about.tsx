import ManagementTeam from "@/components/sections/management-team";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
// import financialImage from "@assets/image_1756027604442.png";
import {
  Users,
  ArrowRight,
  Target,
  Eye,
  Award,
  TrendingUp,
  Shield,
  Building2,
} from "lucide-react";

export default function About() {
  const committees = [
    {
      icon: TrendingUp,
      title: "Audit Committee",
      description:
        "Oversees financial reporting, internal controls, and audit processes",
      color: "text-blue-400",
    },
    {
      icon: Users,
      title: "Nomination & Remuneration",
      description:
        "Manages board composition, succession planning, and compensation",
      color: "text-green-400",
    },
    {
      icon: Shield,
      title: "Stakeholder Relationship",
      description:
        "Ensures effective communication with shareholders and stakeholders",
      color: "text-purple-400",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white gradient-shift particle-bg">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -left-4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-15 float-animation"></div>
          <div
            className="absolute -top-4 -right-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-15 float-animation"
            style={{ animationDelay: "3s" }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1
              className="text-4xl lg:text-6xl font-bold mb-6 gradient-text slide-in-top"
              data-testid="about-title"
            >
              About Birla Capital and Financial Services Limited
            </h1>
            <p
              className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed fade-in-up"
              data-testid="about-subtitle"
            >
              A legacy of trust and innovation in India's financial services
              sector, building the future of finance
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 gradient-text">
              Our Story
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Building trust through excellence and innovation
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center stagger-children">
            <div className="fade-in-left">
              <div className="rounded-2xl shadow-2xl hover-lift shimmer-effect glass-card bg-gradient-to-br from-blue-100 to-purple-100 p-12 flex items-center justify-center">
                <div className="text-center">
                  <Building2 className="h-24 w-24 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700">Financial Technology</h3>
                  <p className="text-gray-600">Abstract visualization placeholder</p>
                </div>
              </div>
            </div>
            <div className="space-y-8 fade-in-right">
              <div id="company" className="glass-card p-6 hover-lift">
                <div className="flex items-center mb-4">
                  <Building2 className="h-8 w-8 text-blue-600 mr-3" />
                  <h3 className="text-2xl font-bold text-gray-900">
                    Company Details
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Birla Capital and Financial Services Limited is dedicated to
                  delivering comprehensive financial solutions across India. We
                  cater to both individual and corporate clients with innovative
                  services designed to meet their unique needs.
                </p>
              </div>

              <div className="space-y-8">
                <div id="mission" className="glass-card p-6 hover-lift">
                  <div className="flex items-center mb-4">
                    <Target className="h-8 w-8 text-blue-600 mr-3 bounce-in" />
                    <h2
                      className="text-2xl font-semibold text-gray-900 gradient-text"
                      data-testid="mission-title"
                    >
                      Our Mission
                    </h2>
                  </div>
                  <p
                    className="text-gray-600 leading-relaxed"
                    data-testid="mission-text"
                  >
                    To democratize financial services across India by providing
                    accessible, innovative, and customer-centric solutions that
                    empower individuals and businesses to achieve their
                    financial goals.
                  </p>
                </div>
                <div className="glass-card p-6 hover-lift">
                  <div className="flex items-center mb-4">
                    <Eye
                      className="h-8 w-8 text-purple-600 mr-3 bounce-in"
                      style={{ animationDelay: "0.2s" }}
                    />
                    <h2
                      className="text-2xl font-semibold text-gray-900 gradient-text"
                      data-testid="vision-title"
                    >
                      Our Vision
                    </h2>
                  </div>
                  <p
                    className="text-gray-600 leading-relaxed"
                    data-testid="vision-text"
                  >
                    To be India's most trusted and preferred financial services
                    partner, driving financial inclusion and economic growth
                    through technology and innovation.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 mt-8">
                  <span
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full text-sm font-medium hover-lift shimmer-effect"
                    data-testid="service-loans"
                  >
                    Loans
                  </span>
                  <span
                    className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-full text-sm font-medium hover-lift shimmer-effect"
                    data-testid="service-investments"
                  >
                    Investments
                  </span>
                  <span
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full text-sm font-medium hover-lift shimmer-effect"
                    data-testid="service-insurance"
                  >
                    Insurance
                  </span>
                  <span
                    className="bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium"
                    data-testid="service-payments"
                  >
                    Payments
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div id="management">
            <ManagementTeam />
          </div>

          {/* Promoter Section */}
          <div className="mt-20" id="promoter">
            <h2 className="text-3xl font-bold gradient-text mb-12 text-center fade-in-up">
              Company Promoters
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="glass-card hover-lift">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <Building2 className="h-8 w-8 text-blue-600 mr-4" />
                    <h3 className="text-xl font-semibold">
                      Individual Promoters
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Our individual promoters bring decades of experience in
                    financial services and corporate leadership.
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/board-directors#promoters">
                      View Individual Promoters
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="glass-card hover-lift">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <Building2 className="h-8 w-8 text-purple-600 mr-4" />
                    <h3 className="text-xl font-semibold">
                      Corporate Promoters
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Strategic corporate entities that provide backing and
                    support for our business operations.
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/board-directors#promoters">
                      View Corporate Promoters
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Compliance Officer */}
          <div className="mt-20" id="compliance">
            <h2 className="text-3xl font-bold gradient-text mb-12 text-center fade-in-up">
              Compliance Officer
            </h2>
            <div className="max-w-4xl mx-auto">
              <Card className="glass-card hover-lift">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <Shield className="h-8 w-8 text-blue-600 mr-4" />
                    <h3 className="text-xl font-semibold">Chief Compliance Officer</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-gray-600 leading-relaxed mb-4">
                        Our Chief Compliance Officer ensures adherence to all regulatory requirements and maintains the highest standards of corporate governance.
                      </p>
                      <div className="space-y-2 text-sm">
                        <div><strong>Email:</strong> info@birlainternational.net</div>
                        <div><strong>Phone:</strong> +91 22 6789 1234</div>
                        <div><strong>Office Hours:</strong> Monday to Friday, 10:00 AM to 6:00 PM</div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Key Responsibilities:</h4>
                      <ul className="text-gray-600 text-sm space-y-1">
                        <li>• Regulatory Compliance Monitoring</li>
                        <li>• Policy Implementation & Updates</li>
                        <li>• Risk Assessment & Management</li>
                        <li>• Stakeholder Communication</li>
                        <li>• Audit Coordination</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Board Committees */}
          <div className="mt-20" id="committees">
            <h2
              className="text-3xl font-bold gradient-text mb-12 text-center fade-in-up"
              data-testid="committees-title"
            >
              Board Committees
            </h2>
            <div className="grid md:grid-cols-3 gap-8 stagger-children">
              {committees.map((committee, index) => {
                const IconComponent = committee.icon;
                return (
                  <Card
                    key={index}
                    className="glass-card hover-lift shimmer-effect"
                    data-testid={`committee-${index}`}
                  >
                    <CardContent className="p-8">
                      <div className="flex items-center mb-6">
                        <IconComponent
                          className={`h-8 w-8 ${committee.color} mr-4 bounce-in heartbeat`}
                          style={{ animationDelay: `${index * 0.2}s` }}
                          data-testid={`committee-icon-${index}`}
                        />
                        <h3
                          className="text-xl font-semibold gradient-text"
                          data-testid={`committee-title-${index}`}
                        >
                          {committee.title}
                        </h3>
                      </div>
                      <p
                        className="text-gray-600 leading-relaxed"
                        data-testid={`committee-description-${index}`}
                      >
                        {committee.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Board of Directors Call-to-Action */}
            <div className="mt-20 text-center glass-card p-12 hover-lift fade-in-up">
              <Users className="h-16 w-16 text-blue-600 mx-auto mb-6 bounce-in float-animation" />
              <h3
                className="text-3xl font-bold gradient-text mb-6"
                data-testid="board-cta-title"
              >
                Meet Our Leadership Team
              </h3>
              <p
                className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg leading-relaxed"
                data-testid="board-cta-description"
              >
                Discover our experienced Board of Directors and company
                promoters who guide our strategic vision and ensure robust
                corporate governance.
              </p>
              <Button
                asChild
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white btn-interactive hover-glow"
                data-testid="button-view-board"
              >
                <Link href="/board-directors">
                  <Building2 className="mr-2 h-5 w-5 rotate-slow" />
                  View Board of Directors & Promoters
                  <ArrowRight className="ml-2 h-5 w-5 heartbeat" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
