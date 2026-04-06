# SafeHer - Women's Safety App

## Overview
SafeHer is an AI-powered women's safety analytics system built as a mobile-responsive web application. The app provides emergency features, safety tools, and resources designed to protect women in urban environments.

## Project Information
- **Team Members**: 
  - Nandini Yadav (2201220130077)
  - Shalini Singh (2201220130100)
- **Course**: IT-63
- **Tech Stack**: React, TypeScript, Express, TanStack Query, Framer Motion, Tailwind CSS

## Features Implemented

### Core Features (MVP)
1. **Splash Screen** - Animated welcome screen with Lottie animation
2. **Home Dashboard** - 6 Material Design feature cards with smooth animations
3. **Emergency SOS** - One-tap emergency alert with countdown and contact notification
4. **Hidden Camera Detector** - Multi-modal scanning for surveillance devices
5. **Women's News** - Curated safety news, tips, and alerts
6. **Siren Alarm** - Loud emergency alarm with volume control
7. **About Us** - Team information and mission statement
8. **Share App** - Multi-platform sharing options

### UI/UX Features
- Mobile-first responsive design
- Light pink and white color theme
- Smooth page transitions with Framer Motion
- Bottom navigation bar for easy thumb access
- Modern toolbar with dropdown menu
- Material Design card components
- Subtle hover and active state animations
- Accessible touch targets (48px minimum)

## Architecture

### Frontend (`client/src/`)
- **Components**: Reusable UI components (Toolbar, BottomNav, SplashScreen)
- **Pages**: Feature pages (home, emergency, camera-detector, news, siren, about, share)
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state
- **Animations**: Framer Motion and Lottie React

### Backend (`server/`)
- **Storage**: In-memory storage (MemStorage) for news articles and emergency contacts
- **API Routes**: RESTful endpoints for news and contacts
- **Validation**: Zod schema validation

### Shared (`shared/`)
- **Schema**: TypeScript types and Zod schemas for data models

## Design System

### Colors (Light Pink Theme)
- Primary: `hsl(340 82% 52%)` - Light pink accent
- Background: `hsl(0 0% 100%)` - Pure white
- Card: `hsl(340 25% 98%)` - Very light pink
- Destructive: `hsl(0 84% 60%)` - Emergency red

### Typography
- Font Family: Roboto (Material Design standard)
- Headings: 20-28px, Medium weight
- Body: 14-16px, Regular weight

### Spacing
- Base unit: 8px
- Card padding: 16px
- Section gaps: 16-24px

## Recent Changes
- **2025-11-05**: Initial implementation
  - Created all frontend components with beautiful Material Design
  - Implemented 6 core feature pages
  - Added splash screen with Lottie animation
  - Configured light pink and white theme
  - Set up routing and navigation

## Next Steps
- Implement backend API routes for news and contacts
- Add data persistence for emergency contacts
- Connect frontend to backend APIs
- Test all user journeys end-to-end
- Add real-time location tracking
- Implement AI-powered unsafe zone predictions
