# Church App Backend

A Node.js/Express backend API for the Church App, built with Firebase for authentication and database.

## 🚀 Features

- **Firebase Integration**: Authentication and Firestore database
- **JWT Authentication**: Secure token-based authentication
- **RESTful API**: Complete CRUD operations for all features
- **Stripe Integration**: Payment processing for donations
- **File Upload**: Cloudinary integration for media files
- **Security**: Helmet, CORS, rate limiting, input validation
- **Real-time**: Socket.io for chat functionality

## 📋 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - User logout

### Events
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get event by ID
- `POST /api/events` - Create event (Admin only)
- `PUT /api/events/:id` - Update event (Admin only)
- `DELETE /api/events/:id` - Delete event (Admin only)
- `POST /api/events/:id/register` - Register for event
- `DELETE /api/events/:id/register` - Unregister from event

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

### Users
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get user by ID

## 🛠 Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Configuration
Copy the example environment file and configure your variables:
```bash
cp env.example .env
```

Update the `.env` file with your actual values:
- Firebase project configuration
- JWT secret key
- Stripe API keys
- Cloudinary credentials (optional)
- Email configuration (optional)

### 3. Firebase Setup
1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication and Firestore
3. Download your service account key from Project Settings > Service Accounts
4. Add the service account key to your `.env` file

### 4. Start the Server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

## 🔧 Configuration

### Firebase Configuration
The backend uses Firebase Admin SDK for:
- User authentication
- Firestore database
- File storage

### Security Features
- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Input Validation**: Express-validator for all inputs
- **JWT Authentication**: Secure token-based auth

### Database Schema

#### Users Collection
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

#### Events Collection
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

#### Donations Collection
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

## 🚀 Deployment

### Environment Variables for Production
Make sure to set these environment variables in production:
- `NODE_ENV=production`
- `JWT_SECRET` (strong secret key)
- `FIREBASE_SERVICE_ACCOUNT_KEY` (full JSON)
- `STRIPE_SECRET_KEY` (live key for production)

### Deployment Platforms
- **Heroku**: Easy deployment with Git
- **Vercel**: Serverless deployment
- **Railway**: Simple container deployment
- **DigitalOcean**: VPS deployment

## 📝 API Documentation

### Authentication Headers
For protected routes, include the JWT token in the header:
```
x-auth-token: your-jwt-token-here
```

### Response Format
All API responses follow this format:
```javascript
{
  "success": true,
  "data": {...},
  "message": "Success message"
}
```

### Error Format
```javascript
{
  "success": false,
  "message": "Error message",
  "errors": [...] // Validation errors
}
```

## 🔒 Security Considerations

1. **JWT Secret**: Use a strong, unique secret key
2. **Firebase Rules**: Configure proper Firestore security rules
3. **Rate Limiting**: Adjust limits based on your needs
4. **CORS**: Configure allowed origins properly
5. **Input Validation**: All inputs are validated
6. **HTTPS**: Use HTTPS in production

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

## 📞 Support

For issues and questions:
1. Check the Firebase documentation
2. Review the API endpoints
3. Check the environment configuration
4. Verify your Firebase project setup

## 📄 License

MIT License - see LICENSE file for details
