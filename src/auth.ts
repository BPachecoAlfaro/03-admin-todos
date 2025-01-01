
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { prisma } from "./prisma"
import Credentials from "next-auth/providers/credentials"
import { signInEmailPassword } from "./auth/actions/auth-actions"
import { User } from "@prisma/client"

 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [GitHub, Google, Credentials({
    credentials: {
      email: { label: "Correo electrónico", type: "email", placeholder: "usuario@gmail.com"},
      password: { label:"Contraseña", type: "password", placeholder: "******"},
    },
    authorize: async (credentials): Promise<User> => {
      let user = null

      user = await signInEmailPassword(credentials.email, credentials.password)

      if (!user) {
        // No user found, so this is their first attempt to login
        // Optionally, this is also the place you could do a user registration
        console.log("Invalid credentials.")
      }

      // return user object with their profile data
      return user as User;
    },
  
    
  })],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
 
  
})