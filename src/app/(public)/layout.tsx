import type { Metadata } from "next";
import { Pacifico } from "next/font/google";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ClientProviders } from "@/components/providers/client-providers";
import "@/styles/globals.css";

const pacifico = Pacifico({
  variable: "--font-pacifico-sans",
  subsets: ["latin"],
  weight: "400",
});

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nguyen Phuong Lan — Illustration & Visual Storytelling Studio",
  description:
    "Award-style illustration and visual storytelling by Nguyen Phuong Lan. Books, branding, motion and commissioned art.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          pacifico.variable,
          geist.variable,
          "antialiased page-container"
        )}
      >
        <ClientProviders>
          <Header />
          <main className="relative z-1 flex-1 pt-30 md:pt-24">{children}</main>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
