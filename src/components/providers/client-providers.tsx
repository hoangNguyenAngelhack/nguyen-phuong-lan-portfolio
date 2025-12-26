"use client";

import { ReactNode } from "react";
import { ScrollProgress } from "@/components/common/scroll-progress";
import { BackToTop } from "@/components/common/back-to-top";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";

export const ClientProviders = ({ children }: { children: ReactNode }) => {
  return (
    <SmoothScrollProvider>
      <ScrollProgress />
      {children}
      <BackToTop />
    </SmoothScrollProvider>
  );
};
