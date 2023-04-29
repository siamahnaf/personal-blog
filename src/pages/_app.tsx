import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { Analytics } from "@vercel/analytics/react"

//Progress
import NextProgress from "next-progress";

//Urql
import { useApollo } from "@/Apollo/client";

export default function App({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps);
  return (
    <ApolloProvider client={client}>
      <NextProgress
        delay={1000}
        options={{ showSpinner: false }}
        color="#14b8a6"
      />
      <Component {...pageProps} />
      <Analytics />
    </ApolloProvider>
  )
}
