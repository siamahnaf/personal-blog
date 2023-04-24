import "@/styles/globals.css";
import type { AppProps } from "next/app";

//Fonts
import { mulish } from "@/Fonts";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${mulish.variable} font-sans`}>
      <Component {...pageProps} />
    </main>
  )
}
