import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HomeTutor AI - Find the Right Tutor. Learn with Confidence.",
  description: "AI-powered home tutoring marketplace. Find verified tutors, get personalized learning plans, and enjoy safe tutoring sessions with real-time tracking and AI assistance.",
  keywords: "tutor, home tutor, AI tutor matching, online tutoring, tutor marketplace, education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
