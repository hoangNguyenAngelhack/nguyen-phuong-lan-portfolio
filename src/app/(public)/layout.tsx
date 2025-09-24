import type { Metadata } from "next";
import { Pacifico, Caveat, Patrick_Hand } from "next/font/google";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
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
        <div
          id="splash-love-html"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            background: "#fffaf6",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            transition: "opacity 0.5s",
          }}
        >
          <div
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              color: "#ec4899",
              marginBottom: "1.5rem",
              textAlign: "center",
              maxWidth: "98%",
            }}
          >
            A gentle little corner just for you 💖
          </div>
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              fontSize: "2rem",
              animation: "heartbeat 1.2s infinite",
            }}
          >
            <span>❤️</span>
            <span>💌</span>
            <span>🌹</span>
          </div>
        </div>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('DOMContentLoaded', function() {
                setTimeout(function() {
                  var splash = document.getElementById('splash-love-html');
                  if (splash) {
                    splash.style.opacity = '0';
                    setTimeout(function() { splash.style.display = 'none'; }, 500);
                  }
                }, 2200);
              });
            `,
          }}
        />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
