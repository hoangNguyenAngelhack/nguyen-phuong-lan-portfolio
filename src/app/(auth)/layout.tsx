import type { Metadata } from "next";
import { Pacifico, Caveat, Patrick_Hand } from "next/font/google";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";

const PacificoSans = Pacifico({
  variable: "--font-pacifico-sans",
  subsets: ["latin"],
  weight: "400",
});

const CaveatSans = Caveat({
  variable: "--font-caveat-sans",
  subsets: ["latin"],
  weight: "400",
});
const Patrick_HandSans = Patrick_Hand({
  variable: "--font-patrick-hand-sans",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Lan Nguyen Portfolio",
  description: "Portfolio of Lan Nguyen | Digital Artist",
  icons: {
    icon: "/favicon.ico",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: "cover",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          PacificoSans.variable,
          CaveatSans.variable,
          Patrick_HandSans.variable,
          "antialiased page-container"
        )}
      >
        {children}
      </body>
    </html>
  );
}
