import "./globals.css"
import Provider from "./AuthProvider"
// import { Inter } from "next/font/google"

// const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Instagram App",
  description: "Instagram Next App",
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider>
      <html lang="ru">
        {/* <body className={inter.className}>{children}</body> */}
        <body>{children}</body>
      </html>
    </Provider>
  )
}

export default RootLayout
