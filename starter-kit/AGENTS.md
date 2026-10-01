<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project context

Campervan search – frontend challenge. See `README.md` (setup + API). The design is in Figma (linked in the challenge brief).

- Stack: Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, shadcn/ui (`base-vega` style – built on **Base UI**, not Radix; use the `render` prop instead of `asChild`), lucide icons.
- Design tokens (colours, type, radius, shadows) come from the Figma file and are mapped into `app/globals.css`. Components use theme classes (`bg-primary`, `text-muted-foreground`), never raw hex values.
- Already installed: `button`, `popover`, `calendar` (react-day-picker + date-fns), `sheet` (side drawer for the mobile menu). Add others with `npx shadcn@latest add <name>`; don't hand-write them.
- `lib/data.ts` and `app/api/*` are the mock backend – don't change their behaviour.
- The search (location, start, end, guests) lives in URL search params.
- Before committing: `npm run lint && npm run typecheck && npm run format`.
