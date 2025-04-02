import type { Metadata } from "next";
import { Alex_Brush } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Cart from "@/components/Cart";
import { CartProvider } from "@/components/providers/CartProvider";

const alexBrush = Alex_Brush({
    variable: "--font-alex-brush",
    weight: "400",
    style: "normal"
})


export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${alexBrush.variable} antialiased flex flex-col text-primary`}
            >
                <CartProvider>
                    <NavBar />
                    <div className="grow p-2 md:px-8 xl:px-40">
                        {children}
                    </div>
                    <Footer />
                    <Cart />
                </CartProvider>
            </body>
        </html >
    );
}
