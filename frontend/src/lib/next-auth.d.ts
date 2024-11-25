import NextAuth, { DefaultUser, DefaultSession } from "next-auth"
import { DefaultJWT } from "next-auth/jwt";
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface User extends DefaultUser {
    username: string | null
    password: string | null
  }
}

declare module "next-auth" {
  interface Session extends DefaultSession {
    firebaseToken: string;
    user: User & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: User["id"]
    name: User["name"]
    email: User["email"]
    image: User["image"]
    username: User["username"]
    password: User["password"]
  }
}