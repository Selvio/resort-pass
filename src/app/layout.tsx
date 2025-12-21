import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const basetica = localFont({
  src: [
    {
      path: "../fonts/BaseticaTrial-Regular.otf",
      weight: "400",
    },
    {
      path: "../fonts/BaseticaTrial-Medium.otf",
      weight: "500",
    },
    {
      path: "../fonts/BaseticaTrial-Bold.otf",
      weight: "700",
    },
  ],
  variable: "--font-basetica",
});

export const metadata: Metadata = {
  title: "ResortPass - Hotel Day Pass Booking Platform",
  description:
    "Search and book hotel day passes. Filter by location, amenities, dates, and more. Find the perfect pool, spa, or beach access for your day.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${basetica.variable} antialiased`}>{children}</body>
    </html>
  );
}
