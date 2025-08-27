# Church App Backend Setup Guide

## 🎉 Backend Successfully Created!

Your Firebase-based backend is now ready! Here's everything you need to know:

## 📁 Backend Structure

```
backend/
├── config/
│   └── firebase.js          # Firebase configuration
├── middleware/
│   └── auth.js              # JWT authentication middleware
├── routes/
│   ├── auth.js              # Authentication routes
│   ├── users.js             # User management
│   ├── events.js            # Events management
│   ├── announcements.js     # Announcements
│   ├── donations.js         # Donations with Stripe
│   ├── prayers.js           # Prayer wall
│   ├── sermons.js           # Sermon archive
│   └── chat.js              # Chat functionality
├── server.js                # Main server file
├── package.json             # Dependencies
├── env.example              # Environment variables template
└── README.md                # Detailed documentation
```

## 🚀 Quick Start

### 1. Install Dependencies ✅
```bash
cd backend
npm install
```

### 2. Set Up Environment Variables
```bash
# Copy the example file
cp env.example .env

# Edit the .env file with your actual values
```

### 3. Configure Firebase
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing one
3. Enable Authentication and Firestore
4. Download service account key from Project Settings > Service Accounts
5. Add the key to your `.env` file

### 4. Start the Backend
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## 🔧 Environment Variables

Create a `.env` file in the backend directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL
FRONTEND_URL=http://localhost:8081

# JWT Secret (generate a strong secret)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Firebase Configuration
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com

# Firebase Service Account (for production)
FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"..."}

# Stripe Configuration (optional for donations)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
```

## 📋 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - User logout

### Events
- `GET /api/events` - Get all events
- `POST /api/events` - Create event (Admin only)
- `PUT /api/events/:id` - Update event (Admin only)
- `DELETE /api/events/:id` - Delete event (Admin only)
- `POST /api/events/:id/register` - Register for event

### Announcements
- `GET /api/announcements` - Get all announcements
- `POST /api/announcements` - Create announcement (Admin only)

### Donations
- `GET /api/donations` - Get all donations (Admin only)
- `POST /api/donations` - Create donation with Stripe

### Prayers
- `GET /api/prayers` - Get all prayer requests
- `POST /api/prayers` - Create prayer request
- `POST /api/prayers/:id/pray` - Mark prayer as prayed for

### Sermons
- `GET /api/sermons` - Get all sermons
- `POST /api/sermons` - Create sermon (Admin only)

### Chat
- `GET /api/chat/messages` - Get chat messages
- `POST /api/chat/messages` - Send message

## 🔗 Connect Frontend to Backend

### Update Frontend API Configuration

Create a new file `src/services/api.js` in your frontend:

```javascript
const API_BASE_URL = 'http://localhost:5000/api';

export const api = {
  // Authentication
  register: (userData) => fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  }),
  
  login: (credentials) => fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  }),
  
  getCurrentUser: (token) => fetch(`${API_BASE_URL}/auth/me`, {
    headers: { 'x-auth-token': token }
  }),
  
  // Events
  getEvents: () => fetch(`${API_BASE_URL}/events`),
  
  createEvent: (eventData, token) => fetch(`${API_BASE_URL}/events`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'x-auth-token': token
    },
    body: JSON.stringify(eventData)
  }),
  
  // Add more API methods as needed...
};
```

## 🧪 Test the Backend

### Health Check
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "Church App Backend with Firebase is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Test Authentication
```bash
# Register a user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based auth
- **Input Validation**: All inputs validated with express-validator
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **CORS Protection**: Configured for your frontend domain
- **Helmet Security**: Security headers
- **Firebase Security**: Firestore security rules

## 🚀 Deployment Options

### 1. Heroku
```bash
# Create Heroku app
heroku create your-church-app-backend

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your-production-secret
heroku config:set FIREBASE_SERVICE_ACCOUNT_KEY='{"type":"service_account",...}'

# Deploy
git push heroku main
```

### 2. Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

### 3. Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

## 📊 Database Schema

The backend uses Firebase Firestore with these collections:

### Users
```javascript
{
  uid: string,
  email: string,
  firstName: string,
  lastName: string,
  phone: string,
  role: 'user' | 'admin',
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### Events
```javascript
{
  title: string,
  description: string,
  date: timestamp,
  location: string,
  imageUrl: string,
  maxAttendees: number,
  attendees: string[],
  createdBy: string,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### Donations
```javascript
{
  userId: string,
  amount: number,
  paymentIntentId: string,
  status: string,
  message: string,
  createdAt: timestamp
}
```

## 🔧 Troubleshooting

### Common Issues

1. **Firebase Connection Error**
   - Check your Firebase project ID
   - Verify service account key is correct
   - Ensure Firestore is enabled

2. **CORS Error**
   - Update `FRONTEND_URL` in `.env`
   - Check CORS configuration in `server.js`

3. **JWT Token Error**
   - Verify `JWT_SECRET` is set
   - Check token format in requests

4. **Port Already in Use**
   - Change `PORT` in `.env`
   - Kill existing processes: `pkill -f node`

## 📞 Next Steps

1. **Configure Firebase**: Set up your Firebase project
2. **Update Frontend**: Connect your React Native app to the backend
3. **Test APIs**: Use Postman or curl to test all endpoints
4. **Deploy**: Choose a deployment platform
5. **Monitor**: Set up logging and monitoring

## 🎯 Your Backend is Ready!

Your Firebase-based backend is now fully configured with:
- ✅ Complete API endpoints
- ✅ Firebase integration
- ✅ JWT authentication
- ✅ Security middleware
- ✅ Input validation
- ✅ Error handling
- ✅ Documentation

Start the backend with `npm run dev` and begin integrating with your frontend!
