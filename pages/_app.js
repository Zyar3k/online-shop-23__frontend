import Layout from "@/components/Layout";
import "@/styles/globals.css";

import { ChakraProvider } from "@chakra-ui/react";

import { CartProvider } from "@/context/CartReducer";

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <CartProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CartProvider>
    </ChakraProvider>
  );
}
