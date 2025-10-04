"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import * as React from "react";

if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
  throw new Error("NEXT_PUBLIC_CONVEX_URL environment variable is required");
}
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

export function Providers({ children }: { children: React.ReactNode }) {
  return <ConvexProvider client={convex}> {children}</ConvexProvider>;
}
