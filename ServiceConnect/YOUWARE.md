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

Removed Youware integration notes per project request. This project now uses the local mock backend for development and does not rely on external Youware services.
```
