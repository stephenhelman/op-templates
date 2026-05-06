import type { Metadata } from "next";
import {
  Black_Ops_One,
  Barlow_Condensed,
  Playfair_Display,
  DM_Sans,
  Syne,
  Inter,
  DM_Serif_Display,
  Nunito,
} from "next/font/google";
import "./globals.css";

const blackOpsOne = Black_Ops_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-black-ops-one",
});

const barlowCondensed = Barlow_Condensed({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-barlow-condensed",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const dmSerifDisplay = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif-display",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Operation Profit Asset Recovery — Template Demo",
  description:
    "Preview and customize your asset recovery website template. Choose your design, colors, and fonts, then place your order.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`
        ${blackOpsOne.variable}
        ${barlowCondensed.variable}
        ${playfairDisplay.variable}
        ${dmSans.variable}
        ${syne.variable}
        ${inter.variable}
        ${dmSerifDisplay.variable}
        ${nunito.variable}
        h-full antialiased
      `}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
