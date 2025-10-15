import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",           // можно оставить
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;