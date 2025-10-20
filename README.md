# ServiceConnect

ServiceConnect is a South African web application that connects clients with verified blue-collar professionals such as electricians, plumbers, and handymen. The platform allows users to post jobs, receive applications, communicate securely, and manage payments in one place.

---

## Overview

The application is designed to function similarly to Fiverr, but focuses on service-based work. Users can register either as service providers or clients, create profiles, list skills, and manage job requests.  

The frontend is built for speed and maintainability using modern web technologies, while the backend (Django REST Framework) handles business logic, authentication, and data management.

---

## Technologies Used

**Frontend**
- Vite  
- TypeScript  
- React  
- shadcn/ui  
- Tailwind CSS  
- Drizzle ORM (schema and migrations)

**Backend**
- Django and Django REST Framework  
- PostgreSQL (primary database)  
- Django Channels or WebSockets (for real-time chat and job status updates)

**Integration**
- RESTful API communication using JWT authentication  
- Google Maps API restricted to South Africa  
- PayFast or Yoco integration for ZAR-based transactions (planned)

---

## Localisation

ServiceConnect is tailored specifically for South Africa.

- Currency: South African Rand (ZAR)  
- Locale: English (South Africa)  
- Time Zone: Africa/Johannesburg  
- Map Region: South Africa (restricted via API configuration)

---

## Setup Instructions
Run Locally


git clone <your-repo-url>

Follow these steps
1. cd <repo-name>

2. npm install

3. npm run dev
