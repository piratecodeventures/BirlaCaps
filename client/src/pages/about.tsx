import ManagementTeam from "@/components/sections/management-team";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  const committees = [
    {
      icon: "fas fa-search-dollar",
      title: "Audit Committee",
      description: "Oversees financial reporting, internal controls, and audit processes"
    },
    {
      icon: "fas fa-users",
      title: "Nomination & Remuneration",
      description: "Manages board composition, succession planning, and compensation"
    },
    {
      icon: "fas fa-handshake",
      title: "Stakeholder Relationship",
      description: "Ensures effective communication with shareholders and stakeholders"
    }
  ];

  return (
    <div className="min-h-screen">
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4" data-testid="about-title">
              About Birla Caps
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-testid="about-subtitle">
              A legacy of trust and innovation in India's financial services sector
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Professional business team in corporate meeting" 
                className="rounded-lg shadow-lg"
                data-testid="about-image"
              />
            </div>
            <div>
              <div className="space-y-6">
                <div id="mission">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3" data-testid="mission-title">
                    Our Mission
                  </h2>
                  <p className="text-gray-600 leading-relaxed" data-testid="mission-text">
                    To democratize financial services across India by providing accessible, innovative, and customer-centric solutions that empower individuals and businesses to achieve their financial goals.
                  </p>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3" data-testid="vision-title">
                    Our Vision
                  </h2>
                  <p className="text-gray-600 leading-relaxed" data-testid="vision-text">
                    To be India's most trusted and preferred financial services partner, driving financial inclusion and economic growth through technology and innovation.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 mt-8">
                  <span className="bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium" data-testid="service-loans">
                    Loans
                  </span>
                  <span className="bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium" data-testid="service-investments">
                    Investments
                  </span>
                  <span className="bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium" data-testid="service-insurance">
                    Insurance
                  </span>
                  <span className="bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium" data-testid="service-payments">
                    Payments
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div id="management">
            <ManagementTeam />
          </div>

          {/* Board Committees */}
          <div className="mt-16" id="committees">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center" data-testid="committees-title">
              Board Committees
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {committees.map((committee, index) => (
                <Card key={index} data-testid={`committee-${index}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <i className={`${committee.icon} text-primary text-2xl mr-3`} data-testid={`committee-icon-${index}`}></i>
                      <h3 className="text-lg font-semibold text-gray-900" data-testid={`committee-title-${index}`}>
                        {committee.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm" data-testid={`committee-description-${index}`}>
                      {committee.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
