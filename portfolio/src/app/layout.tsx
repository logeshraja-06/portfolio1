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

export const metadata: Metadata = {
  title: "Logesh Raja S | Premium Full-Stack Developer & AI Developer Portfolio",
  description: "Professional portfolio of Logesh Raja S - Computer Science Engineer, Full-Stack Developer (MERN), and AI Developer. Explore projects, certifications, and experience.",
  keywords: ["Logesh Raja S", "Logesh Raja", "Portfolio", "Full Stack Developer", "MERN Stack", "React Developer", "AI Developer", "Computer Science Engineer"],
  authors: [{ name: "Logesh Raja S" }],
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
