import type { Metadata } from "next";
import { Nunito } from "next/font/google";

import "./globals.scss";

const font = Nunito({
  variable: "--font-main",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wordle Game | wwDev",
  description: "Play unlimited wordle !",
  openGraph: {
    title: "Wordle Game | wwDev",
    description: "Play unlimited wordle !",
    images: "og.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.variable} antialiased`}>{children}</body>
    </html>
  );
}
