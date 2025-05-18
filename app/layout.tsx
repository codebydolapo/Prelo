import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Prelo",
  description: "Work in progress",
};

export default function RootLayout({
  children,
}: any) {
  return (
    <ClerkProvider>
      <html lang="en"
      >
        <head />
        <body
        >
          <Header />
          <div className="flex min-h-screen ">
            {/* sidebar */}
            <Sidebar />
            <div className="flex-1 p-4 bg-gray-100 overflow-y-auto scrollbar-hide">
              {children}
            </div>

          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
