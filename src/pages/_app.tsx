import type { AppProps } from "next/app"
import Header from "@/components/Header"
import AuthProvider from "@/providers/AuthProvider"
import "@/app/globals.css"

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthProvider>
        <Header />
        <Component {...pageProps} />
      </AuthProvider>
    </>
  )
}
