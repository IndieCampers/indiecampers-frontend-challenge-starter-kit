# Indie Campers Technical Challenge

## Design Engineer – 2026

Welcome to the Indie Campers frontend challenge! We're excited to see how you turn a design into a polished, working UI.

## The Problem

At Indie Campers, travellers rent campervans and motorhomes to explore Europe. Everything starts with **search**. Your job is to build that first step.

### What You'll Build

Two pages:

1. **Homepage** (`/`): a hero with a large search bar (location, check-in and check-out dates, guests).
2. **Search Results** (`/search`): after searching, the search bar sits in the header as a **compact, sticky bar** showing the searched values. Below it, the matching vehicles are listed.

The data comes from a **mock API** that we've already built (Next.js route handlers in the starter kit). You don't need to build any backend.

## 🎨 Design

**Figma: [FE Design – Task Mock](https://www.figma.com/design/zhQcTuyJo3Ss5rkES6P1pk/FE-Design---Task-Mock?node-id=0-1)**
**Password:** `indie-frontend`

**Demo video: [`docs/demo.mp4`](docs/demo.mp4)** (about 1 minute): a recording of the finished product, for reference.

| Figma frame | Page | Example URL |
|---|---|---|
| **Homepage** | `app/page.tsx` | http://localhost:3000 |
| **Search Results** | `app/search/page.tsx` | http://localhost:3000/search?location=lisbon&start=2026-07-01&end=2026-07-06&guests=2 |

Export the **logo**, **icons** and **hero photo** from Figma. The vehicle photos come from the API: they're placeholders and don't need to match the Figma photos.

### Mapping the API data onto a result row

The numbers in Figma are sample content. Show the real values from `GET /api/vehicles`:

| Row element | Show |
|---|---|
| Image | `image.src` / `image.alt` |
| "-10%" badge | `discountPercent`. Only when it isn't `null`. |
| "New Vehicles" badge | Only when `isNew` is `true` |
| Title | `name` |
| "Operated by [logo] · Knaus or Similar" | The Indie Campers logo, then `{make} or Similar` |
| Specs line | `Sleeps {sleeps} · Seats {seats} · {Manual \| Automatic} · Bathroom · {length} Long`. Show "Bathroom" only when `bathroom` is `true`. |
| Rating | `rating` ★ and the review count. Show `(500+)` when `reviewCount` is 500 or more, otherwise the number, e.g. `(420)`. |
| "From ~~€57~~ (fees excl.)" | `originalPricePerNight`, struck through. Hide the struck-through price when it's `null`. |
| "€42/Night" | `pricePerNight` |
| "(€614)" | **Total for the stay:** `pricePerNight × number of nights` |
| "14 Results in Bordeaux" | `{count} Results in {city}`, with the singular `1 Result` for one |

Prices are in euros with no decimals (`€42`).

### Static parts

- **Promo banner:** build it as designed. The countdown can be static. *Bonus:* make it count down live.
- **"Unlimited Mileage" strip** (results page): static.
- **Header links**, "Become a Host", the globe and the profile menu: visual only on desktop. Links can point to `#`.
- **Filter chips:** build them as designed. *Bonus:* make Campervan, Full Bathroom and Pet Friendly actually filter (the API supports it, see the starter-kit README). "More filters" stays visual only.

### Not in Figma, so use your own judgement

Use the same colours, type and spacing as the design for:

- **Mobile (390px)** layouts for both pages, including a **mobile menu**: the hamburger opens a side drawer with the header links. Use the pre-installed **Sheet** component.
- The open **location dropdown**, **date-range calendar** and **guests picker**
- **Loading** (skeletons) and **empty** results (try *Reykjavik*: no vehicles there yet)
- Hover, focus and disabled states

Explaining these decisions is part of the challenge, so mention them in your README.

## Provided Materials

```
starter-kit/
├── app/
│   ├── api/                 # Mock API (route handlers) – ready to use
│   ├── globals.css          # Tailwind v4 + shadcn theme (shadcn's neutral defaults – replace with the design's)
│   ├── layout.tsx           # Root layout – swap the font for the design's
│   └── page.tsx             # Placeholder – replace it
├── components/ui/           # shadcn/ui: Button, Popover, Calendar, Sheet pre-installed – add what else you need
├── data/                    # Mock data: 12 vehicles, 9 locations
├── lib/                     # Types + mock data layer
├── public/images/           # Placeholder vehicle photos (+ a fallback hero image)
├── Dockerfile               # Dev + production targets
├── compose.yml              # `docker compose up --watch` – hot reload included
└── README.md                # Setup instructions + API reference
```

## Requirements

### Core Requirements

| Requirement | Description |
|---|---|
| **Design tokens** | Take the colours, type styles, radii and shadows from Figma and put them into the Tailwind/shadcn theme in `app/globals.css`. Use theme classes (`bg-primary`, `text-muted-foreground`, `rounded-lg`…) in components, not hard-coded hex values. |
| **Header & banner** | Promo banner and header as designed, on both states. |
| **Search bar** | **Location:** a Select filled from `GET /api/locations`, showing "City, Country".<br>**Check in / Check out:** open one range calendar, using the pre-installed **Popover + Calendar**. Past dates are disabled.<br>**Guests:** a number from 1 to 6, optional.<br>Search is disabled until a location and both dates are set. |
| **Search → results** | Searching navigates to `/search` with the values in the URL (`/search?location=lisbon&start=2026-07-01&end=2026-07-06&guests=2`), so a refresh or a shared link shows the same results. The compact search in the header is **sticky**, shows the selected values and lets you change the search. Opening `/search` without a valid search is up to you: redirect home, or ask for a location. |
| **Results** | Fetch `GET /api/vehicles?location=…&guests=…` and render the rows as designed, using the mapping above. |
| **States** | Loading (skeletons) and empty results. |
| **Responsive** | Desktop as designed. Mobile is your design (see above). |
| **Docker** | `docker compose up --watch` still works when you're done. |
| **Git & GitHub** | Small, meaningful commits. Deliver your work as a **Pull Request** with a description and screenshots (desktop and mobile). |
| **README** | Replace the starter README with yours: how to run it, decisions and trade-offs (especially mobile and states), and what you'd do with more time. |

### Technical Stack

- **Next.js** 16 (App Router) + **React** 19 + **TypeScript**
- **Tailwind CSS** v4
- **shadcn/ui** (already initialised, with Button, Popover, Calendar and Sheet installed; lucide icons)
- **date-fns** (installed with Calendar, for formatting and calculating dates)
- **Docker** (already set up)

You may add other libraries if they help. Be ready to explain why.

### Bonus (Extra Mile)

Only if you have time left. None of these are required:

- **Working filter chips** (Campervan, Full Bathroom, Pet Friendly), stored in the URL too
- A **live countdown** in the promo banner
- **Accessibility** pass (keyboard, focus, labels, alt text)
- A **deploy preview** (e.g. Vercel) linked from your README

## Guidelines

We value:

- **Design fidelity.** On desktop, spacing, typography and colours should match Figma.
- **Design judgement.** The parts we didn't design (mobile, states, dropdowns) should feel like they belong.
- **Clean components.** Reusable pieces with clear props, rather than one huge page file.
- **Decisions you can explain**, rather than code copied blindly.

Don't worry about:

- Real booking, sign-in, "Become a Host" or vehicle detail pages
- Pagination or "More filters"
- Pixel-perfect matching where the design is ambiguous. Make a sensible call and mention it in your README.

### Using AI tools

**AI tools are welcome.** We use them every day. What matters is that you understand the result: you should be able to explain **every line** you submit.

## Submission

1. Create a **private GitHub repository** with the **contents of `starter-kit/`** at its root, committed as-is on `main`.
2. Do your work on a branch and open a **Pull Request** into `main` with screenshots (desktop and mobile).
3. Make sure `docker compose up --watch` starts the app.
4. Invite us to the repository (we'll send you the GitHub usernames).

## Presentation (30 minutes)

1. **Demo and walk-through** (~10 min): show the app on desktop and mobile, and explain your components and tokens.
2. **Discussion** (~20 min): your design and code decisions, and how you'd extend it.

## Timeline

You have **one week**. We expect it to take about **5–7 hours**, so please don't spend much more. If you're short on time, polish the desktop version first, then mobile.

## Questions?

If anything is unclear, please reach out. Asking good questions is part of being a great engineer!

---

Good luck, and have fun! 🚐

*The Indie Campers Engineering Team*
