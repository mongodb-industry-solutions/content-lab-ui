import { GeistSans } from "geist/font/sans";
import Providers from "@/app/providers";
import "@/app/globals.css";

export const metadata = {
  title: "The Content Lab",
  description: "Application for the Content Lab at IST Media"
};

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning lang="en" className={GeistSans.className}>
      <body>
        <Providers>
        {children}
        </Providers>
        </body>
    </html>
  );
}
