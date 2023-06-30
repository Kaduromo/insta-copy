import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: <string>process.env.NEXT_GOOGLE_CLIENT_ID,
      clientSecret: <string>process.env.NEXT_GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async session({ session, token }: any) {
      session.user.username = session.user.name
        .split(" ")
        .join("")
        .toLocaleLowerCase()
      session.user.uid = token.sub
      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
