import withPWA from 'next-pwa';

import type { NextConfig } from "next";

//compiler: {
  //removeConsole: process.env.NODE_ENV !== "development"     // Remove console.log in production
//},

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true
  }
};


export default withPWA({
  dest: "public",         // destination directory for the PWA files
  disable: process.env.NODE_ENV === "development",        // disable PWA in the development environment
  register: true,         // register the PWA service worker
  skipWaiting: true,      // skip waiting for service worker activation
})(nextConfig);
