import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Logesh Raja S | MERN Stack & AI Developer",
  description:
    "Portfolio of Logesh Raja S, Full Stack MERN Developer specializing in React, Node.js, MongoDB, Express, Java, and AI applications.",
  openGraph: {
    title: "Logesh Raja S",
    images: ["/og-image.png"]
  }
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} dark h-full antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-bg-primary text-text-primary custom-cursor-active selection:bg-accent/30">
        {children}
      </body>
    </html>
  );
}
