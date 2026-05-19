import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata = {
  title: "DietPilot AI | Smart Nutrition & Recipe Companion",
  description: "Next-gen AI nutrition coach with RAG-powered recipe discovery and personalized health tracking.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="antialiased bg-obsidian text-white">
        <div className="grain" />
        {children}
      </body>
    </html>
  );
}
