import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Poppins } from 'next/font/google'


const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', "800", "900"]
})

export const metadata: Metadata = {
  title: "Prelo",
  description: "Work in progress",
};

export default function RootLayout({
  children,
}: {children: React.ReactNode}) {
  return (
    <ClerkProvider>

      <html lang="en"
      className={poppins.className }
      >
        <head />
        <body
        >
          
          <div className="flex min-h-screen max-w-screen ">
            <div className="flex flex-1 items-center justify-center scrollbar-hide max-w-[100vw]">
              {children}
            </div>

          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
