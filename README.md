# SatireScope

**Automated Satirical News Posting to X (Twitter)**

![SatireScope OGP](https://private-us-east-1.manuscdn.com/sessionFile/sCH6hK6A482YnBvfMtrEP6/sandbox/5IqZhXhBgh3sRNW5ocRby7-img-1_1770843224000_na1fn_b2dwTXNhdGlyZXNjb3Bl.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvc0NINmhLNkE0ODJZbkJ2Zk10ckVQNi9zYW5kYm94LzVJcVpoWGhCZ2gzc1JOVzVvY1JieTctaW1nLTFfMTc3MDg0MzIyNDAwMF9uYTFmbl9iMmR3TXNhdGlyZXNjb3Bl.png~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=v5wLzLhhTHg-cJB7msnSe8nsH3gcde8PMerX5b19RtbQt3o8wTfi7Kyf2FpFPlfyFWv~MLZ5oCber4nGhrGcG74Su2tdBmNNU0BnSscDEPP-BMGGAfg4CosX03bQhz1NidnrCYP5Eny8LpR7Vhtson10mzqw6RpYtVzZ0LHxgYf3L-knF0lVhMimRvy65ucoaAhZRLszoigDG8gRN979baBfy-mBdhWp0BW1y0v1VjAQu80OVHkERDtQrfhnVSD3jyOvjndsEwvVS6gb2A7icekb4SP9FABKgHJrymLU6mNfR5EzGT06lFJrdMmldK-0rc8CXIjhjixwfJXnHducAA__)

---

## Overview

**SatireScope** is an intelligent automation platform that transforms breaking news into witty, satirical commentary and automatically posts them to X (Twitter). By combining cutting-edge AI language models, real-time news feeds, and sophisticated image generation, SatireScope delivers fresh, humorous takes on current events every hour—without manual intervention.

The platform is designed for content creators, satirical news accounts, and social media managers who want to maintain a consistent, engaging presence on X with minimal effort. SatireScope handles the entire workflow: fetching news, generating satirical commentary, creating custom images, posting to Twitter, and tracking engagement metrics.

---

## Key Features

### 🤖 Automated News Processing
- **Real-time News Fetching**: Integrates with News API to fetch the latest breaking news across multiple categories (technology, politics, business, entertainment, sports, health, science)
- **Intelligent Filtering**: Automatically filters and prioritizes newsworthy stories for satirical commentary
- **Scheduled Posting**: Configurable posting schedules with customizable intervals (hourly, daily, or custom timing)

### 🎨 AI-Powered Content Generation
- **Satirical Commentary**: Uses advanced LLM (Large Language Models) to generate witty, clever, and contextually appropriate satirical commentary on news stories
- **Image Generation**: Automatically creates custom, AI-generated images that complement the satirical narrative
- **Brand Consistency**: Maintains a consistent voice and style across all generated content

### 📱 Multi-Account Management
- **Multiple Twitter Configurations**: Manage and post to multiple X accounts simultaneously
- **Per-Account Settings**: Configure different posting schedules, content preferences, and engagement strategies for each account
- **Active/Inactive Toggle**: Easily enable or disable accounts without deleting configurations

### 📊 Engagement Analytics Dashboard
- **Real-time Metrics**: Track likes, retweets, replies, and impressions for each posted tweet
- **Performance Overview**: View aggregate engagement statistics across all posts
- **Historical Data**: Access complete history of posted tweets with engagement metrics
- **Manual Refresh**: Update engagement data on-demand from Twitter API

### 🎯 Manual Posting Control
- **Post Now Button**: Manually trigger posting from the Settings page without waiting for scheduled posts
- **Direct Twitter Links**: Each posted tweet includes a direct link to view it on X
- **Source Attribution**: Every post includes a link to the original news source for transparency

### 👤 User Authentication & Security
- **Manus OAuth Integration**: Secure, passwordless authentication using Manus OAuth
- **Encrypted Credentials**: Twitter API credentials are encrypted and securely stored
- **Role-Based Access**: Support for admin and user roles with appropriate access controls

---

## Technical Architecture

### System Architecture

![Architecture Diagram](https://private-us-east-1.manuscdn.com/sessionFile/sCH6hK6A482YnBvfMtrEP6/sandbox/teI77ZQPsCXRzCaMvIGfoa-img-1_1770843261000_na1fn_YXJjaGl0ZWN0dXJlLWRpYWdyYW0.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvc0NINmhLNkE0ODJZbkJ2Zk10ckVQNi9zYW5kYm94L3RlSTc3WlFQc0NYUnpDYU12SUdmb2EtaW1nLTFfMTc3MDg0MzI2MTAwMF9uYTFmbl9ZWEpqYUdsMFpXTjBkWEpsTFdScFlXZHlZVzAucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=oNkHK36VZ2N8m85wX0QYJJFSLfXTxqNjWNZxvUpNIIKsNlUAJCdC-tDg4cCqJ-Q68tdBmudQbyg1jZbf2sra2z4k7LjomqxffC6C~xuZVLrdWHGFCCr8g7OZRAC0fAYNPix8Q1jHPscEOritx9GytqTFwWfYeh0j3s01Uoepo8UYvqPK3x4srdmXFSxmOMmZ1dnHfYg-dHFg4fuSxVsJFym6JUE8ifm2EdARRJMnNniS10imo38CFHtBey-2Ai~ByV~es6JY3ajVUIFSIG6sBOBXv4S8ilvMFqHrJFzYyZM2~R014IE~hwbe~UOVXt4qo88lfUF3fvWNjZCZMDiFig__)

### Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 19, Tailwind CSS 4, Vite | Modern, responsive UI with fast build times |
| **Backend** | Express.js, tRPC 11 | Type-safe API with end-to-end type inference |
| **Database** | MySQL/TiDB, Drizzle ORM | Reliable data persistence with schema migrations |
| **Authentication** | Manus OAuth | Secure, passwordless user authentication |
| **External APIs** | Twitter API v2, News API, LLM API | News fetching, posting, content generation |
| **Storage** | Amazon S3 | Scalable image storage with CDN delivery |
| **Hosting** | Manus Platform | Built-in hosting with custom domain support |

### Frontend Architecture

The frontend is built with **React 19** and **Tailwind CSS 4**, providing a modern, responsive user interface:

- **Home Page**: Landing page with feature overview and quick-access buttons
- **Settings Page**: Twitter configuration management with credentials and scheduling options
- **Posted Tweets Page**: Historical view of all posted tweets with engagement metrics and direct Twitter links
- **Analytics Dashboard**: Comprehensive engagement tracking and performance metrics visualization

All pages use **shadcn/ui** components for consistent, accessible design patterns.

### Backend Architecture

The backend implements a **tRPC-first** architecture with **Express.js**:

- **tRPC Procedures**: Type-safe API endpoints for all operations (Twitter config management, posting, analytics)
- **Protected Procedures**: Authentication middleware ensures only authorized users can access sensitive operations
- **Database Helpers**: Reusable query functions in `server/db.ts` for consistent data access
- **External Service Integration**: Modular integration with Twitter API, News API, and LLM services

### Database Schema

```
users
├── id (Primary Key)
├── openId (Unique, from OAuth)
├── name, email
├── role (admin | user)
└── timestamps

twitter_configs
├── id (Primary Key)
├── userId (Foreign Key → users)
├── x_api_key, x_api_key_secret (Encrypted)
├── x_access_token, x_access_token_secret (Encrypted)
├── isActive, scheduleIntervalMinutes
├── scheduleStartHour, scheduleEndHour
└── timestamps

posted_tweets
├── id (Primary Key)
├── configId (Foreign Key → twitter_configs)
├── tweetId (Twitter's tweet ID)
├── tweetText, imageUrl, sourceNewsUrl
├── likeCount, retweetCount, replyCount, impressionCount
├── engagementUpdatedAt
└── timestamps
```

---

## Data Flow

### Posting Workflow

1. **News Fetching**: News API retrieves latest articles based on configured categories
2. **Content Generation**: LLM generates satirical commentary for selected news stories
3. **Image Creation**: Image generation service creates custom visuals for the post
4. **Twitter Posting**: Twitter API v2 posts the content to configured accounts
5. **Metadata Storage**: Tweet ID and metadata are saved to the database for tracking
6. **Engagement Tracking**: Scheduled jobs periodically fetch engagement metrics from Twitter API

### User Interaction Flow

1. **Authentication**: User logs in via Manus OAuth
2. **Configuration**: User sets up Twitter API credentials and posting schedules
3. **Monitoring**: User views posted tweets and engagement analytics
4. **Manual Control**: User can manually trigger posts or refresh engagement data
5. **Logout**: Secure session termination

---

## API Endpoints

### Authentication
- `POST /api/oauth/callback` - OAuth callback handler
- `GET /api/trpc/auth.me` - Get current user information
- `POST /api/trpc/auth.logout` - Logout current user

### Twitter Configuration
- `GET /api/trpc/twitter.getConfigs` - List all Twitter configurations
- `POST /api/trpc/twitter.addConfig` - Add new Twitter configuration
- `POST /api/trpc/twitter.updateConfig` - Update existing configuration
- `POST /api/trpc/twitter.deleteConfig` - Delete configuration
- `POST /api/trpc/twitter.testConnection` - Test Twitter API credentials

### Posting
- `POST /api/trpc/twitter.postNow` - Manually post using specified configuration
- `GET /api/trpc/twitter.getPostedTweets` - Get posted tweet history
- `GET /api/trpc/twitter.getTweetsWithEngagement` - Get tweets with engagement metrics

### Analytics
- `GET /api/trpc/twitter.getEngagementSummary` - Get engagement statistics by configuration
- `POST /api/trpc/twitter.refreshEngagement` - Update engagement metrics from Twitter API

---

## Environment Variables

```env
# Database
DATABASE_URL=mysql://user:password@host/database

# Authentication
JWT_SECRET=your-jwt-secret
VITE_APP_ID=manus-app-id
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://portal.manus.im

# External APIs
NEWS_API_KEY=your-news-api-key
BUILT_IN_FORGE_API_KEY=manus-api-key
BUILT_IN_FORGE_API_URL=https://api.manus.im/forge

# Frontend
VITE_APP_TITLE=SatireScope
VITE_APP_LOGO=https://your-cdn/logo.png
VITE_FRONTEND_FORGE_API_KEY=frontend-api-key
VITE_FRONTEND_FORGE_API_URL=https://api.manus.im/forge

# Owner Information
OWNER_NAME=Your Name
OWNER_OPEN_ID=your-open-id
```

---

## Installation & Setup

### Prerequisites
- Node.js 22.13.0+
- pnpm package manager
- MySQL 8.0+ or TiDB database
- Twitter API v2 credentials (Bearer Token or OAuth 2.0)
- News API key

### Local Development

```bash
# Clone the repository
git clone <repository-url>
cd satirescope

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Run database migrations
pnpm db:push

# Start development server
pnpm dev
```

The application will be available at `http://localhost:3000`

### Building for Production

```bash
# Build frontend
pnpm build

# Build backend (if separate build needed)
pnpm build:server

# Start production server
pnpm start
```

---

## Usage Guide

### 1. Initial Setup

1. Navigate to the **Settings** page
2. Click **"Configure Twitter"**
3. Enter your Twitter API credentials:
   - API Key
   - API Key Secret
   - Access Token
   - Access Token Secret
4. Configure posting schedule (interval, start/end hours)
5. Click **"Save Configuration"**

### 2. Manual Posting

1. Go to **Settings** page
2. Find your active configuration
3. Click **"Post Now"** button
4. The system will:
   - Fetch latest news
   - Generate satirical commentary
   - Create custom image
   - Post to Twitter
   - Display confirmation

### 3. Monitoring Engagement

1. Navigate to **Analytics** page
2. View engagement summary cards (likes, retweets, replies, impressions)
3. Scroll down to see detailed metrics for each tweet
4. Click **"Refresh Data"** to update metrics from Twitter API
5. Click **"View on X"** to open tweet in Twitter

### 4. Viewing Posted Tweets

1. Go to **Posted Tweets** page
2. Select a Twitter configuration from dropdown
3. Browse all posted tweets with:
   - Tweet text and timestamp
   - Generated image
   - Source article link
   - Direct link to tweet on X

---

## Performance Considerations

- **Database Indexing**: Indexes on `configId`, `userId`, and `tweetId` for fast queries
- **Image Caching**: Generated images are cached in S3 with CDN delivery
- **API Rate Limiting**: Respects Twitter API rate limits with exponential backoff
- **Batch Operations**: Engagement metrics are fetched in batches to optimize API calls
- **Frontend Optimization**: React Query caching reduces unnecessary API calls

---

## Security Features

- **Encrypted Credentials**: Twitter API credentials are encrypted at rest
- **OAuth Authentication**: Passwordless authentication via Manus OAuth
- **HTTPS Only**: All communications are encrypted in transit
- **CORS Protection**: Proper CORS headers prevent unauthorized cross-origin requests
- **Input Validation**: All user inputs are validated and sanitized
- **Rate Limiting**: API endpoints include rate limiting to prevent abuse
- **Secure Session Management**: JWT-based session tokens with secure cookie handling

---

## Troubleshooting

### Twitter API Connection Issues
- Verify API credentials are correct and not expired
- Check Twitter API v2 access level (requires Elevated or higher)
- Ensure API keys have appropriate permissions for posting

### News Not Fetching
- Verify News API key is valid
- Check internet connectivity
- Review API rate limits

### Images Not Generating
- Check LLM API availability
- Verify image generation service is accessible
- Review error logs for specific failures

### Engagement Metrics Not Updating
- Ensure tweet was successfully posted (check Twitter directly)
- Wait at least 1 hour for Twitter to register engagement
- Manually click "Refresh Data" to force update

---

## Future Roadmap

- **Advanced Analytics**: Time-series charts for engagement trends
- **Content Scheduling**: Calendar-based content planning
- **A/B Testing**: Test different satirical tones and formats
- **Hashtag Optimization**: Automatic hashtag suggestions based on trending topics
- **Multi-language Support**: Generate satirical content in multiple languages
- **Community Features**: Share top-performing posts and engagement tips
- **API Webhooks**: Real-time notifications for engagement milestones

---

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## Support

For issues, questions, or feature requests, please:

1. Check the [Troubleshooting](#troubleshooting) section
2. Review existing GitHub issues
3. Create a new GitHub issue with detailed information
4. Contact the development team via email

---

## Acknowledgments

- **React 19** - Modern UI framework
- **Tailwind CSS 4** - Utility-first CSS framework
- **tRPC 11** - Type-safe API framework
- **Drizzle ORM** - Modern TypeScript ORM
- **Twitter API v2** - Social media integration
- **News API** - Real-time news data
- **Manus Platform** - Hosting and authentication infrastructure

---

## Changelog

### Version 1.0.0 (Current)
- ✅ Automated news fetching and satirical content generation
- ✅ Multi-account Twitter posting
- ✅ Engagement analytics dashboard
- ✅ Manual posting control
- ✅ User authentication and authorization
- ✅ Encrypted credential storage
- ✅ Real-time engagement tracking

---

**Built with ❤️ for satirical news enthusiasts**

For the latest updates and documentation, visit the [project repository](https://github.com/your-username/satirescope)
