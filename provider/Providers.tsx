"use client";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { SessionProvider } from "next-auth/react";
import React from "react";

type Props = {
  children: React.ReactNode;
};

function Providers({ children }: Props) {
  return (
    <SessionProvider>
      <EdgeStoreProvider>{children}</EdgeStoreProvider>
    </SessionProvider>
  );
}

export default Providers;
