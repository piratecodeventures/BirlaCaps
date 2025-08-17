import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Printer, User } from "lucide-react";

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
    <div className="min-h-screen">
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4" data-testid="secretary-title">
              Company Secretary Details
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-testid="secretary-subtitle">
              Contact information for company secretary and compliance officer
            </p>
          </div>

          <Card className="shadow-lg">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2" data-testid="secretary-position">
                    {secretaryInfo.position}
                  </h2>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <User className="text-primary mt-1 h-5 w-5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">Name:</span>
                      <span className="ml-2 text-gray-700" data-testid="secretary-name">
                        {secretaryInfo.name}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <MapPin className="text-primary mt-1 h-5 w-5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">Address:</span>
                      <span className="ml-2 text-gray-700" data-testid="secretary-address">
                        {secretaryInfo.address}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <Phone className="text-primary h-5 w-5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">Mobile:</span>
                      <a 
                        href={`tel:${secretaryInfo.mobile}`}
                        className="ml-2 text-primary hover:underline"
                        data-testid="secretary-mobile"
                      >
                        {secretaryInfo.mobile}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <Mail className="text-primary h-5 w-5 flex-shrink-0" />
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
