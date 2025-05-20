import type { Metadata } from "next";
// import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/sonner"
import { Poppins } from 'next/font/google'

// const poppins = Poppins({
//   subsets: ['latin'],
//   weight: ['400', '500', '600', '700', "800", "900"]
// })

// export const metadata: Metadata = {
//   title: "Prelo",
//   description: "Work in progress",
// };

export default function HomeLayout({
  children,
}: { children: React.ReactNode }) {
  return (

    // <ClerkProvider>
    <div className="flex flex-col w-screen scrollbar-hide">
      <Header stripped={false} />
      <div className="flex min-h-[92vh] ">
        <Sidebar />
        <div className="flex-1 md:p-4 bg-gray-100 overflow-y-auto scrollbar-hide">
          {children}
        </div>
      </div>
      <Toaster position="top-center" />
    </div>
    // </ClerkProvider>

  );
}
