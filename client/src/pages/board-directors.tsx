import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Users,
  Building2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Building,
  Globe,
  TrendingUp,
  Shield,
  Target,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const directors = [
  {
    id: 1,
    name: "Satyanarayana Sharma Dahagama",
    designation: "Director",
    din: "01346189",
    address:
      "8, Suneel Building, B-Wing, Ground Floor, Near Bank of Baroda, Shimpoli Road, Borivali West, Mumbai: 400092",
    experience: "10+ year experience in serving as Director in Company",
  },
  {
    id: 2,
    name: "Minal Umesh Pote",
    designation: "Director",
    din: "07163539",
    address: "Ramaniwas, Vasai (West), Tarkhad, Bassein, Vasai, Thane: 401201",
    experience: "6+ year experience in serving as Director in Company",
  },
  {
    id: 3,
    name: "Abhijeet Namdeo Bhingarde",
    designation: "Director",
    din: "06376231",
    address:
      "Flat No-14, BLDG No.4, Samarpan Soc, Opp Shankar Mandir, Yashodhan NGR, Pada No-2, Thane: 400606",
    experience: "6+ year experience in serving as Director in Company",
  },
];

const promoters = [
  { id: 1, name: "PURUSHOTAM SHARMA", category: "Individual" },
  { id: 2, name: "ARUNKUMAR GANGAPRASAD SINGHI", category: "Individual" },
  { id: 3, name: "ASIAN DISTRIBUTORS PRIVATE LIMITED", category: "Company" },
  { id: 4, name: "BIRLA BOMBAY PRIVATE LIMITED", category: "Company" },
  { id: 5, name: "GODAVARI CORPORATION PRIVATE LIMITED", category: "Company" },
  {
    id: 6,
    name: "SHEARSON INVESTMENTS & TRADING COMPANY PRIVATE LIMITED",
    category: "Company",
  },
  { id: 7, name: "NIRVED TRADERS PVT LTD", category: "Company" },
];

interface DirectorCardProps {
  director: {
    id: number;
    name: string;
    designation: string;
    din: string;
    address: string;
    experience: string;
  };
}

