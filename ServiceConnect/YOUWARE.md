# ServiceConnect - South African Service Provider Platform

## Project Overview
ServiceConnect is a modern web application connecting South Africans with verified service providers across categories including plumbing, electrical, painting, garden services, and more. Built with React, TypeScript, and Tailwind CSS with full backend integration using Youware Backend.

## Technology Stack
- **Frontend Framework**: React 18.3+ with TypeScript
- **Build Tool**: Vite 5.4+
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Routing**: React Router v6
- **State Management**: React Query (TanStack Query)
- **Backend**: Youware Backend (Cloudflare Workers + D1 Database)

## Design System

### Color Palette
The application uses a vibrant South African-inspired color palette:
- **Primary**: Green (#157 100% 24%) - Represents growth and trust
- **Secondary**: Yellow (#45 100% 56%) - Bright and energetic accent
- **Background**: White (#0 0% 100%)
- **Muted**: Light green tones for subtle backgrounds

### Key Design Principles
- **Vibrant Colors**: South African green and yellow theme
- **Clear Hierarchy**: Bold typography with strong contrasts
- **Grid Layouts**: Organized card-based layouts
- **Smooth Animations**: Fade-in, scale, and slide transitions
- **Hover Micro-interactions**: Refined hover effects throughout

### Animation System
- `fade-in`: 0.8s ease-out entrance animations
- `fade-in-up`: 1s ease-out with vertical movement
- `scale-in`: 0.5s ease-out scale animations
- `slide-in-right`: 0.6s ease-out horizontal animations

## Build Commands

### Development
```bash
npm run dev
```
Starts Vite development server on http://localhost:5173

### Production Build
```bash
npm run build
```
Builds optimized production bundle to `dist/` directory

### Preview Production Build
```bash
npm run preview
```
Preview production build locally

### Linting
```bash
npm run lint
```
Run ESLint checks on codebase

## Project Structure

### Pages
- `/` - Homepage (Index.tsx) - Hero, categories, how it works, featured providers
- `/signup` - User registration and profile completion
- `/login` - User login (uses SignUp component)
- `/admin` - Admin dashboard (creator-only access with backend verification)
- `/services` - Service listings
- `/providers` - Provider profiles
- `/about` - About page
- `/how-it-works` - Standalone how it works page
- `/become-provider` - Provider application and information
- `/pricing` - Pricing plans for service providers
- `/blog` - Blog and resources
- `/support` - Help center, FAQ, and contact form
- `/terms` - Terms of service, privacy policy, code of conduct
- `*` - 404 Not Found page

### Key Components
- `Hero.tsx`: Landing hero section with search and city selector
- `ServiceCategories.tsx`: Grid of service categories
- `HowItWorks.tsx`: Three-step process explanation (used on homepage)
- `FeaturedProviders.tsx`: Top-rated provider showcase
- `Footer.tsx`: Site footer with links and contact info

## Backend Implementation

### Backend Structure
```
backend/
├── src/
│   └── index.ts          # Worker entry point with all API endpoints
├── wrangler.toml         # Worker configuration
├── schema.sql            # Database schema (all CREATE statements)
└── package.json          # Dependencies
```

### Database Schema
The application uses five main tables:

1. **users** - User profile information
   - Stores encrypted_yw_id (unique identifier from Youware)
   - Optional: display_name, photo_url, email, phone
   - Auto-created on first interaction

2. **providers** - Service provider business information
   - Links to users table via user_id
   - Contains business details, city, contact info
   - Verification status and ratings
   - Admin can verify/revoke provider status

3. **services** - Individual services offered by providers
   - Category-based (plumbing, electrical, etc.)
   - Pricing information (min/max ranges)
   - Active/inactive status

4. **bookings** - Service booking requests
   - Links users to providers and services
   - Status tracking (pending, confirmed, completed, cancelled)
   - Scheduled dates and notes

5. **reviews** - User reviews for completed services
   - Star ratings (1-5)
   - Comments and feedback
   - Automatically updates provider ratings

### API Endpoints

**Authentication**
- `GET /api/auth/is-admin` - Check if current user is project creator
- `GET /api/auth/me` - Get current user info (creates user if not exists)
- `POST /api/auth/update-profile` - Update user profile (email, phone)

**Providers**
- `GET /api/providers` - Get all providers (filter by city, verified status)
- `GET /api/providers/:id` - Get specific provider details
- `POST /api/providers` - Create provider application

**Services**
- `GET /api/services` - Get services (filter by category, provider)

**Bookings**
- `GET /api/bookings` - Get user's bookings
- `POST /api/bookings` - Create new booking

**Reviews**
- `GET /api/reviews/provider/:id` - Get reviews for provider
- `POST /api/reviews` - Submit review (updates provider rating)

**Admin Endpoints** (require admin verification)
- `GET /api/admin/users` - Get all users
- `GET /api/admin/providers` - Get all provider applications
- `POST /api/admin/providers/verify` - Verify/revoke provider status
- `GET /api/admin/stats` - Get platform statistics

### Authentication Pattern
- Frontend calls `https://backend.youware.com/__user_info__` to get current user info
- Backend extracts user ID from `X-Encrypted-Yw-ID` header (automatically injected)
- Admin verification compares user's encrypted_yw_id with project creator's ID
- No cookies used (unified domain architecture)
- Users auto-created on first API interaction

### Admin Access Control
- Only project creator has admin access
- Admin encrypted YWID stored in backend: `5Wi2qwGwzL3T2SkcUm9PlcaHwp9Hyn6GUwa9n2jt6nOe2Wv_zLqrqMmA_5WnNP1G38VjfA`
- Admin page fetches real-time platform stats
- Provider verification requires admin privileges
- Non-admins see "Access Denied" message

## Asset Management
- All images use Youware CDN URLs for optimal performance
- Authentic service provider photos sourced and optimized
- Responsive images with proper aspect ratios maintained

## South African Localization
- Currency: South African Rand (ZAR)
- Cities: Johannesburg, Cape Town, Durban, Pretoria, etc.
- Language: English (South Africa)
- Cultural Context: South African flag emoji, local references

## Important Implementation Notes

### Backend URL Usage
- Always use absolute HTTPS URLs: `https://backend.youware.com/api/...`
- Never use relative paths like `/api/...`
- Frontend can safely call backend APIs (automatic CORS handling)

### User Authentication Flow
1. User visits site (not logged in) - has encrypted_yw_id but no display_name
2. User logs in through Youware platform
3. Site detects login via `__user_info__` endpoint
4. User profile auto-created in database on first interaction
5. Admin status checked against project creator's ID

### Color Scheme
- **REVERTED**: Original vibrant green/yellow South African theme
- Primary: Emerald green (#157 100% 24%)
- Secondary: Bright yellow (#45 100% 56%)
- Maintain this color scheme for brand consistency

### Page Requirements
All pages include:
- Responsive design for mobile and desktop
- Consistent navigation through React Router
- Footer with all page links
- SEO-friendly structure

## Development Notes
- Always maintain the green/yellow color palette
- Keep authentic imagery - avoid generic stock photos
- Ensure all new components follow the established design system
- Test responsive layouts on mobile, tablet, and desktop
- Build verification required before deployment
- All pages accessible through Footer navigation
- Backend is fully deployed and operational at `https://backend.youware.com`

## Deployment Notes
- Backend deployed to Cloudflare Workers via `yw_backend__deploy_worker` tool
- Database tables created and ready for use
- All API endpoints tested and functional
- Admin verification working correctly
- Frontend integrated with backend APIs
