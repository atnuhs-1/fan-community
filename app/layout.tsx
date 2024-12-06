import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/header/index";
import SideBar from "@/components/sidebar/index";
import { Suspense } from "react";
import Footer from "@/components/footer";
import FooterNav from "@/components/footer-nav";

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
  title: "FanSync",
  description: "情報同期しましょう",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex bg-neutral-100`}
      >
        <div className="w-full h-full">
          <Header />
          <div className="h-full lg:pt-[60px] pt-[48px]">
            <div className="z-0 mx-auto h-full max-w-screen-xl lg:gap-[16px] lg:p-[24px] lg:grid lg:grid-cols-12">
              <div className="hidden lg:col-span-4 lg:block xl:col-span-3">
                <Suspense
                  fallback={
                    <div className="w-64 h-screen bg-white">Loading...</div>
                  }
                >
                  <SideBar />
                </Suspense>
              </div>

              <main className="h-full lg:col-span-8 xl:col-span-9">
                {children}
              </main>
              
              <div className="fixed bottom-0 z-20 w-full shrink-0 lg:hidden">
                <FooterNav />
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
