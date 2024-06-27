import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const robot = Roboto({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Expense Tracker",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={robot.className}>
          <Header></Header>
          <main className="h-[90%]">{children}</main>
          <ToastContainer />
        </body>
      </html>
    </ClerkProvider>
  );
}
