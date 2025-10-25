# Campus Connect - Campus Life Platform

## Overview
Campus Connect is a comprehensive web-based platform designed to help students and faculty stay updated with campus life. It provides centralized access to events, notices, complaints, timetables, clubs, and feedback systems.

## Recent Changes
**Date: October 25, 2024**
- Initial MVP implementation completed
- All five core features implemented with full backend integration
- Beautiful, responsive UI with dark mode support
- In-memory data storage with sample seed data
- All API endpoints functional and tested

## Features

### 1. Events & Notices Board
- Browse upcoming campus events with category filters (Academic, Sports, Cultural, Social)
- Search functionality for finding specific events
- Featured event highlighting
- Important notices section with priority badges
- Detailed event cards showing date, time, and location

### 2. Complaint & Request System
- Submit complaints/requests with category selection
- Track submission status (Pending, Under Review, Resolved)
- View history of all submitted complaints
- Contact information management
- Form validation and error handling

### 3. Timetable & Attendance
- Weekly class schedule view with day selection
- Class cards showing subject, time, room, and faculty
- Visual distinction between Lecture, Lab, and Tutorial classes
- Attendance tracking with percentage-based progress bars
- Overall attendance calculation and statistics

### 4. Clubs & Project Collaboration
- Browse active campus clubs by category
- View club member counts and descriptions
- Explore active projects with status tracking (Planning, In Progress, Completed)
- Team member visualization for each project
- Stats dashboard showing total clubs, projects, and members

### 5. Feedback System
- 5-star rating system for overall feedback
- Multi-category selection (Academics, Facilities, Events, Support, Other)
- Anonymous submission option
- Optional contact information for follow-up
- Feedback statistics and analytics

## Technology Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- Shadcn UI component library
- TanStack Query (React Query) for data fetching
- Wouter for routing
- React Hook Form with Zod validation
- Lucide React for icons

### Backend
- Express.js server
- TypeScript
- In-memory data storage (MemStorage)
- Zod schema validation
- RESTful API architecture

### Development Tools
- Vite for build tooling and dev server
- Drizzle ORM for schema definitions
- ESBuild for fast builds

## Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/           # Shadcn UI components
│   │   │   ├── navbar.tsx     # Main navigation component
│   │   │   └── theme-toggle.tsx # Dark/light mode toggle
│   │   ├── pages/
│   │   │   ├── events.tsx     # Events & notices page
│   │   │   ├── complaints.tsx # Complaints submission page
│   │   │   ├── timetable.tsx  # Timetable & attendance page
│   │   │   ├── clubs.tsx      # Clubs & projects page
│   │   │   └── feedback.tsx   # Feedback submission page
│   │   ├── App.tsx            # Main app component with routing
│   │   └── index.css          # Global styles and theme tokens
│   └── index.html
├── server/
│   ├── storage.ts             # In-memory storage implementation
│   ├── routes.ts              # API route definitions
│   └── index.ts               # Express server setup
├── shared/
│   └── schema.ts              # Shared type definitions and schemas
└── design_guidelines.md       # UI/UX design specifications
```

## API Endpoints

### Events
- GET `/api/events` - Get all events
- GET `/api/events/:id` - Get event by ID
- POST `/api/events` - Create new event

### Notices
- GET `/api/notices` - Get all notices
- GET `/api/notices/:id` - Get notice by ID
- POST `/api/notices` - Create new notice

### Complaints
- GET `/api/complaints` - Get all complaints
- GET `/api/complaints/:id` - Get complaint by ID
- POST `/api/complaints` - Create new complaint
- PATCH `/api/complaints/:id/status` - Update complaint status

### Feedback
- GET `/api/feedback` - Get all feedback
- POST `/api/feedback` - Submit new feedback

### Clubs
- GET `/api/clubs` - Get all clubs
- GET `/api/clubs/:id` - Get club by ID

### Projects
- GET `/api/projects` - Get all projects
- GET `/api/projects/club/:clubId` - Get projects by club

### Timetable
- GET `/api/timetable` - Get all classes
- GET `/api/timetable/:day` - Get classes by day

### Attendance
- GET `/api/attendance` - Get all attendance records

## Design System

### Colors
- **Primary**: Blue (#3B82F6) - Used for primary actions and highlights
- **Accent**: Purple (#A855F7) - Used for special features and accents
- **Background**: Light gray (#FAFAFA) / Dark (#1C1E26)
- **Foreground**: Dark text (#0F172A) / Light text (#F8FAFC)

### Typography
- **Font Family**: Inter (primary), Outfit (display headings)
- **Heading Sizes**: 4xl-6xl for page titles, 2xl for sections, xl for cards
- **Body Text**: Base size with relaxed leading

### Spacing
- Consistent spacing scale: 2, 4, 6, 8, 12, 16 units
- Card padding: p-6
- Section spacing: py-12
- Component gaps: gap-6

### Dark Mode
- Full dark mode support with localStorage persistence
- Automatic theme detection and toggle
- Consistent color contrast in both modes

## Development

### Running the Project
```bash
npm run dev
```
The application will be available at `http://localhost:5000`

### Environment Variables
- `NODE_ENV` - Set to "development" for local development
- `SESSION_SECRET` - Session secret for Express (auto-generated)

## User Preferences
- Clean, modern campus-themed design
- Material Design 3 principles with campus aesthetics
- Mobile-first responsive design
- Accessible and student-centric interface

## Architecture Decisions
- **In-memory Storage**: Using MemStorage for MVP to enable quick prototyping without database setup
- **Shared Schemas**: Type definitions in `shared/schema.ts` ensure consistency between frontend and backend
- **Component-based Architecture**: Modular, reusable components for maintainability
- **Form Validation**: Zod schemas used for both frontend validation and API request validation
- **Query Management**: TanStack Query handles caching, loading states, and cache invalidation

## Future Enhancements
- Persistent PostgreSQL database integration
- User authentication and authorization
- Real-time notifications for new events
- File upload for complaint attachments
- Admin dashboard for content management
- Event registration and RSVP system
- Calendar integration for timetables
- Email notifications for important updates
