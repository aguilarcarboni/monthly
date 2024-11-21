import { NextAuthOptions, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { accessAPI } from "@/utils/api"

export const authOptions: NextAuthOptions = {

    providers: [
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
          username: { label: "Username", type: "text", placeholder: "jsmith" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials) {

          if (credentials?.username && credentials?.password) {
            try {

              // Fetch user profile from same database where Google Auth is stored
              const response = await accessAPI('/database/read', 'POST', {
                path: 'users',
                query: {
                  'username': credentials.username,
                  'password': credentials.password
                }
              })

              const user:User = response['content'][0]
              return user

            } catch (error) {

              console.error('Authentication error:', error);
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

          token.username = user.username || null
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

            session.user.username = token.username || null
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