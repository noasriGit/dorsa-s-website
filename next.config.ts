import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next.js re-compresses photos at quality 75 by default, which visibly
    // smears hair, eyes and skin texture. Every image now uses quality 90.
    qualities: [90],
  },
};

export default nextConfig;
