Here’s a clean combined `README.md` that merges both — keeping your React + Vite + Tailwind frontend, the Django backend, and all the South African context intact:

---

# ServiceConnect – South African Service Provider Platform

## Overview

ServiceConnect is a modern South African web application that connects clients with verified blue-collar professionals — electricians, plumbers, painters, gardeners, and more. Inspired by Fiverr but built for real-world service work, it allows users to post jobs, receive applications, communicate securely, and manage payments in one place.

The platform is fast, mobile-friendly, and fully localized for South Africa — from currency and time zone to map data and payment gateways.

---

## Technology Stack

### Frontend

* **Framework**: React 18.3+ with TypeScript
* **Build Tool**: Vite 5.4+
* **Styling**: Tailwind CSS with custom South African-inspired design system
* **UI Components**: shadcn/ui (Radix UI Primitives)
* **Routing**: React Router v6
* **State Management**: React Query (TanStack Query)
* **ORM (Schema & Migrations)**: Drizzle ORM

### Backend

* **Framework**: Django + Django REST Framework
* **Database**: PostgreSQL
* **Real-time**: Django Channels / WebSockets (for chat and job status)
* **Authentication**: JWT-based REST API
* **Payments**: PayFast or Yoco (planned ZAR integration)

---

## Design System

### Color Palette

| Role           | Color                       | Meaning             |
| -------------- | --------------------------- | ------------------- |
| **Primary**    | Green (`hsl(157 100% 24%)`) | Growth and trust    |
| **Secondary**  | Yellow (`hsl(45 100% 56%)`) | Energy and optimism |
| **Background** | White (`hsl(0 0% 100%)`)    | Clarity and space   |
| **Muted**      | Light green tones           | Subtle backgrounds  |

### Design Principles

* Vibrant South African theme
* Clear visual hierarchy and strong contrast
* Card-based grid layouts
* Smooth fade, scale, and slide animations
* Hover micro-interactions throughout

### Animation System

* `fade-in`: 0.8 s ease-out
* `fade-in-up`: 1 s ease-out with vertical motion
* `scale-in`: 0.5 s ease-out
* `slide-in-right`: 0.6 s ease-out

---

## Localisation

Tailored for South Africa:

* **Currency**: ZAR
* **Locale**: English (South Africa)
* **Time Zone**: Africa/Johannesburg
* **Map Region**: South Africa (locked via Google Maps API config)

---

## Project Structure

### Key Pages

| Path               | Description                                     |
| ------------------ | ----------------------------------------------- |
| `/`                | Homepage – Hero, categories, featured providers |
| `/signup`          | User registration and profile setup             |
| `/login`           | Secure login (using shared auth components)     |
| `/admin`           | Admin dashboard (creator-only access)           |
| `/services`        | List of available services                      |
| `/providers`       | Provider profiles and ratings                   |
| `/about`           | Platform mission and story                      |
| `/how-it-works`    | Three-step workflow overview                    |
| `/become-provider` | Provider application page                       |
| `/pricing`         | Provider plans and tiers                        |
| `/blog`            | Resources and industry updates                  |
| `/support`         | Help center and contact form                    |
| `/terms`           | Terms of service and privacy policy             |
| `*`                | 404 fallback page                               |

### Core Components

* `Hero.tsx` – landing search section
* `ServiceCategories.tsx` – grid of service types
* `HowItWorks.tsx` – three-step explainer
* `FeaturedProviders.tsx` – top-rated showcase
* `Footer.tsx` – site footer and links

---

## Build Commands

### Development

```bash
npm run dev
```

Starts Vite development server ([http://localhost:5173](http://localhost:5173))

### Production Build

```bash
npm run build
```

Compiles optimized bundle to `dist/`

### Preview Production Build

```bash
npm run preview
```

Serves production build locally

### Linting

```bash
npm run lint
```

Runs ESLint across codebase

---

## Backend Setup (Django)

```bash
cd backend
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

API endpoints are JWT-secured and designed for modular integration with the React frontend.

---

## Local Run (Full Stack)

```bash
git clone <your-repo-url>
cd ServiceConnect2.0
npm install
npm run dev
```

Backend runs separately under `/backend` while frontend runs on Vite (5173 by default).

---

## Future Roadmap

* Integrate PayFast/Yoco payments
* Deploy backend on Railway/Render with PostgreSQL
* Add real-time notifications via Channels
* Provider ratings and review system
* Mobile PWA support

---