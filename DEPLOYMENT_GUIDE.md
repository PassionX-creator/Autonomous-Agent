# 🚀 Autonomous AI Agent System - Deployment Guide

## 📋 Complete Setup Instructions

### **Prerequisites**
- Node.js 18+ installed
- Python 3.9+ installed
- VS Code (recommended)
- Git installed

## 🔧 **VS Code Setup (Step-by-Step)**

### **1. Download and Extract Project**
```bash
# Download the project ZIP file from Bolt
# Extract to your desired location
cd path/to/extracted/autonomous-ai-agent-system
```

### **2. Open in VS Code**
```bash
# Open the project in VS Code
code .
```

### **3. Install Frontend Dependencies**
```bash
# Install all React dependencies
npm install

# Start the development server
npm run dev
```

### **4. Setup Backend (Python FastAPI)**
```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt

# Copy environment file
cp .env.example .env
```

### **5. Configure Environment Variables**
Edit `backend/.env` file:
```env
# OpenAI API Key (Required)
OPENAI_API_KEY=your_openai_api_key_here

# News API Key (Optional)
NEWS_API_KEY=your_news_api_key_here

# Alpha Vantage API Key (Optional)
ALPHA_VANTAGE_API_KEY=your_alpha_vantage_key_here

# Database Configuration
DATABASE_URL=postgresql://user:password@localhost:5432/ai_agent_db

# Redis Configuration (Optional)
REDIS_URL=redis://localhost:6379

# Application Settings
DEBUG=True
SECRET_KEY=your_secret_key_here
```

### **6. Start Backend Server**
```bash
# From backend directory
python run.py

# Or using uvicorn directly
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### **7. Verify Setup**
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs

## 🐳 **Docker Deployment (Recommended for Production)**

### **1. Using Docker Compose**
```bash
# From project root
cd backend
docker-compose up -d

# This starts:
# - PostgreSQL database
# - Redis cache
# - FastAPI backend
# - Nginx reverse proxy
```

### **2. Manual Docker Build**
```bash
# Build backend image
cd backend
docker build -t ai-agent-backend .

# Run with environment variables
docker run -d \
  -p 8000:8000 \
  -e OPENAI_API_KEY=your_key \
  -e DATABASE_URL=your_db_url \
  ai-agent-backend
```

## ☁️ **Cloud Deployment**

### **Frontend Deployment (Vercel)**
```bash
# Install Vercel CLI
npm install -g vercel

# Build and deploy
npm run build
vercel --prod

# Or connect GitHub repository to Vercel dashboard
```

### **Frontend Deployment (Netlify)**
```bash
# Build the project
npm run build

# Deploy to Netlify
# 1. Connect GitHub repository
# 2. Set build command: npm run build
# 3. Set publish directory: dist
```

### **Backend Deployment (Render)**
```bash
# 1. Connect GitHub repository to Render
# 2. Create new Web Service
# 3. Set build command: pip install -r requirements.txt
# 4. Set start command: uvicorn main:app --host 0.0.0.0 --port $PORT
# 5. Add environment variables in Render dashboard
```

### **Backend Deployment (Heroku)**
```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create new app
heroku create your-ai-agent-app

# Add PostgreSQL addon
heroku addons:create heroku-postgresql:hobby-dev

# Set environment variables
heroku config:set OPENAI_API_KEY=your_key
heroku config:set NEWS_API_KEY=your_key

# Deploy
git push heroku main
```

## 🗄️ **Database Setup**

### **PostgreSQL (Production)**
```sql
-- Create database
CREATE DATABASE ai_agent_db;

-- Create user
CREATE USER ai_agent_user WITH PASSWORD 'secure_password';

-- Grant permissions
GRANT ALL PRIVILEGES ON DATABASE ai_agent_db TO ai_agent_user;
```

### **SQLite (Development)**
```bash
# SQLite database will be created automatically
# Location: backend/ai_agent.db
```

## 🔑 **API Keys Setup**

### **Required APIs:**
1. **OpenAI API** (Essential)
   - Visit: https://platform.openai.com/api-keys
   - Create new API key
   - Add to `.env` as `OPENAI_API_KEY`

2. **NewsAPI** (Optional)
   - Visit: https://newsapi.org/register
   - Get free API key
   - Add to `.env` as `NEWS_API_KEY`

3. **Alpha Vantage** (Optional)
   - Visit: https://www.alphavantage.co/support/#api-key
   - Get free API key
   - Add to `.env` as `ALPHA_VANTAGE_API_KEY`

## 🧪 **Testing the Setup**

### **1. Frontend Tests**
```bash
# Run frontend tests
npm test

# Run with coverage
npm run test:coverage
```

### **2. Backend Tests**
```bash
# From backend directory
pytest tests/

# Run with coverage
pytest --cov=. tests/
```

### **3. Integration Tests**
```bash
# Test API endpoints
curl http://localhost:8000/health
curl http://localhost:8000/ai-models/

# Test frontend connection
# Open browser to http://localhost:5173
# Check browser console for errors
```

## 🔧 **Troubleshooting**

### **Common Issues:**

1. **Port Already in Use**
   ```bash
   # Kill process on port 3000/5173
   npx kill-port 5173
   
   # Kill process on port 8000
   npx kill-port 8000
   ```

2. **Python Virtual Environment Issues**
   ```bash
   # Recreate virtual environment
   rm -rf venv
   python -m venv venv
   source venv/bin/activate  # or venv\Scripts\activate on Windows
   pip install -r requirements.txt
   ```

3. **Database Connection Issues**
   ```bash
   # Check PostgreSQL status
   pg_ctl status
   
   # Restart PostgreSQL
   brew services restart postgresql  # macOS
   sudo service postgresql restart   # Linux
   ```

4. **API Key Issues**
   ```bash
   # Verify environment variables are loaded
   echo $OPENAI_API_KEY
   
   # Check .env file exists and has correct format
   cat backend/.env
   ```

## 📊 **Performance Optimization**

### **Frontend Optimization**
```bash
# Analyze bundle size
npm run build
npx vite-bundle-analyzer dist/

# Optimize images
npm install -D imagemin imagemin-webp
```

### **Backend Optimization**
```bash
# Install performance monitoring
pip install prometheus-client
pip install uvicorn[standard]

# Use production ASGI server
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker
```

## 🔒 **Security Configuration**

### **Environment Security**
```bash
# Generate secure secret key
python -c "import secrets; print(secrets.token_urlsafe(32))"

# Set secure headers in production
# Add to main.py:
# app.add_middleware(SecurityHeadersMiddleware)
```

### **Database Security**
```sql
-- Create read-only user for analytics
CREATE USER analytics_user WITH PASSWORD 'secure_password';
GRANT SELECT ON ALL TABLES IN SCHEMA public TO analytics_user;
```

## 📈 **Monitoring & Logging**

### **Application Monitoring**
```bash
# Install monitoring tools
pip install prometheus-client
pip install structlog

# Add health check endpoints
# GET /health
# GET /metrics
```

### **Log Configuration**
```python
# Add to main.py
import logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
```

## 🚀 **Production Checklist**

- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] SSL certificates installed
- [ ] Monitoring setup
- [ ] Backup strategy implemented
- [ ] Error tracking configured
- [ ] Performance monitoring active
- [ ] Security headers configured
- [ ] Rate limiting implemented
- [ ] API documentation updated

## 📞 **Support**

For issues or questions:
1. Check the troubleshooting section above
2. Review application logs
3. Check API documentation at `/docs`
4. Verify all environment variables are set
5. Ensure all dependencies are installed

---

**🎉 Congratulations! Your Autonomous AI Agent System is now ready for production use!**