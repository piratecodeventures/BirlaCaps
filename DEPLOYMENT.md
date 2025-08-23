# Production Deployment Guide

This guide provides step-by-step instructions for deploying the Birla Capital and Financial Services Limited website to production servers.

## Prerequisites

- Node.js 20.x or higher
- PostgreSQL database
- Domain name (optional)
- SSL certificate (recommended)

## Environment Setup

1. **Copy Environment Variables**
   ```bash
   cp .env.example .env
   ```

2. **Configure Required Variables**
   ```bash
   # Essential configuration
   NODE_ENV=production
   PORT=5000
   DATABASE_URL=postgresql://username:password@hostname:port/database_name
   
   # Security (recommended)
   ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
   SESSION_SECRET=generate-a-secure-random-string-here
   ```

## Database Setup

1. **Create PostgreSQL Database**
   ```sql
   CREATE DATABASE birla_capital;
   CREATE USER birla_user WITH ENCRYPTED PASSWORD 'secure_password';
   GRANT ALL PRIVILEGES ON DATABASE birla_capital TO birla_user;
   ```

2. **Push Database Schema**
   ```bash
   npm run db:push
   ```

## Build Process

1. **Install Dependencies**
   ```bash
   npm install --production
   ```

2. **Build Application**
   ```bash
   npm run build
   ```

3. **Verify Build**
   - Check `dist/` directory exists
   - Verify `dist/public/` contains static files
   - Confirm `dist/index.js` is the server bundle

## Deployment Options

### Option 1: Direct Node.js Deployment

1. **Start Application**
   ```bash
   NODE_ENV=production PORT=5000 node dist/index.js
   ```

2. **Use Process Manager (PM2)**
   ```bash
   npm install -g pm2
   pm2 start dist/index.js --name "birla-capital" --env production
   pm2 save
   pm2 startup
   ```

### Option 2: Docker Deployment

1. **Create Dockerfile**
   ```dockerfile
   FROM node:20-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm install --production
   COPY . .
   RUN npm run build
   EXPOSE 5000
   CMD ["node", "dist/index.js"]
   ```

2. **Build and Run**
   ```bash
   docker build -t birla-capital .
   docker run -d -p 5000:5000 --env-file .env birla-capital
   ```

### Option 3: Cloud Platform Deployment

#### Vercel
```json
{
  "version": 2,
  "builds": [
    { "src": "dist/index.js", "use": "@vercel/node" }
  ],
  "routes": [
    { "src": "/(.*)", "dest": "/dist/index.js" }
  ]
}
```

#### Railway
- Connect GitHub repository
- Set environment variables in dashboard
- Deploy automatically from main branch

#### DigitalOcean App Platform
- Create app from GitHub
- Configure environment variables
- Set build command: `npm run build`
- Set run command: `node dist/index.js`

## Reverse Proxy Setup (Nginx)

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com;
    
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Performance Optimizations

### 1. Enable Gzip Compression
Most reverse proxies handle this, but for direct deployment:
```bash
# In your server configuration
compression: true
```

### 2. Database Connection Pooling
The application uses connection pooling by default with Drizzle ORM.

### 3. Static File Caching
- Static files are cached for 1 year in production
- HTML files are not cached to ensure updates
- PDF files are cached for 1 day
- Excel files are cached for 1 hour

## Security Checklist

- ✅ Environment variables are set correctly
- ✅ Database credentials are secure
- ✅ HTTPS is enabled (recommended)
- ✅ Security headers are configured
- ✅ CORS is properly configured
- ✅ File upload limits are set
- ✅ Error messages don't expose sensitive information

## Health Monitoring

The application provides a health check endpoint:
```bash
GET /health
```

Response:
```json
{
  "status": "healthy",
  "timestamp": "2025-08-23T12:00:00.000Z",
  "environment": "production",
  "uptime": 3600,
  "version": "1.0.0"
}
```

## Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Kill process on port 5000
   sudo lsof -t -i tcp:5000 | xargs kill -9
   ```

2. **Database Connection Failed**
   - Verify DATABASE_URL format
   - Check database server is running
   - Ensure user has proper permissions

3. **Static Files Not Loading**
   - Verify `npm run build` completed successfully
   - Check `dist/public/` directory exists
   - Ensure correct file permissions

4. **PDF Files Not Accessible**
   - Verify `config/data/` directory exists
   - Check file permissions for PDF files
   - Ensure static file serving is configured

### Logs and Debugging

- Application logs are written to stdout/stderr
- Use PM2 for log management: `pm2 logs birla-capital`
- Health check endpoint for monitoring
- Error details are logged in development mode

## Backup Strategy

1. **Database Backups**
   ```bash
   # Daily backup
   pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql
   ```

2. **File Backups**
   ```bash
   # Backup document files
   tar -czf documents_backup_$(date +%Y%m%d).tar.gz config/data/
   ```

## Scaling Considerations

- Use load balancer for multiple instances
- Implement Redis for session storage
- Consider CDN for static file delivery
- Monitor database performance and scale as needed

## Support

For deployment issues or questions, check the application logs and health endpoint first. The application is designed to fail fast with clear error messages for troubleshooting.