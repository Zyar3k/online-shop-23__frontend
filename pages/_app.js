import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import Layout from "@/components/Layout";

import { CartProvider } from "@/context/CartContext";
import { wrapper } from "@/redux/store";

import "@/styles/globals.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const { store, props } = wrapper.useWrappedStore(pageProps);
  return (
    <ChakraProvider>
      <SessionProvider session={session}>
        <CartProvider>
          <Provider store={store}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Provider>
        </CartProvider>
      </SessionProvider>
    </ChakraProvider>
  );
}
