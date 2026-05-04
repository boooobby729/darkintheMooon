import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DARK IN THE MOON",
  description: "The dark sea under the moonlight",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
