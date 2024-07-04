import type { Metadata } from "next";
import { Open_Sans as FontSans } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import Head from "next/head";
import { Toaster } from "sonner";
import { PHProvider } from "@/_analytics/providers";
import Navbar from "@/_components/Navbar";
import Footer from "@/_components/Footer";
import dynamic from "next/dynamic";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});


export const metadata: Metadata = {
  title: "Social Preview",
  description:
    "See how your links will look before you share them on social media. Get the perfect preview every time.",
};


const PostHogPageView = dynamic(() => import('@/_analytics/PostHogPageView'), {
  ssr: false,
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <PHProvider>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          {/* Opengraph */}
          <meta property="og:title" content="Social Preview" />
          <meta property="og:description" content="See how your links will look before you share them on social media. Get the perfect preview every time." />
          {/* <meta property="og:image" content="https://socialpreview.jacksonsophat.com/images/meta-image.jpg" /> */}

          <meta property="og:image" content="<generated>" />
          <meta property="og:image:type" content="<generated>" />
          <meta property="og:image:width" content="<generated>" />
          <meta property="og:image:height" content="<generated>" />

          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@jacksonsophat" />
          <meta name="twitter:title" content="Social Preview" />
          <meta name="twitter:description" content="See how your links will look before you share them on social media. Get the perfect preview every time." />
          {/* <meta name="twitter:image" content="https://socialpreview.jacksonsophat.com/images/meta-image.jpg" /> */}
          <meta name="twitter:image" content="<generated>" />
          <meta name="twitter:image:type" content="<generated>" />
          <meta name="twitter:image:width" content="<generated>" />
          <meta name="twitter:image:height" content="<generated>" />
        </Head>
        {/* <PostHogPageView /> */}
        <body
          className={cn(
            "min-h-screen flex flex-col bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <div className="flex flex-col flex-grow">
            <Navbar />
            <PostHogPageView />
            {children}
          </div>
          <Toaster />
          <Footer />
        </body>
      </PHProvider>

    </html>
  );
}
