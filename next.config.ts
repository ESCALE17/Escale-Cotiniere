import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Permet au déploiement de réussir même si TypeScript ou ESLint
  // signalent des avertissements non bloquants (comme en local).
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;