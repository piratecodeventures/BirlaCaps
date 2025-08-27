# Birla Capital and Financial Services Limited - Complete Website Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture Overview](#architecture-overview)
3. [Frontend Structure](#frontend-structure)
4. [Backend Structure](#backend-structure)
5. [Database Schema](#database-schema)
6. [API Documentation](#api-documentation)
7. [File Management System](#file-management-system)
8. [Deployment Configuration](#deployment-configuration)
9. [Development Guidelines](#development-guidelines)
10. [Security Features](#security-features)

## Project Overview

### Company Information
- **Company Name**: Birla Capital and Financial Services Limited
- **Website Purpose**: Corporate website for investor relations, governance, and stakeholder communication
- **Primary Functions**: Document management, PDF viewing, grievance submission, and corporate information display

### Key Features
- **Document Management**: Annual reports, quarterly results, policies, and regulatory documents
- **PDF Viewer**: Inline PDF viewing with download capabilities
- **Investor Relations**: Comprehensive financial reports and governance documents
- **Grievance System**: Public complaint submission with file attachments
- **Admin Dashboard**: Content management and grievance handling
- **Board Information**: Directors and promoters information with authentic data
- **Corporate Governance**: Policy repositories and compliance documentation

## Architecture Overview

### Technology Stack

#### Frontend
- **Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 5.4.19 with hot module replacement
- **UI Library**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS 3.4.17 with custom design tokens
- **State Management**: TanStack Query (React Query) v5.85.5
- **Routing**: Wouter 3.7.1 for lightweight client-side routing
- **Form Handling**: React Hook Form 7.62.0 with Zod validation
- **Icons**: Lucide React 0.453.0

#### Backend
- **Runtime**: Node.js with Express.js 4.21.2
- **Database**: SQLite with Better-SQLite3 (development) / PostgreSQL (production)
- **ORM**: Drizzle ORM 0.39.3 with Drizzle-Zod integration
- **File Upload**: Multer 2.0.2 with security validation
- **Session Management**: Express-session with SQLite/PostgreSQL store

#### Development Tools
- **TypeScript**: 5.6.3 for end-to-end type safety
- **Package Manager**: npm with package-lock.json
- **Database Migrations**: Drizzle Kit 0.30.4
- **Build System**: ESBuild 0.25.0 for production builds

## Frontend Structure

### Directory Organization
```
client/
├── config/
│   └── data/
│       ├── documents.yaml          # Document configuration
│       └── [PDF files]            # Static PDF assets
├── public/                        # Static assets
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── header.tsx         # Navigation with dropdowns
│   │   │   └── footer.tsx         # Corporate footer
│   │   ├── sections/
│   │   │   ├── hero.tsx           # Homepage hero section
│   │   │   ├── stats.tsx          # Company statistics
│   │   │   └── management-team.tsx # Management display
│   │   ├── pdf/
│   │   │   └── pdf-viewer.tsx     # PDF viewing component
│   │   └── ui/                    # Shadcn/ui components
│   ├── pages/
│   │   ├── admin/
│   │   │   └── dashboard.tsx      # Admin interface
│   │   ├── home.tsx               # Homepage
│   │   ├── about.tsx              # Company information
│   │   ├── board-directors.tsx    # Board of directors
│   │   ├── company-secretary.tsx  # Company secretary info
│   │   ├── contact-us.tsx         # Contact information
│   │   ├── grievances.tsx         # Grievance submission
│   │   ├── investor-relations.tsx # Financial documents
│   │   ├── policies.tsx           # Corporate policies
│   │   └── not-found.tsx          # 404 page
│   ├── hooks/                     # Custom React hooks
│   ├── lib/                       # Utility functions
│   └── styles/                    # CSS and styling
```

### Component Architecture

#### Page Components
- **Modular Design**: Each page is a self-contained component
- **Data Fetching**: TanStack Query for server state management
- **Error Handling**: Consistent error boundaries and loading states
- **Responsive Design**: Mobile-first approach with Tailwind CSS

#### Layout Components
- **Header**: Dynamic navigation with dropdown menus for different sections
- **Footer**: Corporate branding and contact information
- **PDF Viewer**: Embedded PDF display with zoom and download controls

#### UI Components
- **Design System**: Consistent Shadcn/ui components
- **Accessibility**: WCAG compliant with proper ARIA labels
- **Theme Support**: Light/dark mode capability (configured but not actively used)

### Routing Configuration
```typescript
// App.tsx - Route definitions
<Route path="/" component={Home} />
<Route path="/about" component={About} />
<Route path="/board-directors" component={BoardDirectors} />
<Route path="/company-secretary" component={CompanySecretary} />
<Route path="/contact-us" component={ContactUs} />
<Route path="/grievances" component={Grievances} />
<Route path="/investor-relations" component={InvestorRelations} />
<Route path="/policies" component={Policies} />
<Route path="/admin/*" component={AdminDashboard} />
```

## Backend Structure

### Server Architecture
```
server/
├── index.ts           # Application entry point
├── routes.ts          # API route definitions
├── storage.ts         # Database operations interface
├── db.ts              # Database connection setup
├── seed-data.ts       # Sample data for development
└── vite.ts            # Vite integration for development
```

### Database Layer

#### Storage Interface
The `storage.ts` file provides a clean interface for all database operations:

```typescript
interface IStorage {
  // Document operations
  getInvestorDocuments(filters?: any): Promise<InvestorDocument[]>
  createInvestorDocument(data: InsertInvestorDocument): Promise<InvestorDocument>
  
  // Grievance operations
  createGrievance(data: InsertGrievance): Promise<Grievance>
  getGrievances(status?: string): Promise<Grievance[]>
  
  // Policy operations
  getPolicies(): Promise<Policy[]>
  createPolicy(data: InsertPolicy): Promise<Policy>
  
  // Board and company data
  getBoardDirectors(): Promise<BoardDirector[]>
  getPromoters(): Promise<Promoter[]>
  getCompanyInfo(section?: string): Promise<CompanyInfo[]>
}
```

## Database Schema

### Tables Overview

#### Core Entities
1. **users** - Admin authentication
2. **investor_documents** - Financial reports and documents
3. **grievances** - Public complaints and submissions
4. **policies** - Corporate governance documents
5. **announcements** - Company communications
6. **company_info** - Dynamic content management
7. **board_directors** - Board of directors information
8. **promoters** - Company promoters data

#### Schema Details

##### Users Table
```sql
CREATE TABLE users (
  id TEXT PRIMARY KEY DEFAULT (hex(randomblob(16))),
  username TEXT(50) NOT NULL UNIQUE,
  email TEXT(255) NOT NULL UNIQUE,
  password TEXT NOT NULL,
  role TEXT(20) NOT NULL DEFAULT 'user',
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);
```

##### Investor Documents Table
```sql
CREATE TABLE investor_documents (
  id TEXT PRIMARY KEY DEFAULT (hex(randomblob(16))),
  title TEXT(255) NOT NULL,
  type TEXT(50) NOT NULL,
  description TEXT,
  fiscal_year INTEGER,
  file_url TEXT(512) NOT NULL,
  file_name TEXT(255) NOT NULL,
  file_size TEXT(50),
  downloads INTEGER DEFAULT 0,
  version INTEGER DEFAULT 1,
  metadata JSON,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);
```

##### Grievances Table
```sql
CREATE TABLE grievances (
  id TEXT PRIMARY KEY DEFAULT (hex(randomblob(16))),
  name TEXT(100) NOT NULL,
  email TEXT(255) NOT NULL,
  phone TEXT(20) NOT NULL,
  grievance_type TEXT(50),
  subject TEXT(200) NOT NULL,
  description TEXT NOT NULL,
  attachments JSON,
  status TEXT(20) DEFAULT 'OPEN',
  assigned_to TEXT,
  resolution_deadline TEXT,
  resolution TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);
```

##### Board Directors Table
```sql
CREATE TABLE board_directors (
  id TEXT PRIMARY KEY DEFAULT (hex(randomblob(16))),
  name TEXT(255) NOT NULL,
  address TEXT NOT NULL,
  designation TEXT(100) NOT NULL,
  din TEXT(20) NOT NULL UNIQUE,
  experience TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);
```

## API Documentation

### Public Endpoints

#### Document Management
- `GET /api/documents` - Get investor documents with optional filters
- `GET /api/documents/search?q=term` - Search documents
- `GET /api/documents/:id/download` - Download document and increment counter

#### Policy Management
- `GET /api/policies` - Get all active policies
- `GET /api/policies/:id/download` - Download policy document

#### Company Information
- `GET /api/announcements` - Get published announcements
- `GET /api/company-info?section=section_name` - Get company information by section
- `GET /api/board-directors` - Get board of directors information
- `GET /api/promoters` - Get promoters information

#### Grievance Submission
- `POST /api/grievances` - Submit new grievance with file attachments

### Admin Endpoints (Protected)

#### Dashboard and Analytics
- `GET /api/admin/stats` - Get dashboard statistics
- `GET /api/admin/grievances` - Get all grievances with status filter
- `PATCH /api/admin/grievances/:id` - Update grievance status

#### Content Management
- `POST /api/admin/documents` - Upload new investor document
- `POST /api/admin/policies` - Upload new policy document
- `POST /api/admin/announcements` - Create new announcement
- `POST /api/admin/board-directors` - Add new board director
- `POST /api/admin/promoters` - Add new promoter

#### Database Management
- `POST /api/admin/seed` - Seed database with sample data

### Error Handling
All API endpoints return consistent error responses:
```json
{
  "message": "Error description",
  "errors": [] // Validation errors if applicable
}
```

## File Management System

### Upload Configuration
- **Maximum File Size**: 10MB per file
- **Allowed File Types**: PDF, JPG, JPEG, PNG, DOC, DOCX
- **Upload Directory**: `uploads/` for user submissions
- **Static Files**: `client/config/data/` for pre-configured documents

### PDF Serving Strategy
The application uses a hybrid approach for serving PDF files:

1. **Static File Serving**: Pre-configured documents served directly from `/config/data`
2. **Dynamic Upload Handling**: User-uploaded files served from `/uploads`
3. **Security Headers**: Appropriate content-type and caching headers
4. **Performance Optimization**: ETags and cache control for production

### File Security
- **Type Validation**: MIME type and extension verification
- **Size Limits**: Configurable file size restrictions
- **Secure Headers**: `X-Content-Type-Options: nosniff` and frame options
- **Access Control**: Proper file serving permissions

## Deployment Configuration

### Production Build
```bash
# Build frontend and backend
npm run build

# Start production server
npm start
```

### Environment Variables
- `NODE_ENV` - Environment mode (development/production)
- `DATABASE_URL` - PostgreSQL connection string (production)
- `PORT` - Server port (default: 5000)

### Static Hosting Preparation
The application is configured for static hosting deployment:

1. **Build Process**: Creates optimized production bundle in `dist/`
2. **Asset Management**: Static files properly referenced with relative paths
3. **File Structure**: Compatible with services like Hostinger static hosting
4. **PDF Configuration**: Direct file serving without server dependencies

### Production Optimizations
- **File Caching**: 1-day cache for PDFs, 1-hour for Excel files
- **Compression**: Gzip compression for static assets
- **Bundle Optimization**: Code splitting and tree shaking
- **Error Handling**: Production-ready error logging and handling

## Development Guidelines

### Code Standards
- **TypeScript**: Strict type checking enabled
- **ESLint**: Configured for React and TypeScript
- **Prettier**: Code formatting standards
- **Import Organization**: Path aliases for clean imports (`@/components`, `@shared`)

### Component Development
- **Single Responsibility**: Each component has a clear, focused purpose
- **Props Interface**: Well-defined TypeScript interfaces for all props
- **Error Boundaries**: Proper error handling at component level
- **Testing**: Data test IDs for all interactive elements

### Database Operations
- **Schema First**: Define schema in `shared/schema.ts` before implementation
- **Type Safety**: Use Drizzle-Zod for runtime validation
- **Migrations**: Use `npm run db:push` for schema changes
- **Transactions**: Proper error handling for database operations

### State Management
- **Server State**: TanStack Query for API data
- **Local State**: React useState for component-level state
- **Form State**: React Hook Form for complex forms
- **Cache Management**: Proper query invalidation strategies

## Security Features

### Authentication
- **Admin Access**: Basic authentication for admin routes
- **Session Management**: Secure session handling with Express-session
- **Password Security**: Proper password hashing (when implemented)

### File Upload Security
- **Type Validation**: Strict file type checking
- **Size Limits**: Configurable upload size restrictions
- **Secure Storage**: Proper file path handling to prevent directory traversal
- **Content Headers**: Security headers for served files

### API Security
- **Input Validation**: Zod schema validation for all inputs
- **Error Handling**: Sanitized error messages in production
- **Rate Limiting**: (Recommended for production implementation)
- **CORS Configuration**: Proper cross-origin request handling

### Data Protection
- **SQL Injection Prevention**: Parameterized queries via Drizzle ORM
- **XSS Protection**: React's built-in XSS protection
- **Content Security**: Proper content-type headers
- **Data Sanitization**: Input cleaning and validation

## Performance Considerations

### Frontend Optimization
- **Code Splitting**: Dynamic imports for large components
- **Image Optimization**: Proper image sizing and formats
- **Bundle Analysis**: Regular bundle size monitoring
- **Caching Strategy**: Aggressive caching for static assets

### Backend Optimization
- **Database Indexing**: Proper indexes on frequently queried columns
- **Query Optimization**: Efficient database queries
- **File Serving**: Direct static file serving for better performance
- **Memory Management**: Proper cleanup of uploaded files

### Production Monitoring
- **Error Logging**: Comprehensive error tracking
- **Performance Metrics**: Response time monitoring
- **Resource Usage**: Memory and CPU monitoring
- **File System**: Disk usage tracking for uploads

---

*This documentation is maintained by the Birla Capital and Financial Services Limited development team. Last updated: August 2025*