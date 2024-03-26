import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Question Time",
  description: "Question Time",
};

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <Analytics/>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
