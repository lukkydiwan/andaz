# LearnOS — Student Dashboard

A futuristic, dark-mode education dashboard built with Next.js App Router, Supabase, Tailwind CSS, and Framer Motion.

## Architectural Choices

### Server / Client Component Split

The data-fetching layer lives entirely in Server Components:
- `app/components/CourseGrid.tsx` is an `async` Server Component that calls `getCourses()` directly — no `useEffect`, no client-side fetch, no loading spinner managed in JS. The network request happens on the server before any HTML reaches the browser.
- The rest of the page (`page.tsx`) is also a Server Component, so the hero, stats, and activity tiles are streamed as plain HTML.

Client Components (`'use client'`) are isolated to interactivity only:
- `Sidebar.tsx` — collapsed/expanded state and layout animations need the DOM.
- `BentoGrid.tsx`, `CourseCard.tsx`, `ActivityTile.tsx` — Framer Motion requires a browser environment.
- `CourseSkeleton.tsx` — used inside a `<Suspense>` boundary to show animated skeleton loaders while `CourseGrid` resolves.

### Animation Strategy

All animations use `transform` and `opacity` only — never `width`, `height`, `top`, `left`, or any property that triggers layout recalculation. This guarantees zero layout shifts:

- **Staggered entrance**: `BentoCard` uses a `custom` index passed to `variants.visible` to delay each tile by `index × 80ms`.
- **Spring hover**: `whileHover={{ scale: 1.015 }}` with `type: 'spring', stiffness: 300, damping: 20`.
- **Sidebar layout animation**: `layoutId="sidebar-active"` on the highlight div so it slides between nav items using Framer Motion's shared layout system.
- **Progress bars**: A `useSpring` motion value animates from 0 → target value on mount — smoothly and entirely in composited layers.

### Supabase Integration

- Uses `@supabase/supabase-js` with a server-side client created per request (no singleton leakage across users).
- Environment variables are `NEXT_PUBLIC_*` so they can also be used for client-side operations if needed, but are only used server-side in this project.
- Row Level Security is enabled on the `courses` table; a public `SELECT` policy allows the anon key to read courses.

## Setup

### 1. Supabase

1. Create a free project at [supabase.com](https://supabase.com).
2. Run the SQL in `supabase/schema.sql` in the Supabase SQL editor. It creates the table, enables RLS, and seeds 4 example courses.
3. Copy your Project URL and `anon` public key from **Project Settings → API**.

### 2. Environment Variables

```bash
cp .env.example .env.local
```

Fill in `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
```

### 3. Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy (Vercel)

1. Push to GitHub.
2. Import on [vercel.com/new](https://vercel.com/new).
3. Add the two environment variables in the Vercel project settings.
4. Deploy.

## Challenges

**Framer Motion + RSC**: Framer Motion requires a browser runtime, but the data lives in Server Components. The solution is a thin "container" pattern: the server fetches data and passes it as props to a `'use client'` card component. No context or global state needed.

**Zero layout shifts on progress bars**: `width` transitions cause layout recalculation. Instead, the progress bar is a fixed-height container and the inner fill uses a Framer Motion `useSpring` value mapped to a CSS `width` percentage via `useTransform` — but rendered as an inline style so the browser composites it on the GPU.

**Sidebar responsive breakpoints**: Three completely separate implementations (desktop collapsible, tablet icon-only, mobile bottom bar) rather than one complex component with many conditional renders. Each targets a different breakpoint and is hidden at others — simpler and more maintainable.
