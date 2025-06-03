import type { Metadata } from "next";
import { Alex_Brush, MuseoModerno } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/components/providers/CartProvider";
import Cart from "@/components/Cart";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const museoModerno = MuseoModerno({
  variable: "--font-museo-moderno",
  weight: "400",
  style: "italic",
  subsets: ["latin"],
});
const alexBrush = Alex_Brush({
  variable: "--font-alex-brush",
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dezmerce | Dezire for E-commerce",
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
        className={`${museoModerno.variable} ${alexBrush.variable} text-primary flex flex-col antialiased`}
      >
        <SessionProvider>
          <CartProvider>
            <NavBar />
            <p className="text-primary-foreground bg-red-500 py-1 text-center font-medium md:flex md:items-center md:justify-center">
              <span className="mx-1 inline font-light">
                This is just a personal project for showcase. All the products
                and images on this website belong to
              </span>
              <span className="my-auto inline-flex items-center gap-1 font-semibold underline">
                <Image
                  src={"/tss-logo.avif"}
                  height={30}
                  width={25}
                  alt="the souled store logo"
                />
                <a href="https://thesouledstore.com" target="_blank">
                  The Souled Store
                </a>
                <ArrowRight size={16} />
              </span>
            </p>
            <div className="grow p-2 md:px-8 xl:px-40">{children}</div>
            <Footer />
            <Cart />
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
