# Birla Capital and Financial Services Limited Corporate Website

## Overview

This is a corporate website for Birla Capital and Financial Services Limited, a leading financial services company in India. The website serves as a comprehensive platform for investor relations, corporate governance, and stakeholder communication. It features document management for financial reports, policy repositories, grievance submission systems, and detailed company information presentation.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (August 21, 2025)

✓ Updated company name throughout application from "Aditya Birla Capital Limited (Birla Caps)" to "Birla Capital and Financial Services Limited"
✓ Changed brand logos from "BIRLA CAPS" to "BCFSL" across header, footer, and hero sections
✓ Updated all references in pages (About, Home, Board Directors, etc.) to use the new company name
✓ Modified contact information to reflect new company branding (email: info@bcfsl.com)
✓ Updated seed data, documentation, and configuration files with new company name
✓ Maintained consistent corporate identity and contact details throughout the application

## Previous Changes (August 20, 2025)

✓ Implemented comprehensive website navigation structure as per client document requirements
✓ Updated header navigation with dropdown menus for About Us, Investor Relations, and Code & Policies
✓ Expanded About page with all required sections: Company Details, Mission/Vision, Management, Promoters, Compliance Officer, and Board Committees
✓ Enhanced Investor Relations page with comprehensive sections: Annual Reports, Annual Returns, Shareholding Pattern, Quarterly Results, Corporate Governance Reports, Offer Documents, and Familiarization Programme
✓ Created complete Code & Policies page with all 10 policy sections as specified
✓ Updated Company Secretary page with detailed contact information structure
✓ Maintained authentic board director information and contact details
✓ All navigation links now properly route to appropriate sections within pages

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Library**: Shadcn/ui components with Radix UI primitives for accessible, customizable components
- **Styling**: Tailwind CSS with custom design tokens for corporate branding
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation for type-safe form management

### Backend Architecture
- **Runtime**: Node.js with Express.js for the REST API server
- **Database ORM**: Drizzle ORM with PostgreSQL dialect for type-safe database operations
- **File Handling**: Multer middleware for file uploads with local storage and security validation
- **API Design**: RESTful endpoints organized by domain (documents, grievances, policies, announcements)

### Database Schema Design
The application uses a PostgreSQL database with the following key entities:
- **Users**: Admin authentication with role-based access control
- **Investor Documents**: Financial reports with metadata, versioning, and download tracking
- **Grievances**: Public complaint system with status tracking and file attachments
- **Policies**: Corporate governance documents with version control
- **Announcements**: Company communications and updates
- **Company Info**: Dynamic content management for corporate information
- **Board Directors**: Real board of directors information with DIN numbers and experience details
- **Promoters**: Company promoters categorized as individuals or companies

### Component Architecture
- **Layout Components**: Reusable header, footer, and navigation with responsive design
- **Page Components**: Route-specific components for different sections (About, Investor Relations, Board & Promoters, etc.)
- **UI Components**: Consistent design system using Shadcn/ui for forms, cards, buttons, and data display
- **Section Components**: Modular content blocks like hero sections, statistics, and management team displays
- **Data Display Components**: Director cards with DIN badges, promoter categorization, and company information cards

### File Upload System
- **Security**: File type validation for documents (PDF, DOC, images) with size limits
- **Storage**: Local file system with organized directory structure
- **Access Control**: Secure file serving with appropriate headers for downloads

### Data Management Patterns
- **Type Safety**: End-to-end TypeScript with Zod schemas for runtime validation
- **Caching**: Query-based caching with TanStack Query for optimal performance
- **Error Handling**: Consistent error boundaries and user feedback systems

## External Dependencies

### Database
- **Neon Database**: Serverless PostgreSQL database with connection pooling
- **Drizzle Kit**: Database migrations and schema management

### UI and Styling
- **Radix UI**: Unstyled, accessible UI primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Modern icon library

### Development Tools
- **Vite**: Fast build tool with TypeScript support
- **Replit Integration**: Development environment plugins for Replit platform

### File Processing
- **Multer**: Multipart form data handling for file uploads
- **File System**: Node.js native file operations for document storage

### Form and Validation
- **React Hook Form**: Performance-optimized form library
- **Zod**: TypeScript-first schema validation

The architecture emphasizes type safety, performance, and maintainability while providing a comprehensive corporate website solution for financial services compliance and stakeholder communication.