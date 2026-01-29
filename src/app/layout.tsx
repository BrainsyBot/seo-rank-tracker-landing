import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SEO Rank Tracker - Monitor Your Google Rankings Daily",
  description: "Track your website's Google rankings for unlimited keywords. Get daily updates, historical data, and CSV exports. Perfect for SEO professionals and agencies.",
  keywords: "seo rank tracker, keyword tracking, google rankings, seo monitoring, serp tracking",
  openGraph: {
    title: "SEO Rank Tracker - Monitor Your Google Rankings Daily",
    description: "Track your website's Google rankings for unlimited keywords",
    url: "https://seo-rank-tracker.vercel.app",
    siteName: "SEO Rank Tracker",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SEO Rank Tracker - Monitor Your Google Rankings Daily",
    description: "Track your website's Google rankings for unlimited keywords",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
