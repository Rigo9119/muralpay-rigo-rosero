"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/components/reactQuery/reactQueryProvider";
import CreateAccountDialog from "@/components/dialogs/createAccountDialog/createAccountDialog";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-full flex flex-col`}
      >
        <ReactQueryProvider>
          <header className="flex flex-row items-center justify-between w-full px-6 py-4 bg-black text-white">
            <div>
              <h1>Welcome user</h1>
            </div>
            <div>
              <CreateAccountDialog />
            </div>
          </header>
          <main className="flex-1 p-5">{children}</main>
          <footer className="mt-auto flex flex-row items-center justify-center w-full px-6 py-4 bg-black text-white">
            2025
          </footer>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
