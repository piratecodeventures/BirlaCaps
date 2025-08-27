# Birla Capital and Financial Services Limited - Corporate Website

![Website Banner](https://img.shields.io/badge/Status-Production%20Ready-green) ![Node.js](https://img.shields.io/badge/Node.js-18%2B-blue) ![React](https://img.shields.io/badge/React-18.3.1-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-blue)

A comprehensive corporate website for Birla Capital and Financial Services Limited, featuring investor relations, document management, PDF viewing, grievance submission, and administrative capabilities.

## 🏢 About the Company

**Birla Capital and Financial Services Limited** is a leading financial services company in India, providing comprehensive banking, investment, and wealth management solutions. This website serves as the primary digital platform for stakeholder communication, investor relations, and corporate governance.

## ✨ Key Features

### 📊 **Investor Relations**
- **Annual Reports**: Complete financial reports with inline PDF viewing
- **Quarterly Results**: Up-to-date quarterly financial statements
- **Shareholding Patterns**: Detailed ownership structure reports
- **Corporate Governance**: Comprehensive governance documentation

### 📋 **Document Management**
- **PDF Viewer**: Embedded PDF viewing with zoom and download controls
- **Search Functionality**: Advanced document search and filtering
- **Download Tracking**: Monitor document download statistics
- **Version Control**: Multiple document versions and change history

### 🎯 **Grievance System**
- **Public Submission**: Easy grievance submission with file attachments
- **Status Tracking**: Real-time grievance status updates
- **Admin Management**: Comprehensive grievance handling dashboard
- **File Support**: Multiple file format support (PDF, DOC, images)

### 👥 **Corporate Information**
- **Board of Directors**: Detailed director profiles with DIN numbers
- **Company Promoters**: Comprehensive promoter information
- **Management Team**: Leadership team details and experience
- **Corporate Policies**: Complete policy repository

### 🛡️ **Administrative Dashboard**
- **Content Management**: Dynamic content updates
- **Document Upload**: Secure document management system
- **Grievance Handling**: Administrative grievance resolution tools
- **Analytics**: Comprehensive usage statistics and reporting

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18.0 or higher
- **npm** or **yarn** package manager
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd birla-capital-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Initialize the database**
   ```bash
   npm run db:push
   ```

5. **Seed sample data** (optional)
   ```bash
   # Start the server first
   npm run dev
   
   # In another terminal, seed the database
   curl -X POST http://localhost:5000/api/admin/seed
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to `http://localhost:5000`

## 🏗️ Technology Stack

### Frontend
- **React 18.3.1** - Modern React with hooks and functional components
- **TypeScript 5.6.3** - Full type safety across the application
- **Vite 5.4.19** - Fast build tool with hot module replacement
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Shadcn/ui** - Accessible component library built on Radix UI
- **TanStack Query 5.85.5** - Powerful server state management
- **Wouter 3.7.1** - Lightweight client-side routing
- **React Hook Form 7.62.0** - Performant form handling with validation

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js 4.21.2** - Web application framework
- **Drizzle ORM 0.39.3** - Type-safe database operations
- **SQLite/PostgreSQL** - Database options for development and production
- **Multer 2.0.2** - File upload handling with security validation
- **Zod** - Runtime type validation and schema parsing

### Development Tools
- **ESBuild 0.25.0** - Fast JavaScript bundler
- **Drizzle Kit 0.30.4** - Database migration and management
- **PostCSS** - CSS processing and optimization
- **Autoprefixer** - Automatic CSS vendor prefixing

## 📁 Project Structure

```
birla-capital-website/
├── client/                     # Frontend React application
│   ├── config/
│   │   └── data/              # Document configuration and PDF files
│   ├── public/                # Static assets
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── layout/        # Header, footer, navigation
│   │   │   ├── sections/      # Page sections and content blocks
│   │   │   ├── pdf/           # PDF viewer components
│   │   │   └── ui/            # Reusable UI components
│   │   ├── pages/             # Page components
│   │   │   ├── admin/         # Administrative pages
│   │   │   └── *.tsx          # Public pages
│   │   ├── hooks/             # Custom React hooks
│   │   ├── lib/               # Utility functions and helpers
│   │   └── styles/            # CSS and styling files
│   └── package.json           # Frontend dependencies
├── server/                     # Backend Express application
│   ├── index.ts               # Application entry point
│   ├── routes.ts              # API route definitions
│   ├── storage.ts             # Database operations interface
│   ├── db.ts                  # Database connection setup
│   └── seed-data.ts           # Sample data for development
├── shared/                     # Shared TypeScript definitions
│   └── schema.ts              # Database schema and types
├── uploads/                    # File upload directory
├── package.json               # Root dependencies and scripts
├── README.md                  # This file
├── WEBSITE_DOCUMENTATION.md   # Comprehensive technical documentation
└── DEPLOYMENT.md              # Production deployment guide
```

## 🔧 Available Scripts

### Development
```bash
npm run dev          # Start development server with hot reload
npm run check        # Type check TypeScript files
npm run db:push      # Push database schema changes
```

### Production
```bash
npm run build        # Build production bundle
npm start           # Start production server
```

### Database Management
```bash
npm run db:push      # Apply schema changes to database
npm run db:push --force  # Force apply changes (use carefully)
```

## 🌐 API Documentation

### Public Endpoints

#### Documents
- `GET /api/documents` - Get investor documents with filtering
- `GET /api/documents/search?q=term` - Search documents
- `GET /api/documents/:id/download` - Download document

#### Company Information
- `GET /api/announcements` - Get published announcements
- `GET /api/board-directors` - Get board of directors
- `GET /api/promoters` - Get company promoters
- `GET /api/company-info` - Get company information

#### Policies and Grievances
- `GET /api/policies` - Get corporate policies
- `POST /api/grievances` - Submit grievance with attachments

### Admin Endpoints
- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/grievances` - Manage grievances
- `POST /api/admin/documents` - Upload documents
- `POST /api/admin/policies` - Upload policies

## 🗄️ Database Schema

The application uses a comprehensive database schema with the following entities:

- **users** - Administrator accounts
- **investor_documents** - Financial reports and documents
- **grievances** - Public complaints and submissions
- **policies** - Corporate governance policies
- **announcements** - Company communications
- **company_info** - Dynamic company information
- **board_directors** - Board member information
- **promoters** - Company promoter details

For detailed schema information, see [WEBSITE_DOCUMENTATION.md](./WEBSITE_DOCUMENTATION.md).

## 🔐 Security Features

### File Upload Security
- **Type Validation**: Strict file type checking (PDF, DOC, images)
- **Size Limits**: Configurable upload size restrictions (10MB default)
- **Path Security**: Prevention of directory traversal attacks
- **Content Headers**: Secure content-type and caching headers

### API Security
- **Input Validation**: Zod schema validation for all inputs
- **Error Handling**: Sanitized error messages
- **SQL Injection Prevention**: Parameterized queries via Drizzle ORM
- **XSS Protection**: React's built-in security features

### Production Security
- **Environment Variables**: Secure configuration management
- **Database Connections**: Encrypted connection strings
- **Session Management**: Secure session handling
- **Content Security**: Proper HTTP security headers

## 🚀 Deployment

### Development Deployment
The application runs on a single port (5000) with both frontend and backend integrated.

### Production Deployment
The application is optimized for various hosting platforms:

1. **Static Hosting** (Hostinger, Netlify, Vercel)
2. **VPS/Cloud Servers** (AWS, DigitalOcean, Linode)
3. **Container Deployment** (Docker, Kubernetes)

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

### Environment Configuration
```bash
# Production environment variables
NODE_ENV=production
DATABASE_URL=postgresql://username:password@host:port/database
PORT=5000
```

## 📊 Performance Optimization

### Frontend Optimization
- **Code Splitting**: Dynamic imports for large components
- **Bundle Analysis**: Optimized JavaScript bundles
- **Image Optimization**: Proper image formats and sizing
- **Caching Strategy**: Aggressive caching for static assets

### Backend Optimization
- **Database Indexing**: Optimized database queries
- **File Serving**: Direct static file serving
- **Memory Management**: Efficient memory usage
- **Response Caching**: HTTP caching headers

## 🤝 Contributing

### Development Guidelines
1. **Code Standards**: Follow TypeScript and React best practices
2. **Component Design**: Single responsibility principle
3. **Type Safety**: Maintain full TypeScript coverage
4. **Testing**: Include data test IDs for all interactive elements

### Making Changes
1. Create a feature branch from `main`
2. Make your changes with proper TypeScript types
3. Test thoroughly in development environment
4. Update documentation if needed
5. Submit a pull request

## 📞 Support and Contact

For technical support or questions about the website:

- **Company**: Birla Capital and Financial Services Limited
- **Email**: info@bcfsl.com
- **Website**: [Company Website]
- **Technical Documentation**: [WEBSITE_DOCUMENTATION.md](./WEBSITE_DOCUMENTATION.md)

## 📄 License

This project is proprietary software of Birla Capital and Financial Services Limited. All rights reserved.

## 🔄 Version History

- **v2.0** (August 2025) - Production ready with optimized PDF handling
- **v1.5** (August 2025) - Enhanced document management and admin features
- **v1.0** (August 2025) - Initial release with core functionality

---

**Built with ❤️ for Birla Capital and Financial Services Limited**

*Last updated: August 2025*