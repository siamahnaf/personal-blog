import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "urql";

//Urql
import { useClient } from "@/Urql/client";

export default function App({ Component, pageProps }: AppProps) {
  const client = useClient(pageProps);
  return (
    <Provider value={client}>
      <Component {...pageProps} />
    </Provider>
  )
}
