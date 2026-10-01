import Link from "next/link";

import { Button } from "@/components/ui/button";

/**
 * 👋 Start here.
 *
 * This page is a placeholder — replace it with the search page
 * described in the challenge README and the Figma file.
 */
export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center gap-6 px-6 py-16">
      <p className="text-2xl font-bold tracking-tight">indie campers</p>
      <h1 className="text-4xl font-semibold tracking-tight">Your starter kit is running 🚐</h1>
      <p className="text-muted-foreground">
        Next.js, Tailwind CSS and shadcn/ui are set up. Read the challenge README, open the Figma
        file, and replace this page with the homepage.
      </p>

      <div className="flex flex-wrap gap-3">
        <Button render={<Link href="/api/vehicles" />} nativeButton={false}>
          GET /api/vehicles
        </Button>
        <Button variant="outline" render={<Link href="/api/locations" />} nativeButton={false}>
          GET /api/locations
        </Button>
      </div>
    </main>
  );
}
