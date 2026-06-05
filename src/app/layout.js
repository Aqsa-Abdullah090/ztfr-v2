// import "./globals.css";

// export const metadata = {
//   title: "Your App Title",
//   description: "Your App Description",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className="bg-black">
//         {children}
//       </body>
//     </html>
//   );
// }


import "./globals.css"; // Global styles loaded here
import Script from "next/script";
import Home from "@/components/home/Home";
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
        <Providers>
   
          {children}
        </Providers>
      </body>
    </html>
  );
}