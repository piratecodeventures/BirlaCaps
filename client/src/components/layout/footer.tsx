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
            <p className="text-blue-100 mb-4">
              Leading financial services company empowering India's financial future through innovative solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-200 hover:text-white transition-colors" data-testid="social-facebook">
                <i className="fab fa-facebook-f text-xl"></i>
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors" data-testid="social-twitter">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors" data-testid="social-linkedin">
                <i className="fab fa-linkedin-in text-xl"></i>
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors" data-testid="social-youtube">
                <i className="fab fa-youtube text-xl"></i>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-blue-200 hover:text-white transition-colors" data-testid="footer-about">About Us</Link></li>
              <li><Link href="/investor-relations" className="text-blue-200 hover:text-white transition-colors" data-testid="footer-investor">Investor Relations</Link></li>
              <li><Link href="/policies" className="text-blue-200 hover:text-white transition-colors" data-testid="footer-policies">Policies</Link></li>
              <li><Link href="/grievances" className="text-blue-200 hover:text-white transition-colors" data-testid="footer-grievances">Grievances</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors" data-testid="footer-loans">Personal Loans</a></li>
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors" data-testid="footer-mutual-funds">Mutual Funds</a></li>
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors" data-testid="footer-insurance">Insurance</a></li>
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors" data-testid="footer-payments">Digital Payments</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <i className="fas fa-map-marker-alt mr-3"></i>
                <span className="text-blue-200">Birla Centre, Worli, Mumbai - 400030</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-phone mr-3"></i>
                <span className="text-blue-200">+91 22 6652 0000</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-envelope mr-3"></i>
                <span className="text-blue-200">info@birlacaps.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-600 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-blue-200 mb-4 md:mb-0">
              © 2024 Aditya Birla Capital Limited. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-blue-200 hover:text-white transition-colors" data-testid="footer-privacy">Privacy Policy</a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors" data-testid="footer-terms">Terms of Service</a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors" data-testid="footer-cookies">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
