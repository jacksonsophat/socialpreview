import type { Metadata } from "next";
import { Open_Sans as FontSans } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import Head from "next/head";
import { Toaster } from "sonner";

// const inter = Inter({ subsets: ["latin"] });

// export const runtime = "edge";
// export const runtime = "edge";


const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Social Media Preview",
  description:
    "See how your links will look before you share them on social media. Get the perfect preview every time.",
};




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        {/* Opengraph */}
        <meta property="og:title" content="Social Preview" />
        <meta property="og:description" content="See how your links will look before you share them on social media. Get the perfect preview every time." />
        <meta property="og:image" content="https://socialpreview.jacksonsophat.com/images/meta-image.jpg" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@jacksonsophat" />
        <meta name="twitter:title" content="Social Preview" />
        <meta name="twitter:description" content="See how your links will look before you share them on social media. Get the perfect preview every time." />
        <meta name="twitter:image" content="https://socialpreview.jacksonsophat.com/images/meta-image.jpg" />

      </Head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >

        {/* <img src="/images/meta-image.jpg" alt="" /> */}
        {children}
        <Toaster />
      </body>
    </html>
  );
}
