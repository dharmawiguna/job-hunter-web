import type { Metadata } from "next";
import { Epilogue } from "next/font/google";
import "../globals.css";
import Image from "next/image";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/providers/AuthProvider";

const epilogue = Epilogue({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Job Hunter Web",
  description: "created by dhrm wgn",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${epilogue.className} relative overflow-x-hidden`}>
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
