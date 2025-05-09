import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dezmerce | Admin",
  description: "The last generation e-commerce website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
