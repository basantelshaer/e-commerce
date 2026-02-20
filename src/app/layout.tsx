import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import Providers from "@/components/providers/Providers";
import { verifyTokken } from "@/features/auth/server/auth.actions";
import { getLoggedUserCart } from "@/features/cart/server/cart.actions";
import "../styles/globals.css";
import { ReactNode } from "react";
import { Exo } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import "../lib/fontawesome";

import { CartState } from "@/features/cart/store/cart.slice";
import { AuthState } from "@/app/store/auth.slice";

const exo = Exo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-exo",
});

const defaultCartState: CartState = {
  cartId: null,
  isLoading: false,
  numOfCartItems: 0,
  products: [],
  totalCartPrice: 0,
  error: null,
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const authValues = await verifyTokken();

  const authState: AuthState = {
    isAuthenticated: authValues.isAuthenticated,
    userInfo: authValues.userInfo ?? null,
  };

  let cartState: CartState = defaultCartState;

  if (authValues.isAuthenticated) {
    try {
      const cartResponse = await getLoggedUserCart();

      cartState = {
        cartId: cartResponse.data._id,
        totalCartPrice: cartResponse.data.totalCartPrice,
        numOfCartItems: cartResponse.numOfCartItems,
        products: cartResponse.data.products,
        isLoading: false,
        error: null,
      };
    } catch (error) {
      cartState = defaultCartState;
    }
  }

  return (
    <html lang="en">
      <body className={`${exo.className} font-medium`}>
        <Providers preloadedState={{ auth: authState, cart: cartState }}>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
  </html>
  );
}