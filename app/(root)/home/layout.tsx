// import "./globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/sonner"


export default function HomeLayout({
  children,
}: { children: React.ReactNode }) {
  return (

    // <ClerkProvider>
    <div className="flex flex-col w-screen scrollbar-hide">
      <Header stripped={false} page = {"/"} />
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
