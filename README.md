# Workout Community

A full-stack fitness challenge platform where users join workout challenges, log sessions, track progress, and compete on a leaderboard. Built with Next.js, Prisma, and PostgreSQL, with an admin dashboard for managing users, challenges, and site analytics.

**Live demo:** [workout-community.vercel.app](https://workout-community.vercel.app)

## Features

- **Authentication** — email/password auth via [Better Auth](https://www.better-auth.com/), with session and account management
- **Challenges** — browse challenges by category (Cardio, Strength, Yoga, HIIT, Pilates, Stretching, Sports, Running) and difficulty level (beginner / intermediate / advanced)
- **Workout logging** — track duration, intensity, calories burned, and how a session felt
- **Leaderboard** — ranks members by reward points earned from completed challenges
- **User profiles** — personal goals, preferred workout time, current level, and profile picture (via Cloudinary)
- **Admin dashboard** — manage users (including bans), create/edit challenges, and view site analytics
- **Analytics** — visitor tracking (device, browser, OS, location, referrer) with Google Analytics integration
- **Testing** — unit tests (Jest) and integration tests against a real Postgres instance (Testcontainers)

## Screenshots

### User Side

<img width="1910" height="3771" alt="1" src="https://github.com/user-attachments/assets/ff3926a2-1fb6-4088-835d-9f2261d842bb" />



|  |  |
|---|---|
| ![Home](./screenshots/user/home.png) | ![Challenges](./screenshots/user/challenges.png) |
| ![Leaderboard](./screenshots/user/leaderboard.png) | ![Workout log](./screenshots/user/workout-log.png) |

### Admin Side

<!-- Add screenshots of the admin dashboard, users management, challenge management, analytics, etc. -->
<!-- Example: ![Admin dashboard](./screenshots/admin/dashboard.png) -->

|  |  |
|---|---|
| ![Dashboard](./screenshots/admin/dashboard.png) | ![Users](./screenshots/admin/users.png) |
| ![Challenges](./screenshots/admin/challenges.png) | ![Analytics](./screenshots/admin/analytics.png) |

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Language | TypeScript |
| Database | PostgreSQL ([Neon](https://neon.tech)) |
| ORM | [Prisma](https://www.prisma.io) |
| Auth | [Better Auth](https://www.better-auth.com/) |
| Styling | Tailwind CSS |
| Charts | Recharts |
| Media | Cloudinary |
| Animation | Framer Motion |
| Testing | Jest, Testing Library, Testcontainers |
| Deployment | Vercel |

## Getting Started

### Prerequisites

- Node.js 20+
- A PostgreSQL database (this project is deployed with [Neon](https://neon.tech))
- A [Cloudinary](https://cloudinary.com) account (for profile picture and challenge image uploads)

### 1. Clone and install

```bash
git clone https://github.com/abdelhamid11111111/workout-community.git
cd workout-community
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```bash
# Database (Neon connection string)
DATABASE_URL="postgresql://<user>:<password>@<neon-host>/<db>?sslmode=require"

# Better Auth
BETTER_AUTH_URL="http://localhost:3000"
BETTER_AUTH_SECRET="generate-a-random-secret"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Google Analytics (optional, for /admin/analytics)
GA_PROPERTY_ID="your-ga4-property-id"
GA_CLIENT_EMAIL="service-account@your-project.iam.gserviceaccount.com"
GA_PRIVATE_KEY="your-service-account-private-key"
```

> On Neon, grab the pooled connection string from your project dashboard and use it as `DATABASE_URL`.

### 3. Set up the database

```bash
npx prisma migrate deploy   # apply existing migrations
npx prisma generate         # generate the Prisma client
```

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Project Structure

```
app/
  admin/          # Admin dashboard: users, challenges, analytics
  api/            # Route handlers (auth, challenges, workouts, admin, analytics)
  challenge/      # Challenge detail pages
  home/           # Home/landing experience
  leaderboard/    # Leaderboard page
  mychallenges/   # A user's joined challenges + workout logging
  sign-in/        # Sign-in page
  sign-up/        # Sign-up page
  components/     # Shared UI and admin components
lib/
  auth.ts         # Better Auth configuration
  prisma.ts       # Prisma client instance
  cloudinary.ts   # Cloudinary configuration
  queries/        # Reusable database queries
prisma/
  schema.prisma   # Database schema
  migrations/     # Migration history
```

## Database Schema

The core models are:

- **User** — account info, role, current level, personal goals, workout time preference
- **Challenge** — title, category, level, duration (days), reward points, goals, images
- **UserChallenge** — join table tracking which users joined which challenges
- **Workout** — logged sessions (duration, intensity, calories, feel) tied to a user and challenge
- **Analytics** — visitor/session tracking for the admin analytics dashboard
- **Session / Account / Verification** — Better Auth tables for authentication

See [`prisma/schema.prisma`](./prisma/schema.prisma) for the full schema.

## Testing

```bash
npm run test              # unit tests
npm run test:watch        # watch mode
npm run test:coverage     # with coverage report
npm run test:integration  # integration tests (spins up a real Postgres via Testcontainers)
```

## Deployment

The app is deployed on [Vercel](https://vercel.com) with a [Neon](https://neon.tech) Postgres database.

1. Push the repo to GitHub and import it into Vercel.
2. Add the environment variables listed above in the Vercel project settings.
3. Set the build command to include Prisma migrations if needed, e.g. `prisma migrate deploy && next build` (or run migrations manually against the Neon database before deploying).
4. Deploy — Vercel will run `npm run build`, which triggers `prisma generate` via the `postinstall` script.

## License

No license specified yet. Add one (e.g. MIT) if you intend for others to reuse this code.
