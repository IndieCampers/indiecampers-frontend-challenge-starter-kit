import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Produces a small self-contained server in .next/standalone (used by the production Docker image).
  output: "standalone",
};

export default nextConfig;
