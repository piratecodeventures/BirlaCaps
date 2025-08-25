# Birla Capital and Financial Services - Client Application

This is a fully self-contained client application that includes all server functionality built-in. No separate backend server is required.

## Features

- ✅ Complete investor relations portal
- ✅ Document management (Annual Reports, Quarterly Results, Grievance Reports)
- ✅ Announcement system
- ✅ Grievance submission and tracking
- ✅ Admin dashboard with statistics
- ✅ Board of Directors and Promoters information
- ✅ All data persisted in browser localStorage
- ✅ No server setup required

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the application:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   ```
   http://localhost:5173
   ```

That's it! The application includes all functionality and data built-in.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run check` - TypeScript type checking

## Data Persistence

All data is stored in browser localStorage and includes:
- All historical annual reports (2019-2024)
- Quarterly financial results
- Investor grievance reports for multiple years
- Company announcements and notifications
- Grievance submissions and tracking
- Admin statistics and dashboard data

## No Server Required

This application runs entirely in the browser with no backend dependencies:
- No database setup needed
- No API server required
- All business logic runs client-side
- Data persists across browser sessions
- Works offline after initial load

## Deployment

Simply build and host the static files on any web server:

```bash
npm run build
```

The `dist` folder contains all files needed for deployment.