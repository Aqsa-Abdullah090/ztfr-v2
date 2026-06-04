import "@/styles/globals.scss"; // Global styles loaded here
import Script from "next/script";
import { Providers } from "./providers";

export const metadata = {
  title: "Your App Title",
  description: "Your App Description",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body className="bg-black">
        {/* All global providers wrap the children node here */}
        <Providers>
          {children}
        </Providers>

        {/* Third-party scripts moved directly from _document.js */}
        <Script
          src="/assets/scripts/action-disabler.js"
          strategy="lazyOnload"
        />
        <Script
          src="/static/clarity.js"
          strategy="lazyOnload"
          data-website-id="kl21vlava7"
        />
      </body>
    </html>
  );
}