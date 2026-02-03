# Филмаш - Vehicle Import Landing Page

## Overview

This is a high-conversion landing page for "Филмаш" (Filmash), a company specializing in cross-border vehicle imports to Russia. The application is built as a full-stack TypeScript project with a React frontend and Express backend, designed to capture leads through consultation and car order forms. All form submissions are forwarded to a Telegram channel for real-time notification.

The platform addresses the Russian automotive market changes in 2026 related to utilization fees and regulatory updates, positioning the company as an expert in navigating these complexities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side routing)
- **Styling**: Tailwind CSS with CSS variables for theming
- **UI Components**: Shadcn/ui component library (New York style)
- **Animations**: Framer Motion for page animations and scroll reveals
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation via @hookform/resolvers
- **State Management**: TanStack Query (React Query) for server state

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript (compiled via tsx for development, esbuild for production)
- **API Pattern**: RESTful endpoints defined in shared routes contract
- **Database ORM**: Drizzle ORM with PostgreSQL dialect

### Project Structure
```
client/           # React frontend application
  src/
    components/   # Reusable UI components
    pages/        # Page components (home, not-found)
    hooks/        # Custom React hooks
    lib/          # Utility functions
server/           # Express backend
  index.ts        # Server entry point
  routes.ts       # API route handlers
  storage.ts      # Database operations
  db.ts           # Database connection
shared/           # Shared code between client and server
  schema.ts       # Drizzle table definitions and Zod schemas
  routes.ts       # API contract definitions
```

### Design Decisions

1. **Shared API Contract**: The `shared/routes.ts` file defines input/output schemas using Zod, ensuring type safety across the full stack. Both client and server import from this shared module.

2. **Brand Theming**: Custom CSS variables define the brand palette (`#cff902` lime and `#4380c2` blue) with Tailwind extended to use these colors consistently.

3. **Typography**: Uses Unbounded for display text and Manrope for body text, loaded via Google Fonts.

4. **Form Handling**: Two primary forms exist - InquiryForm (consultation requests) and OrderForm (car orders). Both use react-input-mask for phone number formatting.

5. **Build System**: Uses Vite for frontend bundling and esbuild for backend bundling. The production build creates a single `dist/` folder with both static assets and server code.

## External Dependencies

### Database
- **PostgreSQL**: Primary data store via `DATABASE_URL` environment variable
- **Drizzle ORM**: Type-safe database queries with automatic schema inference
- **connect-pg-simple**: PostgreSQL session store (if sessions are needed)

### Third-Party Integrations
- **Telegram Bot API**: Form submissions are forwarded to a Telegram channel
  - Requires `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` environment variables
  - Uses the `sendMessage` endpoint with HTML parse mode

### Key npm Packages
- `@tanstack/react-query`: Server state management and caching
- `drizzle-orm` + `drizzle-zod`: Database ORM with Zod schema generation
- `framer-motion`: Animation library for page transitions
- `react-hook-form`: Form state management
- `zod`: Schema validation for forms and API contracts
- `wouter`: Lightweight React router
- Full Radix UI primitive set via Shadcn/ui components

### Environment Variables Required
- `DATABASE_URL`: PostgreSQL connection string
- `TELEGRAM_BOT_TOKEN`: Bot token for Telegram notifications
- `TELEGRAM_CHAT_ID`: Chat/channel ID for receiving form submissions