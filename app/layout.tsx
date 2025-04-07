import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Suspense } from "react";
import { BeatLoader } from "react-spinners";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import Navbar from "@/components/layout/navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Cine Hive",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistMono.variable} ${geistSans.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="font-[family-name:var(--font-geist-sans)] flex h-screen w-screen overflow-x-hidden relative">
            <SidebarProvider defaultOpen>
              <AppSidebar />
              <div className="flex flex-col flex-grow w-full h-full overflow-x-hidden relative">
                <Navbar />
                <Suspense fallback={
                  <div className="h-full flex justify-center items-center">
                    <BeatLoader className="text-foreground" size={10} />
                  </div>
                }>
                  <main className="flex flex-col overflow-y-auto overflow-x-hidden scrollbar-thin absolute w-full h-full top-0">
                    {children}
                    <Toaster />
                  </main>
                </Suspense>
              </div>
            </SidebarProvider>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
