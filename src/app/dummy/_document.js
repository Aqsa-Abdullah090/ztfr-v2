import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-black">
        <Main />
        <NextScript />
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
    </Html>
  );
}
