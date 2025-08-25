import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Building2,
  Globe,
} from "lucide-react";

export default function ContactUs() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Get in touch with Birla Capital and Financial Services Limited. We're here to help and answer any questions you may have.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              <p className="text-gray-600 mb-8">
                We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="grid gap-6">
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Building2 className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Corporate Office</h3>
                      <p className="text-gray-600">
                        5th Floor, 159, Industry House<br />
                        Churchgate Reclamation, Mumbai - 400020<br />
                        Maharashtra, India
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      <Phone className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone</h3>
                      <p className="text-gray-600">
                        +91 22 6665 1234<br />
                        +91 9819153922<br />
                        Monday to Friday: 9:00 AM - 6:00 PM
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-purple-100 p-3 rounded-full">
                      <Mail className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
                      <p className="text-gray-600">
                        Email: info@birlainternational.net<br />
                        General Inquiries & Support
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-orange-100 p-3 rounded-full">
                      <Clock className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Business Hours</h3>
                      <p className="text-gray-600">
                        Monday - Friday: 9:00 AM - 6:00 PM<br />
                        Saturday: 9:00 AM - 1:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-indigo-100 p-3 rounded-full">
                      <Globe className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Company Registration</h3>
                      <p className="text-gray-600">
                        CIN: L51900MH1985PLC036156<br />
                        Registered in Maharashtra
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Company Information */}
          <div>
            <Card className="shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                    <div className="bg-blue-100 p-3 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4">
                      <MapPin className="h-8 w-8 text-blue-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Office Address</h4>
                    <p className="text-gray-700">
                      📍 5th Floor, 159, Industry House<br />
                      Churchgate Reclamation, Mumbai - 400020
                    </p>
                  </div>

                  <div className="text-center p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                    <div className="bg-green-100 p-3 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4">
                      <Phone className="h-8 w-8 text-green-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Phone Numbers</h4>
                    <p className="text-gray-700">
                      📞 +91 22 6665 1234<br />
                      📱 +91 9819153922
                    </p>
                  </div>

                  <div className="text-center p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                    <div className="bg-purple-100 p-3 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4">
                      <Mail className="h-8 w-8 text-purple-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Email</h4>
                    <p className="text-gray-700">
                      ✉️ info@birlainternational.net
                    </p>
                  </div>

                  <div className="text-center p-6 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg">
                    <div className="bg-indigo-100 p-3 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4">
                      <Globe className="h-8 w-8 text-indigo-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Company Registration</h4>
                    <p className="text-gray-700">
                      🌐 CIN: L51900MH1985PLC036156
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Information */}
            <Card className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <CardContent className="p-6 text-center">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Need Immediate Assistance?</h4>
                <p className="text-gray-600 mb-4">
                  For urgent investor-related queries, please visit our Investor Grievances section.
                </p>
                <Button
                  variant="outline"
                  asChild
                  className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                  data-testid="button-grievances"
                >
                  <a href="/grievances">Submit Grievance</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}