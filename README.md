# Meihyo

Meihyo is a gaming companion web app for tracking competitive sessions and training. It lets players register game outcomes, add personal context (focus level, emotional state, notes), and analyze performance patterns over time — the human factors that automated trackers miss.

> Currently supports **Valorant** and **League of Legends**, with more games planned.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Astro 5](https://astro.build) (SSR, Node adapter) |
| UI | [React 19](https://react.dev) (islands architecture) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| Language | TypeScript 5 (strict mode) |
| Backend / Auth | [Supabase](https://supabase.com) (Auth + Database) |

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project

### Setup

```sh
# 1. Clone the repository
git clone https://github.com/InflvxDev/meihyo.git
cd meihyo

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
# → Fill in your Supabase credentials in .env

# 4. Start the development server
npm run dev
```

The app will be available at `http://localhost:4321`.

---

## Environment Variables

Copy `.env.example` to `.env` and provide the following values:

| Variable | Description |
|---|---|
| `PUBLIC_SUPABASE_URL` | Your Supabase project URL (found in Project Settings → API) |
| `PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Your Supabase anon/public key (safe for client-side use with RLS enabled) |

> **Never commit `.env`**. The `.gitignore` already excludes it.

---

## Development Scripts

| Command | Action |
|---|---|
| `npm run dev` | Start local dev server at `localhost:4321` |
| `npm run build` | Build for production to `./dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run astro` | Run Astro CLI commands (`astro add`, `astro check`, etc.) |

---

## Project Structure

Files are grouped by **domain**, not by file type.

```
src/
├── components/
│   ├── auth/           # LoginForm, SignUpForm
│   ├── home/           # Landing page islands (GameSelector, TypingText, MobileMenu)
│   └── shared/         # Navbar, UserMenu, GamesSidebar, SidebarItem
├── hooks/
│   ├── auth/           # useLoginForm, useSignUpForm
│   ├── home/           # useGameSelector, useTypingEffect
│   └── shared/
│       └── navbar/     # useUserMenu, useThemeSelector
├── interfaces/
│   ├── auth/           # LoginData, LoginResponse, SignUpData, SignUpResponse
│   └── shared/         # Game
├── layouts/
│   ├── Layout.astro    # Base layout (public pages)
│   └── AppLayout.astro # Authenticated app shell (sidebar + navbar)
├── lib/
│   ├── auth.ts         # requireUser() — server-side session guard
│   ├── supabase.ts     # createClient() — SSR-compatible Supabase client
│   └── const/
│       └── Games.ts    # GAMES registry (Valorant, LoL)
├── pages/
│   ├── api/auth/       # signIn.ts, signUp.ts, signOut.ts
│   ├── game/           # valorant.astro, lol.astro
│   ├── index.astro     # Landing page
│   ├── login.astro
│   ├── signup.astro
│   ├── dashboard.astro
│   └── demo.astro
├── styles/
│   └── global.css      # Tailwind imports + CSS design tokens (dark/light theme)
├── env.d.ts            # Astro locals types (user, supabase)
└── middleware.ts       # Auth guard + session refresh for all routes
```

### Route Protection

The middleware in `src/middleware.ts` handles authentication for every request:

- **Protected** (`/dashboard`, `/game/*`): redirects unauthenticated users to `/login`
- **Auth routes** (`/login`, `/signup`): redirects already-authenticated users to `/dashboard`
- **Public**: `/`, `/demo`, and all API routes pass through without a session check

---

## Authentication

Auth is handled entirely server-side via Supabase Auth and SSR cookies:

- `POST /api/auth/signIn` — email/password login
- `POST /api/auth/signUp` — account registration
- `POST /api/auth/signOut` — session termination (requires active session)

The Supabase client in `src/lib/supabase.ts` uses `@supabase/ssr` for cookie-based session management. Use `requireUser()` from `src/lib/auth.ts` to guard any new API route.

---

## Contributing

1. Fork the repo and create a feature branch
2. Follow the conventions in `.github/instructions/` (TypeScript, Astro/React, security)
3. Keep PRs small and focused — one feature or fix per PR
4. PR titles follow Conventional Commits: `feat:`, `fix:`, `chore:`, `refactor:`

---

## License

[MIT](LICENSE) © 2026 InflvxDev
