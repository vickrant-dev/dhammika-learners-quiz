import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Dhammika Learners | Driving School",
  description: "Dhammika Learners is a premier driving school offering expert driving lessons, road safety education, and licensing support to help you become a confident driver.",
};

export default function RootLayout({ children }) {
  return (
    <html data-theme="light" lang="en">
      <body 
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        
      </body>
    </html>
  );
}
