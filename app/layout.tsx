import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NovaBrew Coffee Taste Profile Quiz",
  description:
    "A personalized coffee quiz that matches subscribers to their NovaBrew coffee personality.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
