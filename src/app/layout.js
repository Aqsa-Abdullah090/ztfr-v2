import "./globals.css";

export const metadata = {
  title: "Your App Title",
  description: "Your App Description",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black">
        {children}
      </body>
    </html>
  );
}


// import "./globals.css"; // Global styles loaded here
// import Script from "next/script";
// import { Providers } from "./providers";
// import Home from "@/components/home/Home";

// export const metadata = {
//   title: "Your App Title",
//   description: "Your App Description",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <head />
//       <body className="bg-black">
//         <Home />
    
//         {/* <Providers>
//           {children}
//         </Providers>

   
//         <Script
//           src="/assets/scripts/action-disabler.js"
//           strategy="lazyOnload"
//         />
//         <Script
//           src="/static/clarity.js"
//           strategy="lazyOnload"
//           data-website-id="kl21vlava7"
//         /> */}
//       </body>
//     </html>
//   );
// }