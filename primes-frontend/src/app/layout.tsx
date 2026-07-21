import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PRIMES Dashboard",
  description: "Passenger Reservation Information Management Enhanced System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <Sidebar />
        <main style={{ 
          marginLeft: 'var(--sidebar-width)', 
          marginTop: 'var(--header-height)',
          minHeight: 'calc(100vh - var(--header-height))'
        }}>
          {children}
        </main>
      </body>
    </html>
  );
}
