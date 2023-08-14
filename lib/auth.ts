import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import type{ NextAuthOptions } from "next-auth"
import GithubProvider from 'next-auth/providers/github'
import { prisma } from "./db"



export const authOptions: NextAuthOptions = {
    //@ts-ignore
    adapter: PrismaAdapter(prisma), //new PrismaClient()
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_SECRET_ID as string,
        })
    ]
}