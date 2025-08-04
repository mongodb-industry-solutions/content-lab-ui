/**
 * Root layout top level component
 */

import { Geist } from "next/font/google";
import Providers from "@/app/providers";
import "@/app/globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata = {
  title: "Content Lab",
  description: "Content Lab Demo Application",
  icons: {
    icon: "/mongodb/logo.svg",
  }
};

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning lang="en" className={geist.className}>
      <body>
        <Providers>
        {children}
        </Providers>
        </body>
    </html>
  );
}
