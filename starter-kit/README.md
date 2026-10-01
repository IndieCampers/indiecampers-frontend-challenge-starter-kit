# Campervan Finder – Starter Kit

This starter kit has everything set up so you can focus on the UI: Next.js 16, Tailwind CSS v4, shadcn/ui, a mock API and Docker.

> 📝 This README is yours to replace. Keep the setup instructions accurate, and add your decisions, trade-offs and what you'd improve.

## Prerequisites

- [Docker Desktop](https://docs.docker.com/get-docker/) (Compose v2.22+ for `--watch`)
- Git
- _Optional:_ Node.js 24+, if you also want to run it without Docker or get editor autocompletion

## Getting Started

### 1. Start the app

```bash
docker compose up --watch
```

Open http://localhost:3000. You should see "Your starter kit is running 🚐".

**Hot reload works out of the box.** Edit any file and the browser updates. `--watch` syncs your changes into the container. If you install or remove npm packages, the container rebuilds on its own.

### 2. Editor setup (recommended)

Run `npm install` on your machine once, so your editor gets types and autocompletion. The container keeps its own `node_modules`, so the two never conflict.

```bash
npm install
```

Prefer to skip Docker while developing? That works too:

```bash
npm install
npm run dev
```

Before you submit, make sure the Docker commands still work.

### 3. Build what's in the designs

Read the challenge brief, then open the Figma file linked in it.

## Useful Commands

```bash
# Start (with hot reload)
docker compose up --watch

# Stop
docker compose down

# Production build, served on http://localhost:3001
docker compose --profile prod up --build

# Add a shadcn component (run on your machine; the container rebuilds automatically)
npx shadcn@latest add select card badge skeleton
#   (if it asks to overwrite components/ui/button.tsx, answering "No" is fine)

# Quality checks (also run in CI on every push / PR)
npm run lint
npm run typecheck
npm run format        # Prettier, which also sorts Tailwind classes
npm run build
```

## Project Structure

```
app/
  api/                       Mock API – you don't need to change it
  globals.css                Tailwind + shadcn theme. Put the design tokens from Figma here.
  layout.tsx                 Root layout (Inter font is loaded here)
  page.tsx                   Placeholder → your search page
components/
  ui/                        shadcn components (generated – it's fine to adapt them)
data/                        Mock JSON data
lib/
  data.ts                    Mock "backend" used by the API (server-only)
  types.ts                   Vehicle, Location… types
  utils.ts                   cn() helper
public/images/hero.svg       Fallback hero image (prefer the photo from Figma)
public/images/vehicles/      Placeholder photos (1 per vehicle)
```

## Mock API

All responses are JSON and look like `{ data: T[], meta: { total } }`. Types are in `lib/types.ts`.

Every request waits about **600ms** so your loading states are visible. To change it, set `MOCK_DELAY_MS` (for example `MOCK_DELAY_MS=0 docker compose up --watch`, or in `.env.local` when running without Docker).

### `GET /api/locations`

All pick-up locations.

```json
{ "data": [{ "id": "lisbon", "name": "Lisbon", "country": "Portugal" }], "meta": { "total": 9 } }
```

### `GET /api/vehicles`

Vehicles, filtered by the search. All params are optional and can be combined; without any, all 12 vehicles are returned.

| Param         | Example     | Notes                                                |
| ------------- | ----------- | ---------------------------------------------------- |
| `location`    | `lisbon`    | Location `id` from `/api/locations`                  |
| `guests`      | `2`         | Only vehicles with at least this many seats          |
| `type`        | `campervan` | `campervan` or `motorhome` (bonus: "Campervan" chip) |
| `bathroom`    | `true`      | Only vehicles with a full bathroom (bonus: chip)     |
| `petFriendly` | `true`      | Only pet-friendly vehicles (bonus: chip)             |

```bash
curl "http://localhost:3000/api/vehicles?location=lisbon&guests=2"
```

```json
{
  "data": [
    {
      "id": "veh_001",
      "slug": "active-standard-select",
      "name": "Active Standard Select",
      "type": "campervan",
      "make": "Knaus",
      "sleeps": 4,
      "seats": 4,
      "transmission": "automatic",
      "bathroom": true,
      "petFriendly": false,
      "length": "19'9",
      "pricePerNight": 42,
      "originalPricePerNight": 47,
      "discountPercent": 10,
      "currency": "EUR",
      "rating": 4.6,
      "reviewCount": 1240,
      "isNew": true,
      "locationIds": ["lisbon", "porto", "faro", "madrid"],
      "image": {
        "src": "/images/vehicles/active-standard-select.svg",
        "alt": "Active Standard Select – Knaus or similar"
      }
    }
  ],
  "meta": { "total": 8 }
}
```

`originalPricePerNight` and `discountPercent` are `null` when a vehicle has no discount. All fields are documented in `lib/types.ts`.

> There is no availability check, so dates don't change the results. Use them for the number of nights and the total price.

### Server Components vs the API

In **Client Components**, call the API with `fetch("/api/…")`.

In **Server Components**, you may instead import the functions from `@/lib/data` directly (`getLocations`, `getVehicles`). This is what the Next.js docs recommend, because it avoids an extra HTTP round-trip.

Both approaches are fine. Tell us which you chose and why.

## Resources

- [Next.js docs](https://nextjs.org/docs). The docs for the installed version are also in `node_modules/next/dist/docs/`.
- [Tailwind CSS v4 – theme variables](https://tailwindcss.com/docs/theme)
- [shadcn/ui – theming](https://ui.shadcn.com/docs/theming) · [components](https://ui.shadcn.com/docs/components)
- [lucide icons](https://lucide.dev/icons)
- [Docker Compose watch](https://docs.docker.com/compose/how-tos/file-watch/)

---

Good luck!
