import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import Providers from "@/components/providers/Providers";
import { verifyTokken } from "@/features/auth/server/auth.actions";
import "../styles/globals.css";
import { ReactNode } from "react";
import { Exo } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import "../lib/fontawesome";
const exo = Exo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-exo",
});
export default async function RootLayout({children,}: {children: ReactNode;})
 {
  const response= await verifyTokken();

  return (
    <html lang="en">
      <body className={`${exo.className} font-medium`}>
        <Providers preloadedState={{auth:response}}>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
