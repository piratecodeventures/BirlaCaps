import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Printer, User, UserCheck } from "lucide-react";

export default function CompanySecretary() {
  const secretaryInfo = {
    name: "Mr. HEMANT AGARWAL",
    position: "Company Secretary & Compliance Officer",
    address: "5th Floor, 159, Industry House Churchgate Reclamation, Mumbai City, Mumbai: 400020",
    mobile: "+91 9819153922",
    email: "info@birlainternational.net",
    fax: "+91 22 6652 1234"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white gradient-shift particle-bg">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -left-4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-15 float-animation"></div>
          <div className="absolute -top-4 -right-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-15 float-animation" style={{animationDelay: '3s'}}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 gradient-text slide-in-top" data-testid="secretary-title">
              Company Secretary Details
            </h1>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed fade-in-up" data-testid="secretary-subtitle">
              Contact information for company secretary and compliance officer
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          <Card className="glass-card hover-lift shimmer-effect fade-in-up">
            <CardContent className="p-12">
              <div className="space-y-8">
                <div className="text-center mb-12">
                  <UserCheck className="h-16 w-16 text-blue-600 mx-auto mb-6 bounce-in float-animation" />
                  <h2 className="text-3xl font-bold gradient-text mb-4" data-testid="secretary-position">
                    {secretaryInfo.position}
                  </h2>
                </div>

                <div className="space-y-8 stagger-children">
                  <div className="flex items-start space-x-6 fade-in-up">
                    <User className="text-blue-600 mt-1 h-6 w-6 flex-shrink-0 bounce-in" />
                    <div>
                      <span className="font-semibold text-gray-900 text-lg">Name:</span>
                      <span className="ml-3 text-gray-700 text-lg" data-testid="secretary-name">
                        {secretaryInfo.name}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-6 fade-in-up">
                    <MapPin className="text-purple-600 mt-1 h-6 w-6 flex-shrink-0 bounce-in" style={{animationDelay: '0.2s'}} />
                    <div>
                      <span className="font-semibold text-gray-900 text-lg">Address:</span>
                      <span className="ml-3 text-gray-700 text-lg" data-testid="secretary-address">
                        {secretaryInfo.address}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6 fade-in-up">
                    <Phone className="text-green-600 h-6 w-6 flex-shrink-0 bounce-in heartbeat" style={{animationDelay: '0.4s'}} />
                    <div>
                      <span className="font-semibold text-gray-900 text-lg">Mobile:</span>
                      <a 
                        href={`tel:${secretaryInfo.mobile}`}
                        className="ml-3 text-blue-600 hover:text-blue-800 text-lg btn-interactive hover-glow"
                        data-testid="secretary-mobile"
                      >
                        {secretaryInfo.mobile}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6 fade-in-up">
                    <Mail className="text-blue-600 h-6 w-6 flex-shrink-0 bounce-in" style={{animationDelay: '0.6s'}} />
                    <div>
                      <span className="font-semibold text-gray-900">Email:</span>
                      <a 
                        href={`mailto:${secretaryInfo.email}`}
                        className="ml-2 text-primary hover:underline"
                        data-testid="secretary-email"
                      >
                        {secretaryInfo.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <Printer className="text-primary h-5 w-5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">Printer:</span>
                      <span className="ml-2 text-gray-700" data-testid="secretary-fax">
                        {secretaryInfo.fax}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2" data-testid="office-hours-title">
                    Office Hours
                  </h3>
                  <p className="text-gray-700" data-testid="office-hours">
                    Monday to Friday: 9:00 AM to 6:00 PM (IST)
                  </p>
                  <p className="text-gray-700 mt-2" data-testid="response-time">
                    We aim to respond to all inquiries within 2 business days.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
