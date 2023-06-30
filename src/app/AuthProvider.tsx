"use client"

import { SessionProvider } from "next-auth/react"

export interface AuthProviderProps {
  children: React.ReactNode
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  return <SessionProvider>{children}</SessionProvider>
}

export default AuthProvider
