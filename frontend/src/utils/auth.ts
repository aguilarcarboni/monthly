import { NextAuthOptions, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { accessAPI } from "@/utils/api"
import { toast } from "@/hooks/use-toast"
import { UserController } from "@/utils/controllers/UserController"

export const authOptions: NextAuthOptions = {

    providers: [
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
          email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials) {

          if (credentials?.email && credentials?.password) {
            try {

              // Fetch user profile the user service
              const response = await UserController.findAll()
              
              // Find user by email and password
              const user:User = response['content'].filter((user:User) => user.email === credentials.email && user.password === credentials.password)[0]
              
              if (user) return user
              else throw new Error('Invalid username or password.')

            } catch (error) {
              toast({
                title: 'Error',
                description: 'Invalid username or password.',
                variant: 'error',
              })
              return null;
            }
          }

          return null
        }
      }),
    ],
    callbacks: {

      async jwt({ token, user }) {
        
        if (user) {

          token.sub = user.id
          token.name = user.name || null
          token.image = user.image || null
          token.email = user.email || null

          token.email = user.email || null
          token.password = user.password || null

        }
        
        return token
      },
      async session({ session, token }) {

        if (session?.user) {
          
          if (token.sub) {

            // Build NextAuth user profile from token
            session.user.id = token.sub
            session.user.name = token.name || null
            session.user.email = token.email || null
            session.user.image = token.image || null

            session.user.email = token.email || null
            session.user.password = token.password || null

          }
          
        }
        return session
      },

    },
    pages: {
      signIn: '/signin',
    },
    session: {
      strategy: 'jwt'
    },
}