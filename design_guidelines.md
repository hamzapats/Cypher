# Campus Life Platform - Design Guidelines

## Design Approach

**System Selection:** Material Design 3 as foundation, adapted with modern campus aesthetics
**Justification:** Combines robust component patterns for forms/data with flexible visual language for student engagement. Material's elevation and surface system works well for organizing multiple feature sections.

**Design Principles:**
- **Accessible Hierarchy:** Clear visual separation between functional sections (forms, timetables) and engagement areas (events, clubs)
- **Student-Centric Energy:** Modern, vibrant without being unprofessional - think Notion meets campus bulletin board
- **Information Clarity:** Dense data displays (timetables, attendance) must be scannable at a glance

## Typography System

**Font Families:**
- **Primary (UI/Body):** Inter (via Google Fonts) - excellent readability, professional yet friendly
- **Display/Headers:** Manrope or Outfit - geometric, modern, slightly playful for event cards and section headers

**Hierarchy:**
- **Page Titles:** 3xl to 4xl, font-bold
- **Section Headers:** 2xl, font-semibold
- **Card Titles:** lg to xl, font-medium
- **Body Text:** base, font-normal (leading-relaxed for forms)
- **Metadata/Labels:** sm, font-medium, uppercase tracking-wide for categories/timestamps

## Layout System

**Spacing Primitives:** Use Tailwind units of **2, 4, 6, 8, 12, 16** for consistent rhythm
- Component padding: p-4 to p-8
- Section spacing: py-12 to py-16
- Card gaps: gap-6 to gap-8
- Form field spacing: space-y-4

**Container Strategy:**
- Max-width: max-w-7xl for main content
- Dashboard layout: max-w-6xl for better focus
- Form containers: max-w-2xl for optimal reading/filling experience

## Component Library

### Navigation
- **Top Navigation Bar:** Sticky header with logo, main section links (Events, Complaints, Timetable, Clubs, Feedback), user profile indicator
- **Mobile:** Hamburger menu transforming to drawer navigation
- **Secondary Nav:** Tab-style navigation within sections (e.g., "All Events" / "My Events" / "Past Events")

### Event & Notice Board
- **Layout:** Masonry-style grid (2-3 columns desktop, 1 column mobile)
- **Event Cards:** Elevated cards with category tags, date badges, thumbnail images, title, brief description, "View Details" action
- **Filters:** Pill-style filter chips (All, Academic, Sports, Cultural, Social) + search bar
- **Featured Events:** Larger hero-style card at top with prominent imagery

### Complaint/Request Form
- **Structure:** Single-column form with clear progression
- **Fields:** Dropdown for category (Academic, Infrastructure, Services, Other), text input for subject, textarea for description, file upload for attachments, contact info
- **Submission Status:** Mock status tracker showing "Pending → Under Review → Resolved" states with timeline visualization
- **Previous Requests:** Compact list view below form showing recent submissions with status badges

### Timetable/Attendance
- **Timetable View:** Week-grid table (rows=time slots, columns=days) with class cards showing subject, room, faculty
- **Day Selector:** Tab navigation for each weekday
- **Attendance Display:** Progress bars or donut charts showing attendance percentage per subject
- **Legend:** Class type indicators (Lecture, Lab, Tutorial) with distinct visual treatments

### Club & Project Collaboration
- **Club Cards:** Grid layout (3-4 columns) with club logo/icon, name, member count, brief description, "Learn More" button
- **Active Projects:** Timeline or kanban-style board showing project phases (Planning, In Progress, Completed)
- **Team Showcase:** Avatar groups showing project contributors
- **Join/Interest Buttons:** Clear CTAs for engagement (even if non-functional)

### Feedback Form
- **Rating Component:** Star rating or emoji scale (1-5) prominently placed
- **Category Selection:** Chip-style multi-select (Academics, Facilities, Events, Support, Other)
- **Feedback Textarea:** Large, comfortable text area with character counter
- **Anonymous Option:** Toggle switch for anonymous submissions
- **Success State:** Confirmation message with visual feedback

## Images Strategy

**Hero Image:** YES - Full-width hero on landing view (80vh) showing vibrant campus scene (students collaborating, campus buildings, or event gathering). Use overlay gradient (dark bottom fade) for text readability.

**Image Placements:**
- **Event Cards:** Thumbnail images (aspect-ratio-16/9) for each event - use campus life stock photos (workshops, sports, cultural events)
- **Club Sections:** Club logos/icons or representative imagery for each club card
- **Hero Section:** Background image of campus or student activities with content overlay
- **Featured Event:** Large banner image in hero card
- **Empty States:** Friendly illustrations for "No events scheduled" or "No complaints submitted"

**Buttons on Images:** When placing CTAs over hero or event images, use backdrop-blur-sm with bg-white/20 for glassmorphism effect

## Card & Surface Design

**Card Elevation:** Use shadow-md for standard cards, shadow-lg for hover states, shadow-xl for modal/focused elements
**Card Anatomy:** Rounded corners (rounded-lg to rounded-xl), padding p-6, clear header/body/footer divisions
**Interactive States:** Subtle scale on hover (hover:scale-105 transition), border highlight for focused forms

## Navigation & Layout Patterns

**Dashboard Layout:** Sidebar navigation (desktop) with icon+label for each section, collapsible on mobile to bottom nav bar
**Content Areas:** Main content area with breadcrumb navigation showing current section
**Quick Actions:** Floating action button (bottom-right) for "Submit Complaint" or "Add Event" to encourage engagement

## Form Design Patterns

**Input Fields:** Outlined style with floating labels, focus:ring treatment
**Validation:** Inline error messages below fields with red accent, success states with green checkmark
**File Uploads:** Drag-and-drop zone with file preview thumbnails
**Buttons:** Primary actions use solid fills, secondary actions use outlined style

## Responsive Behavior

**Breakpoints:**
- Mobile: Single column, bottom navigation, stacked cards
- Tablet (md:): 2-column grids, expanded sidebar
- Desktop (lg:+): 3-4 column grids, persistent sidebar, optimal reading widths

**Priority:** Forms and timetables maintain readability across all viewports - avoid horizontal scrolling for data tables

This design creates a modern, functional campus platform that balances utility with visual engagement, making it easy for students and faculty to navigate while maintaining professional credibility.