import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Los paquetes internos se publican como código TypeScript; Next los compila.
  transpilePackages: ["@freechess/db", "@freechess/shared"],
};

export default nextConfig;
