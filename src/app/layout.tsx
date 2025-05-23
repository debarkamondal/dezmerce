import type { Metadata } from "next";
import { Alex_Brush } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/components/providers/CartProvider";
import Cart from "@/components/Cart";

const alexBrush = Alex_Brush({
  variable: "--font-alex-brush",
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dezmerce | Simple Ecommerce",
  description: "Ecommerce website for small businesses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${alexBrush.variable} text-primary flex flex-col antialiased`}
      >
        <SessionProvider>
          <CartProvider>
            <NavBar />
            <div className="grow p-2 md:px-8 xl:px-40">{children}</div>
            <Footer />
            <Cart />
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
