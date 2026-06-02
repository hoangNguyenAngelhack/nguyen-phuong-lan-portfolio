import type { Metadata } from "next";
import { Pacifico, Geist } from "next/font/google";
import { cn } from "@/lib/utils";
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
  title: "Admin — Nguyen Phuong Lan",
  description: "Manage portfolio images",
  icons: { icon: "/favicon.ico" },
};

export default function AuthLayout({
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
        {children}
      </body>
    </html>
  );
}
