"use client"

import Feed from "@/components/Feed"
import Header from "@/components/Header"
import AuthProvider from "@/providers/AuthProvider"

const Home = () => {
  return (
    <AuthProvider>
      <Header />
      <Feed />
    </AuthProvider>
  )
}

export default Home
