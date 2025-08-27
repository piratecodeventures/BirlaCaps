import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-6">
              <div className="bg-white text-primary px-4 py-2 rounded font-bold text-xl">
                BIRLA CAPS
              </div>
            </div>
            <p className="text-blue-100">
              A financial services company empowering India's financial future
              through innovative solutions and governance excellence.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-blue-200 hover:text-white transition-colors"
                  data-testid="footer-about"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/investor-relations"
                  className="text-blue-200 hover:text-white transition-colors"
                  data-testid="footer-investor"
                >
                  Investor Relations
                </Link>
              </li>
              <li>
                <Link
                  href="/policies"
                  className="text-blue-200 hover:text-white transition-colors"
                  data-testid="footer-policies"
                >
                  Policies
                </Link>
              </li>
              <li>
                <Link
                  href="/grievances"
                  className="text-blue-200 hover:text-white transition-colors"
                  data-testid="footer-grievances"
                >
                  Grievances
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Corporate</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/board-directors"
                  className="text-blue-200 hover:text-white transition-colors"
                  data-testid="footer-board"
                >
                  Board of Directors
                </Link>
              </li>
              <li>
                <Link
                  href="/company-secretary"
                  className="text-blue-200 hover:text-white transition-colors"
                  data-testid="footer-secretary"
                >
                  Company Secretary
                </Link>
              </li>
              <li>
                <Link
                  href="/policies"
                  className="text-blue-200 hover:text-white transition-colors"
                  data-testid="footer-governance"
                >
                  Governance
                </Link>
              </li>
              <li>
                <Link
                  href="/grievances"
                  className="text-blue-200 hover:text-white transition-colors"
                  data-testid="footer-complaints"
                >
                  Investor Grievances
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="text-blue-200">
                <p className="mb-2">📍 5th Floor, 159, Industry House</p>
                <p className="mb-2">Churchgate Reclamation, Mumbai - 400020</p>
                <p className="mb-2">📞 +91 22 6665 1234</p>
                <p className="mb-2">✉️ info@birlainternational.net</p>
                <p>🌐 CIN: L51900MH1985PLC036156</p>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="border-t border-blue-600 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-blue-200 mb-4 md:mb-0">
              © 2024 Birla Capital and Financial Services Limited. All rights
              reserved.
            </p>
            <div className="flex flex-wrap gap-4">
              <span className="text-blue-200 text-sm">BSE: 533519</span>
              <span className="text-blue-200 text-sm">ISIN: INE860H01027</span>
              <span className="text-blue-200 text-sm">
                Listed on BSE Limited
              </span>
            </div> 
          </div> 
        </div>*/}
      </div>
    </footer>
  );
}
