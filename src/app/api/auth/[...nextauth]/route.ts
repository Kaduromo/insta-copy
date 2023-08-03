import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
  providers: [
    GoogleProvider<any>({
      clientId: <any>process.env.NEXT_GOOGLE_CLIENT_ID,
      clientSecret: <any>process.env.NEXT_GOOGLE_CLIENT_SECRET,
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