function DirectorCard({ director }: DirectorCardProps) {
  return (
    <Card
      className="glass-card hover-lift shimmer-effect"
      data-testid={`card-director-${director.id}`}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle
              className="text-xl font-semibold text-gray-900 gradient-text"
              data-testid={`text-director-name-${director.id}`}
            >
              {director.name}
            </CardTitle>
            <CardDescription
              className="text-lg font-medium text-blue-600 mt-1"
              data-testid={`text-director-designation-${director.id}`}
            >
              {director.designation}
            </CardDescription>
          </div>
          <Badge
            variant="outline"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none hover-glow"
            data-testid={`badge-director-din-${director.id}`}
          >
            DIN: {director.din}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3 fade-in-up">
          <MapPin className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0 bounce-in" />
          <p
            className="text-gray-700 text-sm leading-relaxed"
            data-testid={`text-director-address-${director.id}`}
          >
            {director.address}
          </p>
        </div>
        <div className="flex items-start gap-3 fade-in-up">
          <Users
            className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0 bounce-in"
            style={{ animationDelay: "0.2s" }}
          />
          <p
            className="text-gray-700 text-sm"
            data-testid={`text-director-experience-${director.id}`}
          >
            {director.experience}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

interface PromotersSectionProps {
  promoters: {
    id: number;
    name: string;
    category: string;
  }[];
}

function PromotersSection({ promoters }: PromotersSectionProps) {
  const individuals = promoters.filter((p) => p.category === "Individual");
  const companies = promoters.filter((p) => p.category === "Company");

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
          <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          Individual Promoters
        </h3>
        <div className="grid gap-3">
          {individuals.map((promoter) => (
            <Card
              key={promoter.id}
              className="bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800"
              data-testid={`card-individual-promoter-${promoter.id}`}
            >
              <CardContent className="p-4">
                <p
                  className="font-medium text-gray-900 dark:text-gray-100"
                  data-testid={`text-individual-promoter-name-${promoter.id}`}
                >
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
            <Card
              key={promoter.id}
              className="bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800"
              data-testid={`card-company-promoter-${promoter.id}`}
            >
              <CardContent className="p-4">
                <p
                  className="font-medium text-gray-900 dark:text-gray-100"
                  data-testid={`text-company-promoter-name-${promoter.id}`}
                >
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
              data-testid="text-page-title"
            >
              Board of Directors & Promoters
            </h1>
            <p
              className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed fade-in-up"
              data-testid="text-page-description"
            >
              Meet our experienced leadership team and company promoters who
              guide our strategic direction and ensure strong corporate
              governance
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Company Information */}
        <div className="mb-16 fade-in-up">
          <Card className="glass-card hover-lift shimmer-effect">
            <CardHeader>
              <CardTitle
                className="text-2xl font-bold gradient-text flex items-center gap-2"
                data-testid="text-company-info-title"
              >
                <Building className="h-7 w-7 text-blue-600 bounce-in" />
                Birla Capital and Financial Services Limited
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none font-mono text-sm hover-glow"
                      data-testid="text-company-cin"
                    >
                      CIN: L51900MH1985PLC036156
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-600 bounce-in" />
                    <span
                      className="text-sm text-gray-600"
                      data-testid="text-company-incorporation"
                    >
                      Date of Incorporation: 07/05/1985
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-green-600 bounce-in" />
                    <span
                      className="text-sm text-gray-600"
                      data-testid="text-company-exchange"
                    >
                      Stock Exchange: BSE
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-purple-600 bounce-in" />
                    <span
                      className="text-sm text-gray-600"
                      data-testid="text-company-sector"
                    >
                      Industry Sector: Consultancy Services
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2 fade-in-up">
                <MapPin className="h-4 w-4 text-purple-600 mt-1 flex-shrink-0 bounce-in" />
                <p
                  className="text-sm text-gray-600"
                  data-testid="text-company-address"
                >
                  5th Floor, 159, Industry House Churchgate Reclamation, Mumbai
                  City, Mumbai: 400020
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Business Activity
                </h4>
                <p className="text-sm text-gray-700">
                  Company is engaged in carrying out business of consulting
                  services in the field of commercial, financial, legal,
                  economic, labour, industrial public relation, acting as agents
                  of shares, debentures, bonds, units, providing advisory
                  services to any person including NRI in investment planning,
                  tax planning, portfolio management.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Company Secretary & Compliance Officer */}
        <div className="mb-16 fade-in-up">
          <Card className="glass-card hover-lift shimmer-effect">
            <CardHeader>
              <CardTitle
                className="text-2xl font-bold gradient-text flex items-center gap-2"
                data-testid="text-company-secretary-title"
              >
                <Users className="h-7 w-7 text-blue-600 bounce-in" />
                Company Secretary & Compliance Officer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Mr. HEMANT AGARWAL
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-gray-700">
                      +91 9819153922
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-700">
                      info@birlainternational.net
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Investor Grievances */}
        <div className="mb-16 fade-in-up">
          <Card className="glass-card hover-lift shimmer-effect">
            <CardHeader>
              <CardTitle
                className="text-2xl font-bold gradient-text flex items-center gap-2"
                data-testid="text-investor-grievances-title"
              >
                <Shield className="h-7 w-7 text-blue-600 bounce-in" />
                Investor Grievances
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Mr. HEMANT AGARWAL
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-purple-600 mt-1 flex-shrink-0" />
                    <span className="text-sm text-gray-700">
                      5th Floor, 159, Industry House Churchgate Reclamation,
                      Mumbai City, Mumbai: 400020
                    </span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-gray-700">
                        +91 9819153922
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-gray-700">
                        info@birlainternational.net
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Our Services */}
        <div className="mb-16 fade-in-up">
          <Card className="glass-card hover-lift shimmer-effect">
            <CardHeader>
              <CardTitle
                className="text-2xl font-bold gradient-text flex items-center gap-2"
                data-testid="text-services-title"
              >
                <Target className="h-7 w-7 text-blue-600 bounce-in" />
                Our Services
              </CardTitle>
              <p className="text-gray-600 mt-2">
                Comprehensive financial and investment solutions tailored to
                your needs
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg">
                  <TrendingUp className="h-8 w-8 text-blue-600 mb-4" />
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    Investment Advisory
                  </h4>
                  <p className="text-sm text-gray-700">
                    Expert guidance for NRI and domestic investors in investment
                    planning and portfolio management
                  </p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg">
                  <Shield className="h-8 w-8 text-green-600 mb-4" />
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    Financial Planning
                  </h4>
                  <p className="text-sm text-gray-700">
                    Comprehensive tax planning and financial strategy
                    development for optimal growth
                  </p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg">
                  <Building2 className="h-8 w-8 text-purple-600 mb-4" />
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    Corporate Services
                  </h4>
                  <p className="text-sm text-gray-700">
                    Commercial, legal, and industrial consultancy with expert
                    public relations support
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Board of Directors */}
        <div className="mb-20">
          <h2
            className="text-3xl font-bold gradient-text mb-12 text-center fade-in-up"
            data-testid="text-directors-section-title"
          >
            Board of Directors
          </h2>
          <div className="grid gap-8 lg:grid-cols-1 xl:grid-cols-2 stagger-children">
            {directors.map((director) => (
              <DirectorCard key={director.id} director={director} />
            ))}
          </div>
        </div>

        {/* Promoters */}
        <div className="fade-in-up">
          <h2
            className="text-3xl font-bold gradient-text mb-12 text-center"
            data-testid="text-promoters-section-title"
          >
            Promoters of Our Company
          </h2>
          <PromotersSection promoters={promoters} />
        </div>
      </div>
    </div>
  );
}
